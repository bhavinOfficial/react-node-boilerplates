import Joi from 'joi';
import { Request, Response } from 'express';
import validator from '../middlewares/joi.validator';
import userService from '../services/user.service';
import ApiResponse from '../common/apiResponse';

const userController = {
  addUserRequest: {
    validation: validator({
      body: Joi.object({
        firstName: Joi.string(),
        lastName: Joi.string(),
        email: Joi.string().email().required(),
        role: Joi.string().required(),
        password: Joi.string().required(),
      }),
    }),

    handler: async (req: Request, res: Response) => {
      const createdUser = await userService.addUser(req);
      return ApiResponse.OK({
        res,
        message: 'User added successfully.',
        payload: {},
      });
    },
  },

  getUsersRequest: {
    validation: validator({}),

    handler: async (req: Request, res: Response) => {
      const fetchedUsers = await userService.getUsers(req);
      return ApiResponse.OK({
        res,
        message: 'Users fetched successfully.',
        payload: fetchedUsers,
      });
    },
  },

  getUserByIdRequest: {
    validation: validator({
      params: {
        userId: Joi.number().positive().greater(0).required(),
      },
    }),

    handler: async (req: Request, res: Response) => {
      const fetcheduser = await userService.getUserById(req);
      return ApiResponse.OK({
        res,
        message: 'User fetched successfully.',
        payload: fetcheduser,
      });
    },
  },

  deleteUserRequest: {
    validation: validator({
      params: {
        userId: Joi.number().positive().greater(0).required(),
      },
    }),

    handler: async (req: Request, res: Response) => {
      const removeuser = await userService.deleteUser(req);
      return ApiResponse.OK({
        res,
        message: 'User deleted successfully.',
        payload: {},
      });
    },
  },

  updateUserRequest: {
    validation: validator({
      params: {
        userId: Joi.number().positive().required().greater(0),
      },
      body: {
        name: Joi.string(),
        description: Joi.string(),
      },
    }),

    handler: async (req: Request, res: Response) => {
      const data = await userService.updateUser(req);
      return ApiResponse.OK({
        res,
        message: 'User updated successfully.',
        payload: {},
      });
    },
  },
};

export default userController;
