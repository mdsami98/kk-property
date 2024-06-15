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
    createInventory = async (req) => {
        try {
            const { name, pcode, quantity, unit_price, tags, description } =
                req.body;
            const { company_id } = req.user;

            let data = {
                product_name: name,
                product_code: pcode,
                quantity,
                unit_price,
                description,
                company_id
            };

            const tagIds = [];
            for (let tag of tags) {
                if (typeof tag === 'string') {
                    // If tag is a string, create a new tag
                    let newTag = await this.inventoryTagDao.create({
                        name: tag,
                        company_id
                    });
                    tagIds.push(newTag.id);
                } else {
                    // If tag is an id, add it directly
                    tagIds.push(tag);
                }
            }

            data = { ...data, tag_ids: tagIds };
            const response = await this.inventoryDao.create(data);
            if (response) {
                return responseHandler.returnSuccess(
                    httpStatus.CREATED,
                    'Product Created Successfully',
                    response
                );
            }

            return responseHandler.returnError(
                httpStatus.BAD_REQUEST,
                'Something went wrong!'
            );

            // const data = tags.map((tag) => ({
            //     value: tag.id,
            //     label: tag.name
            // }));
        } catch (e) {
            console.log(e.message);
            return responseHandler.returnError(
                httpStatus.BAD_REQUEST,
                'Something went wrong!'
            );
        }
    };
}

module.exports = InventoryService;
