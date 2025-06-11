'use strict';
import { Sequelize, Model, DataTypes } from 'sequelize';

module.exports = (sequelize: Sequelize) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models: any) {
      // define association here
    }
  }
  User.init(
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        comment: 'User primary id',
      },
      firstName: {
        type: DataTypes.STRING,
        defaultValue: null,
        allowNull: true,
        comment: 'User First Name',
      },
      lastName: {
        type: DataTypes.STRING,
        defaultValue: null,
        allowNull: true,
        comment: 'User Last Name',
      },
      email: {
        type: DataTypes.STRING,
        allowNull: true,
        comment: 'User Email',
      },
      role: {
        type: DataTypes.STRING,
        allowNull: true,
        comment: 'User Role',
      },
      password: {
        type: DataTypes.STRING,
        allowNull: true,
        comment: 'User Password',
      },
      createdAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
        allowNull: false,
        comment: 'When resource created',
      },
      updatedAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
        allowNull: false,
        comment: 'When resource updated',
      },
    },
    {
      sequelize,
      modelName: 'users',
      tableName: 'users',
      freezeTableName: true,
    }
  );
  return User;
};
