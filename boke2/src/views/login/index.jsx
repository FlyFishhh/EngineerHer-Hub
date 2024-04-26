import React, { memo, useEffect } from "react";
import { LockOutlined, UserOutlined, MailOutlined } from "@ant-design/icons";
import { Button, Checkbox, Form, Input, message } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { LoginWrapper } from "./style";
import { login } from "@/services/modules/home";
const Login = memo(() => {
  const navigate = useNavigate();
  const onFinish = async (values) => {
    try {
      const response = await login(values);
      if (response.code === 200) {
        localStorage.setItem("token", response.data.id);
        localStorage.setItem("userInfo", JSON.stringify(response.data));
        message.success("login success!");
        navigate("/home");
      } else {
        message.error(response.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    localStorage.clear();
  }, []);

  return (
    <LoginWrapper>
      <div className="login">
        <Form
          name="normal_login"
          className="login-form"
          size="large"
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
        >
          <div className="title">Techladies Hub</div>
          <Form.Item
            name="email"
            rules={[
              {
                type: "email",
                message: "The input is not valid E-mail!",
              },
              {
                required: true,
                message: "Please input your Email!",
              },
            ]}
          >
            <Input
              prefix={<MailOutlined className="site-form-item-icon" />}
              placeholder="Email"
            />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[
              {
                required: true,
                message: "Please input your Password!",
              },
            ]}
          >
            <Input.Password
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="Password"
            />
          </Form.Item>
          {/* <Form.Item>
            <a className="login-form-forgot" href="">
              Forgot password
            </a>
          </Form.Item> */}
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="login-form-button"
            >
              Log in
            </Button>
          </Form.Item>
          No Account ? <Link to="/register">register now!</Link>
        </Form>
      </div>
    </LoginWrapper>
  );
});

export default Login;
