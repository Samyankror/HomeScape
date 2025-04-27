import { Router } from "express"
import { createListing, deleteListing,updateListing, getListing } from "../controllers/listing.controller.js";
import { verifyToken } from "../utils/verifyUser.js";



const router = Router();

router.route('/create').post(verifyToken,createListing);
router.route('/delete/:id').delete(verifyToken,deleteListing)
router.route('/update/:id').post(verifyToken,updateListing)
router.route('/get/:id').get(getListing)
export default router;