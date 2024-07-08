import { Button, Col, Form, Image, Input, InputNumber, Modal, Row, Select, Table, Tooltip, message } from "antd";
import { EditOutlined} from "@ant-design/icons";
import { useEffect, useState } from "react";
import {confirmOrder, getOrderDetailByOrderId } from "../../../../utils/ApiFunction";
import moment from "moment";

const EditOrder = (props) => {
  const { record, onReload, profile } = props;
  const [data, setData] = useState(record);
  const [products, setProducts] = useState([]);
  const [open, setOpen] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();
  const [form] = Form.useForm();

  useEffect(() => {
    const fetchApi = async () => {
      data.orderDate = data.orderDate ? moment(data.orderDate).format('DD-MM-YYYY HH:mm:ss') : null;
      const response = await getOrderDetailByOrderId(record.id);
      if (response) {
        setProducts(response?.reverse());
      }
    };
    fetchApi();
  }, [])
  const hanldeCancel = () => {
    setOpen(false);
  };
  const showModal = () => {
    setOpen(true);
  };
  const [status, setStatus] = useState([
    {
      key: 1,
      value: "pending"
    },
    {
      key: 2,
      value: "processing"
    },
    {
      key: 3,
      value: "shipped"
    },
    {
      key: 4,
      value: "delivered"
    },
    {
      key: 5,
      value: "cancelling"
    },
    {
      key: 6,
      value: "cancelled"
    },
  ])
  const columns = [
    {
      title: 'Ảnh',
      dataIndex: 'thumbnail',
      key: 'thumbnail',
      // render: thumbnail => , // Sử dụng component Image để hiển thị ảnh
      render: (_, record) => (
        <Image src={record?.product?.thumbnail} width={100} />
      )
    },
    {
      title: 'Tên sản phẩm',
      dataIndex: 'name',
      render: (_, record) => (
        <span>{record?.product?.name}</span>
      )
    },
    {
      title: 'Giá bán($)',
      dataIndex: 'price',
      key: 'price',
      render: (_, record) => (
        <span>
          {record?.product?.price}
        </span>
      )
    },
    {
      title: 'Số lượng',
      dataIndex: 'numberOfProducts',
      key: 'numberOfProducts',
    },
    {
      title: 'Thành tiền',
      dataIndex: 'totalMoney',
      key: 'totalMoney',
    }
  ];
  const handleSubmit = async (values) => {
    const response = await confirmOrder(record.id, values.status);
    if(response) {
      setOpen(false);
      onReload();
      messageApi.open({
        type: "success",
        duration: 2,
        content: "Cập nhật thành công!"
      })
    } else {
      messageApi.open({
        type: "error",
        duration: 1,
        content: "Cập nhật Thất bại!"
      })
    }
  }
  return (
    <>
    {contextHolder}
      <div className="mgb-10">
        <Tooltip placement="right" title="Thông tin đơn hàng">
          <Button type="primary" icon={<EditOutlined />} onClick={showModal}></Button>
        </Tooltip>
      </div>
      {record && (
        <Modal open={open} onCancel={hanldeCancel} footer={null} title="Thông tin đơn hàng" 
          style={{top: (profile === true) ? (120) : (20)}} 
          width={1000}
        >
          <Form layout="vertical" onFinish={handleSubmit} form={form} initialValues={data}>
            <Row gutter={[20]}>
              <Col xl={8} span={8}>
                <Form.Item label={"Họ"} name={"firstName"} rules={[{required: true}]}>
                  <Input disabled/>
                </Form.Item>
              </Col>
              <Col xl={8} span={8}>
                <Form.Item label={"Tên"} name={"lastName"} rules={[{required: true}]}>
                  <Input disabled/>
                </Form.Item>
              </Col>
              <Col xl={8} lg={8} md={8} span={24}>
                <Form.Item label={"Trạng thái"} name={"status"} rules={[{required: true}]}>
                <Select
                    options={status}
                    disabled = {(profile === true) ? (true) : (false)}
                  ></Select>
                </Form.Item>
              </Col>
              <Col xl={12} span={12}>
                <Form.Item label={"Số điện thoại"} name={"phoneNumber"} rules={[{required: true}]}>
                  <Input disabled/>
                </Form.Item>
              </Col>
              <Col xl={12} span={12}>
                <Form.Item label={"Email"} name={"email"} rules={[{required: true}]}>
                  <Input disabled/>
                </Form.Item>
              </Col>
              <Col xl={24} span={24}>
                <Form.Item label={"Ghi chú"} name={"note"}>
                  <Input.TextArea disabled/>
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item label={"Phương thức thanh toán"} name={"paymentMethod"} rules={[{required: true}]}>
                  <Input disabled/>
                </Form.Item>
              </Col>
              <Col xl={8} lg={8} md={8} span={24}>
                <Form.Item label={"Tổng tiền"} name={"totalMoney"} rules={[{required: true}]}>
                <InputNumber
                  style={{ width: '100%' }}
                  formatter={value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, '.')}
                  parser={value => value.replace(/\$\s?|(,*)/g, '')}
                  addonAfter="$"
                  disabled
                />
                </Form.Item>
              </Col>
              <Col xl={8} lg={8} md={8} span={24}>
                <Form.Item label={"Ngày đặt hàng"} name={"orderDate"} rules={[{required: true}]}>
                  <Input disabled/>
                </Form.Item>
              </Col>
              <Col span={24}>
                {(profile === true) ? (
                  <h4>Products</h4>
                ) : (
                  <h4>Danh sách sản phẩm trong đơn hàng</h4>
                )}
                <Table columns={columns} dataSource={products} rowKey="id" pagination={{pageSize: 5}}></Table>
              </Col>
              {(profile !== true) && (
                <Col span={24}>
                  <Form.Item >
                    <Button type="primary" htmlType="submit">Xác nhận đơn</Button>
                  </Form.Item>
                </Col>
              )}
            </Row>
          </Form>
        </Modal>
      )}
    </>
  )
}

export default EditOrder;