import { Router } from 'express';
import Product from '../models/product';
import multer from 'multer';
import multerConf from '../controller/multer';

import ProductController from '../controller/productController';

const router = Router();
const upload = multer(multerConf);

router.post('/', upload.single('image'), ProductController.create);

router.get('/', ProductController.getAll);

router.get('/:id', ProductController.getById);

router.put('/:id', upload.single('image'), ProductController.update);

router.delete('/:id', async (req, res) => {
  const getProduct = await Product.findById({ _id: req.params.id });

  if (!getProduct) {
    return res.status(404).json({ message: 'Product not found' });
  }

  try {
    await Product.deleteOne({ _id: req.params.id });
    res.status(200).json({ message: 'Product deleted' });
  } catch (err) {
    res.status(404).json({ message: 'Product not found' });
  }
});

export default router;
