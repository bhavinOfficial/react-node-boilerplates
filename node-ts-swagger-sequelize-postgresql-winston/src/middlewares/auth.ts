/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextFunction, Request, Response } from 'express';
import ApiResponse from '../common/apiResponse';
import utils from '../common/utils';
import enums from '../common/enums';
import message from '../common/message';

//* Interface for auth options parameters
export interface AuthOptions {
  isTokenRequired?: boolean;
  usersAllowed?: string[];
}

//* Interface for find user from database
export interface userTokenDecoded {
  id: string;
  email: string;
  roles: [string];
}

const auth = ({ isTokenRequired = true, usersAllowed = [] }: AuthOptions) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    //* get token from request header and remove Bearer from it
    const token = req.header('Authorization')?.replace(/Bearer +/g, '') || '';

    //* check if token is required and token is present in the request header or not`
    if (token === undefined)
      return ApiResponse.UNAUTHORIZED({ res, message: message.TOKEN_REQUIRED });

    //* check if token is required and token is present in the request header or not
    if (isTokenRequired && !token)
      return ApiResponse.UNAUTHORIZED({ res, message: message.TOKEN_REQUIRED });

    //* check if token is not required and token is present in the request header or not
    if (!isTokenRequired && !token) return next();

    const userTokenDecoded: any = await utils.decodeToken({ token });

    //* check if id & role is present in the token
    // if (
    //   !userTokenDecoded?.roles?.includes(enums.ROLE.SERVICE_CLIENT) &&
    //   (!userTokenDecoded?.id ||
    //     !userTokenDecoded?.roles ||
    //     !userTokenDecoded?.roles?.length)
    // )
    //   return ApiResponse.UNAUTHORIZED({ res, message: message.INVALID_TOKEN });

    //* Make user object and assign decoded token to it
    // req.user = {
    //   ...userTokenDecoded,
    //   id: userTokenDecoded.id,
    // };

    //* check if user is allowed to access the route or not
    //? check if user is admin or not
    // if (req.user.roles.includes(enums.ROLES.ADMIN)) return next();

    //? check if all are allowed to access the route or not
    if (usersAllowed.includes('*')) return next();

    //? check if perticuler role is allowed to access the route or not
    // if (usersAllowed.some((role) => req.user.roles?.includes(role)))
    //   return next();

    return ApiResponse.UNAUTHORIZED({ res, message: message.ACCESS_DENIED });
  };
};

export default auth;
