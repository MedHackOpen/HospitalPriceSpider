'use strict';
module.exports = (sequelize, DataTypes) => {
  const Institutions = sequelize.define('Institutions', {
    uuid: DataTypes.STRING,
    rId: DataTypes.DOUBLE,
    hospitalName: DataTypes.STRING,
    city: DataTypes.STRING,
    region: DataTypes.STRING,
    country: DataTypes.STRING,
    streetAddress: DataTypes.STRING,
    numberLocation: DataTypes.INTEGER,
    ownedBy: DataTypes.STRING,
    managedBy: DataTypes.STRING,
    keyShareholdersAndPeople: DataTypes.JSON,
    grossRevenueFiscal: DataTypes.DOUBLE,
    annualReportDocs: DataTypes.JSON,
    website: DataTypes.STRING,
    currentPricingUrl: DataTypes.STRING,
    itemColumnName: DataTypes.STRING,
    avgPriceColumnName: DataTypes.STRING,
    priceSampleSizeColumnName: DataTypes.STRING,
    medianPricingColumnName: DataTypes.STRING,
    outPatientPriceColumnName: DataTypes.STRING,
    inpatientPriceColumnName: DataTypes.STRING,
    removedHeaderRowsForCSV: DataTypes.INTEGER,
    longitude: DataTypes.DOUBLE,
    latitude: DataTypes.DOUBLE,
    founded: DataTypes.DATE,
    type: DataTypes.STRING,
    nonProfit: DataTypes.BOOLEAN,
    communityHospital: DataTypes.BOOLEAN,
    savedRepoTableName: DataTypes.STRING
  }, {});
  Institutions.associate = function(models) {
    // associations can be defined here
  };
  return Institutions;
};