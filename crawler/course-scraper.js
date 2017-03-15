import { cleanString, openURL } from './utils';

export default async function scrape(url) {
  const $ = await openURL(url);
  const data = [];
  $('body #courseinventorycontainer .courses .courseblock').each((i, courseBlock) => {
    const course = {};

    $(courseBlock).find('p').each((j, p) => {
      const text = $(p).text().trim();

      if (i === 0) {
        // Course ID, name, units
        const titleComponents = text.split('.');
        course.id = cleanString(titleComponents[0].trim());
        course.name = titleComponents[1].trim();
        course.units = titleComponents[2].trim().split(' ')[0];
      } else if (i === 2) {
        // Description
        course.description = text;
      } else {
        const lines = text.split('\n');

        lines.forEach((line) => {
          line = line.trim();

          // Fix UCI web inconsistencies
          line = line.replace(/^Prerequisite: Prerequisite or corequisite:/, 'Corequisite: ');
          line = line.replace(/42\) I&C/, '42). I&C');
          line = line.replace(/^Prerequisite:$/, '');
          line = line.replace(/ \(fee required\)/, '');

          if (!line.length) {
          // Skip blank lines
          } else if (line.startsWith('Prerequisite: ')) {
            course.prerequisite = line.replace(/^Prerequisite: /, '').split('.')[0];
          } else if (line.startsWith('Corequisite: ')) {
            course.corequisite = line.replace(/^Corequisite: /, '').split('.')[0];
          } else if (line.startsWith('Recommended: ')) {
            course.recommended = line.replace(/^Recommended: /, '').split('.')[0];
          } else if (line.startsWith('(Design units:')) {
            course.designUnits = line.match(/^\(Design units: (.*?)\)$/)[1];
          } else if (line.startsWith('Same as')) {
            course.sameAs = line.replace(/^Same as /, '').split('.')[0].split(', ');
          } else if (line.startsWith('Restriction: ')) {
            course.restriction = line.replace(/^Restriction: /, '');
          } else if (line.startsWith('Repeatability: ')) {
            course.repeatability = line.replace(/^Repeatability: /, '');
          } else if (line.startsWith('Grading Option: ')) {
            course.gradingOption = line.replace(/^Grading Option: /, '');
          } else if (line.startsWith('Overlaps with')) {
            course.overlapsWith = line.replace(/^Overlaps with /, '').split('.')[0].split(', ');
          } else if (line.startsWith('Concurrent with')) {
            course.concurrentWith = line
              .replace(/^Concurrent with/, '')
              .split('.')[0]
              .trim()
              .split(' and ');
          } else if (line.startsWith('(I') || line.startsWith('(V')) {
            course.geCategories = line.split('.')[0].substring(1, line.length - 1).split(', ');
          } else {
            console.warn(`Unknown line match: '${line}' for name ${course.name}`);
          }
        });
      }
    });

    data.push(course);
  });

  return data;
}
