import { Outlet } from "react-router-dom";
import { Layout } from "antd";
import ComHeader from "./components/Header";
import ComSlider from "./components/Slider";

const { Header, Sider, Content } = Layout;
const layoutStyle = {
  borderRadius: 8,
  overflow: "hidden",
  width: "100vw",
  height: "100vh",
};

const headerStyle = {
  backgroundColor: "#fff",
  padding: "0 20px",
  borderBottom: "1px solid #e8e8e8",

};

export default function BaseLayout() {
  return (
    <>
      <Layout style={layoutStyle}>
        <Header style={headerStyle}>
          <ComHeader />
        </Header>
        <Layout>
          <Sider theme="light" width={256}>
            <ComSlider />
          </Sider>
          <Content>
            <Layout>
              <Outlet />
            </Layout>
          </Content>
        </Layout>
      </Layout>
    </>
  );
}
