const httpStatus = require('http-status');
const bcrypt = require('bcryptjs');
const { v4: uuidv4 } = require('uuid');
const UserDao = require('../dao/UserDao');
const responseHandler = require('../helper/responseHandler');
const logger = require('../config/logger');
const { userConstant } = require('../config/constant');
const { Op } = require('sequelize');

class UserService {
    constructor() {
        this.userDao = new UserDao();
    }

    /**
     * Create a user
     * @param {Object} userBody
     * @returns {Object}
     */
    createUser = async (userBody) => {
        try {
            let message =
                'Successfully Registered the account! Please Verify your email.';
            if (await this.userDao.isEmailExists(userBody.email)) {
                return responseHandler.returnError(
                    httpStatus.BAD_REQUEST,
                    'Email already taken'
                );
            }
            const uuid = uuidv4();
            userBody.email = userBody.email.toLowerCase();
            userBody.password = bcrypt.hashSync(userBody.password, 8);
            userBody.uuid = uuid;
            userBody.status = userConstant.STATUS_ACTIVE;
            userBody.email_verified = userConstant.EMAIL_VERIFIED_TRUE;

            let userData = await this.userDao.create(userBody);

            if (!userData) {
                message = 'Registration Failed! Please Try again.';
                return responseHandler.returnError(
                    httpStatus.BAD_REQUEST,
                    message
                );
            }

            userData = userData.toJSON();
            delete userData.password;

            return responseHandler.returnSuccess(
                httpStatus.CREATED,
                message,
                userData
            );
        } catch (e) {
            logger.error(e);
            return responseHandler.returnError(
                httpStatus.BAD_REQUEST,
                'Something went wrong!'
            );
        }
    };

    /**
     * Get user
     * @param {String} email
     * @returns {Object}
     */

    isEmailExists = async (email) => {
        const message = 'Email found!';
        if (!(await this.userDao.isEmailExists(email))) {
            return responseHandler.returnError(
                httpStatus.BAD_REQUEST,
                'Email not Found!!'
            );
        }
        return responseHandler.returnSuccess(httpStatus.OK, message);
    };

    getUserByUuid = async (uuid) => {
        return this.userDao.findOneByWhere({ uuid });
    };

    changePassword = async (data, uuid) => {
        let message = 'Login Successful';
        let statusCode = httpStatus.OK;
        let user = await this.userDao.findOneByWhere({ uuid });

        if (!user) {
            return responseHandler.returnError(
                httpStatus.NOT_FOUND,
                'User Not found!'
            );
        }

        if (data.password !== data.confirm_password) {
            return responseHandler.returnError(
                httpStatus.BAD_REQUEST,
                'Confirm password not matched'
            );
        }

        const isPasswordValid = await bcrypt.compare(
            data.old_password,
            user.password
        );
        user = user.toJSON();
        delete user.password;
        if (!isPasswordValid) {
            statusCode = httpStatus.BAD_REQUEST;
            message = 'Wrong old Password!';
            return responseHandler.returnError(statusCode, message);
        }
        const updateUser = await this.userDao.updateWhere(
            { password: bcrypt.hashSync(data.password, 8) },
            { uuid }
        );

        if (updateUser) {
            return responseHandler.returnSuccess(
                httpStatus.OK,
                'Password updated Successfully!',
                {}
            );
        }

        return responseHandler.returnError(
            httpStatus.BAD_REQUEST,
            'Password Update Failed!'
        );
    };

    getUser = async (req) => {
        const { uuid } = req.user;
        let user = await this.userDao.findOneByWhere({ uuid }, [
            'uuid',
            'first_name',
            'last_name',
            'email',
            'role',
            'status'
        ]);

        if (!user) {
            return responseHandler.returnError(
                httpStatus.NOT_FOUND,
                'User Not found!'
            );
        }

        return responseHandler.returnSuccess(
            httpStatus.OK,
            'Successfully Get User',
            user
        );
    };

    createMemberByAdmin = async (userBody) => {
        try {
            let message = 'Successfully Add Member.';
            if (await this.userDao.isEmailExists(userBody.email)) {
                return responseHandler.returnError(
                    httpStatus.BAD_REQUEST,
                    'Email already taken'
                );
            }
            const uuid = uuidv4();
            userBody.email = userBody.email.toLowerCase();
            userBody.password = bcrypt.hashSync(userBody.password, 8);
            userBody.uuid = uuid;
            userBody.status = userConstant.STATUS_ACTIVE;
            userBody.role = userBody.memberType;
            userBody.email_verified = userConstant.EMAIL_VERIFIED_TRUE;

            let userData = await this.userDao.create(userBody);

            if (!userData) {
                message = 'Registration Failed! Please Try again.';
                return responseHandler.returnError(
                    httpStatus.BAD_REQUEST,
                    message
                );
            }

            userData = userData.toJSON();
            delete userData.password;

            return responseHandler.returnSuccess(
                httpStatus.CREATED,
                message,
                userData
            );
        } catch (e) {
            logger.error(e);
            return responseHandler.returnError(
                httpStatus.BAD_REQUEST,
                'Something went wrong!'
            );
        }
    };

    getAllMember = async (req) => {
        try {
            let where = {};
            const page = req.query.page !== undefined ? +req.query.page : 1;
            const limit = req.query.limit !== undefined ? +req.query.limit : 10;

            const status =
                req.query.status !== ''
                    ? req.query.status !== undefined
                        ? req.query.status.split(',')
                        : undefined
                    : undefined;

            if (status !== undefined) {
                where.role = {
                    [Op.in]: status
                };
            }

            if (
                req.query.search_key !== '' &&
                typeof req.query.search_key !== 'undefined'
            ) {
                where = {
                    ...where,
                    [Op.or]: [
                        {
                            email: {
                                [Op.iLike]: `%${req.query.search_key}%`
                            }
                        },
                        {
                            first_name: {
                                [Op.iLike]: `%${req.query.search_key}%`
                            }
                        }
                    ]
                };
            }

            const offset = (page - 1) * limit;
            const users = await this.userDao.getDataTableData(
                where,
                limit,
                offset
            );

            console.log(where);
            return responseHandler.returnSuccess(httpStatus.OK, 'users', users);
        } catch (e) {
            logger.error(e);
            return responseHandler.returnError(
                httpStatus.BAD_REQUEST,
                'Something went wrong!'
            );
        }
    };
}

module.exports = UserService;
