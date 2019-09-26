'use strict';
module.exports = (sequelize, DataTypes) => {
  const FileProcess = sequelize.define('FileProcess', {
    rId: DataTypes.DOUBLE,
    hospitalId: DataTypes.DOUBLE,
    hospitalName: DataTypes.STRING,
    fileName: DataTypes.STRING,
    procedureItems: DataTypes.STRING,
    itemsIn: DataTypes.STRING,
    progress: DataTypes.STRING
  }, {});
  FileProcess.associate = function(models) {
    // associations can be defined here
  };
  return FileProcess;
};