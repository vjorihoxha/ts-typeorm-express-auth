import { Router } from 'express';

import auth from './auth';
import users from './users';
import {checkJwt} from "middlewares/checkJwt";

const router = Router();

router.use('/auth', auth);
router.use('/users', [checkJwt], users);

export default router;