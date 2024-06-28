const express = require('express');
const ProjectController = require('../controllers/ProjectController');
const ProjectValidator = require('../validator/ProjectValidator');

const router = express.Router();
const auth = require('../middlewares/auth');

const projectController = new ProjectController();
const projectValidator = new ProjectValidator();

router.get(
    '/get-investor-for-project',
    auth(),
    projectController.getInvestorsForProjectCreate
);

router.post(
    '/',
    auth(),
    // projectValidator.projectCreateValidation,
    projectController.projectCreate
);

router.get('/', auth(), projectController.getProjectDataTable);

module.exports = router;
