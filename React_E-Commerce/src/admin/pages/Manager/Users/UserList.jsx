import { Button, Table, Tag, Tooltip } from "antd";
import { Link } from "react-router-dom";
import { EyeOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import { getAllUser } from "../../../../utils/ApiFunction";
import EditUser from "./EditUser";
import DeleteUser from "./DeleteUser";


const UserList = () => {
  // const userId = localStorage.getItem("userId");
  const [data, setData] = useState();
  const fetchApi = async () => {
    const response = await getAllUser();
    if (response) {
      setData(response.reverse());
    }
  };
  const onReload = () => {
    fetchApi();
  }
  useEffect(() => {
    fetchApi();
  }, []);
  const columns = [
    {
      title: 'email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'First name',
      dataIndex: 'firstName',
      key: 'firstName',
    },
    {
      title: 'Last name',
      dataIndex: 'lastName',
      key: 'lastName',
    },
    {
      title: 'Roles',
      dataIndex: "roles",
      key: 'roles',
      render: (_, record) => (
        <>
          {record.roles.map((item, index) => (
            <Tag key={item.key} color="blue">
              {item.value === "ROLE_STAFF" && ("Nhân viên")}
              {item.value === "ROLE_ADMIN" && ("Quản trị viên")}
              {item.value === "ROLE_USER" && ("Người dùng")}
            </Tag>
          ))}
        </>
      )
    },
    {
      title: "Hành động",
      key: "action",
      render: (_, record) => (
        <>
          {/* <div className="mgb-10">
            <Link to={`/edit-user/${record?.id}`}>
              <Tooltip placement="top" title="Xem chi tiết">
                <Button icon={<EyeOutlined />}></Button>
              </Tooltip>
            </Link>
          </div> */}
          <EditUser record={record} onReload={onReload} />
          <DeleteUser email={record.email} onReload={onReload} />
        </>
      )
    }
  ];
  return (
    <>
      <Table columns={columns} dataSource={data} rowKey="id" pagination={{pageSize: 5}}></Table>
    </>
  )
}
export default UserList;