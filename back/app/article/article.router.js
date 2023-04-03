import  express from 'express';
import { CreateArticle, ShowAllArticles, ShowArticle, UpdateArticle } from './article.controller';
import { protect } from '../middlewares/auth.middleware';


const router = express.Router();

router.route('/').get(ShowAllArticles)
router.route('/').post(protect, CreateArticle)

router.route('/:id').get(ShowArticle)
router.route('/:id').put(protect, UpdateArticle)
router.route('/:id').delete(protect, DeleteArticle)

export default router;