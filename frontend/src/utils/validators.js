export const validateEmail = (email) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(String(email).toLowerCase());
};

export const validatePassword = (password) => {
  // At least 8 characters, 1 uppercase, 1 lowercase, 1 number, 1 special character
  const re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  return re.test(password);
};

export const validateName = (name) => {
  return name.trim().length >= 2;
};

export const getSignupErrors = (values) => {
  const errors = {};
  
  if (!values.name || !validateName(values.name)) {
    errors.name = 'Please enter a valid name (at least 2 characters)';
  }
  
  if (!values.email || !validateEmail(values.email)) {
    errors.email = 'Please enter a valid email address';
  }
  
  if (!values.password || !validatePassword(values.password)) {
    errors.password = 'Password must be at least 8 characters long and include uppercase, lowercase, number, and special character';
  }
  
  if (values.password !== values.confirmPassword) {
    errors.confirmPassword = 'Passwords do not match';
  }
  
  return errors;
};

export const getLoginErrors = (values) => {
  const errors = {};
  
  if (!values.email || !validateEmail(values.email)) {
    errors.email = 'Please enter a valid email address';
  }
  
  if (!values.password) {
    errors.password = 'Please enter your password';
  }
  
  return errors;
};
