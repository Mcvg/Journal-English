const validatorError = (errorList) => {
    const requestError = new Error('Validation failed');
    requestError.statusCode = 422;
    requestError.data = errorList.array();
  
    throw requestError;
  };
  
  const serverError = (e) => {
    const requestError = new Error('Operation failed');
    requestError.statusCode = 500;
    requestError.data = e;
    throw requestError;
  };
  
  module.exports = {
    validatorError,
    serverError,
  };