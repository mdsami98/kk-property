const express = require('express');
const ExpenseController = require('../controllers/ExpenseController');
const ProjectValidator = require('../validator/ProjectValidator');

const router = express.Router();
const auth = require('../middlewares/auth');

const expenseController = new ExpenseController();
const projectValidator = new ProjectValidator();

router.post('/', auth(), expenseController.createDailyExpense);
router.get('/', auth(), expenseController.getExpenseDataTable);

module.exports = router;
