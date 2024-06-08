const express = require('express');
const ProjectController = require('../controllers/ProjectController');
// const UserValidator = require('../validator/UserValidator');

const router = express.Router();
const auth = require('../middlewares/auth');

const projectController = new ProjectController();
// const userValidator = new UserValidator();

router.get(
    '/get-investor-for-project',
    auth(),
    projectController.getInvestorsForProjectCreate
);

module.exports = router;
