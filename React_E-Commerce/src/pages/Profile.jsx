import React, { useEffect, useState } from "react";
import { Footer, Navbar } from "../components";
import { getOrderByEmail, getUser, updateUser } from "../utils/ApiFunction";
import { Table, Tag, message } from "antd";
import EditOrder from "../admin/pages/Manager/Oders/EditOrder";
import moment from "moment";
import DeleteOrder from "../admin/pages/Manager/Oders/DeleteOrder";

const Profile = () => {
  const currentUser = localStorage.getItem("userId");
  const userRole = localStorage.getItem("userRole");
  const [messageApi, conTextHolder] = message.useMessage();
  const [data, setData] = useState();
  const fetchApiData = async () => {
    const response = await getOrderByEmail(currentUser);
    if (response) {
      setData(response.reverse());
    }
  };
  const onReload = () => {
    fetchApiData();
  }
  useEffect(() => {
    fetchApiData();
  }, []);
  const [infor, setInfo] = useState({
    firstName: "",
    lastName: "",
    email: currentUser
  });
  useEffect(() => {
    const fetchApi = async () => {
      const response = await getUser(currentUser);
      if(response.id) {
        setInfo({
          firstName : response.firstName,
          lastName: response.lastName,
          email: currentUser
        })
      }
    };
    fetchApi();
  }, [])
  const handleInputChange = (e) => {
    setInfo({...infor, [e.target.name] : e.target.value});
  }
  const columns = [
    {
      title: 'Mã đơn hàng',
      dataIndex: 'id',
      key: 'id',
      render: id => <span>#000{id}</span>
    },
    // {
    //   title: 'Tên khách hàng',
    //   dataIndex: 'fullname',
    //   key: 'fullname',
    //   render: (_, record) => (
    //     <>
    //       {
    //         <span>{record.firstName + " " + record.lastName}</span>
    //       }
    //     </>
    //   )
    // },
    // {
    //   title: 'Số điện thoại',
    //   dataIndex: 'phoneNumber',
    //   key: 'phoneNumber',
    // },
    {
      title: 'Ngày đặt hàng',
      dataIndex: 'orderDate',
      key: 'orderDate',
      render: orderDate => moment(orderDate).format('DD-MM-YYYY HH:mm:ss')
    },
    {
      title: 'Trạng thái',
      dataIndex: "status",
      key: 'status',
      render: (_, record) => (
        <>
          {record?.status === "pending" && (
            <Tag key={record?.status} color="yellow">
              {record?.status}
            </Tag>
          )}
          {record?.status === "processing" && (
            <Tag key={record?.status} color="orange">
              {record?.status}
            </Tag>
          )}
          {record?.status === "shipped" && (
            <Tag key={record?.status} color="blue">
              {record?.status}
            </Tag>
          )}
          {record?.status === "delivered" && (
            <Tag key={record?.status} color="green">
              {record?.status}
            </Tag>
          )}
          {record?.status === "cancelling" && (
            <Tag key={record?.status} color="red">
              {record?.status}
            </Tag>
          )}
        </>
      )
    },
    {
      title: 'Tổng tiền($)',
      dataIndex: "totalMoney",
      key: 'totalMoney',
    },
    {
      title: "Hành động",
      key: "action",
      render: (_, record) => (
        <>
          <EditOrder record={record} onReload={onReload} profile={true} />
          <DeleteOrder id={record.id} onReload={onReload} profile={true}/>
        </>
      )
    }
  ];
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const success = await updateUser(currentUser, infor);
      if(success.id)  {
        messageApi.open({
          type: "success",
          content: "Bạn đã cập nhật thành công!",
        });
      } else {
        messageApi.open({
          type: "error",
          content: "Thất bại!",
          duration: 2
        })
      }
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    } catch (error) {
      if (error.response && error.response.data) {
        messageApi.open({
          type: "error",
          content: error.response.data,
          duration: 1
        })
      } else {
        messageApi.open({
          type: "error",
          content: "Thất bại!",
          duration: 1
        })
      }
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    }
  }
  return (
    <>
      {conTextHolder}
      <Navbar />
      <div className="container my-3 py-3">
        <h1 className="text-center">Profile</h1>
        <hr />
        <div className="row my-4 h-100">
          <div className="col-md-4 col-lg-4 col-sm-8">
            <form onSubmit={handleSubmit}>
              <div className="my-3">
                <label htmlFor="display-4">Email</label>
                <input
                  type="email"
                  name="email"
                  className="form-control"
                  id="email"
                  placeholder="name@example.com"
                  value={infor.email}
                  onChange={handleInputChange}
                  readOnly
                />
              </div>
              <div className="my-3">
                <label htmlFor="display-4">First Name</label>
                <input
                  type="text"
                  name="firstName"
                  className="form-control"
                  id="firstName"
                  placeholder="Do"
                  value={infor.firstName}
                  onChange={handleInputChange}
                />
              </div>
              <div className="my-3">
                <label htmlFor="display-4">Last Name</label>
                <input
                  type="text"
                  name="lastName"
                  className="form-control"
                  id="firstName"
                  placeholder="Do"
                  value={infor.lastName}
                  onChange={handleInputChange}
                />
              </div>
              <div className="my-3">
                <label htmlFor="display-4">Role</label>
                <input
                  type="text"
                  className="form-control"
                  value={(userRole === "ROLE_STAFF") ? ("staff") : (userRole === "ROLE_USER") ? ("user"): ("admin")}
                  readOnly
                />
              </div>
              <div className="text-center">
                <button className="my-2 mx-auto btn btn-dark" type="submit">
                  Save Change
                </button>
              </div>
            </form>
          </div>
          <div className="col-md-8 col-lg-8 col-sm-12">
            <h3 className="my-3">Đơn hàng đã mua</h3>
            <Table columns={columns} dataSource={data} rowKey="id" pagination={{pageSize: 5}}></Table>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Profile;
