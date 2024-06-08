const SuperDao = require('./SuperDao');
const models = require('../models');

const Project = models.project;

class ProjectDao extends SuperDao {
    constructor() {
        super(Project);
    }
}

module.exports = ProjectDao;
