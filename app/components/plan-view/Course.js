import React from 'react';
import Card from 'material-ui/Card';
import styles from './Course.css';
import PropTypes from '../../validators';

export default function Course({ course }) {
  return (
    <Card rounded={false}>
      <div className={styles.content}>
        <div>{course._id}</div>
        <div className={styles.name}>{course.name}</div>
        <div>{course.units} units</div>
      </div>
    </Card>
  );
}

Course.propTypes = {
  course: PropTypes.course.isRequired,
};
