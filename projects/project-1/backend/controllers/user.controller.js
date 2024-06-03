const {
    validateBody,
} = require('../middlewares/validator/validator')
const {
    login, refreshtoken, register,
} = require('../schemas/user.schema');
const BaseController = require('./base.controller');
const userService = require('../services/user.service');
const { KF_USERS } = require('../constants')
class UserController extends BaseController{
    static run(app) {
        app.post('/v1/users/login', validateBody(login), this.handler('login'));
        app.post('/v1/users/refreshtoken', validateBody(refreshtoken), this.handler('refreshtoken'));
        app.post('/v1/users/register', validateBody(register), this.handler('register'));
        app.get('/v1/users', this.handler('getList'));

        
    }

    async getList(req, res, next){
        try {
            const listUsers = await conn.query(`select * from ${KF_USERS}`);
            return res.json(listUsers)
        } catch (error) {
            next(error)
        }
    }
    async login(req, res, next){
        try {
            const user = await userService.handleLogin({ body: req.body, res });
            return res.json(user)
        } catch (error) {
            next(error)
        }
    }

    async register(req, res, next){
        try {
            const body  = req.body;
            const user = await userService.handleRegister({ body });
            return res.status(201).json(user);
        } catch (error) {
            next(error)
        }
        // finally{
        //     if(conn) conn.release()
        // }
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