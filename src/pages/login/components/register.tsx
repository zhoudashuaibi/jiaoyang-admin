import React from "react";
import type { FormProps } from "antd";
import { Button, Form, Input, Row, Col } from "antd";
import { register } from "@/api/user";
import { message } from "antd";

type FieldType = {
  account?: string;
  password?: string;
  confirm_password?: string;
};

const RegisterForm: React.FC = () => {
  const onFinish: FormProps<FieldType>["onFinish"] = async (values) => {
    await register({
      account: values.account || "",
      password: values.password || "",
      confirm_password: values.confirm_password || "",
    });
    message.success("注册成功!");
    setTimeout(() => {
      window.location.href = "/login";
    }, 1000);
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
        rules={[
          { required: true, message: "请输入邮箱!" },
          {
            type: "email",
            message: "请输入正确的邮箱格式!",
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item<FieldType>
        label="密码"
        name="password"
        rules={[
          { required: true, message: "请输入密码!" },
          {
            min: 6,
            message: "密码长度不能小于6位!",
          },
        ]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item<FieldType>
        label="确认密码"
        name="confirm_password"
        dependencies={["password"]}
        rules={[
          { required: true, message: "请输入确认密码!" },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (value && getFieldValue("password") === value) {
                return Promise.resolve();
              }
              return Promise.reject(new Error("两次输入密码不一致!"));
            },
          }),
        ]}
      >
        <Input.Password />
      </Form.Item>

      <Row>
        <Col span={16} offset={6}>
          <Button type="primary" style={{ width: 160 + "px" }} htmlType="submit">
          注册
        </Button>
        </Col>
      </Row>
    </Form>
  );
};

export default RegisterForm;
