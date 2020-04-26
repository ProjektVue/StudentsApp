const isValidForm = (form) => {
  let isValid = true;
  Object.values(form).forEach((prop) => {
    if (!(prop.length > 0)) {
      isValid = false;
    }
  });
  return isValid;
};

export default isValidForm;
