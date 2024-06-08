const SuperDao = require('./SuperDao');
const models = require('../models');

const Plot = models.plot;

class PlotDao extends SuperDao {
    constructor() {
        super(Plot);
    }
}

module.exports = PlotDao;
