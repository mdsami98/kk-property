const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Inventory extends Model {
        static associate(models) {
            // define association here
            // For example, if companies have many users, you can add:
            // Inventory.hasMany(models.User, { foreignKey: 'company_id', sourceKey: 'id' });
        }
    }

    Inventory.init(
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
            product_name: {
                type: DataTypes.STRING,
                allowNull: false
            },
            product_code: {
                type: DataTypes.STRING,
                allowNull: false
            },

            quantity: {
                type: DataTypes.FLOAT,
                allowNull: false
            },
            unit_price: {
                type: DataTypes.FLOAT,
                allowNull: false
            },
            tag_ids: {
                type: DataTypes.JSON,
                allowNull: true
            },
            description: {
                type: DataTypes.STRING,
                allowNull: true
            },

            created_at: {
                allowNull: true,
                type: DataTypes.DATE
            },
            updated_at: {
                allowNull: true,
                type: DataTypes.DATE
            }
        },
        {
            sequelize,
            modelName: 'inventory',
            tableName: 'inventories',
            underscored: true
        }
    );
    return Inventory;
};
