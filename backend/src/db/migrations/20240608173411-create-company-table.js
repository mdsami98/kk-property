module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('companies', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            company_name: {
                type: Sequelize.STRING
            },
            address: {
                allowNull: true,
                type: Sequelize.STRING
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
        await queryInterface.dropTable('companies');
    }
};
