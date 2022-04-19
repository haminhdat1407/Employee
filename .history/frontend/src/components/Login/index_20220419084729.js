import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { Form, Input, Button, Checkbox, Alert } from 'antd';
import '/Employee/frontend/src/components/Login/style.css';

function Login(props) {
  const [error, setError] = useState('');
  let navigate = useNavigate();
  const onFinish = (values) => {
    if ((values.username === 'admin') & (values.password === '123')) {
      navigate(`/employee`);
      localStorage.setItem('token', 'akidadajdjhhah');
    } else {
      setError(
        <Alert
          style={{ position: 'absolute', top: '5%', right: '5%' }}
          // className='error-login'
          message='Error'
          description='Wrong Username or Password.'
          type='error'
          showIcon
          closable
        />
      );
    }
  };
  return (
    <>
      <div className='aaaaa'></div>
      <Form
        name='basic'
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        autoComplete='off'
      >
        <Form.Item
          label='Username'
          name='username'
          rules={[{ required: true, message: 'Please input your username!' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label='Password'
          name='password'
          rules={[{ required: true, message: 'Please input your password!' }]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type='primary' htmlType='submit'>
            Submit
          </Button>
        </Form.Item>
      </Form>
      <span>{error}</span>
    </>
  );
}

export default Login;
