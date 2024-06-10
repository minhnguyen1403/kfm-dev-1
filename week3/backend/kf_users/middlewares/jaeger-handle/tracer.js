const { initTracer } = require('jaeger-client');
const tracer = initTracer({
    serviceName: process.env.APP_NAME,
    traceId128bit: true,
    sampler: {
        type: 'const',
        param: 1
    }
});

module.exports = tracer;