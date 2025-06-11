'use strict';
import { Sequelize, Model, DataTypes } from 'sequelize';

module.exports = (sequelize: Sequelize) => {
  class Category extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models: any) {
      // define association here
      Category.hasMany(models.products, {
        foreignKey: 'categoryId',
        as: 'products',
      });
    }
  }
  Category.init(
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        comment: 'Category primary id',
      },
      name: {
        type: DataTypes.STRING,
        allowNull: true,
        comment: 'Category Name',
      },
      description: {
        type: DataTypes.STRING,
        defaultValue: null,
        allowNull: true,
        comment: 'Category Description',
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
      modelName: 'categories',
      tableName: 'categories',
      freezeTableName: true,
    }
  );
  return Category;
};
