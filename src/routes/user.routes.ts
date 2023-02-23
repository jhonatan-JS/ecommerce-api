import { Router } from 'express';
import User from '../models/user';

const router = Router();

router.post('/', async (req, res) => {
  const { name, email, password } = req.body;

  const user = {
    name,
    email,
    password,
  };

  try {
    await User.create(user);
    res.status(201).json({ message: 'User created' });
  } catch (err) {}
});

router.get('/', async (req, res) => {
  try {
    const users = await User.find();

    res.status(200).json(users);
  } catch (err) {}
});

router.get('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const user = await User.findById({ _id: id });

    user
      ? res.status(200).json(user)
      : res.status(404).json({ message: 'User not found' });
  } catch (err) {
    res.status(404).json({ message: 'User not found' });
  }
});

router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { name, email, password } = req.body;

  const user = {
    name,
    email,
    password,
  };

  try {
    const updateUser = await User.updateOne({ _id: id }, user);

    updateUser
      ? res.status(200).json(user)
      : res.status(404).json({ message: 'User not found' });
  } catch (err) {
    res.status(404).json({ message: 'User not found' });
  }
});

router.delete('/:id', async (req, res) => {
  const { id } = req.params;

  const getUser = await User.findById({ _id: id });

  if (!getUser) {
    return res.status(404).json({ message: 'User not found' });
  }

  try {
    await User.deleteOne({ _id: id });
    res.status(200).json({ message: 'User deleted' });
  } catch (err) {
    res.status(404).json({ message: 'User not found' });
  }
});

export default router;
