const express = require('express');
const InventoryController = require('../controllers/InventoryController');
const InventoryValidator = require('../validator/InventoryValidator');

const router = express.Router();
const auth = require('../middlewares/auth');

const inventoryController = new InventoryController();
const inventoryValidator = new InventoryValidator();

router.get('/get-tags', auth(), inventoryController.getAllTags);

router.post(
    '/create-new-inventory',
    auth(),
    inventoryValidator.inventoryCreateValidation,
    inventoryController.createInventory
);

module.exports = router;
