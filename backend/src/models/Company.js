const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Company extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            // For example, if companies have many users, you can add:
            // Company.hasMany(models.User, { foreignKey: 'company_id', sourceKey: 'id' });
        }
    }

    Company.init(
        {
            id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                autoIncrement: true,
                primaryKey: true
            },
            company_name: DataTypes.STRING,
            address: DataTypes.STRING,
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
            modelName: 'company',
            underscored: true
        }
    );
    return Company;
};
