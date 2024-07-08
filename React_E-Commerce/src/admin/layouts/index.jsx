import { Layout } from "antd";
import Header from "./Header";
import { useState } from "react";
import "./styles.scss"
import MenuSider from "./MenuSider";
import { Outlet } from "react-router-dom";
const { Sider, Content } = Layout;


const LayoutAdmin = () => {

  const [collapsed, setCollapsed] = useState(false);
  return (
    <>
      <Layout className="layout__admin">
        <Header collapsed = {collapsed} setCollapsed = {setCollapsed} />
        <Layout>
          <Sider theme="light" className="layout__admin__sider" collapsed={collapsed} width={200}>
            <MenuSider />
          </Sider>
          <Content className="layout__admin__content">
            <Outlet />
          </Content>
        </Layout>
      </Layout>
    </>
  )
}

export default LayoutAdmin;