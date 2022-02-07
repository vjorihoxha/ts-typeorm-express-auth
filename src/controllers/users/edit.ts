import { Request, Response, NextFunction } from 'express';
import { getRepository } from 'typeorm';

import { User } from 'typeorm/entities/User';
import { CustomError } from 'utils/response/custom-error/CustomError';

/**
 * Updates the user's name.
 * @param req
 * @param res
 * @param next
 */
export const edit = async (req: Request, res: Response, next: NextFunction) => {
	const id = req.params.id;
	const { name } = req.body;

	const userRepository = getRepository(User);
	try {
		const user = await userRepository.findOne({ where: { id } });

		if (!user) {
			const customError = new CustomError(
				404,
				'General',
				`User with id:${id} not found.`,
				['User not found.'],
			);
			return next(customError);
		}

		user.name = name;

		try {
			await userRepository.save(user);
			res.customSuccess(200, 'User successfully saved.');
		} catch (err) {
			const customError = new CustomError(
				409,
				'Raw',
				`User '${user.email}' can't be saved.`,
				null,
				err,
			);
			return next(customError);
		}
	} catch (err) {
		const customError = new CustomError(400, 'Raw', 'Error', null, err);
		return next(customError);
	}
};
