import useUserStore from "@/store/modules/user";
import { Form, Input, Button, message, Spin } from "antd";
import type { updateInfo } from "@/api/user";
import { UpdateUserInfo } from "@/api/user";
import { useRequest } from "ahooks";

export default function User() {
  const userStore = useUserStore();
  const { userInfo, setUserInfo } = userStore;

  const { run: handleConfirmFn, loading } = useRequest(
    (values: updateInfo) => UpdateUserInfo(values),
    {
      manual: true,
      throttleWait: 2000,
      onSuccess: (val) => {
        setUserInfo(val);
        message.success("更新成功");
      },
    }
  );

  return (
    <>
      <Spin spinning={loading} delay={500}>
        <Form
          name="login"
          labelCol={{ span: 6 }}
          initialValues={{ ...userInfo }}
          onFinish={handleConfirmFn}
          style={{ maxWidth: 600, margin: "0 auto" }}
        >
          <Form.Item
            name="name"
            label="用户名"
            rules={[
              {
                required: true,
                min: 3,
                max: 30,
                message: "请输入3-30位用户名",
              },
            ]}
          >
            <Input placeholder="请输入用户名" />
          </Form.Item>
          <Form.Item
            name="email"
            label="邮箱"
            rules={[
              { required: true, message: "请输入邮箱" },
              {
                validator: (_, value) => {
                  if (!value) {
                    return Promise.resolve(); // 如果没有值，让 required 规则处理
                  }
                  const emailRegex =
                    /^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/;
                  if (emailRegex.test(value)) {
                    return Promise.resolve();
                  } else {
                    return Promise.reject(new Error("请输入正确的邮箱"));
                  }
                },
              },
            ]}
          >
            <Input placeholder="请输入邮箱" />
          </Form.Item>
          <Form.Item
            name="phone"
            label="手机号"
            rules={[
              { required: true, message: "请输入手机号" },
              {
                validator: (_, value) => {
                  if (!value) {
                    return Promise.resolve(); // 如果没有值，让 required 规则处理
                  }
                  if (/^1[3-9]\d{9}$/.test(value)) {
                    return Promise.resolve();
                  } else {
                    return Promise.reject(new Error("请输入正确的手机号"));
                  }
                },
              },
            ]}
          >
            <Input placeholder="请输入手机号" />
          </Form.Item>

          <div style={{ textAlign: "center" }}>
            <Button
              type="primary"
              disabled={loading}
              loading={loading}
              style={{ width: 150 }}
              htmlType="submit"
            >
              提交
            </Button>
          </div>
        </Form>
      </Spin>
    </>
  );
}
