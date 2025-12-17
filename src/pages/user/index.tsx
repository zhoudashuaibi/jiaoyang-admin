import useUserStore from "@/store/modules/user";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Form, Input, Flex, Checkbox, Button } from "antd";
export default function User() {
  const userInfo = useUserStore((state) => state.userInfo);

  return (
    <>
      <Form
        name="login"
        initialValues={{ ...userInfo }}
        style={{ maxWidth: 500, margin: "0 auto" }}
      >
        <Form.Item
          name="name"
          label="用户名"
          rules={[{ required: true, message: "请输入用户名" }]}
        >
          <Input placeholder="请输入用户名" />
        </Form.Item>
        <Form.Item
          name="email"
          label="邮箱"
          rules={[{ required: true, message: "请输入邮箱" }]}
        >
          <Input placeholder="请输入邮箱" />
        </Form.Item>
        <Form.Item
          name="phone"
          label="手机号"
          rules={[{ required: true, message: "请输入手机号" }]}
        >
          <Input placeholder="请输入手机号" />
        </Form.Item>

        <div>
          <Button
            type="primary"
            style={{ width: 150, margin: "0 auto" }}
            htmlType="submit"
          >
            提交
          </Button>
        </div>
      </Form>
    </>
  );
}
