import {Router} from 'express';
import attendantRoutes from './attendant/attendant.route';

const router = Router();

router.use('/attendant', attendantRoutes);

export default router;