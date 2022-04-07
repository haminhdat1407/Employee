import express from 'express';
import { EmployeeModel } from '../models/EmployeeModel.js';

import {
  getEmployees,
  createEmployee,
  updateEmployee,
  deleteEmployee,
} from '../controllers/employees.js';

const router = express.Router();

router.get('/', getEmployees);
router.post('/', createEmployee);
router.put('/:employeeID', updateEmployee);
router.delete('/:employeeID', deleteEmployee);

export default router;
