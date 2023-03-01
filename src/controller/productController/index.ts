import Product from '../../models/product';

const ProductController = {
  async create(req: any, res: any) {
    const { name, description, brand, price } = req.body;
    const { filename } = req.file;

    const product = {
      name,
      description,
      brand,
      filename,
      price,
    };

    try {
      await Product.create(product);
      res.status(201).json({ message: 'Product created' });
    } catch (err) {
      console.log(err);
      res.status(404).json({ message: 'Product not created' });
    }
  },

  // const product = {
  //   name,
  //   description,
  //   brand,
  //   image: filename,
  //   price,
  // };

  // try {
  //   await Product.create(product);
  //   console.log(product);
  //   res.status(201).json({ message: 'Product created' });
  // } catch (err) {
  //   console.log(err);
  //   res.status(404).json({ message: 'Product not created' });
  // }
};

export default ProductController;
