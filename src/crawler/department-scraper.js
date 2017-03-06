'use strict';

import { openURL, cleanString, startJob, addJobProgress } from './utils.js';
import readline from 'readline';

async function scrapeUrl(url) {
    const $ = await openURL(url);
    const data = [];
    const elements = $('body #courseinventorycontainer .courses');
    elements.each(function (i, element) {
        const id = cleanString($(this).find('.courseblock .courseblocktitle').text()).split('.')[0].split(' ');
        data.push({
            id: id.slice(0, id.length - 1).join(' '),
            name: cleanString($(this).find('h3').text()).replace(/ Courses$/, '')
        });
    });
    return data;
}

export async function scrape(schools) {
    let data = [];
    let i = 0;
    startJob('Scraping departments', schools.length);
    for (const school of schools) {
        data = data.concat(await scrapeUrl(school.courseInventoryUrl));
        addJobProgress('Scraping departments');
    }
    return data;
}