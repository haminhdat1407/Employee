import React from 'react';
import PropTypes from 'prop-types';
import { Form, Input, Button, Checkbox } from 'antd';
Login.propTypes = {};

function Login(props) {
    const Demo = () => {
        const onFinish = (values: any) => {
          console.log('Success:', values);
        };
      
        const onFinishFailed = (errorInfo: any) => {
          console.log('Failed:', errorInfo);
        };
  return <div></div>;
}

export default Login;
