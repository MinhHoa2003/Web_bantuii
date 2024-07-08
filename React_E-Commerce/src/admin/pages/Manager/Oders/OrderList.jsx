import { Button, Table, Tag, Tooltip, Image } from "antd";
import { useEffect, useState } from "react";
import { getAllOrder} from "../../../../utils/ApiFunction";
import moment from "moment";
import EditOrder from "./EditOrder";
import DeleteOrder from "./DeleteOrder";


const OrderList = () => {
  const [data, setData] = useState();
  const fetchApi = async () => {
    const response = await getAllOrder();
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
      title: 'Mã đơn hàng',
      dataIndex: 'id',
      key: 'id',
      render: id => <span>#000{id}</span>
    },
    {
      title: 'Tên khách hàng',
      dataIndex: 'fullname',
      key: 'fullname',
      render: (_, record) => (
        <>
          {
            <span>{record.firstName + " " + record.lastName}</span>
          }
        </>
      )
    },
    {
      title: 'Số điện thoại',
      dataIndex: 'phoneNumber',
      key: 'phoneNumber',
    },
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
          {record?.status === "cancelled" && (
            <Tag key={record?.status} color="red">
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
          <EditOrder record={record} onReload={onReload} />
          <DeleteOrder id={record.id} onReload={onReload} />
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
export default OrderList;