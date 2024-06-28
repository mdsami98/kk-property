module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('daily_expenses', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            add_by: {
                type: Sequelize.UUID,
                allowNull: false
            },
            amount: {
                type: Sequelize.DOUBLE,
                allowNull: false
            },
            approved: {
                type: Sequelize.TINYINT,
                allowNull: false
            },
            name: {
                type: Sequelize.STRING,
                allowNull: false
            },
            description: {
                type: Sequelize.STRING,
                allowNull: true
            },
            date: {
                type: Sequelize.DATE,
                allowNull: false
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
        await queryInterface.dropTable('daily_expenses');
    }
};
