import mongoose from 'mongoose';

const schema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});
export const UserModel = mongoose.model('users', schema);
