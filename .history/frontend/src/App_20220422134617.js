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
import { showToast } from './Common';
import { PageHeader, Tabs, Button, Statistic, Descriptions } from 'antd';

toast.configure();

function App() {
  const [employeeList, setEmployeeList] = useState([]);

  const dataExportCSV = employeeList.filter((data) => {
    return delete data['Password'] && delete data['__v'];
  });
  const extraContent = (
    <div
      style={{
        display: 'flex',
        width: 'max-content',
        justifyContent: 'flex-end',
      }}
    >
      <Statistic
        title='Status'
        value='Pending'
        style={{
          marginRight: 32,
        }}
      />
      <Statistic title='Price' prefix='$' value={568.08} />
    </div>
  );

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
          showToast('Add new employee successfully !', 'success', 'colored');
        } catch (error) {
          showToast(error, 'error', 'colored');
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
          showToast(employeeRemove.message, 'error', 'colored');
        } else {
          showToast(employeeRemove.message, 'success', 'colored');
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
      try {
        const responseUpdate = await apiEmployees.updateEmployee(data);
        setEmployeeList(
          employeeList.map((employee) => {
            return employee?._id === responseUpdate?.updateEmployee._id
              ? { ...responseUpdate?.updateEmployee }
              : employee;
          })
        );
        showToast('Update successfully !', 'success', 'colored');
      } catch (error) {
        showToast(error, 'error', 'colored');
      }
    })();
  };
  console.log(employeeList);
  return (
    <>
      <Routes>
        <Route path='/' index element={<Login />} />
        <Route
          path='/employee'
          element={
            <>
              <Row className='header'>
                {/* <Col xs={2} sm={4} md={6} lg={8} xl={10}>
                  <ModalForm onChange={handleAddStudent} />
                </Col>

                <Col xs={20} sm={16} md={12} lg={8} xl={4}>
                  EMPLOYEE LIST
                </Col> */}
                <PageHeader
                  className='site-page-header-responsive'
                  onBack={() => window.history.back()}
                  title='Title'
                  subTitle='This is a subtitle'
                  extra={[
                    <Button key='3'>Operation</Button>,
                    <Button key='2'>Operation</Button>,
                    <Button key='1' type='primary'>
                      Primary
                    </Button>,
                  ]}
                  footer={
                    <Tabs defaultActiveKey='1'>
                      <TabPane tab='Details' key='1' />
                      <TabPane tab='Rule' key='2' />
                    </Tabs>
                  }
                >
                  <Content extra={extraContent}>{renderContent()}</Content>
                </PageHeader>

                <Col xs={4} sm={16} md={12} lg={8} xl={4}>
                  <ExportCSV
                    csvData={dataExportCSV}
                    fileName={'employee list'}
                  />
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
