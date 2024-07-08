import { Button, Col, Form, Input, Modal, Row, message } from "antd";
import { useState } from "react";
import { createBrand } from "../../../../utils/ApiFunction";
import { PlusOutlined } from "@ant-design/icons";


const CreateBrand = (props) => {
  const { reload } = props;
  const [messageApi, conTextHolder] = message.useMessage();
  const [open, setOpen] = useState(false);
  const [form] = Form.useForm();
  const hanldeCancel = () => {
    form.resetFields();
    setOpen(false);
  };
  const hanldeOpen = () => {
    setOpen(true);
  };
  const hanldeSubmit = async (name) => {
    try {
      const results = await createBrand(name);
      if(results) {
        messageApi.open({
          type: "success",
          content: "Bạn đã thêm mới thành công!",
          duration: 2
        });
        form.resetFields();
        setOpen(false);
        reload();
      } else {
        messageApi.open({
          type: "error",
          content: "Thất bại!",
          duration: 1
        })
      }
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
    }
  }
  return (
    <>
    {conTextHolder}
      <Button 
        type="primary" 
        onClick={hanldeOpen} 
        icon={<PlusOutlined />} 
        style={{ backgroundColor: 'green', borderColor: 'green' }}
      >
        Thêm mới hãng
      </Button>
      <Modal open={open} onCancel={hanldeCancel} footer={null} title="Thêm mới hãng">
        <Form
          form={form}
          name="createCategory"
          autoComplete="off"
          layout="vertical"
          onFinish={hanldeSubmit}
        >
          <Row>
            <Col span={24}>
              <Form.Item
                label="Tên danh mục"
                name="value"
                rules={[
                  {
                    required: true,
                  },
                ]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item>
                <Button type="primary" htmlType="submit">Thêm mới</Button>
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Modal>
    </>
  )
}

export default CreateBrand;