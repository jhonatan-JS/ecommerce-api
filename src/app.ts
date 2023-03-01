import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
mongoose.set('strictQuery', true);

import userRoutes from './routes/user.routes';
import productRoutes from './routes/products.routes';

import dotenv from 'dotenv';
dotenv.config();
const MONGO_URL = process.env.MONGO_URL;

const app = express();
app.use(
  express.urlencoded({
    extended: true,
  }),
);

app.use(express.json());
app.use(cors({ origin: '*' }));
app.use('/user', userRoutes);
app.use('/product', productRoutes);

mongoose
  .connect(`${MONGO_URL}`)

  .then(() => {
    app.listen(process.env.PORT || 3333, () => {
      console.log('Server started on port 3333');
    });
  })
  .catch((err: any) => {
    console.log('Connection failed:', err);
  });
