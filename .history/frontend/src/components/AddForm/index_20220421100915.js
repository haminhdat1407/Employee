import PropTypes from 'prop-types';
import { Button, Form, Input, InputNumber, Modal, Radio } from 'antd';
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import React, { useState } from 'react';
import '../../App.css';
import './style.css';
ModalForm.propTypes = {
  onChange: PropTypes.func,
  errorMessage: PropTypes.string,
};

function ModalForm({ onChange }) {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [dataForm, setDataForm] = useState({});

  const [form] = Form.useForm();
  const onFinish = (e) => {
    const newEmployee = {
      ...e,
    };
    setDataForm(newEmployee);
    onChange(newEmployee);
    setIsModalVisible(false);
  };

  const showModal = () => {
    setIsModalVisible(true);
    form.resetFields();
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
      <Button className='btn-action2' type='primary' onClick={showModal}>
        Add Employee
      </Button>

      <Modal
        title='Add Employee'
        visible={isModalVisible}
        onCancel={cancelModal}
      >
        {/* Form */}
        <div className='add'>
          <Form
            labelCol={{
              span: 5,
            }}
            wrapperCol={{
              span: 14,
            }}
            form={form}
            onFinish={onFinish}
            validateMessages={validateMessages}
          >
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
              <Input showCount maxLength={200} placeholder='Input first name' />
            </Form.Item>
            <Form.Item
              label='Middle Name'
              name='MiddleName'
              placeholder='Input Middle Name'
              rules={[
                {
                  required: true,
                  message: 'Please input your name!',
                },
              ]}
            >
              <Input
                showCount
                maxLength={200}
                placeholder='Input middle name'
              />
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
                onClick={handleSubmit}
                className='ant-btn-primary '
              >
                Submit
              </Button>
            </Form.Item>
          </Form>
        </div>
      </Modal>
    </>
  );
}

export default ModalForm;
