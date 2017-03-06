'use strict';

import { openURL, cleanString, startJob, addJobProgress } from './utils.js';
import cheerio from 'cheerio';
import request from 'request';

class Quarter {
    get title() {
        const quarterName = ((q) => {
            switch (q) {
                case 'F': return 'Fall';
                case 'W': return 'Winter';
                case 'S': return 'Spring';
            }
        })(this.code[0]);
        return quarterName + ' Qtr 20' + this.code.substring(1, this.code.length);
    }

    get index() {
        return ['F', 'W', 'S'].indexOf(this.code[0]);
    }

    constructor(code) {
        this.code = code;
    }

    increment() {
        const code = this.code;
        switch (code[0]) {
            case 'F':
                this.code = 'W' + (Number(code.substring(1, code.length)) + 1);
                break;
            case 'W':
                this.code = 'S' + code.substring(1, code.length);
                break;
            case 'S':
                this.code = 'F' + code.substring(1, code.length);
                break;
        }
    }

    decrement() {
        const code = this.code;
        switch (code[0]) {
            case 'F':
                this.code = 'S' + code.substring(1, code.length);
                break;
            case 'W':
                this.code = 'F' + (Number(code.substring(1, code.length)) - 1);
                break;
            case 'S':
                this.code = 'W' + code.substring(1, code.length);
                break;
        }
    }

    toString() {
        return this.code;
    }
}

const openTermPage = (quarter, deptName) => {
    return new Promise((resolve, reject) => {
        request.post({
            url: 'https://eee.uci.edu/classes/index.php' + (deptName ? '?dept_name=' + deptName.replace(' ', '+') : ''),
            form: { quarter: quarter.toString(), submit: 'Change Term' },
            headers: {
                'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/56.0.2924.87 Safari/537.36'
            }
        }, (err, res, body) => {
            return err ? reject(err) : (res && res.statusCode === 200) ? resolve(cheerio.load(body)) : reject();
        });
    });
}

export async function scrape(departments) {
    const data = {};

    startJob('Scraping class websites', departments.length);
    let latestQuarter = new Quarter('W14');
    try {
        while (true) {
            latestQuarter.increment();
            const $ = await openTermPage(latestQuarter);
            const title = $('div#header-region h2').text().trim();
            if (title !== 'Class Websites in ' + latestQuarter.title) {
                latestQuarter.decrement();
                break;
            }
        }
    } catch (e) {}

    let quarter = latestQuarter;
    for (let i = 0; i < 4; i++) {
        for (const department of departments) {
            const $ = await openTermPage(quarter, department.name);
            function cb(i, element) {
                const courseName = $($(this).find('td')[1]).text().trim().replace(/ (LEC|DIS|LAB|SEM|TAP).*$/, '');
                if (!data[courseName]) {
                    data[courseName] = [false, false, false, false];
                }
                data[courseName][quarter.index] = true;
            }
            $('table tr.odd').each(cb);
            $('table tr.even').each(cb);
            addJobProgress('Scraping class websites', 0.25);
        }
        quarter.decrement();
    }

    return data;
}