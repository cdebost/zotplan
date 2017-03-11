import React from 'react';
import styles from './Course.css';

const Course = ({ course }) => {
    return (
        <div className={styles.container}>
            <div>{course._id}</div>
            <div className={styles.name}>{course.name}</div>
            <div>{course.units} units</div>
        </div>
    );
}

Course.PropTypes = {
    course: React.PropTypes.object.isRequired
};

export default Course;