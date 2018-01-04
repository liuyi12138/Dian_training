'use strict';

exports.createError = function (errorObject) {
    let err = new Error(errorObject.message);
    err.status = errorObject.status;
    err.msg = errorObject.message;
    return err;
};

module.exports.ErrorSet = {
    REQUEST_PARAMETER_ERROR: {status: 600, message: 'request parameter error'},
    NOT_IMPLEMENTED_ERROR: {status: 601, message: 'not implemented'}
};