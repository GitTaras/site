
const moment = require('moment');

module.exports = (sequelize, DataTypes) => {
  const Contests = sequelize.define('Contests', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    type: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    package: {
      type: DataTypes.ARRAY(DataTypes.TEXT),
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: null
    },
    uuidGroup: {
      type: DataTypes.UUID,
    },
    price: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    owner_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Customers',
        key: 'id',
      },
    },
    winner_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Customers',
        key: 'id',
      },
    },
    purpose: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    industry: {
      type: DataTypes.ARRAY(DataTypes.TEXT),
      allowNull: false,
    },
    photos: {
      type: DataTypes.STRING,
    },
    isPayed: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    businessDo: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    targetCustomer: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    style: {
      type: DataTypes.ARRAY(DataTypes.TEXT),
    },
    createdAt: {
      allowNull: false,
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    updatedAt: {
      allowNull: false,
      type: DataTypes.DATE,
    },
  });

  Contests.associate = function(models) {
    const config = { foreignKey: 'owner_id', sourceKey: 'id' };
    Contests.belongsTo(models.Customers, config, { onDelete: 'CASCADE' });

    const config0 = {as: 'winner', foreignKey: 'winner_id', sourceKey: 'id'};
    Contests.belongsTo(models.Customers, config0, {onDelete: 'CASCADE'});

    const config1 = { foreignKey: 'contest', sourceKey: 'id' };
    Contests.hasMany(models.Entries, config1);

    const config2 = { foreignKey: 'contest', sourceKey: 'id' };
    Contests.hasMany(models.LikedContests, config2);
  };

  return Contests;
};
