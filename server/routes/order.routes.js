import express from "express";
import {
  createOrder,
  getAllOrders,
  getMyOrders,
  updateOrderStatus,
  deleteOrder
} from "../controllers/order.controller.js";
import { verifyJWT } from "../middleware/auth.middleware.js";
import { checkRole } from "../middleware/checkRole.js";

const router = express.Router();

router.use(verifyJWT);

router.post("/", createOrder);  
router.get("/my", getMyOrders);  


router.use(checkRole("admin"));
router.get("/", getAllOrders);    
router.put("/:id", updateOrderStatus);   
router.delete("/:id", deleteOrder);      

export default router;
