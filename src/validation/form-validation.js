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
