import { Router } from "express";
import { updateUser } from "../controllers/user.controller.js";
import { verifyToken } from "../utils/verifyUser.js";
import { getUserListing } from "../controllers/user.controller.js";
import { deleteUser, getUser } from "../controllers/user.controller.js";

const router = Router();


router.route("/update/:id").post(verifyToken, updateUser);
router.route("/delete/:id").delete(verifyToken, deleteUser);
router.route("/listings/:id").get(verifyToken, getUserListing);
router.route("/:id").get(verifyToken, getUser);

export default router;
