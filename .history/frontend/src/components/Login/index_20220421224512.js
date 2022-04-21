import { Alert, Button, Form, Input } from 'antd';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './style.css';
import '../../App.css';

function Login(props) {
  let navigate = useNavigate();
  const onFinish = (values) => {
    if ((values.username === 'admin') & (values.password === '123')) {
      navigate(`/employee`);
      localStorage.setItem('token', 'akidadajdjhhah');
    } else {
    }
  };
  return (
    <div className='lg'>
      <div className='login'>
        <Form
          name='basic'
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          autoComplete='off'
        >
          <p className='p-login'>WELCOME TO EMPLOYEE LIST</p>
          <div className='bsd'>
            <Form.Item
              label='Username'
              name='username'
              rules={[
                { required: true, message: 'Please input your username!' },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label='Password'
              name='password'
              rules={[
                { required: true, message: 'Please input your password!' },
              ]}
            >
              <Input.Password />
            </Form.Item>

            <Form.Item wrapperCol={{ offset: 6, span: 12 }}>
              <Button type='primary' shape='round' htmlType='submit'>
                Submit
              </Button>
            </Form.Item>
          </div>
        </Form>
      </div>

      <span>{error}</span>
    </div>
  );
}

export default Login;
