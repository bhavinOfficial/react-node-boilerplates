import { Request } from 'express';
import db from '../db/models';

const categoryRepository = {
  createCategory: async (req: Request) => {
    const newCategory = await db.categories.create(req.body);
    const plainResponse = JSON.parse(JSON.stringify(newCategory));
    if (plainResponse && plainResponse.id) {
      return plainResponse;
    }
  },

  getCategories: async (req: Request) => {
    const allCategories = await db.categories.findAll();
    const plainResponse = JSON.parse(JSON.stringify(allCategories));
    return plainResponse;
  },

  getCategoryById: async (req: Request) => {
    const category = await db.categories.findByPk(req?.params?.categoryId);
    const plainResponse = JSON.parse(JSON.stringify(category));
    return plainResponse;
  },

  deleteCategory: async (req: Request) => {
    const category = await db.categories.destroy({
      where: {
        id: req?.params?.categoryId,
      },
    });
    return category;
  },

  updateCategory: async (req: Request) => {
    const category = await db.categories.update(req.body, {
      where: {
        id: req?.params?.categoryId,
      },
    });
    return category;
  },
};

export default categoryRepository;
