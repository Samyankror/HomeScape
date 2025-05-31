import { Router } from "express";

import { upload } from "../middlewares/multer.middleware.js";
import { uploadImage } from "../controllers/image.upload.controller.js";

const router = Router();

router.route("/image").post(upload.single("image"), uploadImage);

export default router;
