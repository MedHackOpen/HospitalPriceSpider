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
      mainHospitalName: {
        type: Sequelize.STRING
      },
      numberBeds: {
        type: Sequelize.DOUBLE
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
        type: Sequelize.JSON
      },
      website: {
        type: Sequelize.STRING
      },
      currentPricingUrl: {
        type: Sequelize.STRING
      },
      currentPricingLandingURL: {
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
      extraColumnName: {
        type: Sequelize.STRING
      },
      categoryColumnName: {
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
        type: Sequelize.STRING
      },
      longitude: {
        type: Sequelize.DOUBLE
      },
      latitude: {
        type: Sequelize.DOUBLE
      },
      savedRepoTableName: {
        type: Sequelize.STRING
      },
      communityHospital: {
        type: Sequelize.STRING
      },
      type: {
        type: Sequelize.STRING
      },
      founded: {
        type: Sequelize.DATE
      },
      siteUp: {
        type: Sequelize.STRING
      },
      contributor: {
        type: Sequelize.STRING
      },
      hasSpreadSheet: {
        type: Sequelize.STRING
      },
      notes: {
        type: Sequelize.STRING
      },
      nonProfit: {
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