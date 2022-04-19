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
const checkTypeDelete = async (gender) => {
  const employees = await EmployeeModel.find();
  let isFemale;
  const isExist = employees.forEach((emp) => {
    if (emp.Gender === gender) {
      isFemale = true;
    }
    return isFemale;
  });
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
      success: false,
      message: 'Email already using.',
    });
  }
  if (await checkPhoneIsAvailable(req.body.Phone)) {
    res.status(500).json({
      success: false,
      message: 'Phone number already using.',
    });
  }
  try {
    const newEmployee = req.body;
    const employee = new EmployeeModel(newEmployee);
    await employee.save();

    res.status(200).json(employee);
  } catch (err) {
    res.status(500).json({ error: err });
  }
};
//update
export const updateEmployee = async (req, res) => {
  // if (await checkExistAccount(req.body.Email, req.body.Phone)) {
  //   res.status(500).json({
  //     success: false,
  //     message: 'Email or Phone number already using.',
  //   });
  // }
  try {
    const id = req.params.employeeID;
    const updateObject = req.body;
    EmployeeModel.findByIdAndUpdate({ _id: id }, { $set: updateObject })
      .exec()
      .then(() => {
        res.status(200).json({
          success: true,
          messgae: ' Changes have been saved',
          updateEmployee: updateObject,
        });
      });
  } catch (err) {
    // res.status(500).json({
    //   success: false,
    //   messgae: ' Server error. Please try again',
    // });
    res.status(500).json({ error: err });
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
        messgae: 'Can not delete gender is female..',
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
