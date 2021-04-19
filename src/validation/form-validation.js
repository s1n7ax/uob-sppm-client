export const passwordValidation = (password) => {
  let error = false;
  let helpText = '';

  if (!password) {
    error = true;
    helpText = "password shouldn't be empty";
  } else if (password.length < 8) {
    error = true;
    helpText = 'password should be longer than 8 characters';
  } else {
    error = false;
    helpText = '';
  }

  return { error, helpText };
};

export const nameValidation = (username) => {
  let error = false;
  let helpText = '';

  if (!username) {
    error = true;
    helpText = "name shouldn't be empty";
  } else if (username.length < 1) {
    error = true;
    helpText = 'name should be longer than 5 characters';
  } else if (/\d/.test(username)) {
    error = true;
    helpText = "name shouldn't contain numbers";
  } else {
    error = false;
    helpText = '';
  }

  return { error, helpText };
};

export const usernameValidation = (username) => {
  let error = false;
  let helpText = '';

  if (!username) {
    error = true;
    helpText = "username shouldn't be empty";
  } else if (username.length < 5) {
    error = true;
    helpText = 'username should be longer than 5 characters';
  } else if (/\d/.test(username)) {
    error = true;
    helpText = "username shouldn't contain numbers";
  } else {
    error = false;
    helpText = '';
  }

  return { error, helpText };
};

export const nicValidation = (value) => {
  let error = false;
  let helpText = '';

  if (!value) {
    error = true;
    helpText = "NIC shouldn't be empty";
  } else if (!/^\d{9}[a-zA-Z]$/.test(value)) {
    error = true;
    helpText = 'NIC should be 9 numbers followed by one letter';
  } else {
    error = false;
    helpText = '';
  }

  return { error, helpText };
};

export const notEmptyValidation = (value) => {
  let error = false;
  let helpText = '';

  if (!value) {
    error = true;
    helpText = 'Field should contain a value';
  }

  return { error, helpText };
};

export const contactValidation = (value) => {
  let error = false;
  let helpText = '';

  if (!value) {
    error = true;
    helpText = 'Contact should not be empty';
  } else if (!/^\d{10}$/.test(value)) {
    error = true;
    helpText = 'Contact should contain 10 numbers';
  }

  return { error, helpText };
};
export const emailValidation = (value) => {
  const emailRegex = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;
  let error = false;
  let helpText = '';

  if (!value) {
    error = true;
    helpText = 'Email should not be empty';
  } else if (!emailRegex.test(value)) {
    error = true;
    helpText = 'Invalid email pattern';
  }

  return { error, helpText };
};
