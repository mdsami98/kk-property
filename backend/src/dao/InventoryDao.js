const SuperDao = require('./SuperDao');
const models = require('../models');

const Inventory = models.inventory;

class InventoryDao extends SuperDao {
    constructor() {
        super(Inventory);
    }
}

module.exports = InventoryDao;
