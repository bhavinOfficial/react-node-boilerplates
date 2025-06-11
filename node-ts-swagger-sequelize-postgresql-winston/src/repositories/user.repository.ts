import { Request } from 'express';
import db from '../db/models';

const userRepository = {
  addUser: async (req: Request) => {
    const newUser = await db.users.create(req.body);
    const plainResponse = JSON.parse(JSON.stringify(newUser));
    if (plainResponse && plainResponse.id) {
      return plainResponse;
    }
  },

  getUsers: async (req: Request) => {
    const allUsers = await db.Users.findAll();
    const plainResponse = JSON.parse(JSON.stringify(allUsers));
    return plainResponse;
  },

  getUserById: async (req: Request) => {
    const user = await db.users.findByPk(req?.params?.UserId);
    const plainResponse = JSON.parse(JSON.stringify(user));
    return plainResponse;
  },

  deleteUser: async (req: Request) => {
    const user = await db.users.destroy({
      where: {
        id: req?.params?.userId,
      },
    });
    return user;
  },

  updateUser: async (req: Request) => {
    const user = await db.users.update(req.body, {
      where: {
        id: req?.params?.userId,
      },
    });
    return user;
  },
};

export default userRepository;
