'use strict';

import 'babel-polyfill';
import { scrape } from './catalogue-scraper.js';
import { interpret } from './course-interpreter.js';
import { work } from './mongo-worker.js';

const SCHOOLS = require('./schools.json')

const main = async function () {
    try {
        let data = {};
        for (const s in SCHOOLS) {
            const school = SCHOOLS[s];
            const departments = await scrape(school.courseInventoryUrl, school.name);
            for (const d in departments) {
                const department = departments[d];
                interpret(department, d);
            }
            data[school.name] = departments;
        }
        await work(data);
        console.log('Completed successfully');
        process.exit();
    } catch (err) {
        console.error(err, err.stack)
        console.error('Completed with errors');
        process.exit(1);
    }
}
main()