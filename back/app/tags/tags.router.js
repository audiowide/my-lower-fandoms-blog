import express from 'express';
import { DeleteTag, ShowAllTags, CreateTag } from './tags.controller.js';
import { protect } from '../middlewares/auth.middleware.js';


const router = express.Router();

router.route('/').get(ShowAllTags)
router.route('/').post(protect, CreateTag)

router.route('/:id').delete(protect, DeleteTag)

export default router;