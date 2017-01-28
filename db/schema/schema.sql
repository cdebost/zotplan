CREATE TABLE zotplan_user (
    id VARCHAR(50) PRIMARY KEY,
    account_type VARCHAR(15) NOT NULL,
    name VARCHAR(80) NOT NULL,
    email VARCHAR(150),
    password_hash VARCHAR(50),
    created TIMESTAMP NOT NULL,
    last_signin TIMESTAMP
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

CREATE TABLE generaleducation (
    id VARCHAR(5) PRIMARY KEY,
    name VARCHAR(60) NOT NULL,
    number_of_courses INTEGER NOT NULL
);

INSERT INTO generaleducation VALUES
    ('I', 'Writing', 3),
    ('II', 'Science and Technology', 3),
    ('III', 'Social and Behavioral Sciences', 3),
    ('IV', 'Arts and Humanities', 3),
    ('V', 'Quantitative, Symbolic, and Computational Reasoning', 3),
    ('VI', 'Language Other Than English', 1),
    ('VII', 'Multicultural Studies', 1),
    ('VIII', 'International/Global Issues', 1);

CREATE TABLE course_fulfills_generaleducation (
    course_id VARCHAR(15) REFERENCES course(id) NOT NULL,
    ge_id VARCHAR(5) REFERENCES GeneralEducation(id) NOT NULL
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

