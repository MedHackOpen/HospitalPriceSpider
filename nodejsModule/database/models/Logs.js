'use strict';
module.exports = (sequelize, DataTypes) => {
  const Logs = sequelize.define('Logs', {
    filename: DataTypes.STRING,
    recorded: DataTypes.DOUBLE,
    missed: DataTypes.DOUBLE,
    processedBy: DataTypes.STRING,
    procedureKey: DataTypes.STRING,
    priceKey: DataTypes.STRING,
    hospitalName: DataTypes.STRING,
    rId: DataTypes.DOUBLE,
    totalItems: DataTypes.DOUBLE,
    comment: DataTypes.STRING
  }, {});
  Logs.associate = function(models) {
    // associations can be defined here
  };
  return Logs;
};