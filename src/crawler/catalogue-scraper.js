'use strict';

import { openURL, cleanString, startJob, addJobProgress } from './utils';

const CATALOGUE_BASE_URL = 'http://catalogue.uci.edu';

export async function scrape() {
    const $ = await openURL(CATALOGUE_BASE_URL + '/allcourses');
    const departments = [];
    let courses = [];
    const fetchPromises = [];

    const links = $('div#atozindex ul li a');
    startJob('Scraping catalogue', links.length);
    links.each(function (i, element) {
        const [text, name, id] = $(this).text().match(/(.*) \((.*)\)/);
        const url = $(this).attr('href');
        fetchPromises.push(
            exploreDepartment(url)
                .then(departmentCourses => {
                    departments.push({
                        id,
                        name,
                        courses: departmentCourses.map(course => course.id)
                    });
                    courses = courses.concat(departmentCourses);
                    addJobProgress('Scraping catalogue');
                })
        );
    });
    
    await Promise.all(fetchPromises);
    return { departments, courses };
}

async function exploreDepartment(url) {
    const $ = await openURL(CATALOGUE_BASE_URL + url);
    const courses = [];
    $('body #courseinventorycontainer .courses .courseblock').each(function (i, element) {
        let course = {};
        
        $(this).find('p').each(function (i, element) {
            let text = $(element).text().trim();

            if (i === 0) {
                // Course ID, name, units
                let titleComponents = text.split('.');
                course.id = titleComponents[0].trim().replace(new RegExp(String.fromCharCode(160), 'g'), ' ');
                course.name = titleComponents[1].trim();
                course.units = titleComponents[2].trim().split(' ')[0];
            } else if (i === 2) {
                // Description
                course.description = text;
            } else {
                let lines = text.split('\n');
                
                lines.forEach(line => {
                    line = cleanString(line.trim());

                    // Fix UCI web inconsistencies
                    line = line.replace(/^Prerequisite: Prerequisite or corequisite:/, 'Corequisite: ');
                    line = line.replace(/42\) I&C/, '42). I&C');
                    line = line.replace(/^Prerequisite:$/, '');
                    line = line.replace(/ \(fee required\)/, '');
                    line = line.replace(/^\(GE /, '(');
                    line = line.replace(/^\(General Education /, '(');
                    line = line.replace(/28E\), or/, '28E\) or');
                    line = line.replace(/Admission is by audition and the following.*$/, '');
                    line = line.replace(/PSY BEH 11B\)\)/, 'PSY BEH 11B\)');
                    line = line.replace(/\(CHEM 1LD or CHEM H2LB or CHEM M2LB$/, '(CHEM 1LD or CHEM H2LB or CHEM M2LB)');
                    line = line.replace(/\(\(PSYCH 9A or PSY BEH 11A\) and \(PSYCH 9B or PSY BEH 11B\) or BIO SCI 35 or BIO SCI N110/, '((PSYCH 9A or PSY BEH 11A) and (PSYCH 9B or PSY BEH 11B)) or BIO SCI 35 or BIO SCI N110');
                    line = line.replace(/^\(\(PSYCH 9A or PSY BEH 11A\) and \(PSYCH 9B and PSY BEH 11B\)/, '(PSYCH 7A PSY BEH 9) or ((PSYCH 9A or PSY BEH 11A) and (PSYCH 9B or PSY BEH 11B))');
                    line = line.replace(/\(\(PSYCH 9A or PSY BEH 11A\) and \(PSYCH 9B or PSY BEH 11B\)/, '((PSYCH 9A or PSY BEH 11A) and (PSYCH 9B or PSY BEH 11B))');
                    line = line.replace('((PSYCH 9A or PSY BEH 11A) and (PSYCH 9B or PSY BEH 11B)))', '((PSYCH 9A or PSY BEH 11A) and (PSYCH 9B or PSY BEH 11B))');
                    line = line.replace(/\(CHEM 1LD or CHEM H2LB or CHEM M2LB/, '(CHEM 1LD or CHEM H2LB or CHEM M2LB)');
                    line = line.replace(/ or a score of \d or higher on the .*$/, '');
                    line = line.replace(/ or a score of \d on the .*\)/, '');
                    line = line.replace('(CHEM 1A or CHEM H2A', 'CHEM 1A or CHEM H2A');
                    line = line.replace(' AND ', ' and ');
                    line = line.replace(' OR ', ' or ');
                    line = line.replace(/\(MATH 2B$/, 'MATH 3A and MATH 2D and MATH 2B');
                    line = line.replace('(PHYSICS 2 or (Math 2D and (CHEM 1C or CHEM H2C or CHEM M3C)) or passing score on the UCI Physics Placement Exam or AP PHYSICS C:MECH ( min score = 4 ) or AP PHYSICS C:E/M ( min score = 4 ) or PHYSICS 7LC', 'PHYSICS 2 or (Math 2D and (CHEM 1C or CHEM H2C or CHEM M3C))');
                    line = line.replace('Identification of a graduate student (who is in good standing) as a mentor', '');

                    if (!line.length) {
                        // Skip blank lines
                    } else if (line.startsWith('Prerequisite: ')) {
                        course.prerequisite = line.replace(/^Prerequisite: /, '').split('.')[0];
                    } else if (line.startsWith('Corequisite: ')) {
                        course.corequisite = line.replace(/^Corequisite: /, '').split('.')[0];
                    } else if (line.startsWith('Recommended: ')) {
                        course.recommended = line.replace(/^Recommended: /, '').split('.')[0];
                    } else if (line.startsWith('(Design units:')) {
                        course.designUnits = line.match(/^\(Design units: (.*?)\)$/)[1];
                    } else if (line.startsWith('Same as')) {
                        course.sameAs = line.replace(/^Same as /, '').split('.')[0].split(', ');
                    } else if (line.startsWith('Restriction: ')) {
                        course.restriction = line.replace(/^Restriction: /, '');
                    } else if (line.startsWith('Repeatability: ')) {
                        course.repeatability = line.replace(/^Repeatability: /, '');
                    } else if (line.startsWith('Grading Option: ')) {
                        course.gradingOption = line.replace(/^Grading Option: /, '');
                    } else if (line.startsWith('Overlaps with')) {
                        course.overlapsWith = line.replace(/^Overlaps with /, '').split('.')[0].split(', ');
                    } else if (line.startsWith('Concurrent with')) {
                        course.concurrentWith = line.replace(/^Concurrent with/, '').split('.')[0].trim().split(' and ');
                    } else if (line.startsWith('(I') || line.startsWith('(V')) {
                        course.geCategories = line.split('.')[0].substring(1, line.length - 1).split(', ');
                    } else {
                        console.warn("Unknown line match: '" + line + "' for name " + course.name);
                    }
                });
            }
        });
        courses.push(course);
    });

    return courses;
}