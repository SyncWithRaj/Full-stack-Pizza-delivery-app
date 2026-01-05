import express from "express";
import { verifyJWT } from "../middleware/auth.middleware.js";
import { checkRole } from "../middleware/checkRole.js";
import { getAdminStats } from "../controllers/admin.controller.js";

const router = express.Router();

router.use(verifyJWT, checkRole("admin"));

router.get("/stats", getAdminStats);

export default router;
