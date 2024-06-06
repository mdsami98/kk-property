const httpStatus = require('http-status');
const UserService = require('../service/UserService');
const logger = require('../config/logger');
const { tokenTypes } = require('../config/tokens');

class AuthController {
    constructor() {
        this.userService = new UserService();
    }

    getAllMembers = async (req, res) => {
        try {
            const isExists = await this.userService.getAllMember(req);
            res.status(isExists.statusCode).send(isExists.response);
        } catch (e) {
            logger.error(e);
            res.status(httpStatus.BAD_GATEWAY).send(e);
        }
    };
}

module.exports = AuthController;
