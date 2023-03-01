import { Router } from 'express';
import Product from '../models/product';
import multer from 'multer';
import multerConf from '../controller/multer';

import ProductController from '../controller/productController';

const router = Router();
const upload = multer(multerConf);

router.post('/', upload.single('image'), ProductController.create);

router.get('/', async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (err) {
    res.status(404).json({ message: 'Products not found' });
  }
});

router.get('/:id', async (req, res) => {
  const _id = req.params;
  try {
    const product = await Product.findById(_id);

    product
      ? res.status(200).json(product)
      : res.status(404).json({ message: 'Product not found' });
  } catch (err) {
    res.status(404).json({ message: 'Product not found' });
  }
});

router.put('/:id', async (req, res) => {
  const _id = req.params;
  const { name, description, brand, image, price } = req.body;

  const product = {
    name,
    description,
    brand,
    image,
    price,
  };

  try {
    const updateProduct = await Product.findOneAndUpdate(_id, product);
    console.log('updateProduct', updateProduct);

    updateProduct
      ? res.status(200).json(product)
      : res.status(404).json({ message: 'Product not found' });
  } catch (err) {
    res.status(404).json({ message: 'Product not found' });
  }
});

router.delete('/:id', async (req, res) => {
  const _id = req.params;

  const getProduct = await Product.findById(_id);

  if (!getProduct) {
    return res.status(404).json({ message: 'Product not found' });
  }

  try {
    await Product.deleteOne(_id);
    res.status(200).json({ message: 'Product deleted' });
  } catch (err) {
    res.status(404).json({ message: 'Product not found' });
  }
});

export default router;
