'use strict';
module.exports = (sequelize, DataTypes) => {
  const Procedures = sequelize.define('Procedures', {
    uuid: DataTypes.STRING,
    rId: DataTypes.DOUBLE,
    itemName: DataTypes.STRING,
    hospitalId: DataTypes.DOUBLE,
    price: DataTypes.JSON,
    hospitalName: DataTypes.STRING,
    avgPrice: DataTypes.STRING,
    type: DataTypes.STRING,
    medianPrice: DataTypes.STRING,
    sampleSize: DataTypes.DOUBLE,
    outpatientAvgPrice: DataTypes.STRING,
    inpatientAvgPrice: DataTypes.STRING,
    revenue_code: DataTypes.STRING,
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
  }, {tableName: 'procedures'}, {});
    Procedures.associate = function(models) {
    // associations can be defined here
  };
  return Procedures;
};