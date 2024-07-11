import { Router } from "express";
import { toggleWishlistItem, fetchWishlist } from "../controllers/wishlist.controller";

const router = Router();

router.post("/toWishlist", toggleWishlistItem);
router.get("/toWishlist/:userId", fetchWishlist);


export default router