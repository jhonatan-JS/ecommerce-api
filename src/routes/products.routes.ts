import { Router } from 'express';
import Product from '../models/product';
import multer from 'multer';
import multerConf from '../controller/multer';

import productController from '../controller/productController';

const router = Router();

const upload = multer(multerConf);

router.post('/', upload.single('image'), async (req, res) => {
  const { name, description, brand, image, price } = req.body;
  let flag = false;
  const fileMulter = req.file;

  const createProduct = async () => {
    const product = {
      name,
      description,
      brand,
      image,
      price,
    };

    try {
      await Product.create(product);
      res.status(201).json({ message: 'Product created' });
    } catch (err) {
      res.status(404).json({ message: 'Product not created' });
    }
  };

  setTimeout(async () => {
    await productController(fileMulter);
    createProduct();
  }, 4000);
});

router.get('/', async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (err) {
    res.status(404).json({ message: 'Products not found' });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const product = await Product.findById({ _id: req.params.id });

    product
      ? res.status(200).json(product)
      : res.status(404).json({ message: 'Product not found' });
  } catch (err) {
    res.status(404).json({ message: 'Product not found' });
  }
});

router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { name, description, brand, photo, price } = req.body;

  const product = {
    name,
    description,
    brand,
    photo,
    price,
  };

  try {
    const updateProduct = await Product.updateOne({ _id: id }, product);

    updateProduct
      ? res.status(200).json(product)
      : res.status(404).json({ message: 'Product not found' });
  } catch (err) {
    res.status(404).json({ message: 'Product not found' });
  }
});

router.delete('/:id', async (req, res) => {
  const { id } = req.params;

  const getProduct = await Product.findById({ _id: id });

  if (!getProduct) {
    return res.status(404).json({ message: 'Product not found' });
  }

  try {
    await Product.deleteOne({ _id: id });
    res.status(200).json({ message: 'Product deleted' });
  } catch (err) {
    res.status(404).json({ message: 'Product not found' });
  }
});

export default router;
