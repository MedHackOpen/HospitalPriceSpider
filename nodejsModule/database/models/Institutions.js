'use strict';
module.exports = (sequelize, DataTypes) => {
  const Institutions = sequelize.define('Institutions', {
    uuid: DataTypes.STRING,
    rId: DataTypes.DOUBLE,
    hospitalName: DataTypes.STRING,
    city: DataTypes.STRING,
    region: DataTypes.STRING,
    country: DataTypes.STRING,
    mainHospitalName: DataTypes.STRING,
    numberBeds: DataTypes.DOUBLE,
    streetAddress: DataTypes.STRING,
    numberLocation: DataTypes.INTEGER,
    ownedBy: DataTypes.STRING,
    managedBy: DataTypes.STRING,
    keyShareholdersAndPeople: DataTypes.JSON,
    grossRevenueFiscal: DataTypes.STRING,
    annualReportDocs: DataTypes.JSON,
    website: DataTypes.STRING,
    currentPricingUrl: DataTypes.STRING,
    currentPricingLandingURL: DataTypes.STRING,
    itemColumnName: DataTypes.STRING,
    avgPriceColumnName: DataTypes.STRING,
    priceSampleSizeColumnName: DataTypes.STRING,
    extraColumnName: DataTypes.STRING,
    categoryColumnName: DataTypes.STRING,
    medianPricingColumnName: DataTypes.STRING,
    outPatientPriceColumnName: DataTypes.STRING,
    inpatientPriceColumnName: DataTypes.STRING,
    removedHeaderRowsForCSV: DataTypes.STRING,//should be bol
    longitude: DataTypes.DOUBLE,
    latitude: DataTypes.DOUBLE,
    savedRepoTableName: DataTypes.STRING,
    communityHospital: DataTypes.STRING,//should be bol
    type: DataTypes.STRING,
    founded: DataTypes.DATE,
    siteUp: DataTypes.STRING,//should be bol
    contributor: DataTypes.STRING,
    hasSpreadSheet: DataTypes.STRING,////should be bol
    notes: DataTypes.STRING, //should be bol
    nonProfit: DataTypes.STRING,
  }, {});
  Institutions.associate = function(models) {
    // associations can be defined here
  };
  return Institutions;
};