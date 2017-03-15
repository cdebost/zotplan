import fs from 'fs';
import path from 'path';
import { startJob, addJobProgress } from './utils';

export default function exportDataset({ departments, courses }) {
  startJob('Exporting datasets', departments.length + courses.length);

  const directoryPath = path.join(
    __dirname, 'datasets', (new Date()).toString().replace(/ /g, '_'),
  );
  fs.mkdirSync(directoryPath);

  let departmentsData = '';
  for (const dept of departments) {
    departmentsData += `${JSON.stringify(Object.assign({}, { _id: dept.id }, dept))}\n`;
    addJobProgress('Exporting datasets');
  }
  fs.writeFileSync(path.join(directoryPath, 'departments.json'), departmentsData);

  let coursesData = '';
  for (const course of courses) {
    coursesData += `${JSON.stringify(Object.assign({}, { _id: course.id }, course))}\n`;
    addJobProgress('Exporting datasets');
  }
  fs.writeFileSync(path.join(directoryPath, 'courses.json'), coursesData);
}
