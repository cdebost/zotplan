import { openURL, cleanString, startJob, addJobProgress } from './utils';

async function scrapeUrl(url) {
  const $ = await openURL(url);
  const data = [];
  const elements = $('body #courseinventorycontainer .courses');
  elements.each((i, element) => {
    const id = cleanString($(element).find('.courseblock .courseblocktitle').text())
      .split('.')[0]
      .split(' ');
    data.push({
      id: id.slice(0, id.length - 1).join(' '),
      name: cleanString($(element).find('h3').text()).replace(/ Courses$/, ''),
    });
  });
  return data;
}

export default async function scrape(schools) {
  let data = [];
  startJob('Scraping departments', schools.length);
  for (const school of schools) {
    data = data.concat(await scrapeUrl(school.courseInventoryUrl));
    addJobProgress('Scraping departments');
  }
  return data;
}
