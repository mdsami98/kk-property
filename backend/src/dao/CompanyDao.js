const SuperDao = require('./SuperDao');
const models = require('../models');

const Company = models.company;

class CompanyDao extends SuperDao {
    constructor() {
        super(Company);
    }
}

module.exports = CompanyDao;
