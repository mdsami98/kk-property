const express = require('express');
const InventoryController = require('../controllers/InventoryController');
const ProjectValidator = require('../validator/ProjectValidator');

const router = express.Router();
const auth = require('../middlewares/auth');

const inventoryController = new InventoryController();
// const projectValidator = new ProjectValidator();

router.get('/get-tags', auth(), inventoryController.getAllTags);

module.exports = router;
