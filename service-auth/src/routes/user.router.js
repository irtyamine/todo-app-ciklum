import { Router } from 'express';
import { getProfile } from '../controllers/user.controllers';
import passport from 'passport'

const router = Router();

// /api/me
router.get('/', passport.authenticate('jwt', {session: false}), getProfile);

export default router;