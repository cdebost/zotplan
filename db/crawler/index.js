"use strict"

const request = require('request')
const catalogueScraper = require('./src/catalogue-scraper.js')
const cheerio = require('cheerio')
const courseInterpreter = require('./src/course-interpreter.js')
const fs = require('fs')
const pgWorker = require('./src/pg-worker.js')
const URL = require('url-parse')

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
                for (const c in department) {
                    const course = department[c]
                    course.prerequisite && (course.prerequisite = course.prerequisite.toString())
                    course.corequisite && (course.corequisite = course.corequisite.toString())
                }
            }
            data[school.name] = departments
        })
    );
}

Promise.all(scrapePromises).then(function () {
    //fs.writeFileSync('./output', JSON.stringify(data, null, 4), { encoding: 'utf-8' })
    pgWorker.work(data)
}, function (err) {
    console.error(err, err.stack)
})

