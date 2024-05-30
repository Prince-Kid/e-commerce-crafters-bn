"use strict";
import { Model, DataTypes } from "sequelize";
import connectSequelize from "../config/db.config";

class Product extends Model {
    public productId?: string;
    public vendorId: any;
    public name!: string;
    public description!: string;
    public image!: string;
    public discount!: number;
    public price!: string;
    public quantity!: number;
    public category!: string;
    public expiringDate?: string;

    static associate(models: any) {
        Product.hasMany(models.Wishlist, {
            foreignKey: "productId",
            as: "wishlists",
        });
        Product.hasMany(models.CartItem, {
            foreignKey: "productId",
            as: "cartItems",
        });
    }
}

Product.init({
    productId: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
    },
    vendorId: {
        type: DataTypes.STRING,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
    },
    name: { type: DataTypes.STRING, allowNull: false },
    description: { type: DataTypes.STRING, allowNull: false },
    image: { type: DataTypes.STRING, allowNull: false },
    discount: { type: DataTypes.INTEGER, allowNull: false },
    price: { type: DataTypes.INTEGER, allowNull: false },
    quantity: { type: DataTypes.INTEGER, allowNull: true },
    category: { type: DataTypes.STRING, allowNull: true },
    expiringDate: { allowNull: true, type: DataTypes.DATE },
}, {
    sequelize: connectSequelize,
    modelName: 'Product',
    tableName: 'Products',
    timestamps: true
});

export default Product;
