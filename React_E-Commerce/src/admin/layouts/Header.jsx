import {
  LogoutOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  HomeOutlined
} from '@ant-design/icons';
import { Button } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../auth/AuthenProvider';
import { useContext } from 'react';


const Header = (props) => {
  const { collapsed, setCollapsed } = props;
  const auth = useContext(AuthContext);
  const navigate = useNavigate();
  const handleLogout = () => {
    auth.handleLogout();
    navigate("/login");
    window.location.reload();
  }
  return (
    <>
      <header className="headerAdmin">
        <div className="headerAdmin__inner">
          {!collapsed ? (
            <div className="logo_true logo">
              Admin
            </div>
          ) : (
            <div className="logo_false logo">
              IT
            </div>
          )}
          <div className='collapsed' onClick={() => setCollapsed(!collapsed)}>
            {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
          </div >
          <div className='headerAdmin__inner--flex'></div>
          <div className='headerAdmin__inner--action'>
            <Link to="/">
              <Button className='headerAdmin__inner--action--buttonHome' icon={<HomeOutlined />}>
                Trang chủ
              </Button>
            </Link>
            <Button className='headerAdmin__inner--action--buttonLogout' icon={<LogoutOutlined />} onClick={handleLogout}>
              Đăng xuất
            </Button>
          </div>
        </div>
      </header>
    </>
  )
}

export default Header;