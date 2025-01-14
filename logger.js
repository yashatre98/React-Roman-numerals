/*
    This file is used to configure the logger for the application.
    It sets the log level based on the environment (development or production).
    It also prefixes logs with a tag for easier identification.
*/

import log from 'loglevel';

// Set log level based on environment
log.setLevel(process.env.NODE_ENV === 'development' ? 'debug' : 'warn');
// console.log(process.env.NODE_ENV === 'development' ? 'debug' : 'warn');
// Example: Prefix logs with a tag
const originalFactory = log.methodFactory;
log.methodFactory = function (methodName, logLevel, loggerName) {
    console.log(`MethodFactory called for ${methodName}`); // Debug log for method factory
    const rawMethod = originalFactory(methodName, logLevel, loggerName);

    return function (message) {
        rawMethod(`[ReactApp]: ${message}`);
    };
};

log.enableAll(); // Enable all logs (debug, info, warn, error)

export default log;