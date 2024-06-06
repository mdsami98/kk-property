const express = require('express');
const UserController = require('../controllers/UserController');
const UserValidator = require('../validator/UserValidator');

const router = express.Router();
const auth = require('../middlewares/auth');

const userController = new UserController();
const userValidator = new UserValidator();

router.get('/list', userController.getAllMembers);

module.exports = router;
