module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('inventories', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            company_id: {
                type: Sequelize.INTEGER,
                allowNull: false
            },
            product_name: {
                type: Sequelize.STRING,
                allowNull: false
            },
            product_code: {
                type: Sequelize.STRING,
                allowNull: false
            },

            quantity: {
                type: Sequelize.FLOAT,
                allowNull: false
            },
            unit_price: {
                type: Sequelize.FLOAT,
                allowNull: false
            },
            description: {
                type: Sequelize.STRING,
                allowNull: true
            },
            tag_ids: {
                type: Sequelize.JSON,
                allowNull: true
            },

            created_at: {
                allowNull: true,
                type: Sequelize.DATE
            },
            updated_at: {
                allowNull: true,
                type: Sequelize.DATE
            }
        });
    },

    down: async (queryInterface, Sequelize) => {
        await queryInterface.dropTable('inventories');
    }
};
