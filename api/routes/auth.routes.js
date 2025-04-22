import { Router } from "express";
import { signUp, signIn,google} from "../controllers/auth.controllers.js";





const router = Router();

router.route('/signup').post(signUp);
router.route('/signin').post(signIn);
router.route('/google').post(google);


export default router;