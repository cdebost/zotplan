import React from 'react';
import styles from './Course.css';
import PropTypes from '../../validators';

export default function Course({ course }) {
  return (
    <div className={styles.container}>
      <div>{course._id}</div>
      <div className={styles.name}>{course.name}</div>
      <div>{course.units} units</div>
    </div>
  );
}

Course.propTypes = {
  course: PropTypes.course.isRequired,
};
