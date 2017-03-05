'use strict';

import cheerio from 'cheerio';
import request from 'request';

const spaceRegexp = new RegExp(String.fromCharCode(160), 'g');
export const cleanString = str => str.trim().replace(spaceRegexp, ' ');

export async function openURL(url) {
    return new Promise((resolve, reject) => {
        request(url, (error, response, body) => {
            if (error) return reject(error);
            if (response.statusCode === 200) {
                resolve(cheerio.load(body));
            }
        });
    });
}