import { Col, Row } from 'antd';
import React, { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import apiEmployees from './api/apiEmployee';
import './App.css';
import ModalForm from './components/AddForm';
import EmployeeList from './components/EmployeeList';
import Login from './components/Login';
import { ExportCSV } from '../../frontend/src/components/ExportCSV';

toast.configure();

function App() {
  const [employeeList, setEmployeeList] = useState([]);

  const showToast = (message, type) => {
    return toast(message, {
      position: toast.POSITION.TOP_RIGHT,
      draggable: true,
      theme: 'dark',
      type: type,
    });
  };

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
          showToast('Add new employee successfully !', 'success');
        } catch (error) {
          showToast(error, 'error');
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
        if (employeeRemove.isFemale) {
          showToast(employeeRemove.message, 'error');
        } else {
          showToast(employeeRemove.message, 'success');
        }
        const newEmployeeList = employeeList.filter((employee) => {
          return employee._id !== idEmployee;
        });
        if (employeeRemove.isFemale) return;
        setEmployeeList(newEmployeeList);
      })();
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
      showToast('Update successfully !', 'success');
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
                  <ModalForm onChange={handleAddStudent} />
                </Col>
                <Col xs={4} sm={16} md={12} lg={8} xl={4}>
                  <ExportCSV
                    csvData={employeeList}
                    fileName={'employee list'}
                  />
                </Col>
                <Col xs={20} sm={16} md={12} lg={8} xl={4}>
                  EMPLOYEE LIST
                </Col>
              </Row>
              <EmployeeList
                style={{ marginTop: '50px' }}
                data={employeeList}
                onRemove={handleDeleteEmployee}
                onEdit={handleEditStudent}
              />
            </>
          }
        />
      </Routes>
    </>
  );
}

export default App;
