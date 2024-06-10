module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('projects', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            company_id: {
                allowNull: false,
                type: Sequelize.INTEGER
            },
            user_uuid: {
                allowNull: false,
                type: Sequelize.UUID
            },
            name: {
                type: Sequelize.STRING
            },
            address: {
                type: Sequelize.STRING,
                allowNull: true
            },
            area: {
                type: Sequelize.FLOAT
            },
            unit_price: {
                type: Sequelize.FLOAT
            },
            total_price: {
                type: Sequelize.FLOAT
            },
            selling_price: {
                type: Sequelize.FLOAT
            },
            created_at: {
                allowNull: false,
                type: Sequelize.DATE
            },
            updated_at: {
                allowNull: false,
                type: Sequelize.DATE
            }
        });
    },

    down: async (queryInterface, Sequelize) => {
        await queryInterface.dropTable('projects');
    }
};
