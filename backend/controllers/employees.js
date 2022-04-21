import { EmployeeModel } from '../models/EmployeeModel.js';

const checkEmailAvailable = async (email) => {
  const employees = await EmployeeModel.find();
  let isEmailAvailable;
  const isExist = employees.forEach((emp) => {
    if (emp.Email === email) {
      isEmailAvailable = true;
    }
  });
  return isEmailAvailable;
};
const checkPhoneIsAvailable = async (phoneNumber) => {
  const employees = await EmployeeModel.find();
  let isPhoneAvailable;
  employees.forEach((emp) => {
    if (Number(emp.Phone) === Number(phoneNumber)) {
      isPhoneAvailable = true;
    }
  });
  return isPhoneAvailable;
};

//all
export const getEmployees = async (req, res) => {
  try {
    const employees = await EmployeeModel.find();
    console.log('employees', employees);
    res.status(200).json(employees);
  } catch (err) {
    res.status(500).json({ error: err });
  }
};
//create
export const createEmployee = async (req, res) => {
  if (await checkEmailAvailable(req.body.Email)) {
    res.status(500).json({
      message: 'Email already using.',
    });
  } else if (await checkPhoneIsAvailable(req.body.Phone)) {
    res.status(500).json({
      message: 'Phone number already using.',
    });
  } else {
    try {
      const newEmployee = req.body;
      const employee = new EmployeeModel(newEmployee);
      await employee.save();
      res.status(200).json(employee);
    } catch (err) {
      res.status(500).json({ error: err });
    }
  }
};
//update
export const updateEmployee = async (req, res) => {
  const id = req.params.employeeID;
  const updateObject = req.body;
  const employees = await EmployeeModel.findById(id);
  const currentEmail = employees.Email;
  const currentPhoneNumber = employees.Phone;
  if (
    (await checkEmailAvailable(updateObject.Email)) &&
    updateObject.Email !== currentEmail
  ) {
    res.status(500).json({
      message: 'Email already using.Please try again.',
    });
  } else if (
    (await checkPhoneIsAvailable(updateObject.Phone)) &&
    updateObject.Phone !== currentPhoneNumber
  ) {
    res.status(500).json({
      message: 'Phone number already using.Please try again.',
    });
  } else {
    try {
      EmployeeModel.findByIdAndUpdate({ _id: id }, { $set: updateObject })
        .exec()
        .then(() => {
          res.status(200).json({
            success: true,
            messgae: 'Changes have been saved',
            updateEmployee: updateObject,
          });
        });
    } catch (err) {
      res.status(500).json({
        success: false,
        messgae: ' Server error. Please try again',
      });
    }
  }
};
//Delete
export const deleteEmployee = async (req, res) => {
  const id = req.params.employeeID;
  const employees = await EmployeeModel.findById(id);
  try {
    if (employees.Gender === 'Female') {
      res.send({
        isFemale: true,
        message: 'Can not delete gender is female..',
      });
    } else {
      EmployeeModel.findByIdAndDelete(id).then((data) => {
        res.send({
          isMale: true,
          message: 'Employee was deleted successfully!',
        });
      });
    }
  } catch (err) {
    res.status(500).json({ error: err });
  }
};
