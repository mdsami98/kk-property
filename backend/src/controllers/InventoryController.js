const httpStatus = require('http-status');
const InventoryService = require('../service/InventoryService');

const logger = require('../config/logger');

class InventoryController {
    constructor() {
        this.inventoryService = new InventoryService();
    }

    getAllTags = async (req, res) => {
        try {
            const response = await this.inventoryService.getAllTags(req);
            res.status(response.statusCode).send(response.response);
        } catch (e) {
            logger.error(e);
            res.status(httpStatus.BAD_GATEWAY).send(e);
        }
    };
}

module.exports = InventoryController;
