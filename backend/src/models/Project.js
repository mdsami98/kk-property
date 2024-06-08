const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Project extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            // For example, if projects belong to users, you can add:
            // Project.belongsTo(models.User, { foreignKey: 'user_uuid', targetKey: 'uuid' });
        }
    }

    Project.init(
        {
            id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                autoIncrement: true,
                primaryKey: true
            },
            user_uuid: {
                type: DataTypes.UUID,
                allowNull: false
            },
            name: {
                type: DataTypes.STRING
            },
            address: {
                type: DataTypes.STRING,
                allowNull: true
            },
            area: {
                type: DataTypes.FLOAT
            },
            unit_price: {
                type: DataTypes.FLOAT
            },
            total_price: {
                type: DataTypes.FLOAT
            },
            selling_price: {
                type: DataTypes.FLOAT
            },
            created_at: {
                type: DataTypes.DATE,
                allowNull: false
            },
            updated_at: {
                type: DataTypes.DATE,
                allowNull: false
            }
        },
        {
            sequelize,
            modelName: 'project',
            underscored: true
        }
    );
    return Project;
};
