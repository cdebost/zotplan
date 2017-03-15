import 'babel-polyfill';
import 'colors';
import scrapeSchools from './school-scraper';
import scrapeDepartments from './department-scraper';
import scrapeCourses from './course-scraper';
import scrapeWebsites from './classwebsites-scraper';
import scrapeCatalogue from './catalogue-scraper';
import interpret from './requirements-interpreter';
import exportDataset from './dataset-generator';
import { startJob, addJobProgress } from './utils';

const main = async () => {
  try {
    let { departments, courses } = await scrapeCatalogue();

    console.log(`         Found ${departments.length} departments, ${courses.length} courses.`);

    startJob('Interpreting requirements', courses.length);
    courses = courses.map((course) => {
      const res = interpret(course);
      addJobProgress('Interpreting requirements');
      return res;
    });

    const offerings = await scrapeWebsites(departments);
    courses.forEach((course) => {
      course.quartersOffered = offerings[course.id];
    });
    const numberOfferings = Object.keys(offerings).length;
    console.log('         Found course offering data for', numberOfferings, 'courses.',
      courses.length - numberOfferings, 'courses unaccounted for.',
    );

    exportDataset({ departments, courses });

    console.log('Completed successfully');
    process.exit();
  } catch (err) {
    console.error(err, err.stack);
    console.error('Completed with errors');
    process.exit(1);
  }
};
main();
