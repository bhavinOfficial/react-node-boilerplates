import Joi from 'joi';
import { Request, Response } from 'express';
import validator from '../middlewares/joi.validator';
import categoryService from '../services/category.service';
import ApiResponse from '../common/apiResponse';

const categoryController = {
  createCategoryRequest: {
    validation: validator({
      body: Joi.object({
        name: Joi.string(),
        description: Joi.string(),
      }),
    }),

    handler: async (req: Request, res: Response) => {
      const createdCategory = await categoryService.createCategory(req);
      return ApiResponse.CREATED({
        res,
        message: 'Category created successfully.',
        payload: {},
      });
    },
  },

  getCategoriesRequest: {
    validation: validator({}),

    handler: async (req: Request, res: Response) => {
      const fetchedCategories = await categoryService.getCategories(req);
      return ApiResponse.OK({
        res,
        message: 'Categories fetched successfully.',
        payload: fetchedCategories,
      });
    },
  },

  getCategoryByIdRequest: {
    validation: validator({
      params: {
        categoryId: Joi.number().positive().greater(0).required(),
      },
    }),

    handler: async (req: Request, res: Response) => {
      const fetchedCategory = await categoryService.getCategoryById(req);
      return ApiResponse.OK({
        res,
        message: 'Category fetched successfully.',
        payload: fetchedCategory,
      });
    },
  },

  deleteCategoryRequest: {
    validation: validator({
      params: {
        categoryId: Joi.number().positive().greater(0).required(),
      },
    }),

    handler: async (req: Request, res: Response) => {
      const removeCategory = await categoryService.deleteCategory(req);
      return ApiResponse.OK({
        res,
        message: 'Category deleted successfully.',
        payload: {},
      });
    },
  },

  updateCategoryRequest: {
    validation: validator({
      params: {
        categoryId: Joi.number().positive().required().greater(0),
      },
      body: {
        name: Joi.string(),
        description: Joi.string(),
      },
    }),

    handler: async (req: Request, res: Response) => {
      const data = await categoryService.updateCategory(req);
      return ApiResponse.OK({
        res,
        message: 'Category updated successfully.',
        payload: {},
      });
    },
  },
};

export default categoryController;
