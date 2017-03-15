import { startJob, addJobProgress } from './utils';

const schools = require('./schools.json');

export default function scrape() {
  // TODO: Don't know how I could scrape data for schools, hardcoded for now
  startJob('Scraping schools', 2);
  addJobProgress('Scraping schools', 2);
  return schools;
}
