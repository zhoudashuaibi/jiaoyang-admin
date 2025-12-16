import { Button, Result } from 'antd';
import { useNavigate } from 'react-router-dom';
export default function NotFound403() {
  const navigate = useNavigate();
  return (
    <Result
      status="403"
      title="403"
      subTitle="暂无权限访问..."
      extra={<Button onClick={() => navigate('/')} type="primary">重新登录</Button>}
    />
  );
}
