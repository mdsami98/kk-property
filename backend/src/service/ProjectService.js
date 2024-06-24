const { Op } = require('sequelize');
const httpStatus = require('http-status');
const config = require('../config/config');
const ProjectDao = require('../dao/ProjectDao');
const CompanyDao = require('../dao/CompanyDao');
const PlotDao = require('../dao/PlotDao');
const responseHandler = require('../helper/responseHandler');

class ProjectService {
    constructor() {
        this.projectDao = new ProjectDao();
        this.plotDao = new PlotDao();
        this.companyDao = new CompanyDao();
    }

    projectCreate = async (req) => {
        const projectData = req.body;
        const { uuid, company_id } = req.user;

        // Extract project and plot data
        const {
            projectName,
            address,
            area,
            unitPrice,
            totalPrice,
            sellingPrice,
            plots
        } = projectData;

        // Begin a transaction

        try {
            // Create the project
            const project = await this.projectDao.create({
                name: projectName,
                address,
                area,
                unit_price: unitPrice ? Number(unitPrice).toFixed(2) : 0,
                total_price: totalPrice ? Number(totalPrice).toFixed(2) : 0,
                selling_price: sellingPrice
                    ? Number(sellingPrice).toFixed(2)
                    : 0,
                company_id,
                user_uuid: uuid,
                sold: false
            });
            let totalInvestPaymentByInvestor = 0;
            // Create the plots
            if (plots && plots.length > 0) {
                for (const plot of plots) {
                    const investorInvestAmount = plot.investAmount
                        ? Number(plot.investAmount).toFixed(2)
                        : 0;
                    totalInvestPaymentByInvestor = +investorInvestAmount;
                    await this.plotDao.create({
                        project_id: project.id,
                        plot_id: plot.plotId,
                        plot_code: plot.plotNumber,
                        investor_id: plot.investor,
                        invest_amount: investorInvestAmount,
                        due_amount: plot.dueAmount
                            ? Number(plot.dueAmount).toFixed(2)
                            : 0,
                        selling_price: plot.sellPrice
                            ? Number(plot.sellPrice).toFixed(2)
                            : 0,
                        company_id,
                        sold: false
                    });
                }
            }
            const companyInfo = await this.companyDao.findById(company_id);
            if (companyInfo) {
                await this.companyDao.updateById(
                    {
                        total_invest_amount:
                            companyInfo.total_invest_amount +
                            Number(totalPrice).toFixed(2),
                        total_amount:
                            companyInfo.total_amount +
                            totalInvestPaymentByInvestor
                    },
                    company_id
                );
            }

            // Commit the transaction

            return responseHandler.returnSuccess(
                httpStatus.CREATED,
                'Project created successfully',
                project
            );
        } catch (error) {
            // Rollback the transaction
            return responseHandler.returnError(
                httpStatus.INTERNAL_SERVER_ERROR,
                error.message
            );
        }
    };

    getProjectDataTable = async (req) => {
        try {
            let where = {};
            const page = req.query.page !== undefined ? +req.query.page : 1;
            const limit = req.query.limit !== undefined ? +req.query.limit : 10;

            if (
                req.query.search_key !== '' &&
                typeof req.query.search_key !== 'undefined'
            ) {
                where = {
                    ...where,
                    [Op.or]: [
                        {
                            name: {
                                [Op.iLike]: `%${req.query.search_key}%`
                            }
                        },
                        {
                            address: {
                                [Op.iLike]: `%${req.query.search_key}%`
                            }
                        }
                    ]
                };
            }

            const offset = (page - 1) * limit;
            const users = await this.projectDao.getDataTableData(
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
            logger.error(e);
            return responseHandler.returnError(
                httpStatus.BAD_REQUEST,
                'Something went wrong!'
            );
        }
    };
}

module.exports = ProjectService;
