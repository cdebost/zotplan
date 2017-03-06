'use strict';

import cheerio from 'cheerio';
import request from 'request';
import readline from 'readline';

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

let currentJob;
let currentJobProgress;
let currentJobTarget;
let currentJobStartTime;

export function startJob(description, target) {
    currentJob = description;
    currentJobTarget = target;
    currentJobProgress = 0;
    currentJobStartTime = Date.now();
    process.stdout.write(`[  0% ] ${description}...`);
}

export function addJobProgress(description, progress=1) {
    const percent = Math.floor((currentJobProgress += progress) * 100 / currentJobTarget);
    readline.cursorTo(process.stdout, 0);
    const progressStr = `${percent >= 100 ? ' OK '.green : (' ' + (percent < 10 ? ' ' : '') + percent + '%')}`;
    process.stdout.write(`[ ${progressStr} ] ` + (description + '...' + (percent >= 100 ? `DONE (${(Date.now() - currentJobStartTime)/1000}s)\n` : '')).bold);
}