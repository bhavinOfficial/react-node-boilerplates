import { Request } from 'express';
import productRepository from '../repositories/product.repository';

const productService = {
  addProduct: async (req: Request) => {
    const data = await productRepository.addProduct(req);
    return data;
  },

  getProducts: async (req: Request) => {
    const data = await productRepository.getProducts(req);
    return data;
  },

  getProductById: async (req: Request) => {
    const data = await productRepository.getProductById(req);
    return data;
  },

  deleteProduct: async (req: Request) => {
    const data = await productRepository.deleteProduct(req);
    return data;
  },

  updateProduct: async (req: Request) => {
    const data = await productRepository.updateProduct(req);
    return data;
  },
};

export default productService;
