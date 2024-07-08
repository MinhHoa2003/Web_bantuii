import { Button, Col, Form, Input, Row, Select, Switch, Upload, message } from "antd";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { UploadOutlined } from "@ant-design/icons";
import { createProduct, getAllBrands, getAllCategories } from "../../../../utils/ApiFunction";
import CreateCategory from "./CreateCategory";
import CreateBrand from "./CreateBrand";


const CreateProduct = () => {
  const navigate = useNavigate();
  const [brand, setBrand] = useState();
  const [category, setCategory] = useState();
  const [form] = Form.useForm();
  const [messageApi, contextHolder] = message.useMessage();
  const hanldeBack = () => {
    navigate(-1);
  }
  const handleCancel = () => {
    form.resetFields();
  }
  const handleImageChange = ({ fileList }) => {
    return null
  };
  const reloadBrandOrCategory = async () => {
    const responseBrand = await getAllBrands();
    if(responseBrand) {
      setBrand(responseBrand.reverse());
    }
    const responseCategory = await getAllCategories();
    if(responseCategory) {
      setCategory(responseCategory.reverse());
    }
  }
  useEffect(() => {
    const fetchApi = async () => {
      const response = await getAllBrands();
      if(response) {
        setBrand(response.reverse());
      }
    };
    fetchApi();
  }, []);
  useEffect(() => {
    const fetchApi = async () => {
      const response = await getAllCategories();
      if(response) {
        setCategory(response.reverse());
      }
    };
    fetchApi();
  }, []);
  const handleSubmit = async (values) => {
    const results = await createProduct(values);
    if(results) {
      messageApi.success("Tạo thành công!");
      form.resetFields();
    }
    else {
      messageApi.error("Đã xãy ra lỗi, vui lòng thử lại sau!");
    }
  }
  return (
    <>
    {contextHolder}
      <Button onClick={hanldeBack}>Trở lại</Button>
      <h1>Thêm sản phẩm</h1>
      <Row gutter={[20]} style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <Col>
          <CreateCategory reload={reloadBrandOrCategory}/>
        </Col>
        <Col>
          <CreateBrand reload={reloadBrandOrCategory}/>
        </Col>
      </Row>
      <Form layout="vertical" onFinish={handleSubmit} form={form}>
        <Row gutter={[20]}>
          <Col xl={24} span={24}>
            <Form.Item label={"Tên sản phẩm"} name={"name"} rules={[{required: true}]}>
              <Input />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item label={"Hãng"} name={"brandId"} rules={[{required: true}]}>
              <Select
                options={brand?.map(cat => ({ label: cat.value, value: cat.key }))}
                optionKey="key"
              ></Select>
            </Form.Item>
          </Col>
          <Col xl={8} lg={8} md={8} span={24}>
            <Form.Item label={"Danh mục"} name={"categoryId"} rules={[{required: true}]}>
            <Select
                options={category?.map(cat => ({ label: cat.value, value: cat.key }))}
                optionKey="key"
              ></Select>
            </Form.Item>
          </Col>
          <Col xl={6} lg={6} md={6} span={24}>
            <Form.Item label={"Giá bán"} name={"price"} rules={[{required: true}]}>
              <Input addonAfter="đ"/>
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item label={"Mô tả sản phẩm"} name={"description"} rules={[{required: true}]}>
              <Input.TextArea rows={8}/>
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item name="file" label="Ảnh" valuePropName="file">
              <Upload
                name="file"
                listType="picture"
                beforeUpload={() => false} // Prevent automatic upload
                onChange={handleImageChange}
              >
                <Button icon={<UploadOutlined />}>Upload</Button>
              </Upload>
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


export default CreateProduct;