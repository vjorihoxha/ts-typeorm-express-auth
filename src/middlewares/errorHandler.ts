import { Request, Response } from 'express';

import { CustomError } from '../utils/response/custom-error/CustomError';

export const errorHandler = (
	err: CustomError,
	req: Request,
	res: Response,
) => {
	return res.status(err.HttpStatusCode).json(err.JSON);
};
