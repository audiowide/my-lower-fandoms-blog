import  express from 'express';
import { CreateArticle, DeleteArticle, ShowAllArticles, ShowArticle, UpdateArticle } from './article.controller.js';
import { protect } from '../middlewares/auth.middleware.js';
import { AddNewComment, DeleteComment } from './comment/comment.controller.js';


const router = express.Router();

router.route('/').get(ShowAllArticles)
router.route('/').post(protect, CreateArticle)

router.route('/:slug').get(ShowArticle)
router.route('/:slug').put(protect, UpdateArticle)
router.route('/:slug').delete(protect, DeleteArticle)

// Comments
router.route('/:slug/comments').post(protect, AddNewComment)
router.route('/:slug/comments/:commentId').delete(protect, DeleteComment)

export default router;