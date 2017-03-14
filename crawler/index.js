import 'babel-polyfill';
import scrape from './catalogue-scraper';
import interpret from './course-interpreter';
import work from './mongo-worker';

const SCHOOLS = require('./schools.json');

const main = async () => {
  try {
    const schoolDataPromises = Object.values(SCHOOLS).map(school => (
        scrape(school.courseInventoryUrl, school.name)
    ));
    const schoolData = await Promise.all(schoolDataPromises);

    const departments = {};
    schoolData.forEach(schoolDepts => Object.assign(departments, schoolDepts));
    Object.entries(departments).forEach(interpret);

    await work(departments);
    console.log('Completed successfully');
    process.exit();
  } catch (err) {
    console.error(err, err.stack);
    console.error('Completed with errors');
    process.exit(1);
  }
};
main();
