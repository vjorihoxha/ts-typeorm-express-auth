import { Router } from 'express';

import { changePassword, login, register } from 'controllers/auth';

import {
	validatorChangePassword,
	validatorLogin,
	validatorRegister,
} from 'middlewares/validation/auth';
import { checkJwt } from 'middlewares/checkJwt';

const router = Router();

router.post('/login', [validatorLogin], login);
router.post('/register', [validatorRegister], register);
router.post(
	'/change-password',
	[checkJwt, validatorChangePassword],
	changePassword,
);

export default router;
