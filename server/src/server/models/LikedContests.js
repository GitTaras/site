const moment = require('moment');

module.exports = (sequelize, DataTypes) => {
  const LikedContests = sequelize.define('LikedContests', {
    id:{
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
    },
    user: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'Customers',
        key: 'id'
      }
    },
    contest: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'Contests',
        key: 'id'
      }
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

  LikedContests.associate = function (models) {
    const config = {foreignKey: 'id', sourceKey: 'contest'};
    LikedContests.belongsTo(models.Contests, config, {onDelete: 'CASCADE'});

    const tuning = {foreignKey: 'id', sourceKey: 'user'};
    LikedContests.belongsTo(models.Customers, tuning, {onDelete: 'CASCADE'});
  };

  return LikedContests;
};
