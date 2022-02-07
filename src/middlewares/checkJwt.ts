import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

import { JwtPayload } from 'types/JwtPayload';
import { CustomError } from 'utils/response/custom-error/CustomError';

export const checkJwt = (req: Request, res: Response, next: NextFunction) => {
	const authHeader = req.get('Authorization');
	if (!authHeader) {
		const customError = new CustomError(
			400,
			'General',
			'Authorization header not provided',
		);
		return next(customError);
	}

	const token = authHeader.split(' ')[1];
	let jwtPayload: { [key: string]: any };
	try {
		jwtPayload = jwt.verify(token, process.env.JWT_SECRET as string) as {
			[key: string]: any;
		};
		['iat', 'exp'].forEach((keyToRemove) => delete jwtPayload[keyToRemove]);
		req.jwtPayload = jwtPayload as JwtPayload;
		return next();
	} catch (err) {
		const customError = new CustomError(401, 'Raw', 'JWT error', null, err);
		return next(customError);
	}
};
