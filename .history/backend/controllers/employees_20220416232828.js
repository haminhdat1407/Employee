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
  let isEmailAvailable;
  const isExist = employees.forEach((emp) => {
    if (emp.Phone === phoneNumber) {
      isEmailAvailable = true;
    }
  });
  return isEmailAvailable;
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
  if (await checkExistAccount(req.body.Email, req.body.Phone)) {
    res.status(500).json({
      success: false,
      message: 'Email or Phone number already using.',
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
  if (await checkExistAccount(req.body.Email, req.body.Phone)) {
    res.status(500).json({
      success: false,
      message: 'Email or Phone number already using.',
    });
  }
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

  EmployeeModel.findByIdAndRemove(id)
    .exec()
    .then(() =>
      res.status(200).json({
        success: true,
        message: 'Delete Successfull.',
      })
    )
    .catch((err) =>
      res.status(500).json({
        success: false,
        message: 'Server error. Please try again',
      })
    );
};
