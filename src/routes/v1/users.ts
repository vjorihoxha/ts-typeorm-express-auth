import { Router } from 'express';

import { list, show, edit, destroy } from 'controllers/users';

const router = Router();

router.get('/', list);

router.get('/:id', show);

router.patch('/:id', edit);

router.delete('/:id', destroy);

export default router;
