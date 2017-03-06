'use strict';

import { startJob, addJobProgress } from './utils.js';

const schools = require('./schools.json');

export function scrape() {
    // TODO: Don't know how I could scrape data for schools, hardcoded for now
    startJob('Scraping schools', 2);
    addJobProgress('Scraping schools', 2);
    return schools;
}