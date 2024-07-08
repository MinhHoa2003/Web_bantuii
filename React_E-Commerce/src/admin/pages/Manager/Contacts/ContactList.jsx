import { Button, Table, Tag, Tooltip, Image } from "antd";
import { useEffect, useState } from "react";
import { getAllContact, getAllOrder} from "../../../../utils/ApiFunction";
import moment from "moment";
import ConfirmContact from "./ConfirmContact";


const ContactList = () => {
  const [data, setData] = useState();
  const fetchApi = async () => {
    const response = await getAllContact();
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
      title: 'Tên khách hàng',
      dataIndex: 'fullName',
      key: 'fullName',
    },
    {
      title: 'Số điện thoại',
      dataIndex: 'phone',
      key: 'phone',
    },
    {
      title: 'Ngày gửi',
      dataIndex: 'date',
      key: 'date',
      render: date => moment(date).format('DD-MM-YYYY HH:mm:ss')
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
          {record?.status === "processed" && (
            <Tag key={record?.status} color="green">
              {record?.status}
            </Tag>
          )}
        </>
      )
    },
    {
      title: "Hành động",
      key: "action",
      render: (_, record) => (
        <>
          <ConfirmContact id={record.id} onReload={onReload} />
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
export default ContactList;