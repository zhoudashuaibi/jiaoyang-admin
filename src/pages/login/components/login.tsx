import React from "react";
import type { FormProps } from "antd";
import { Button, Form, Input, Col, Row } from "antd";
import { useNavigate } from "react-router-dom";
import { login } from "@/api/user";

type FieldType = {
  account?: string;
  password?: string;
};

import useUserStore from "@/store/modules/user";

const LoginForm: React.FC = () => {
  const navigate = useNavigate();
  const userStore = useUserStore();
  const onFinish: FormProps<FieldType>["onFinish"] = async (values) => {
    const { token } = await login({
      account: values.account || "",
      password: values.password || "",
    });
    userStore.setToken(token);
    navigate("/");
  };
  return (
    <Form
      name="basic"
      wrapperCol={{ span: 16 }}
      labelCol={{ span: 6 }}
      onFinish={onFinish}
      autoComplete="off"
    >
      <Form.Item<FieldType>
        label="账号"
        name="account"
        rules={[{ required: true, message: "请输入账号!" }]}
      >
        <Input />
      </Form.Item>

      <Form.Item<FieldType>
        label="密码"
        name="password"
        rules={[{ required: true, message: "请输入密码!" }]}
      >
        <Input.Password />
      </Form.Item>

      <Row>
        <Col span={16} offset={6}>
          <Button type="primary" block htmlType="submit">
            登录
          </Button>
        </Col>
      </Row>
    </Form>
  );
};

export default LoginForm;
