import { Router } from "express";
import {
  signUp,
  signIn,
  google,
  signOut,
  refreshToken,
} from "../controllers/auth.controller.js";

const router = Router();

router.route("/signup").post(signUp);
router.route("/signin").post(signIn);
router.route("/google").post(google);
router.route("/signout").post(signOut);
router.route("/refreshToken").post(refreshToken);

export default router;
