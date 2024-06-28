const { Op } = require('sequelize');
const httpStatus = require('http-status');
const config = require('../config/config');
const responseHandler = require('../helper/responseHandler');
const DailyExpenseDao = require('../dao/DailyExpenseDao');

class ExpenseService {
    constructor() {
        this.dailyExpenseDao = new DailyExpenseDao();
    }

    createDailyExpense = async (req) => {
        const data = req.body;
        const { uuid, company_id } = req.user;

        // Extract project and plot data

        // Begin a transaction

        try {
            return responseHandler.returnSuccess(
                httpStatus.CREATED,
                'Expense created successfully',
                { project: 0 }
            );
        } catch (error) {
            // Rollback the transaction
            return responseHandler.returnError(
                httpStatus.INTERNAL_SERVER_ERROR,
                error.message
            );
        }
    };
}

module.exports = ExpenseService;
