import { Request } from 'express';
import categoryRepository from '../repositories/category.repository';

const categoryService = {
  createCategory: async (req: Request) => {
    const data = await categoryRepository.createCategory(req);
    return data;
  },

  getCategories: async (req: Request) => {
    const data = await categoryRepository.getCategories(req);
    return data;
  },

  getCategoryById: async (req: Request) => {
    const data = await categoryRepository.getCategoryById(req);
    return data;
  },

  deleteCategory: async (req: Request) => {
    const data = await categoryRepository.deleteCategory(req);
    return data;
  },

  updateCategory: async (req: Request) => {
    const data = await categoryRepository.updateCategory(req);
    return data;
  },
};

export default categoryService;
