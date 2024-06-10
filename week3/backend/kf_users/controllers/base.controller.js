const createError = require('http-errors');

/**
 * All service's controller must be extended from this
 * controller.
 */
class BaseController {
    static middlewares(fn) {
        return [];
    };
    static handler(fn) {
        const middlewares = this.middlewares(fn);
        return [
            //authorized(APP_CONFIG.jwt),
            middlewares,
            (req, res, next) => {
                const controller = new this(req, res, next);
                if (controller[fn].constructor.name === 'AsyncFunction') {
                    controller[fn](req, res, next).catch(next);
                } else {
                    controller[fn](req, res, next);
                }
            }
        ];
    };

    /**
     * Children controller must implement
     * this method to routing request.
     *
     * @param {Object} app Express server instance
     */
    static run(app) { };
}

module.exports = BaseController;
