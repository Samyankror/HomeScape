import { Router } from "express";
import {
  signUp,
  signIn,
  google,
  signOut,
} from "../controllers/auth.controller.js";

const router = Router();

router.route("/signup").post(signUp);
router.route("/signin").post(signIn);
router.route("/google").post(google);
router.route("/signout").get(signOut);

export default router;
