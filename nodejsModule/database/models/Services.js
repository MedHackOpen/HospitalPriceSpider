'use strict';
module.exports = (sequelize, DataTypes) => {
  const Services = sequelize.define('Services', {
    uuid: DataTypes.STRING,
    rId: DataTypes.DOUBLE,
    itemName: DataTypes.STRING,
    hospitalId: DataTypes.DOUBLE,
    price: DataTypes.DOUBLE,
    avgPrice: DataTypes.DOUBLE,
    type: DataTypes.STRING,
    medianPrice: DataTypes.DOUBLE,
    sampleSize: DataTypes.DOUBLE,
    outpatientAvgPrice: DataTypes.DOUBLE,
    inpatientAvgPrice: DataTypes.DOUBLE,
    latestPriceDate: DataTypes.STRING,
    firstPriceDate: DataTypes.STRING,
    changeSinceLastUpdate: DataTypes.DOUBLE,
    description: DataTypes.STRING,
    relatedItemsFromOthers: DataTypes.JSON,
    relatedItemsFromThisLocation: DataTypes.JSON,
    itemsRequiredForThis: DataTypes.JSON,
    keywords: DataTypes.JSON,
    country: DataTypes.STRING,
    currency: DataTypes.STRING
  }, {});
  Services.associate = function(models) {
    // associations can be defined here
  };
  return Services;
};