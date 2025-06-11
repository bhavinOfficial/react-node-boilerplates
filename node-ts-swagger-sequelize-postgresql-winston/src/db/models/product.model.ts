'use strict';
import { Sequelize, Model, DataTypes } from 'sequelize';

module.exports = (sequelize: Sequelize) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models: any) {
      // define association here
      Product.belongsTo(models.categories, {
        foreignKey: 'categoryId',
        targetKey: 'id',
        as: 'categoryDetails',
      });
    }
  }
  Product.init(
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        comment: 'Product primary id',
      },
      name: {
        type: DataTypes.STRING,
        allowNull: true,
        comment: 'Product Name',
      },
      description: {
        type: DataTypes.STRING,
        defaultValue: null,
        allowNull: true,
        comment: 'Product Description',
      },
      price: {
        type: DataTypes.FLOAT,
        defaultValue: 0.0,
        allowNull: false,
        comment: 'Product Price',
      },
      quantity: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
        allowNull: false,
        comment: 'Product Quantity',
      },
      createdAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
        allowNull: false,
        comment: 'When resource created',
      },
      categoryId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'categories',
          key: 'id',
        },
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
      modelName: 'products',
      tableName: 'products',
      freezeTableName: true,
    }
  );
  return Product;
};
