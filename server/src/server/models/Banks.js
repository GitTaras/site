
const moment = require('moment');

module.exports = (sequelize, DataTypes) => {
  const Banks = sequelize.define('Banks', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    card: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: true
    },
    cvv: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    expires: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    balance: {
      type: DataTypes.REAL,
      defaultValue: 0,
      allowNull: false
    },
    createdAt: {
      allowNull: false,
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    },
    updatedAt: {
      allowNull: false,
      type: DataTypes.DATE
    }
  });

  return Banks;
};
