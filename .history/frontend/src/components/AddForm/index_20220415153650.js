import PropTypes from 'prop-types';
import { Button, Form, Input, InputNumber, Modal, Radio } from 'antd';
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Typography } from 'antd';
import '/Employee/frontend/src/components/AddForm/style.css';
const { Text } = Typography;

ModalForm.propTypes = {
  onChange: PropTypes.func,
  errorMessage: PropTypes.string,
};

function ModalForm({ onChange, errorMessage }) {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [dataForm, setDataForm] = useState();

  const onFinish = (e) => {
    const newEmployee = {
      _id: uuidv4(),
      ...e,
    };
    setDataForm(newEmployee);
    onChange(newEmployee);
  };

  const showModal = () => {
    setIsModalVisible(true);
  };
  const cancelModal = () => {
    setIsModalVisible(false);
  };

  const handleSubmit = () => {
    if (!dataForm) setIsModalVisible(true);
  };

  const validateMessages = {
    required: '${label} is required!',
    types: {
      email: '${label} is not a valid email!',
    },
  };
  return (
    <>
      <Button type='primary' onClick={showModal}>
        Add Employee
      </Button>
      <Modal
        title='Add Employee'
        visible={isModalVisible}
        onCancel={cancelModal}
      >
        {/* Form */}
        <Form
          labelCol={{
            span: 5,
          }}
          wrapperCol={{
            span: 14,
          }}
          onFinish={onFinish}
          validateMessages={validateMessages}
        >
          <Form.Item label='First Name' name='FirstName'>
            <Input showCount maxLength={200} placeholder='Input first name' />
          </Form.Item>
          <Form.Item
            label='Middle Name'
            name='MiddleName'
            placeholder='Input Middle Name'
          >
            <Input showCount maxLength={200} placeholder='Input middle name' />
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
            <Input showCount maxLength={200} placeholder='Input last name' />
          </Form.Item>
          <Form.Item
            name={['Email']}
            label='Email'
            rules={[{ required: true, type: 'email' }]}
          >
            <Input placeholder='Input Email' />
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
              placeholder='Input password'
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
            <Input showCount maxLength={11} placeholder='Input phone' />
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
            label='DateOfBirth'
            name='DateOfBirth'
            rules={[
              {
                required: true,
                message: 'Age must be older from 0 to 120 age !',
                type: 'number',
                min: 0,
                max: 120,
              },
            ]}
          >
            <InputNumber />
          </Form.Item>

          <Form.Item style={{ marginLeft: '58px' }}>
            <Button block htmlType='submit' onClick={handleSubmit}>
              Submit
            </Button>
          </Form.Item>
          <Text type='danger'>{errorMessage}</Text>
        </Form>
      </Modal>
    </>
  );
}

export default ModalForm;
