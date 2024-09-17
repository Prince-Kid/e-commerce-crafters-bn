import express, { Request, Response } from "express";
import Stripe from "stripe";
import dotenv from "dotenv";
import {
  findOrderById,
  findProductById,
  findUserById,
} from "../services/paymentService";
import { sendOrderConfirmation } from "../services/emailService";

dotenv.config();

const stripe = new Stripe(`${process.env.STRIPE_SECRET_KEY}`);

export const checkout = async (req: Request, res: Response) => {
  try {
    const orderId = req.params.id;

    // Validate orderId
    if (!orderId) {
      return res.status(400).json({ message: "Order ID is required" });
    }

    const order = await findOrderById(orderId);

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    // Validate order.products
    if (!order.products || !Array.isArray(order.products)) {
      return res.status(400).json({ message: "Order products are not valid" });
    }

    const line_items: any[] = await Promise.all(
      order.products.map(async (item: any) => {
        const productDetails: any = await findProductById(item.productId);

        if (!productDetails) {
          console.error(`Product with ID ${item.productId} not found`);
          throw new Error("Product not found");
        }

        const unit_amount = Math.round(productDetails.price * 100);

        return {
          price_data: {
            currency: "usd",
            product_data: {
              name: productDetails.name,
              images: [productDetails.image[0]],
            },
            unit_amount: unit_amount,
          },
          quantity: item.quantity,
        };
      })
    );

    const session = await stripe.checkout.sessions.create({
      line_items,
      mode: "payment",
      success_url: process.env.SUCCESS_PAYMENT_URL,
      cancel_url: process.env.CANCEL_PAYMENT_URL,
      metadata: {
        orderId: orderId,
      },
    });

    res.status(200).json({ url: session.url });
  } catch (error: any) {
    console.error("Error during checkout process:", error);
    res.status(500).json({ message: error.message });
  }
};

export const webhook = async (req: Request, res: Response) => {
  const sig: any = req.headers["stripe-signature"];
  const webhookSecret: any = process.env.WEBHOOK_SECRET_KEY;
  let event: any;

  try {
    event = stripe.webhooks.constructEvent(req.body, sig, webhookSecret);
  } catch (err: any) {
    console.error(`⚠️  Webhook signature verification failed: ${err.message}`);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  switch (event.type) {
    case "checkout.session.completed":
      const session: any = event.data.object as Stripe.Checkout.Session;

      // Log session details
      console.log("Checkout Session Completed Event:");
      console.log("Session ID:", session.id);
      console.log("Session Metadata:", session.metadata);
      console.log("Session Object:", session);

      try {
        // Fetch line items to get more order details
        const lineItems = await stripe.checkout.sessions.listLineItems(
          session.id
        );
        console.log("Line Items:", lineItems);

        const orderId = session.metadata.orderId;

        if (!orderId) {
          console.error("Order ID not found in session metadata");
          return res.status(400).json({ message: "Order ID not found" });
        }

        const order = await findOrderById(orderId);
        console.log("Order:", order);

        if (order) {
          order.status = "paid";
          await order.save();

          // Fetch user details and log them
          const user = await findUserById(order.userId);
          console.log("User:", user);

          if (user) {
            await sendOrderConfirmation(user, order);
          } else {
            console.error("User not found for order:", orderId);
          }
        } else {
          console.error("Order not found:", orderId);
        }
      } catch (err) {
        console.error("Error processing session completed event:", err);
      }
      break;

    case "payment_intent.succeeded":
      const paymentIntent = event.data.object as Stripe.PaymentIntent;
      console.log("Payment Intent succeeded: ", paymentIntent);
      break;

    case "payment_method.attached":
      const paymentMethod = event.data.object as Stripe.PaymentMethod;
      console.log("Payment Method attached: ", paymentMethod);
      break;

    default:
      console.log(`Unhandled event type ${event.type}`);
  }

  res.json({ received: true });
};
