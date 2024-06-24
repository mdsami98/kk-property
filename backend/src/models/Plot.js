const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Plot extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            // For example, if plots belong to a company, project, and investor, you can add:
            // Plot.belongsTo(models.Company, { foreignKey: 'company_id' });
            // Plot.belongsTo(models.Project, { foreignKey: 'project_id' });
            // Plot.belongsTo(models.Investor, { foreignKey: 'investor_id' });
        }
    }

    Plot.init(
        {
            id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                autoIncrement: true,
                primaryKey: true
            },
            company_id: {
                type: DataTypes.INTEGER,
                allowNull: false
            },
            project_id: {
                type: DataTypes.INTEGER,
                allowNull: false
            },
            plot_id: {
                type: DataTypes.STRING,
                allowNull: false
            },
            plot_code: {
                type: DataTypes.STRING,
                allowNull: false
            },
            investor_id: {
                type: DataTypes.INTEGER,
                allowNull: false
            },
            invest_amount: {
                type: DataTypes.FLOAT,
                allowNull: false
            },
            due_amount: {
                type: DataTypes.FLOAT,
                allowNull: false
            },
            selling_price: {
                type: DataTypes.FLOAT
            },
            sold: {
                type: DataTypes.BOOLEAN
            },
            created_at: {
                type: DataTypes.DATE,
                allowNull: true
            },
            updated_at: {
                type: DataTypes.DATE,
                allowNull: true
            }
        },
        {
            sequelize,
            modelName: 'plot',
            underscored: true
        }
    );
    return Plot;
};
