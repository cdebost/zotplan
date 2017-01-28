INSERT INTO zotplan_user VALUES
    ('id1', 'type1', 'First User', NULL, CURRENT_TIMESTAMP, NULL),
    ('id2', 'type2', 'Second User', NULL, CURRENT_TIMESTAMP, NULL),
    ('id3', 'type3', 'Third User', NULL, CURRENT_TIMESTAMP, NULL);

INSERT INTO school VALUES
    ('School of Computer Science'), ('School of Engineering'), ('School of Statistics');

INSERT INTO department VALUES
    ('COMPSCI'), ('SOFTENG'), ('BIM'), ('EECS'), ('MECHENG'), ('STATS');

INSERT INTO school_has_department VALUES
    ('School of Computer Science', 'COMPSCI'),
    ('School of Computer Science', 'SOFTENG'),
    ('School of Computer Science', 'BIM'),
    ('School of Engineering', 'EECS'),
    ('School of Engineering', 'MECHENG'),
    ('School of Statistics', 'STATS');

INSERT INTO course VALUES
    ('CS 1', 'Intro to Computer Science', '4', '', '', '', '', '', '', '', ''),
    ('CS 2', 'Programming Shuttle Control Systems in Binary', '16', 'Time to weed out the weak.', '{type: "course", value: "CS 1"}', '', 'An IQ over 450.', '64', '', 'May never be taken again.', ''),
    ('CS 3', 'Embedded Systems', '4', '', '{type: "course", value: "CS 1"}', '{type: "course", value: "CS 3L"}', '', '', '', '', ''),
    ('CS 3L', 'Embedded Systems Lab', '1', '', '', '{type: "course", value": "CS 3"}', '', '', '', '', 'P/NP only.'),
    ('SOFTENG 1', 'Software Management', '4', 'Learn to manage the software things', '{type: "and", children: [{type: "course", value: "CS 1"}, {type: "course", value: "STATS 1"}]}', '', '', '', '', '', ''),
    ('BIM 1', 'Software Management', '4', 'Learn to manage the software things', '{type: "and", children: [{type: "course", value: "CS 1"}, {type: "course", value: "STATS 1"}]}', '', '', '', '', '', ''),
    ('BIM 2', 'Management Capstone', '4', '', '{type: "or", children: [{type: "course", value: "BIM 1"}, {type: "course", value: "SOFTENG 1"}]}', '', '', '', '', '', ''),
    ('EECS 1', 'Intro to Electrical Engineering', '4', '', '', '', '', '', '', '', ''),
    ('MECHENG 1', 'Intro to Mechanical Engineering', '4', '', '', '', '', '', '', '', ''),
    ('STATS 1', 'Intro to Statistics', '4', '', '', '', '', '', '', '', '');

INSERT INTO department_offers_course VALUES
    ('COMPSCI', 'CS 1'),
    ('COMPSCI', 'CS 2'),
    ('COMPSCI', 'CS 3'),
    ('COMPSCI', 'CS 3L'),
    ('SOFTENG', 'SOFTENG 1'),
    ('BIM', 'BIM 1'),
    ('BIM', 'BIM 2'),
    ('EECS', 'EECS 1'),
    ('MECHENG', 'MECHENG 1'),
    ('STATS', 'STATS 1');

INSERT INTO course_overlaps VALUES
    ('SOFTENG 1', 'BIM 1');

INSERT INTO course_concurrent VALUES
    ('SOFTENG 1', 'BIM 1');

