import { Button, Col, Form, Input, Row, Select, message } from "antd";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getAllRole, registerUser } from "../../../../utils/ApiFunction";



const CreateUser= () => {
  const navigate = useNavigate();
  const [role, setRole] = useState();
  const [form] = Form.useForm();
  const [messageApi, contextHolder] = message.useMessage();
  const hanldeBack = () => {
    navigate(-1);
  }
  const handleCancel = () => {
    form.resetFields();
  }
  useEffect(() => {
    const fetchApi = async () => {
      const response = await getAllRole();
      if(response) {
        setRole(response);
      }
    };
    fetchApi();
  }, []);
  const handleSubmit = async (e) => {
    try {
      const results = await registerUser(e);
      if(results) {
        messageApi.success("Tạo thành công!");
        form.resetFields();
      }
      else {
        messageApi.error("Đã xãy ra lỗi, vui lòng thử lại sau!");
      }
    } catch(error) {
      messageApi.open({
        type: "error",
        content: error.message,
        duration: 1
      })
    }
  }
  return (
    <>
    {contextHolder}
      <Button onClick={hanldeBack}>Trở lại</Button>
      <h1>Tạo mới tài khoản</h1>
      <Form layout="vertical" onFinish={handleSubmit} form={form}>
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
              <Input />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item
              label="Password"
              name="password"
              rules={[
                {
                  required: true,
                  message: 'Please input your password!',
                },
              ]}
            >
              <Input.Password />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item label={"Role"} name={"roles"} rules={[{required: true}]}>
              <Select
                mode="multiple"
                options={role}
              ></Select>
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item>
              <Button type="primary" htmlType="submit">Tạo mới</Button>
              <Button type="default" onClick={handleCancel} className="mgl-20">Xóa</Button>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </>
  )
}


export default CreateUser;