import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
mongoose.set('strictQuery', true);

import userRoutes from './routes/user.routes';
import productRoutes from './routes/products.routes';

import dotenv from 'dotenv';
dotenv.config();
const DB_USER = process.env.DB_USER;
const DB_PASS = encodeURIComponent(process.env.DB_PASS || '');

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
  .connect(
    `mongodb+srv://${DB_USER}:${DB_PASS}@cluster0.pwl4ean.mongodb.net/?retryWrites=true&w=majority`,
  )

  .then(() => {
    app.listen(3333, () => {
      console.log('Server started on port 3333');
    });
  })
  .catch((err: any) => {
    console.log('Connection failed:', err);
  });
