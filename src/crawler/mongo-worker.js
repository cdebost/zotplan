'use strict';

const Mongoose = require('mongoose');

const Department = require('../models/department.js');
const Course = require('../models/course.js');

export async function work(data) {
    console.log("Connecting to MongoDB");
    Mongoose.connect('mongodb://localhost/zotplan_development');
    await Department.remove({});
    await Course.remove({});
    for (const [schoolName, schoolData] of Object.entries(data)) {
        for (const [deptName, deptData] of Object.entries(schoolData)) {
            const department = new Department({ _id: deptName });
            for (const [courseName, courseData] of Object.entries(deptData)) {
                courseData._id = courseData.id;
                courseData.overlaps = [];
                courseData.concurrent = [];
                const course = await Course.create(courseData);
                department.courses.push(course._id);
            }
            await department.save();
        }
    }
};