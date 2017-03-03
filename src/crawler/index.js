"use strict"

const catalogueScraper = require('./catalogue-scraper.js')
const courseInterpreter = require('./course-interpreter.js')
const mongoWorker = require('./mongo-worker.js')

const SCHOOLS = require('./schools.json')

let data = {}
let scrapePromises = []

for (const s in SCHOOLS) {
    const school = SCHOOLS[s]
    scrapePromises.push(
        catalogueScraper.parse(school.courseInventoryUrl, school.name).then(function (departments) {
            for (const d in departments) {
                const department = departments[d]
                courseInterpreter.interpret(department, d)
            }
            data[school.name] = departments
        })
    );
}

Promise.all(scrapePromises).then(function () {
    return mongoWorker.work(data)
        .then(function () {
            console.log('Completed successfully');
            process.exit();
        })
}).catch(function (err) {
    console.error(err, err.stack)
    console.error('Completed with errors');
    process.exit(1);
})

