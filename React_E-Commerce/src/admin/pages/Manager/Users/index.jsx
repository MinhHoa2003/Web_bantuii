import { Button } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import UserList from "./UserList";

const ManageUsers = () => {
  return (
    <>
      <div className="manage-job">
      <h1>Danh sách tài khoản</h1>
      <Link to={"/admin/manager-users/create-user"}>
        <Button icon={<PlusOutlined />}>Tạo mới</Button>
      </Link>
      </div>
      <UserList />
    </>
  )
}

export default ManageUsers;