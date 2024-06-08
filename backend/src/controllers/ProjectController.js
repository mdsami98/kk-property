const httpStatus = require('http-status');
const UserService = require('../service/UserService');
const logger = require('../config/logger');

class ProjectController {
    constructor() {
        this.userService = new UserService();
    }

    getInvestorsForProjectCreate = async (req, res) => {
        try {
            const response = await this.userService.getInvesTorForProjectCreate(
                req
            );
            res.status(response.statusCode).send(response.response);
        } catch (e) {
            logger.error(e);
            res.status(httpStatus.BAD_GATEWAY).send(e);
        }
    };
}

module.exports = ProjectController;
