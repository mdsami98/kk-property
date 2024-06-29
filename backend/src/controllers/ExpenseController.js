const httpStatus = require('http-status');
const UserService = require('../service/UserService');

const logger = require('../config/logger');
const ExpenseService = require('../service/ExpenseService');

class ExpenseController {
    constructor() {
        this.userService = new UserService();
        this.expenseService = new ExpenseService();
    }

    createDailyExpense = async (req, res) => {
        try {
            const response = await this.expenseService.createDailyExpense(req);
            res.status(response.statusCode).send(response.response);
        } catch (e) {
            logger.error(e);
            res.status(httpStatus.BAD_GATEWAY).send(e);
        }
    };

    getExpenseDataTable = async (req, res) => {
        try {
            const response = await this.expenseService.getExpenseDataTable(req);
            res.status(response.statusCode).send(response.response);
        } catch (e) {
            logger.error(e);
            res.status(httpStatus.BAD_GATEWAY).send(e);
        }
    };
    updatePay = async (req, res) => {
        try {
            const response = await this.expenseService.updatePay(req);
            res.status(response.statusCode).send(response.response);
        } catch (e) {
            logger.error(e);
            res.status(httpStatus.BAD_GATEWAY).send(e);
        }
    };
}

module.exports = ExpenseController;
