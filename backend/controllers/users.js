import { UserModel } from '../models/UserModel.js';

//get all
export const getUsers = async (req, res) => {
  try {
    const users = await UserModel.find();
    console.log('users', users);
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ error: err });
  }
};

//create
export const createUsers = async (req, res) => {
  try {
    const newUser = req.body;
    const user = new UserModel(newUser);
    await user.save();
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: err });
  }
};
