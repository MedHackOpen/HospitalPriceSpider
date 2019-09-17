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
        type: Sequelize.DOUBLE
      },
      avgPrice: {
        type: Sequelize.DOUBLE
      },
      type: {
        type: Sequelize.STRING
      },
      medianPrice: {
        type: Sequelize.DOUBLE
      },
      sampleSize: {
        type: Sequelize.DOUBLE
      },
      outpatientAvgPrice: {
        type: Sequelize.DOUBLE
      },
      inpatientAvgPrice: {
        type: Sequelize.DOUBLE
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
        type: Sequelize.ARRAY
      },
      relatedItemsFromThisLocation: {
        type: Sequelize.ARRAY
      },
      itemsRequiredForThis: {
        type: Sequelize.ARRAY
      },
      keywords: {
        type: Sequelize.ARRAY
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