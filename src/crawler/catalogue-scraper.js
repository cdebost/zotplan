'use strict';

import cheerio from 'cheerio';
import request from 'request';
import URL from 'url-parse';

function openURL(url) {
    console.log('Visiting page', url);
    return new Promise((resolve, reject) => {
        request(url, (error, response, body) => {
            if (error) return reject(error);
            if (response.statusCode === 200) {
                resolve(cheerio.load(body));
            }
        });
    });
}

function parseBody($) {
    const data = {};
    $('body #courseinventorycontainer .courses').each(function (i, element) {
        let department = $(this).find('.courseblock .courseblocktitle').text().split(String.fromCharCode(160))[0];
        data[department] = exploreDepartment($, element, department);
    });
    return data;
}

function exploreDepartment($, element, name) {
    let data = {};
    $(element).find('.courseblock').each(function (i, element) {
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
                    line = line.trim();

                    // Fix UCI web inconsistencies
                    line = line.replace(/^Prerequisite: Prerequisite or corequisite:/, 'Corequisite: ');
                    line = line.replace(/42\) I&C/, '42). I&C');
                    line = line.replace(/^Prerequisite:$/, '');
                    line = line.replace(/ \(fee required\)/, '');

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
                        console.warn("Unknown line match: '" + line + "' for name " + name);
                    }
                });
            }
        });

        data[course.id] = course;
    });

    return data
}

export async function scrape(url, schoolName) {
    const $ = await openURL(url);
    return parseBody($, schoolName);
}