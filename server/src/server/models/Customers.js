
const moment = require('moment');

module.exports = (sequelize, DataTypes) => {
  const Customers = sequelize.define('Customers', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    balance: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    role: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    photo: {
      type: DataTypes.STRING,
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

  Customers.associate = function(models) {
    const config = { foreignKey: 'owner_id', sourceKey: 'id' };
    Customers.hasMany(models.Contests, config);

    const config0 = {foreignKey: 'winner_id', sourceKey: 'id'};
    Customers.hasMany(models.Contests, config0);
  };

  return Customers;
};
