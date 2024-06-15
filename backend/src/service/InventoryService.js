const { Op } = require('sequelize');
const httpStatus = require('http-status');
const config = require('../config/config');
const InventoryTagDao = require('../dao/InventoryTagDao');
const InventoryDao = require('../dao/InventoryDao');
const responseHandler = require('../helper/responseHandler');

class InventoryService {
    constructor() {
        this.inventoryDao = new InventoryDao();
        this.inventoryTagDao = new InventoryTagDao();
    }

    getAllTags = async (req) => {
        try {
            const tags = await this.inventoryTagDao.findAll();

            const data = tags.map((tag) => ({
                value: tag.id,
                label: tag.name
            }));

            return responseHandler.returnSuccess(
                httpStatus.OK,
                'All Tags',
                data
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

module.exports = InventoryService;
