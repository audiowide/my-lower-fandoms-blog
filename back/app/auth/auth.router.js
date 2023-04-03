import express from 'express';
import { SignIn, SignUp } from './auth.controller.js';

const router = express.Router();

router.route('/sign-in').post(SignIn)
router.route('/sign-up').post(SignUp)

export default router;