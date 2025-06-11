import { Request } from 'express';
import userRepository from '../repositories/user.repository';

const userService = {
  addUser: async (req: Request) => {
    const data = await userRepository.addUser(req);
    return data;
  },

  getUsers: async (req: Request) => {
    const data = await userRepository.getUsers(req);
    return data;
  },

  getUserById: async (req: Request) => {
    const data = await userRepository.getUserById(req);
    return data;
  },

  deleteUser: async (req: Request) => {
    const data = await userRepository.deleteUser(req);
    return data;
  },

  updateUser: async (req: Request) => {
    const data = await userRepository.updateUser(req);
    return data;
  },
};

export default userService;
