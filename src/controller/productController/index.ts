import Product from '../../models/product';
import upDrive from './drive';

const ProductController = {
  async create(req: any, res: any) {
    const { path } = req.file;

    if (await Product.findOne({ name: req.body.name })) {
      return res.status(400).json({ error: 'Produto já existente' });
    }

    const responseFile = await upDrive(path);
    const pathFile =
      'https://drive.google.com/uc?export=view&id=' + responseFile?.data.id;

    const product = {
      name: req.body.name,
      description: req.body.description,
      brand: req.body.brand,
      image: pathFile,
      price: parseInt(req.body.price),
    };

    try {
      await Product.create(product);
      res.status(201).json({ message: 'Product created' });
    } catch (err) {
      console.log(err);
      res.status(404).json({ message: 'Product not created' });
    }
  },

  async getAll(req: any, res: any) {
    try {
      const products = await Product.find();
      res.status(200).json(products);
    } catch (err) {
      console.log('err', err);
      res.status(404).json({ message: 'Products not found' });
    }
  },

  async getById(req: any, res: any) {
    const id = req.params.id;
    console.log('id:', id);
    try {
      const product = await Product.findById(id);

      product
        ? res.status(200).json(product)
        : res.status(404).json({ message: 'Product not found' });
    } catch (err) {
      res.status(404).json({ message: 'Product not found' });
    }
  },

  async update(req: any, res: any) {
    const id = req.params.id;
    const { path } = req.file;

    const responseFile = await upDrive(path);
    const pathFile =
      'https://drive.google.com/uc?export=view&id=' + responseFile?.data.id;

    const productUpdated = {
      name: req.body.name,
      description: req.body.description,
      brand: req.body.brand,
      image: pathFile,
      price: parseInt(req.body.price),
    };

    try {
      const updateProduct = await Product.findByIdAndUpdate(
        id,
        productUpdated,
        {
          new: true,
        },
      );

      res.status(200).json(updateProduct);
    } catch (err) {
      console.log('err', err);
      res.status(404).json({ message: 'Product not found' });
    }
  },

  async delete(req: any, res: any) {
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
  },
};

export default ProductController;
