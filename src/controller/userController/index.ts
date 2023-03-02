import User from '../../models/user';

const UserController = {
  async create(req: any, res: any) {
    const { email, password } = req.body;

    if (await User.findOne({ email })) {
      return res.status(400).json({ error: 'Usuário já existente' });
    }

    const user = {
      email,
      password,
    };

    try {
      const isExist = await User.findOne({ email: req.body.email });

      if (isExist) {
        return res.status(409).json({ message: 'User ja existe' });
      }

      await User.create(user);
      res.status(201).json({ message: 'User created' });
    } catch (err) {}
  },

  async getAll(req: any, res: any) {
    try {
      const users = await User.find();

      res.status(200).json(users);
    } catch (err) {}
  },

  async login(req: any, res: any) {},

  async getById(req: any, res: any) {
    const _id = req.params;

    try {
      const user = await User.findById(_id);

      user
        ? res.status(200).json(user)
        : res.status(404).json({ message: 'User not found' });
    } catch (err) {
      res.status(404).json({ message: 'User not found' });
    }
  },

  async update(req: any, res: any) {
    const _id = req.params;
    const { name, email, password } = req.body;

    const userCurrent = await User.findById(_id);

    if (!userCurrent) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (userCurrent.email !== email) {
      return res.status(404).json({ message: 'Email error' });
    }

    const user = {
      name,
      email,
      password,
    };

    try {
      const updateUser = await User.findOneAndUpdate(_id, user);

      updateUser
        ? res.status(200).json(user)
        : res.status(404).json({ message: 'User not found' });
    } catch (err) {
      res.status(404).json({ message: 'User not found' });
    }
  },

  async delete(req: any, res: any) {
    const getUser = await User.findById({ _id: req.params.id });

    if (!getUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    try {
      await User.deleteOne({ _id: req.params.id });
      res.status(200).json({ message: 'User deleted' });
    } catch (err) {
      res.status(404).json({ message: 'User not found' });
    }
  },
};

export default UserController;
