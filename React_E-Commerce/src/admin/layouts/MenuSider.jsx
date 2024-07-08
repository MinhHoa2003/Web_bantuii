import { Menu } from "antd";
import { DashboardOutlined, UserOutlined, UnorderedListOutlined, FileDoneOutlined, ContactsOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";


const MenuSider = () => {
  const items = [
    {
      key: '1',
      icon: <DashboardOutlined />,
      label: <Link to={"/admin/dashboard"}>Tổng quan</Link>,
    },
    {
      key: '2',
      icon: <UserOutlined />,
      label: <Link to={"/admin/manager-users"}>Quản lý tài khoản</Link>,
    },
    {
      key: '3',
      icon: <UnorderedListOutlined />,
      label: <Link to={"/admin/manager-products"}>Quản lý sản phẩm</Link>,
    },
    {
      key: '4',
      icon: <FileDoneOutlined />,
      label: <Link to={"/admin/manager-oders"}>Quản lý đơn hàng</Link>,
    },
    {
      key: '5',
      icon: <ContactsOutlined />,
      label: <Link to={"/admin/manager-contacts"}>Liên hệ</Link>,
    }

  ]
  return (
    <>
      <Menu
        items={items}
        defaultSelectedKeys={['1']}
      >
      </Menu>
    </>
  )
}
export default MenuSider;