const SuperDao = require('./SuperDao');
const models = require('../models');

const InventoryTag = models.inventory_tag;

class InventoryTagDao extends SuperDao {
    constructor() {
        super(InventoryTag);
    }
}

module.exports = InventoryTagDao;
