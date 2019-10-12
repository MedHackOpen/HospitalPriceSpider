'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Procedures', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      uuid: {
        type: Sequelize.STRING
      },
      rId: {
        type: Sequelize.DOUBLE
      },
      itemName: {
        type: Sequelize.STRING
      },
      hospitalId: {
        type: Sequelize.DOUBLE
      },
      price: {
        type: Sequelize.JSON
      },
      hospitalName: {
        type: Sequelize.STRING
      },
      avgPrice: {
        type: Sequelize.STRING
      },
      type: {
        type: Sequelize.STRING
      },
      medianPrice: {
        type: Sequelize.STRING
      },
      sampleSize: {
        type: Sequelize.DOUBLE
      },
      outpatientAvgPrice: {
        type: Sequelize.STRING
      },
      inpatientAvgPrice: {
        type: Sequelize.STRING
      },
      revenue_code: {
        type: Sequelize.STRING
      },
      latestPriceDate: {
        type: Sequelize.STRING
      },
      firstPriceDate: {
        type: Sequelize.STRING
      },
      changeSinceLastUpdate: {
        type: Sequelize.DOUBLE
      },
      description: {
        type: Sequelize.STRING
      },
      relatedItemsFromOthers: {
        type: Sequelize.JSON
      },
      relatedItemsFromThisLocation: {
        type: Sequelize.JSON
      },
      itemsRequiredForThis: {
        type: Sequelize.JSON
      },
      keywords: {
        type: Sequelize.JSON
      },
      country: {
        type: Sequelize.STRING
      },
      currency: {
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
    return queryInterface.dropTable('Procedures');
  }
};