import { Request } from 'express';
import db from '../db/models';

const productRepository = {
  addProduct: async (req: Request) => {
    const newproduct = await db.products.create(req.body);
    const plainResponse = JSON.parse(JSON.stringify(newproduct));
    if (plainResponse && plainResponse.id) {
      return plainResponse;
    }
  },

  getProducts: async (req: Request) => {
    const allproducts = await db.products.findAll();
    const plainResponse = JSON.parse(JSON.stringify(allproducts));
    return plainResponse;
  },

  getProductById: async (req: Request) => {
    const product = await db.products.findByPk(req?.params?.productId);
    const plainResponse = JSON.parse(JSON.stringify(product));
    return plainResponse;
  },

  deleteProduct: async (req: Request) => {
    const product = await db.products.destroy({
      where: {
        id: req?.params?.productId,
      },
    });
    return product;
  },

  updateProduct: async (req: Request) => {
    const product = await db.products.update(req.body, {
      where: {
        id: req?.params?.productId,
      },
    });
    return product;
  },
};

export default productRepository;
