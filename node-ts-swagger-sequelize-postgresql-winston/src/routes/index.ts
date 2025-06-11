import { Response, Router } from 'express';
const router = Router();

import categoryRoute from './categories.routes';
import userRoute from './user.routes';
import productRoute from './product.routes';
import ApiResponse from '../common/apiResponse';

router.use('/category/', categoryRoute);
router.use('/user/', userRoute);
router.use('/product/', productRoute);

//* Root Route
router.get('/', (_: any, res: Response) => {
  return ApiResponse.OK({
    res,
    message: 'Welcome to the Avakash E-commerce pvt. ltd.',
  });
});

// //* Wrong Route
router.use((_: any, res: Response) => {
  return ApiResponse.NOT_FOUND({
    res,
    message: `Oops! Looks like you're lost`,
  });
});

export default router;
