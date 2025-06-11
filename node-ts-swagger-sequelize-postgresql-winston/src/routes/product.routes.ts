import { Router } from 'express';
import productController from '../controllers/product.controller';
import auth from '../middlewares/auth';

const router = Router();

router.post(
  '/',
  auth({
    isTokenRequired: false,
    usersAllowed: [],
  }),
  productController.addProductRequest.validation,
  productController.addProductRequest.handler
);

router.get(
  '/',
  auth({
    isTokenRequired: false,
    usersAllowed: [],
  }),
  productController.getProductsRequest.validation,
  productController.getProductsRequest.handler
);

router.get(
  '/',
  auth({
    isTokenRequired: false,
    usersAllowed: [],
  }),
  productController.getProductByIdRequest.validation,
  productController.getProductByIdRequest.handler
);

router.delete(
  '/',
  auth({
    isTokenRequired: false,
    usersAllowed: [],
  }),
  productController.deleteProductRequest.validation,
  productController.deleteProductRequest.handler
);

router.put(
  '/',
  auth({
    isTokenRequired: false,
    usersAllowed: [],
  }),
  productController.updateProductRequest.validation,
  productController.updateProductRequest.handler
);

export default router;
