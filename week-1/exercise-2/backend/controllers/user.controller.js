const {
    validateBody,
} = require('../middlewares/validator/validator')
const {
    login, refreshtoken, register,
} = require('../schemas/user.schema');
const BaseController = require('./base.controller');
class UserController extends BaseController{
    static run(app) {
        app.post('/v1/users/login', validateBody(login), this.handler('login'));
        app.post('/v1/users/refreshtoken', validateBody(refreshtoken), this.handler('refreshtoken'));
        app.post('/v1/users/register', validateBody(register), this.handler('register'));
        
    }

    async login(req, res, next){
        try {
            return res.json({msg: 'login'})
        } catch (error) {
            next(error)
        }
    }

    async register(req, res, next){
        try {
            return res.json({msg: 'register'})
        } catch (error) {
            next(error)
        }
    }

    async refreshtoken(req, res, next){
        try {
            return res.json({msg: 'refreshtoken'})
        } catch (error) {
            next(error)
        }
    }
}


module.exports = UserController;