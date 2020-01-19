
const moment = require('moment');

module.exports = (sequelize, DataTypes) => {
  const Entries = sequelize.define('Entries', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    contest: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Contests',
        key: 'id'
      }
    },
    user: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Customers',
        key: 'id'
      }
    },
    suggestion: {
      type: DataTypes.STRING,
      allowNull: false
    },
    accept: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: null
    },
    favorite: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    },
    mimeType: {
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

  Entries.associate = function(models) {
    const config = { foreignKey: 'contest', sourceKey: 'id' };
    Entries.belongsTo(models.Contests, config, {onDelete: 'CASCADE'});

    const tuning = { foreignKey: 'user', sourceKey: 'id' };
    Entries.belongsTo(models.Customers, tuning, {onDelete: 'CASCADE'});
  };

  return Entries;
};
