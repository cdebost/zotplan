'use strict';

import 'babel-polyfill';
import 'colors';

import { scrape as scrapeSchools } from './school-scraper.js';
import { scrape as scrapeDepartments } from './department-scraper.js';
import { scrape as scrapeCourses } from './course-scraper.js';
import { scrape as scrapeWebsites } from './classwebsites-scraper.js';
import { scrape as scrapeCatalogue } from './catalogue-scraper.js';
import { interpret } from './requirements-interpreter.js';
import { exportDataset } from './dataset-generator.js';
import { work } from './mongo-worker.js';
import { startJob, addJobProgress } from './utils.js';

const main = async function () {
    try {
        let { departments, courses } = await scrapeCatalogue();

        console.log(`         Found ${departments.length} departments, ${courses.length} courses.`);

        startJob('Interpreting requirements', courses.length);
        courses = courses.map(course => {
            const res = interpret(course);
            addJobProgress('Interpreting requirements');
            return res;
        });

        const offerings = await scrapeWebsites(departments);
        courses.forEach(course => {
            course.quartersOffered = offerings[course.id];
        });
        const numberOfferings = Object.keys(offerings).length;
        console.log('         Found course offering data for', numberOfferings, 'courses.', courses.length - numberOfferings, 'courses unaccounted for.');

        exportDataset({ departments, courses});

        console.log('Completed successfully');
        process.exit();
    } catch (err) {
        console.error(err, err.stack)
        console.error('Completed with errors');
        process.exit(1);
    }
}
main()