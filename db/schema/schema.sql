CREATE TABLE zotplan_user (
    id VARCHAR(50) PRIMARY KEY,
    account_type VARCHAR(15) NOT NULL,
    name VARCHAR(80) NOT NULL,
    email VARCHAR(150),
    password_hash VARCHAR(100),
    created TIMESTAMP NOT NULL,
    last_signin TIMESTAMP
);

CREATE TABLE plan (
    id SERIAL PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    start_year INTEGER NOT NULL
);

CREATE TABLE user_has_plan (
    user_id VARCHAR(50) REFERENCES zotplan_user(id) NOT NULL,
    plan_id INTEGER REFERENCES plan(id) NOT NULL,
    PRIMARY KEY (user_id, plan_id)
);

CREATE TABLE course (
    id VARCHAR(15) PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    units VARCHAR(5) NOT NULL,
    description TEXT,
    prerequisite TEXT,
    corequisite TEXT,
    recommended TEXT,
    design_units VARCHAR(5),
    restriction TEXT,
    repeatability TEXT,
    grading_option TEXT
);

CREATE TABLE course_overlaps (
    course1_id VARCHAR(15) REFERENCES course(id) NOT NULL,
    course2_id VARCHAR(15) NOT NULL
);

CREATE TABLE course_concurrent (
    course1_id VARCHAR(15) REFERENCES course(id) NOT NULL,
    course2_id VARCHAR(15) NOT NULL,
    PRIMARY KEY (course1_id, course2_id)
);

CREATE TABLE plan_has_course (
    plan_id INTEGER REFERENCES plan(id) NOT NULL,
    course_id VARCHAR(15) REFERENCES course(id) NOT NULL,
    year INTEGER NOT NULL,
    quarter INTEGER NOT NULL,
    PRIMARY KEY (plan_id, course_id, year, quarter)
);

CREATE TABLE department (
    id VARCHAR(15) PRIMARY KEY
);

CREATE TABLE department_offers_course (
    department_id VARCHAR(15) REFERENCES department(id) NOT NULL,
    course_id VARCHAR(15) REFERENCES course(id) NOT NULL
);

CREATE TABLE school (
    name VARCHAR(100) PRIMARY KEY
);

CREATE TABLE school_has_department (
    school_name VARCHAR(100) REFERENCES school(name) NOT NULL,
    department_id VARCHAR(15) REFERENCES department(id) NOT NULL
);

