import { Request, Response, NextFunction } from 'express';
import { getRepository } from 'typeorm';

import { User } from 'typeorm/entities/User';
import { JwtPayload } from 'types/JwtPayload';
import { createJwtToken } from 'utils/createJwtToken';
import { CustomError } from 'utils/response/custom-error/CustomError';

export const login = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	const { email, password } = req.body;

	const userRepository = getRepository(User);
	try {
		//Using QueryBuilder in order to add the hidden column which is password
		const user = await userRepository
			.createQueryBuilder()
			.select()
			.addSelect(['User.password'])
			.where('email = :email', { email })
			.getOne();

		if (!user) {
			const customError = new CustomError(404, 'General', 'Not Found', [
				'Incorrect email or password',
			]);
			return next(customError);
		}

		if (!user.checkIfPasswordMatch(password)) {
			const customError = new CustomError(404, 'General', 'Not Found', [
				'Incorrect email or password',
			]);
			return next(customError);
		}

		const jwtPayload: JwtPayload = {
			id: user.id,
			name: user.name,
			email: user.email,
			created_at: user.created_at,
			updated_at: user.updated_at,
		};

		try {
			const token = createJwtToken(jwtPayload);
			res.customSuccess(
				200,
				'Token successfully created.',
				`Bearer ${token}`,
			);
		} catch (err) {
			const customError = new CustomError(
				400,
				'Raw',
				"Token can't be created",
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
