import React, { memo, useState, useEffect } from "react";
import {
  LockOutlined,
  UserOutlined,
  MailOutlined,
  SafetyOutlined,
} from "@ant-design/icons";
import { Button, Checkbox, Form, Input, Row, Col, message } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { RegisterWrapper } from "./style";
import { getCode, register } from "@/services/modules/home";
import Password from "antd/lib/input/Password";
const Register = memo(() => {
  const navigate = useNavigate();
  const [isSending, setIsSending] = useState(false);
  const [countdown, setCountdown] = useState(0);

  const [form] = Form.useForm();

  const handeleGetCode = async () => {
    if (form.getFieldValue("email")) {
      try {
        let param = {
          email: form.getFieldValue("email"),
        };
        const response = await getCode(param);
        if (response.code === 200) {
          message.success("success!");
          setIsSending(true);
          setCountdown(60);
        }
      } catch (error) {
        console.log(error);
      }
    } else {
      message.warning("Please input email!");
    }
  };

  useEffect(() => {
    let countdownInterval;

    if (isSending && countdown > 0) {
      countdownInterval = setInterval(() => {
        setCountdown((prevCountdown) => prevCountdown - 1);
      }, 1000);
    } else {
      setIsSending(false);
      setCountdown(60);
    }

    return () => {
      clearInterval(countdownInterval);
    };
  }, [isSending, countdown]);

  const buttonText = isSending ? `${countdown}s` : "get code";

  const onFinish = async (values) => {
    try {
      const response = await register(values);
      if (response.code === 200) {
        message.success("success!");
        localStorage.setItem("token", response.data.id);
        localStorage.setItem("userInfo", JSON.stringify(response.data));
        navigate("/home");
      } else {
        message.error(response.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const checkPassword = (rule, value, callback) => {
    if (
      value &&
      !/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{8,11}$/.test(
        value
      )
    ) {
      callback(
        new Error(
          "The password consists of 8-11 letters and numbers"
        )
      );
    } else {
      callback();
    }
    // 回调一定不要忘记了
  };

  return (
    <RegisterWrapper>
      <div className="register">
        <Form
          form={form}
          name="normal_login"
          className="login-form"
          size="large"
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
                message: "Please input email!",
              },
            ]}
          >
            <Row style={{ width: "100%" }} gutter={0}>
              <Col span={16}>
                <Input
                  prefix={<MailOutlined className="site-form-item-icon" />}
                  placeholder="Email"
                />
              </Col>
              <Col span={8}>
                <Button
                  style={{ width: "100%" }}
                  type="primary"
                  disabled={isSending}
                  onClick={handeleGetCode}
                >
                  {buttonText}
                </Button>
              </Col>
            </Row>
          </Form.Item>
          <Form.Item
            name="code"
            rules={[
              {
                required: true,
                message: "Please input code!",
              },
            ]}
          >
            <Input
              prefix={<SafetyOutlined className="site-form-item-icon" />}
              placeholder="Code"
            />
          </Form.Item>
          <Form.Item
            name="name"
            rules={[
              {
                required: true,
                message: "Please input userName!",
              },
            ]}
          >
            <Input
              prefix={<UserOutlined className="site-form-item-icon" />}
              placeholder="UserName"
            />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[
              {
                required: true,
                message: "Please input your Password!",
              },
              {
                validator: checkPassword,
              },
            ]}
          >
            <Input.Password
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="Password"
            />
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="login-form-button"
            >
              Submit
            </Button>
          </Form.Item>
          have Account ? <Link to="/login">login now!</Link>
        </Form>
      </div>
    </RegisterWrapper>
  );
});

export default Register;
