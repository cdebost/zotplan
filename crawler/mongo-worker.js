const Mongoose = require('mongoose');
const Department = require('../models/department.js');
const Course = require('../models/course.js');

export default async (departmentsData) => {
  console.log('Connecting to MongoDB');
  Mongoose.connect('mongodb://localhost/zotplan_development');
  await Department.remove({});
  await Course.remove({});

  const coursePromises = Object.values(departmentsData).reduce((courses, deptData) => (
    courses.concat(Object.values(deptData).map(courseData => (
      Course.create({
        ...courseData,
        _id: courseData.id,
        overlaps: [],
        concurrent: [],
      })
    )))
  ), []);
  const courses = await Promise.all(coursePromises);

  const departmentPromises = Object.entries(departmentsData).map(([deptName, deptData]) => (
    Department.create({
      _id: deptName,
      courses: Object.values(deptData).map(courseData => (
        courses.filter(c => c._id === courseData.id)[0]
      )),
    })
  ));
  await Promise.all(departmentPromises);
};
