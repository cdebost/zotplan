function requiredUser(props, propName, componentName) {
  componentName = componentName || 'ANONYMOUS';
  const user = props[propName];
  if (user._id && user.name && user.email) {
    return null;
  }
  return new Error(`${propName} in ${componentName} is not a user`);
}

export default function validator(props, propName, ...rest) {
  const user = props[propName];
  return user ? requiredUser(props, propName, ...rest) : null;
}
validator.isRequired = requiredUser;
