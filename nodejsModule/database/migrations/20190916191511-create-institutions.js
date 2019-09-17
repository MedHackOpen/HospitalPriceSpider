'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Institutions', {
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
      hospitalName: {
        type: Sequelize.STRING
      },
      city: {
        type: Sequelize.STRING
      },
      region: {
        type: Sequelize.STRING
      },
      country: {
        type: Sequelize.STRING
      },
      streetAddress: {
        type: Sequelize.STRING
      },
      numberLocation: {
        type: Sequelize.INTEGER
      },
      ownedBy: {
        type: Sequelize.STRING
      },
      managedBy: {
        type: Sequelize.STRING
      },
      keyShareholdersAndPeople: {
        type: Sequelize.JSON
      },
      grossRevenueFiscal: {
        type: Sequelize.DOUBLE
      },
      annualReportDocs: {
        type: Sequelize.ARRAY
      },
      website: {
        type: Sequelize.STRING
      },
      currentPricingUrl: {
        type: Sequelize.STRING
      },
      itemColumnName: {
        type: Sequelize.STRING
      },
      avgPriceColumnName: {
        type: Sequelize.STRING
      },
      priceSampleSizeColumnName: {
        type: Sequelize.STRING
      },
      medianPricingColumnName: {
        type: Sequelize.STRING
      },
      outPatientPriceColumnName: {
        type: Sequelize.STRING
      },
      inpatientPriceColumnName: {
        type: Sequelize.STRING
      },
      removedHeaderRowsForCSV: {
        type: Sequelize.INTEGER
      },
      longitude: {
        type: Sequelize.DOUBLE
      },
      latitude: {
        type: Sequelize.DOUBLE
      },
      founded: {
        type: Sequelize.INTEGER
      },
      type: {
        type: Sequelize.STRING
      },
      nonProfit: {
        type: Sequelize.BOOLEAN
      },
      communityHospital: {
        type: Sequelize.BOOLEAN
      },
      savedRepoTableName: {
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
    return queryInterface.dropTable('Institutions');
  }
};