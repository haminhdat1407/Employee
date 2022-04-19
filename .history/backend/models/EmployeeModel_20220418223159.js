import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const schema = new mongoose.Schema({
  _id: {
    type: String,
    // require: true,
  },
  FirstName: {
    type: String,
    require: true,
  },
  MiddleName: {
    type: String,
    require: true,
  },
  LastName: {
    type: String,
    require: true,
  },
  Email: {
    type: String,
    require: true,
  },
  Password: {
    type: String,
    require: true,
  },
  Phone: {
    type: Number,
    require: true,
  },
  Gender: {
    type: String,
    require: true,
  },
  DateOfBirth: {
    type: Number,
    require: true,
  },
});
schema.pre('save', function (next) {
  let empployee = this;
  bcrypt.hash(empployee.Password, 10, function (error, hash) {
    if (error) {
      return next(error);
    } else {
      empployee.Password = hash;
      next();
    }
  });
});
export const EmployeeModel = mongoose.model('Employee', schema);
