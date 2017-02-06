'use strict'

import Model from './model'
import Course from './course'

export default class Plan extends Model {

    constructor(data) {
        super(data)
        this.courses = []
    }

    loadCourses() {
        const self = this
        return Model.db.query('SELECT * FROM plan_has_course WHERE plan_id = $1::INTEGER',
                [this.id])
            .then(results => {
                const courses = self.courses
                const promises = []
                results.forEach(result => {
                    if (!courses[result.year]) courses[result.year] = []
                    if (!courses[result.year][result.quarter]) courses[result.year][result.quarter] = []
                    self.courses[result.year][result.quarter].push()
                    const promise = Course.findById(result.course_id)
                        .then(course => {
                            courses[result.year][result.quarter].push(course)
                        })
                    promises.push(promise)
                })
                return Promise.all(promises)
            })
            .then(() => {
                self.courses.forEach(year => year.forEach(quarter => {
                    quarter.sort((c1, c2) => c1.id < c2.id ? -1 : c1.id > c2.id ? 1 : 0)
                }))
                return self
            })
    }

    static create(data) {
        return Model.db.query('INSERT INTO plan (name, start_year) ' +
                'VALUES ($1::VARCHAR(50), $2::INTEGER) ' +
                'RETURNING id',
                [data.name, data.startYear])
            .then(results => {
                return Plan.findById(results[0].id)
            })
    }

    static findById(id) {
        return Model.db.query('SELECT * FROM plan WHERE id = $1::INTEGER',
                [id])
            .then(result => {
                if (result.length === 0) {
                    throw new RangeError('No record found')
                }
                return new Plan(result[0])
            })
            .then(plan => {
                return plan.loadCourses()
            })
    }
}
