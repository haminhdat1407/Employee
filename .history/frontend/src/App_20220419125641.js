import React, { useEffect, useState } from 'react';
import apiEmployees from './api/apiEmployee';
import { Col, Row, Button } from 'antd';
import EmployeeList from './components/EmployeeList';
import ModalForm from './components/AddForm';
import Login from './components/Login';
import './App.css';
import { Routes, Router, Route } from 'react-router-dom';
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';

function App() {
  const [employeeList, setEmployeeList] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');

  //getAll
  useEffect(() => {
    try {
      (async () => {
        const responeseEmployee = await apiEmployees.getAll();
        setEmployeeList(responeseEmployee);
      })();
    } catch (error) {
      console.log(error);
    }
  }, []);

  //add
  const handleAddStudent = (data) => {
    if (data) {
      (async () => {
        try {
          const newEmployee = await apiEmployees.addEmployee(data);
          setEmployeeList((prevEmployee) => [newEmployee, ...prevEmployee]);
        } catch (error) {
          setErrorMessage(error);
        }
      })();
    }
  };
  //delete
  const handleDeleteEmployee = (idEmployee) => {
    if (idEmployee) {
      (async () => {
        const employeeRemove = await apiEmployees.removeEmployeeByID(
          idEmployee
        );
      })();
      const newEmployeeList = employeeList.filter((employee) => {
        return employee._id !== idEmployee;
      });
      setEmployeeList(newEmployeeList);
    }
  };
  //edit
  const handleEditStudent = (data) => {
    if (!data && typeof data === undefined) return;
    (async () => {
      const responseUpdate = await apiEmployees.updateEmployee(data);
      setEmployeeList(
        employeeList.map((employee) => {
          return employee?._id === responseUpdate?.updateEmployee._id
            ? { ...responseUpdate?.updateEmployee }
            : employee;
        })
      );
    })();
  };

  return (
    <>
      <Routes>
        <Route path='/' index element={<Login />} />
        <Route
          path='/employee'
          element={
            <>
              <Row className='header'>
                <Col xs={2} sm={4} md={6} lg={8} xl={10}>
                  <ModalForm
                    onChange={handleAddStudent}
                    errorMessage={errorMessage}
                  />
                </Col>
                <Col xs={20} sm={16} md={12} lg={8} xl={4}>
                  EMPLOYEE LIST
                </Col>
                <Col xs={20} sm={16} md={12} lg={8} xl={4}></Col>
              </Row>
              <EmployeeList
                style={{ marginTop: '50px' }}
                data={employeeList}
                onRemove={handleDeleteEmployee}
                onEdit={handleEditStudent}
                errorMessage={errorMessage}
              />
            </>
          }
        />
      </Routes>
    </>
  );
}

export default App;
