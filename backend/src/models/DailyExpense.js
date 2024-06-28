const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class DailyExpense extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            // For example, if daily expenses belong to a user, you can add:
            // DailyExpense.belongsTo(models.User, { foreignKey: 'add_by', targetKey: 'uuid' });
        }
    }

    DailyExpense.init(
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
            add_by: {
                type: DataTypes.UUID,
                allowNull: false
            },
            amount: {
                type: DataTypes.DOUBLE,
                allowNull: false
            },
            approved: {
                type: DataTypes.TINYINT,
                allowNull: false
            },
            name: {
                type: DataTypes.STRING,
                allowNull: false
            },
            description: {
                type: DataTypes.STRING,
                allowNull: true
            },
            date: {
                type: DataTypes.DATE,
                allowNull: false
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
            modelName: 'daily_expense',
            underscored: true
        }
    );
    return DailyExpense;
};
