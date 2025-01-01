import log from 'loglevel';

// Set log level based on environment
log.setLevel(process.env.NODE_ENV === 'development' ? 'debug' : 'warn');

// Example: Prefix logs with a tag
const originalFactory = log.methodFactory;
log.methodFactory = function (methodName, logLevel, loggerName) {
    const rawMethod = originalFactory(methodName, logLevel, loggerName);

    return function (message) {
        rawMethod(`[ReactApp]: ${message}`);
    };
};

log.enableAll(); // Enable all logs (debug, info, warn, error)

export default log;