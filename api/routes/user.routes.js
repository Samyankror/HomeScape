import { Router } from 'express' 
import { test } from '../controllers/user.controller.js';
import { updateUser } from '../controllers/user.controller.js';
import { verifyToken } from '../utils/verifyUser.js';
import { uploadProfileImage } from '../controllers/user.controller.js';
import { upload } from '../middlewares/multer.middleware.js';
import { deleteUser } from '../controllers/user.controller.js';

const router = Router()

router.route('/test').get(test);
router.route('/update/:id').post(verifyToken,updateUser)
router.route('/uploadProfileImage').post(upload.single('avatar'),uploadProfileImage);
router.route('/delete/:id').delete(verifyToken,deleteUser)

export default router;