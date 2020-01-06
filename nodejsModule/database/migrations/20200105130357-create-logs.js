'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Logs', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      filename: {
        type: Sequelize.STRING
      },
      recorded: {
        type: Sequelize.DOUBLE
      },
      missed: {
        type: Sequelize.DOUBLE
      },
      processedBy: {
        type: Sequelize.STRING
      },
      procedureKey: {
        type: Sequelize.STRING
      },
      priceKey: {
        type: Sequelize.STRING
      },
      rId: {
        type: Sequelize.DOUBLE
      },
      totalItems: {
        type: Sequelize.DOUBLE
      },
      hospitalName: {
        type: Sequelize.STRING
      },
      comment: {
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
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Logs');
  }
};