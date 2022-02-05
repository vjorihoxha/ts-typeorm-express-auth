import { Router } from 'express';

import { register } from 'controllers/auth';

import {validatorRegister} from "middlewares/validation/auth";

const router = Router();

router.post('/register', [validatorRegister] , register);

export default router;
