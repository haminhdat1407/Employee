import React, { useState } from 'react';
import 'antd/dist/antd.css';
import { Table, Space } from 'antd';
import PropTypes from 'prop-types';
import {
  Button,
  Form,
  Input,
  InputNumber,
  Modal,
  Radio,
  Typography,
} from 'antd';
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import '/Employee/frontend/src/components/EmployeeList/style.css';
const { Text } = Typography;

const { confirm } = Modal;

EmployeeList.propTypes = {
  data: PropTypes.array,
  onRemove: PropTypes.func,
  onEdit: PropTypes.func,
  errorMessage: PropTypes.string,
};
function EmployeeList({ data, onRemove, onEdit }) {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [employeeEdit, setEmployeeEdit] = useState(null);

  const onEditEmployee = (record) => {
    setIsModalVisible(true);
    setEmployeeEdit({ ...record });
  };

  const handleEditForm = (valueForm) => {
    onEdit(valueForm);
    setIsModalVisible(false);
  };

  const handleCloseModal = () => {
    setIsModalVisible(false);
  };

  const handleRemove = (id) => {
    onRemove(id);
  };

  const showDeleteConfirm = (data) => {
    confirm({
      title: 'Are you sure delete this employee?',
      icon: <ExclamationCircleOutlined />,
      okText: 'Yes',
      okType: 'danger',
      cancelText: 'No',
      onOk() {
        handleRemove(data._id);
      },
      onCancel() {
        console.log('Cancel');
      },
    });
  };
  const columns = [
    {
      title: 'ID',
      dataIndex: '_id',
      key: 'id',
    },
    {
      title: 'First Name',
      dataIndex: 'FirstName',
      key: 'firstname',
    },
    {
      title: 'Middle Name',
      dataIndex: 'MiddleName',
      key: 'middlename',
    },
    {
      title: 'Last Name',
      dataIndex: 'LastName',
      key: 'lastName',
    },
    {
      title: 'Email',
      key: 'email',
      dataIndex: 'Email',
    },
    // {
    //   title: 'Password',
    //   key: 'password',
    //   dataIndex: 'Password',
    // },
    {
      title: 'Phone',
      key: 'phone',
      dataIndex: 'Phone',
    },
    {
      title: 'Gender',
      key: 'gender',
      dataIndex: 'Gender',
    },
    {
      title: 'Date Of Birth',
      key: 'dateOfBirth',
      dataIndex: 'DateOfBirth',
    },
    {
      title: 'Action',
      key: 'action',
      render: (dataIndex, data) => (
        <Space size='middle'>
          <button onClick={() => onEditEmployee(dataIndex, data)}>Edit </button>
          <button type='primary' danger onClick={() => showDeleteConfirm(data)}>
            Delete
          </button>
        </Space>
      ),
    },
  ];
  return (
    <>
      <Table
        className='ant-table-wrapper'
        dataSource={data}
        columns={columns}
      ></Table>
      {/* MODAL EDIT  */}
      {isModalVisible === true && (
        <Modal
          title='Edit Employee'
          visible={isModalVisible}
          onCancel={handleCloseModal}
        >
          <Form
            labelCol={{
              span: 5,
            }}
            wrapperCol={{
              span: 14,
            }}
            initialValues={{
              _id: employeeEdit?._id,
              FirstName: employeeEdit?.FirstName,
              MiddleName: employeeEdit?.MiddleName,
              LastName: employeeEdit?.LastName,
              Email: employeeEdit?.Email,
              Password: employeeEdit?.Password,
              Phone: employeeEdit?.Phone,
              Gender: employeeEdit?.Gender === 'Male' ? 'Male' : 'Female',
              DateOfBirth: employeeEdit?.DateOfBirth,
            }}
            onFinish={handleEditForm}
          >
            <Form.Item label='ID Employee' name='_id'>
              <Input disabled />
            </Form.Item>
            <Form.Item
              label='First Name'
              name='FirstName'
              rules={[
                {
                  required: true,
                  message: 'Please input your name!',
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label='Middle Name'
              name='MiddleName'
              rules={[
                {
                  required: true,
                  message: 'Please input your name!',
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label='Last Name'
              name='LastName'
              rules={[
                {
                  required: true,
                  message: 'Please input your name!',
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label='Email'
              name='Email'
              rules={[
                {
                  required: true,
                  message: 'Please input your email!',
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label='Password'
              name='Password'
              rules={[
                {
                  required: true,
                  message: 'Please input password!',
                },
              ]}
            >
              <Input.Password
                placeholder='input password'
                iconRender={(visible) =>
                  visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                }
              />
            </Form.Item>
            <Form.Item
              label='Phone'
              name='Phone'
              rules={[
                {
                  required: true,
                  message: 'Please input your phone!',
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label='Gender'
              name='Gender'
              rules={[
                {
                  required: true,
                  message: 'Please tick your gender!',
                },
              ]}
            >
              <Radio.Group style={{ marginLeft: '12px' }}>
                <Radio value={'Male'}>Male</Radio>
                <Radio value={'Female'}>Female</Radio>
              </Radio.Group>
            </Form.Item>
            <Form.Item
              label='Date Of Birth'
              name='DateOfBirth'
              rules={[
                {
                  required: true,
                  message: 'Age must be older from 18 to 60 age !',
                  type: 'number',
                  min: 18,
                  max: 60,
                },
              ]}
            >
              <InputNumber />
            </Form.Item>
            <Form.Item style={{ marginLeft: '58px' }}>
              <Button
                block
                htmlType='submit'
                style={{ backgroundColor: 'aqua' }}
              >
                Edit
              </Button>
            </Form.Item>
            {/* <Text type='danger'>{errorMessage}</Text> */}
          </Form>
        </Modal>
      )}
    </>
  );
}
export default EmployeeList;
