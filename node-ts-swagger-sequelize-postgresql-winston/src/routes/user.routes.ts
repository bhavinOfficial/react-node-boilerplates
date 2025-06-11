import { Router } from 'express';
import userController from '../controllers/user.controller';
import auth from '../middlewares/auth';

const router = Router();

router.post(
  '/',
  auth({
    isTokenRequired: false,
    usersAllowed: [],
  }),
  userController.addUserRequest.validation,
  userController.addUserRequest.handler
);

router.get(
  '/',
  auth({
    isTokenRequired: false,
    usersAllowed: [],
  }),
  userController.getUsersRequest.validation,
  userController.getUsersRequest.handler
);

router.get(
  '/',
  auth({
    isTokenRequired: false,
    usersAllowed: [],
  }),
  userController.getUserByIdRequest.validation,
  userController.getUserByIdRequest.handler
);

router.delete(
  '/',
  auth({
    isTokenRequired: false,
    usersAllowed: [],
  }),
  userController.deleteUserRequest.validation,
  userController.deleteUserRequest.handler
);

router.put(
  '/',
  auth({
    isTokenRequired: false,
    usersAllowed: [],
  }),
  userController.updateUserRequest.validation,
  userController.updateUserRequest.handler
);

export default router;
