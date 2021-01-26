'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Contas', {
      idConta: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      idPessoa: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Pessoas',
          key: 'idPessoa'
        }
      },
      saldo: {
        type: Sequelize.DECIMAL(10,2)
      },
      limiteSaqueDiario: {
        type: Sequelize.DECIMAL(10,2)
      },
      flagAtivo: {
        type: Sequelize.BOOLEAN
      },
      tipoConta: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Contas');
  }
};
