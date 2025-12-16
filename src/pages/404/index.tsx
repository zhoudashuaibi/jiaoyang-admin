import { Button, Result } from 'antd';
import { useNavigate } from 'react-router-dom';
export default function NotFound404() {
  const navigate = useNavigate();
  return (
    <Result
      status="404"
      title="404"
      subTitle="页面消失了...."
      extra={<Button onClick={() => navigate('/')} type="primary">返回首页</Button>}
    />
  );
}
