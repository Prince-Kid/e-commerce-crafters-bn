
import express from "express"
import { deleteProduct, updateProduct,readProduct, searchProduct } from "../controllers/product.controller"
const router = express.Router()




router.get("/product/:id", readProduct);
router.get("/products/search", searchProduct)
router.put('/updateProduct/:id', updateProduct);
router.delete('/deleteProduct/:id', deleteProduct);

export default router;
