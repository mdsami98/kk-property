module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('plots', {
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
            project_id: {
                allowNull: false,
                type: Sequelize.INTEGER
            },
            plot_id: {
                allowNull: false,
                type: Sequelize.STRING
            },
            plot_code: {
                allowNull: false,
                type: Sequelize.STRING
            },
            investor_id: {
                allowNull: false,
                type: Sequelize.INTEGER
            },
            invest_amount: {
                allowNull: false,
                type: Sequelize.FLOAT
            },
            due_amount: {
                allowNull: false,
                type: Sequelize.FLOAT
            },
            total_payable: {
                type: Sequelize.FLOAT,
                allowNull: true
            },
            area: {
                type: Sequelize.FLOAT,
                allowNull: true
            },
            sold: {
                type: Sequelize.BOOLEAN,
                allowNull: false,
                default: false
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
        await queryInterface.dropTable('plots');
    }
};
