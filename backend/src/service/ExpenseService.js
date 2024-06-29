const { Op } = require('sequelize');
const httpStatus = require('http-status');
const config = require('../config/config');
const responseHandler = require('../helper/responseHandler');
const DailyExpenseDao = require('../dao/DailyExpenseDao');
const CompanyDao = require("../dao/CompanyDao");

class ExpenseService {
    constructor() {
        this.dailyExpenseDao = new DailyExpenseDao();
        this.companyDao = new CompanyDao();
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

     updatePay = async (req, res) => {
        try {
            const { id } = req.body;
            const { company_id } = req.user;

            // Fetch the existing data
            const data = await this.dailyExpenseDao.findById(id);
            if (!data) {
                return responseHandler.returnError(
                    httpStatus.BAD_REQUEST,
                    'Something went wrong!'
                );
            }

            // Update the expense record to mark it as approved
            const update = await this.dailyExpenseDao.updateById({ approved: 1 }, id);
            if (!update) {
                return responseHandler.returnError(
                    httpStatus.BAD_REQUEST,
                    'Something went wrong!'
                );
            }

            // Fetch the existing amount for the company
            const companyData = await this.companyDao.findById(company_id);
            if (!companyData) {
                return responseHandler.returnError(
                    httpStatus.BAD_REQUEST,
                    'Company not found!'
                );
            }

            const existingAmount = companyData.total_invest_amount;

            // Update the company's total invest amount
            const totalInvestAmountUpdate = await this.companyDao.updateById(
                { total_invest_amount: existingAmount - 45 },
                company_id
            );

            if (!totalInvestAmountUpdate) {
                return responseHandler.returnError(
                    httpStatus.BAD_REQUEST,
                    'Something went wrong updating the company amount!'
                );
            }

            return responseHandler.returnSuccess(
                httpStatus.OK,
                'Successfully updated',
                update
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
