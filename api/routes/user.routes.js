import { Router } from 'express' 
import { test } from '../controllers/user.controllers.js';

const router = Router()

router.route('/test').get(test);

export default router;