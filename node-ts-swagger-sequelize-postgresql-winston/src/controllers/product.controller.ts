import Joi from 'joi';
import { Request, Response } from 'express';
import validator from '../middlewares/joi.validator';
import productService from '../services/product.service';
import ApiResponse from '../common/apiResponse';

const productController = {
  addProductRequest: {
    validation: validator({
      body: Joi.object({
        name: Joi.string(),
        description: Joi.string(),
      }),
    }),

    handler: async (req: Request, res: Response) => {
      const createdProduct = await productService.addProduct(req);
      return ApiResponse.OK({
        res,
        message: 'Product added successfully.',
        payload: {},
      });
    },
  },

  getProductsRequest: {
    validation: validator({}),

    handler: async (req: Request, res: Response) => {
      const fetchedProducts = await productService.getProducts(req);
      return ApiResponse.OK({
        res,
        message: 'Products fetched successfully.',
        payload: fetchedProducts,
      });
    },
  },

  getProductByIdRequest: {
    validation: validator({
      params: {
        productId: Joi.number().positive().greater(0).required(),
      },
    }),

    handler: async (req: Request, res: Response) => {
      const fetchedProduct = await productService.getProductById(req);
      return ApiResponse.OK({
        res,
        message: 'Product fetched successfully.',
        payload: fetchedProduct,
      });
    },
  },

  deleteProductRequest: {
    validation: validator({
      params: {
        productId: Joi.number().positive().greater(0).required(),
      },
    }),

    handler: async (req: Request, res: Response) => {
      const removeproduct = await productService.deleteProduct(req);
      return ApiResponse.OK({
        res,
        message: 'Product deleted successfully.',
        payload: {},
      });
    },
  },

  updateProductRequest: {
    validation: validator({
      params: {
        productId: Joi.number().positive().required().greater(0),
      },
      body: {
        name: Joi.string(),
        description: Joi.string(),
      },
    }),

    handler: async (req: Request, res: Response) => {
      const data = await productService.updateProduct(req);
      return ApiResponse.OK({
        res,
        message: 'Product updated successfully.',
        payload: {},
      });
    },
  },
};

export default productController;
