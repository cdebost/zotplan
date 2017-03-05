'use strict';

import { openURL, cleanString } from './utils.js';

export async function scrape(url) {
    const $ = await openURL(url);
    const data = [];
    $('body #courseinventorycontainer .courses').each(function (i, element) {
        const id = cleanString($(this).find('.courseblock .courseblocktitle').text()).split('.')[0].split(' ');
        data.push({
            id: id.slice(0, id.length - 1).join(' '),
            name: cleanString($(this).find('h3').text()).replace(/ Courses$/, '')
        });
    });
    return data;
}