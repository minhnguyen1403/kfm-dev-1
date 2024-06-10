const { createLogger, format } = require('winston');
const SysLogLogger = createLogger();

SysLogLogger.logSpan = function (span) {
    if (span.includes(`/health/ping`)) return;
    SysLogLogger.info(`KFJAEGERLOG ${span} KFJAEGERLOG`);
};

module.exports.SysLogLogger = SysLogLogger;
