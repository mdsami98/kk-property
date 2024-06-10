const httpStatus = require('http-status');
const UserService = require('../service/UserService');
const ProjectService = require('../service/ProjectService');

const logger = require('../config/logger');

class ProjectController {
    constructor() {
        this.userService = new UserService();
        this.projectService = new ProjectService();
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

    projectCreate = async (req, res) => {
        try {
            const response = await this.projectService.projectCreate(req);
            res.status(response.statusCode).send(response.response);
        } catch (e) {
            logger.error(e);
            res.status(httpStatus.BAD_GATEWAY).send(e);
        }
    };

    getProjectDataTable = async (req, res) => {
        try {
            const response = await this.projectService.getProjectDataTable(req);
            res.status(response.statusCode).send(response.response);
        } catch (e) {
            logger.error(e);
            res.status(httpStatus.BAD_GATEWAY).send(e);
        }
    };
}

module.exports = ProjectController;
