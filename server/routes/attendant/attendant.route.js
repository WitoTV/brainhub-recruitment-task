import {Router} from 'express';
import attendantController from './attendant.controller';

const router = Router();

router.route('/add')
	.post(attendantController.add);

export default router;