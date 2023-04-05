import express from 'express';
import { ChangeUser, ShowUser } from './user.controller.js';
import { protect } from '../middlewares/auth.middleware.js';


const router = express.Router();

router.route('/:id').get(ShowUser);
router.route('/:id').put(protect, ChangeUser);

export default router;