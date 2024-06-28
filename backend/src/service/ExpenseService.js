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
        const { amount, name, description, date } = req.body;
        const { uuid, company_id } = req.user;

        const data = {
            amount,
            name,
            approved: 0,
            description,
            date,
            company_id,
            add_by: uuid
        };

        try {
            const res = await this.dailyExpenseDao.create(data);
            return responseHandler.returnSuccess(
                httpStatus.CREATED,
                'Expense created successfully',
                res
            );
        } catch (error) {
            // Rollback the transaction
            return responseHandler.returnError(
                httpStatus.INTERNAL_SERVER_ERROR,
                error.message || 'Sorry Something Wrong'
            );
        }
    };

    getExpenseDataTable = async (req) => {
        try {
            let where = {};
            const page = req.query.page !== undefined ? +req.query.page : 1;
            const limit = req.query.limit !== undefined ? +req.query.limit : 10;

            if (req.query.search_key !== '' && typeof req.query.search_key !== 'undefined') {
                where = {
                    ...where,
                    [Op.or]: [
                        {
                            name: {
                                [Op.iLike]: `%${req.query.search_key}%`,
                            },
                        }

                    ]
                };
            }

            const offset = (page - 1) * limit;
            const users = await this.dailyExpenseDao.getDataTableData(
                where,
                limit,
                offset
            );

            return responseHandler.returnSuccess(
                httpStatus.OK,
                'Project Data Table',
                users
            );
        } catch (e) {
            console.log(e);
            return responseHandler.returnError(
                httpStatus.BAD_REQUEST,
                'Something went wrong!'
            );
        }
    };
}

module.exports = ExpenseService;
