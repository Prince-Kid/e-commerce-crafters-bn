import express from "express"
import { getAllMessage, getAllVendors, getVendors, sendMessage } from "../controllers/Chat.controller"
const Router = express.Router()

Router.post("/chat", sendMessage)
Router.get("/get-message", getAllMessage)
Router.get("/get-vendor/:id", getVendors)
Router.get("/get-all-vendor", getAllVendors)



export default Router