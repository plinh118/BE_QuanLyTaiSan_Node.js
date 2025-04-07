import express from 'express';
import {
  getProducts,
  addProduct,
  updateProduct,
  deleteProduct
} from '../../controllers/management-product/product.controller';

const productRouter = express.Router();

productRouter.get('/', getProducts);
productRouter.post('/', addProduct);
productRouter.patch('/', updateProduct);
productRouter.delete('/', deleteProduct);

export default productRouter;