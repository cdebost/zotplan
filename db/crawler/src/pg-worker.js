const pg = require('pg')
const SQL = require('sql-template-strings')

const pgconfig = {
    database: 'zotplan',
    host: '/var/run/postgresql',
    max: 10,
    idleTimeoutMillis: 30000
}
const client = new pg.Client(pgconfig)

function queryCb(err, result) {
    if (err) {
        console.error(err)
    }
}

exports.work = function (data) {
    console.log("Connecting to postgres")
    client.connect(err => {
        if (err) {
            return console.error(err)
        }
        console.log('Connected')

        for (const s in data) {
            const school = data[s]
            client.query(SQL`INSERT INTO school VALUES (${s})`, queryCb)
            for (const d in school) {
                const department = school[d]
                client.query(SQL`INSERT INTO department VALUES (${d})`, queryCb)
                client.query(SQL`INSERT INTO school_has_department VALUES (${s}, ${d})`, queryCb)
                for (const c in department) {
                    const course = department[c]
                    client.query(SQL`INSERT INTO course VALUES (${course.id}, ${course.name}, ${course.units}, ${course.description}, '', '', ${course.recommended}, ${course.designUnits || 0}, ${course.restriction}, ${course.repeatability}, ${course.gradingOption})`, queryCb)
                    ;(course.overlapsWith || []).map(ol => client.query(SQL`INSERT INTO course_overlaps VALUES (${course.id}, ${ol})`))
                    ;(course.concurrentWith || []).map(cc => client.query(SQL`INSERT INTO course_concurrent VALUES (${course.id}, ${cc})`))
                    //;(course.geCategories || []).map(ge => client.query(SQL`INSERT INTO course_fulfills_generaleducation VALUES (${course.id}, ${ge})`))
                }
            }
        }
    })
}

