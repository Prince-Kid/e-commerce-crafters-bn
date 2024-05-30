import express from "express"
import { Welcome, deleteUser, editUser, login, register, updatePassword } from "../controllers/user.controller";
import { addReview } from "../controllers/review.controller";

const route = express.Router();

route.get("/", Welcome);

route.post("/register", register);
route.patch("/updateuser/:id", editUser)
route.patch("/updatepassword/:id", updatePassword)
route.delete("/deleteuser/:id", deleteUser);
route.post("/login", login);
route.post("/addreview/:id", addReview);

export default route;
