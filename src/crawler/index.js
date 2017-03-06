'use strict';

import 'babel-polyfill';

import { scrape as scrapeSchools } from './school-scraper.js';
import { scrape as scrapeDepartments } from './department-scraper.js';
import { scrape as scrapeCourses } from './course-scraper.js';
import { scrape as scrapeWebsites } from './classwebsites-scraper.js';
import { interpret } from './requirements-interpreter.js';
import { exportDataset } from './dataset-generator.js';
import { work } from './mongo-worker.js';

const main = async function () {
    try {
        let schools = [];
        let departments = [];
        let courses = [];

        console.log('Scraping schools...');
        schools = scrapeSchools();
        console.log('Found', schools.length, 'schools');
        
        console.log("Scraping departments...");
        for (let school of schools) {
            departments = departments.concat(await scrapeDepartments(school.courseInventoryUrl));
        }
        console.log("Found", departments.length, "departments");

        console.log("Scraping courses...");
        for (let school of schools) {
            courses = courses.concat(await scrapeCourses(school.courseInventoryUrl));
        }
        console.log('Found', courses.length, 'courses');

        console.log('Linking departments to courses...');
        for (const course of courses) {
            const deptId = course.id.split(' ').slice(0, -1).join(' ');
            for (const department of departments) {
                if (department.id === deptId) {
                    department.courses = department.courses || [];
                    department.courses.push(course.id);
                }
            }
        }
        console.log('Done linking');

        console.log('Interpreting requirements');
        courses = courses.map(interpret);
        console.log('Requirement trees built');

        console.log('Scraping class websites for course offerings...');
        const offerings = await scrapeWebsites(departments);
        courses.forEach(course => {
            course.quartersOffered = offerings[course.id];
        });
        const numberOfferings = Object.keys(offerings).length;
        console.log('Found course offering data for', numberOfferings, 'courses.', courses.length - numberOfferings, 'courses unaccounted for.');

        console.log('Generating dataset...');
        exportDataset({schools, departments, courses});

        console.log('Completed successfully');
        process.exit();
    } catch (err) {
        console.error(err, err.stack)
        console.error('Completed with errors');
        process.exit(1);
    }
}
main()