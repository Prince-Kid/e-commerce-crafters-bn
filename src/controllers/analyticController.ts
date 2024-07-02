import { Request, Response } from "express";
import Order from "../database/models/order";
import Product from "../database/models/product";

export const annualSellingReport = async (req: Request, res: Response) => {
  try {
    const vendorId = req.params.id;
    const orders: any = await Order.findAll();
    if (!orders) {
      return res.status(404).json({ message: "No order found" });
    }

    const products: any[] = [];
    for (const order of orders) {
      for (const data of order.products) {
        const single_product = await Product.findOne({
          where: { productId: data.productId },
        });
        if (single_product?.vendorId === vendorId) {
          products.push({
            productId: single_product.productId,
            quantity: data.quantity,
            price: single_product.price,
            date: new Date(order.createdAt),
          });
        }
      }
    }

    const currentMonth = new Date().getMonth();

    const monthlySales = Array(12).fill(0);
    for (const prod of products) {
      const month = prod.date.getMonth();
      monthlySales[month] += prod.price * prod.quantity;
    }

    const formattedSales = monthlySales.map((totalSales, index) => {
      const commissionFee = 0.1;
      const income = totalSales - totalSales * commissionFee;
      const currentYear = new Date().getFullYear();
      return {
        month: new Date(currentYear, index).toLocaleString("default", {
          month: "long",
        }),
        totalSales: index <= currentMonth ? totalSales : 0,
        income: index <= currentMonth ? income : 0,
      };
    });

    res.status(200).json({ data: products, monthlySales: formattedSales });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const overallAnnualSellingReport = async (req: Request, res: Response) => {
  try {
    const orders: any = await Order.findAll();
    if (!orders) {
      return res.status(404).json({ message: "No order found" });
    }

    const products: any[] = [];
    for (const order of orders) {
      for (const data of order.products) {
        const single_product = await Product.findOne({
          where: { productId: data.productId },
        });

        products.push({
          productId: data.productId,
          quantity: data.quantity,
          price: single_product?.price,
          date: new Date(order.createdAt),
        });
      }
    }

    const currentMonth = new Date().getMonth();

    const monthlySales = Array(12).fill(0);
    for (const prod of products) {
      const month = prod.date.getMonth();
      monthlySales[month] += prod.price * prod.quantity;
    }

    const formattedSales = monthlySales.map((totalSales, index) => {
      const commissionFee = 0.1;
      const income = totalSales * commissionFee;
      const currentYear = new Date().getFullYear();
      return {
        month: new Date(currentYear, index).toLocaleString("default", {
          month: "long",
        }),
        totalSales: index <= currentMonth ? totalSales : 0,
        income: index <= currentMonth ? income : 0,
      };
    });

    res.status(200).json({ data: products, monthlySales: formattedSales });
  } catch (error: any) {
    console.log(error.message);
    res.status(500).json({ error: error.message });
  }
};

export const WeeklySellingReport = async (req: Request, res: Response) => {
  try {
    const vendorId = req.params.id;
    const orders: any = await Order.findAll();
    if (!orders) {
      return res.status(404).json({ message: "No order found" });
    }

    const products: any[] = [];
    for (const order of orders) {
      for (const data of order.products) {
        const single_product = await Product.findOne({
          where: { productId: data.productId },
        });
        if (single_product?.vendorId === vendorId) {
          products.push({
            productId: single_product.productId,
            quantity: data.quantity,
            price: single_product.price,
            date: new Date(order.createdAt),
          });
        }
      }
    }

    const daysOfWeek = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    const currentDay = new Date().getDay();
    const dailySales = Array(7).fill(0);

    for (const prod of products) {
      const day = prod.date.getDay();
      dailySales[day] += prod.price * prod.quantity;
    }

    const formattedSales = dailySales.map((totalSales, index) => {
      return {
        day: daysOfWeek[index],
        totalSales: index <= currentDay ? totalSales : 0,
      };
    });

    res.status(200).json({ data: products, weeklySales: formattedSales });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};




export const OverallWeeklySellingReport = async (req: Request, res: Response) => {
  try {
  
    const orders: any = await Order.findAll();
    if (!orders) {
      return res.status(404).json({ message: "No order found" });
    }

    const products: any[] = [];
    for (const order of orders) {
      for (const data of order.products) {
        const single_product = await Product.findOne({
          where: { productId: data.productId },
        });

        products.push({
          productId: data.productId,
          quantity: data.quantity,
          price: single_product?.price,
          date: new Date(order.createdAt),
        });
      }
    }


    const daysOfWeek = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    const currentDay = new Date().getDay();
    const dailySales = Array(7).fill(0);

    for (const prod of products) {
      const day = prod.date.getDay();
      dailySales[day] += prod.price * prod.quantity;
    }

    const formattedSales = dailySales.map((totalSales, index) => {
      return {
        day: daysOfWeek[index],
        totalSales: index <= currentDay ? totalSales : 0,
      };
    });

    res.status(200).json({ data: products, weeklySales: formattedSales });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};
