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
  const isExist = employees.forEach((emp) => {
    if (emp.Phone === phoneNumber) {
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
  });
  return isFemale;
};
checkTypeDelete('Female');

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
  // if (await checkTypeDelete('Female')) {
  //   res.status(500).json({
  //     success: false,
  //     message: 'Can not delete gender is Female.',
  //   });
  // }

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
