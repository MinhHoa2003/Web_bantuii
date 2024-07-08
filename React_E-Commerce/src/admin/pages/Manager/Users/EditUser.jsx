import { Button, Col, Form, Input, Modal, Row, Select, Switch, Tooltip, message } from "antd";
import { EditOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import { getAllRole, updateUser } from "../../../../utils/ApiFunction";
import ChangePassword from "./ChangePassword";

const EditUser = (props) => {
  const { record, onReload } = props;
  const [open, setOpen] = useState(false);
  const[roles, setRoles] = useState();
  const [messageApi, contextHolder] = message.useMessage();
  const [form] = Form.useForm();

  const hanldeCancel = () => {
    setOpen(false);
  };
  const showModal = () => {
    setOpen(true);
  };
  useEffect(() => {
    const fetchApi = async () => {
      const response = await getAllRole();
      if(response) {
        setRoles(response);
      }
    };
    fetchApi();
  }, []);
  const handleSubmit = async (values) => {
    // values.roles = values.roles.value
    const response = await updateUser(record.email,values);
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
        <Tooltip placement="right" title="Chỉnh sửa thông tin tài khoản">
          <Button type="primary" icon={<EditOutlined />} onClick={showModal}></Button>
        </Tooltip>
      </div>
      {record && (
        <Modal open={open} onCancel={hanldeCancel} footer={null} title="Chỉnh sửa thông tin tài khoản" style={{top: 20}} width={1000}>
          <Form layout="vertical" onFinish={handleSubmit} form={form} initialValues={record}>
            <Row gutter={[20]}>
              <Col span={24}>
                <Form.Item label={"First name"} name={"firstName"} rules={[{ required: true }]}>
                  <Input />
                </Form.Item>
              </Col>
              <Col span={24}>
                <Form.Item label={"Last name"} name={"lastName"} rules={[{ required: true }]}>
                  <Input />
                </Form.Item>
              </Col>
              <Col span={24}>
                <Form.Item label={"Email"} name={"email"} rules={[{ required: true }]} >
                  <Input readOnly/>
                </Form.Item>
              </Col>

              <Col span={24}>
                <Form.Item label={"Roles"} name={"roles"} rules={[{ required: true }]}>
                  <Select
                    mode="multiple"
                    options={roles}
                  ></Select>
                </Form.Item>
              </Col>
              {/* <Col xl={8} lg={8} md={8} span={6}>
                <Form.Item label={"Mức lương"} name={"salary"} rules={[{ required: true }]}>
                  <Input addonAfter="$" />
                </Form.Item>
              </Col>
              <Col xl={16} lg={16} md={16} span={18}>
                <Form.Item label={"Thành phố"} name={"city"} rules={[{ required: true }]}>
                  <Select
                    mode="multiple"
                    options={city}
                  ></Select>
                </Form.Item>
              </Col>
              <Col span={24}>
                <Form.Item label={"Mô tả công việc"} name={"description"} rules={[{ required: true }]}>
                  <Input.TextArea rows={8} />
                </Form.Item>
              </Col>
              <Col span={24}>
                <Form.Item label={"Trạng thái"} name={"status"} valuePropName="checked">
                  <Switch checkedChildren="bật" unCheckedChildren="tắt" defaultChecked />
                </Form.Item>
              </Col> */}
              <Col span={12}>
                <Form.Item >
                  <Button type="primary" htmlType="submit">Cập nhật</Button>
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item style={{ display: 'flex', justifyContent: 'flex-end' }}>
                  <ChangePassword record={record}/>
                </Form.Item>
              </Col>
            </Row>
          </Form>
        </Modal>
      )}
    </>
  )
}

export default EditUser;