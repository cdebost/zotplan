function requiredCourse(props, propName, componentName) {
  const course = props[propName];
  if (course._id && course.name && course.description && course.units) {
    return null;
  }
  return new Error(`${propName} of ${componentName} is not a course`);
}

export default function validator(props, propName, ...rest) {
  const course = props[propName];
  return course ? requiredCourse(props, propName, ...rest) : null;
}
validator.isRequired = requiredCourse;
