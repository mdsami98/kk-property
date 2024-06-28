const SuperDao = require('./SuperDao');
const models = require('../models');

const DailyExpense = models.daily_expense;

class DailyExpenseDao extends SuperDao {
    constructor() {
        super(DailyExpense);
    }
}

module.exports = DailyExpenseDao;
