import { Router } from "express"
import { createListing } from "../controllers/listing.controller.js";
import { verifyToken } from "../utils/verifyUser.js";
import { upload } from "../middlewares/multer.middleware.js";
import { uploadImage } from "../controllers/image.upload.controller.js";


const router = Router();

router.route('/create').post(verifyToken,createListing);


export default router;