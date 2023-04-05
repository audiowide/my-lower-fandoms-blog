import  express from 'express';
import { CreateArticle, DeleteArticle, ShowAllArticles, ShowArticle, UpdateArticle } from './article.controller.js';
import { protect } from '../middlewares/auth.middleware.js';


const router = express.Router();

router.route('/').get(ShowAllArticles)
router.route('/').post(protect, CreateArticle)

router.route('/:slug').get(ShowArticle)
router.route('/:slug').put(protect, UpdateArticle)
router.route('/:slug').delete(protect, DeleteArticle)

export default router;