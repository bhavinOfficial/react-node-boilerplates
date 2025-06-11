import JWT from 'jsonwebtoken';
import config from '../config/env.config';

const utils = {
  decodeToken: async ({ token }: { token: string }) => {
    const decoded = await JWT.verify(token, config.jwt.secret_key);
    return decoded;
  },
};

export default utils;
