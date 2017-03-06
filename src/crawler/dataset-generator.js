'use strict';

import fs from 'fs';
import path from 'path';

export function exportDataset({schools, departments, courses}) {
    const directoryPath = path.join(__dirname, '..', '..', 'src', 'crawler', 'datasets', (new Date()).toString().replace(/ /g, '_'));
    fs.mkdirSync(directoryPath);

    let schoolData = "";
    for (let school of schools) {
        schoolData += JSON.stringify(Object.assign({}, {_id: school.id}, school)) + '\n';
    }
    fs.writeFileSync(path.join(directoryPath, 'schools.json'), schoolData);

    let departmentsData = "";
    for (let dept of departments) {
        departmentsData += JSON.stringify(Object.assign({}, {_id: dept.id}, dept)) + '\n';
    }
    fs.writeFileSync(path.join(directoryPath, 'departments.json'), departmentsData);

    let coursesData = "";
    for (let course of courses) {
        coursesData += JSON.stringify(Object.assign({}, {_id: course.id}, course)) + '\n';
    }
    fs.writeFileSync(path.join(directoryPath, 'courses.json'), coursesData);
}