var ErrorMessage = function(title, message, warning) {
    this.title = title;
    this.message = message;
    this.warning = warning;
};

var addError = function(errorMessage) {
    global.errors.push(errorMessage);
};

var getErrors = function() {
    if(typeof global.errors == 'undefined' || global.errors.length == 0) {
        return null;
    }

    var result = global.errors.slice();
    clearErrors();
    return result;
};

var clearErrors = function() {
    global.errors = [];
}

module.exports = {
    "getErrors" : getErrors,
    "addError" : addError,
    "clearErrors" : clearErrors,
    "ErrorMessage" : ErrorMessage
}