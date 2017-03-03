'use strict';

const Mongoose = require('mongoose');
const Bluebird = require('bluebird');

const Department = require('../../../src/models/department.js');
const Course = require('../../../src/models/course.js');

const pendingSavePromises = [];

function connect() {
    return new Promise((resolve, reject) => {
        console.log("Connecting to MongoDB");
        Mongoose.connect('mongodb://localhost/development');
        Mongoose.Promise = Bluebird;
        const db = Mongoose.connection;
        db.on('error', error => {
            console.error('Error connecting:', error);
            reject(error);
        });
        db.once('open', () => {
            console.log('Connected');
            resolve();
        });
    });
}

function saveModel(model) {
    pendingSavePromises.push(new Promise((resolve, reject) => {
        model.save((err) => {
            if (err) {
                console.error(err);
                reject(err);
            } else {
                resolve();
            }
        });
    }))
}

function clearCollection(collection) {
    return new Promise((resolve, reject) => {
        collection.remove({}, err => {
            if (err) return reject(err);
            resolve();
        });
    });
}

exports.work = (data) => {
    return connect()
        .then(() => {
            return Promise.all([
                clearCollection(Department),
                clearCollection(Course)
            ]);
        })
        .then(() => {
            for (const s in data) {
                const schoolData = data[s];
                for (const d in schoolData) {
                    const deptData = schoolData[d];
                    const department = new Department({ _id: d });
                    for (const c in deptData) {
                        const courseData = deptData[c];
                        courseData._id = courseData.id;
                        courseData.overlaps = [];
                        courseData.concurrent = [];
                        const course = new Course(courseData);
                        saveModel(course);
                        department.courses.push(course._id);
                    }
                    saveModel(department);
                }
            }

            return Promise.all(pendingSavePromises);
        });
}
