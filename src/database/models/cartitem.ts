"use strict";
import { Model, DataTypes } from "sequelize";
import connectSequelize from "../config/db.config";

class CartItem extends Model {
  public cartitemsid?: string;
  public cartId!: string;
  public productId!: string;
  public quantity!: number;
  public price!: number;
  static associate(models: any) {
    CartItem.belongsTo(models.Cart, {
      foreignKey: "cartId",
      as: "cart",
    });
  }
}
CartItem.init(
  {
    cartitemsid: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    cartId: { type: DataTypes.STRING, allowNull: false },
    productId: { type: DataTypes.STRING, allowNull: false },
    quantity: { type: DataTypes.INTEGER, allowNull: false },
    price: { type: DataTypes.INTEGER, allowNull: false },
  },
  {
    sequelize: connectSequelize,
    modelName: "CartItem",
    tableName: "CartItems",
    timestamps: true,
  }
);

export default CartItem;
