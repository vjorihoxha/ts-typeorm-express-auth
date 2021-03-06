import { Request, Response, NextFunction } from 'express';
import { getRepository } from 'typeorm';

import { User } from 'typeorm/entities/User';
import { CustomError } from 'utils/response/custom-error/CustomError';

/**
 * Returns all users within `users` table.
 * @param req
 * @param res
 * @param next
 */
export const list = async (req: Request, res: Response, next: NextFunction) => {
	const userRepository = getRepository(User);
	try {
		const users = await userRepository.find();
		res.customSuccess(200, 'List of users.', users);
	} catch (err) {
		const customError = new CustomError(
			400,
			'Raw',
			`Can't retrieve list of users.`,
			null,
			err,
		);
		return next(customError);
	}
};
