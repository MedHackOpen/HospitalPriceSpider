'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('FileProcesses', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      rId: {
        type: Sequelize.DOUBLE
      },
      hospitalId: {
        type: Sequelize.DOUBLE
      },
      hospitalName: {
        type: Sequelize.STRING
      },
      fileName: {
        type: Sequelize.STRING
      },
      procedureItems: {
        type: Sequelize.STRING
      },
      itemsIn: {
        type: Sequelize.STRING
      },
      progress: {
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
    return queryInterface.dropTable('FileProcesses');
  }
};