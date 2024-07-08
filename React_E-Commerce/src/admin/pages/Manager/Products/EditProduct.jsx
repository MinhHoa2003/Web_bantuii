import { Button, Col, Form, Input, Modal, Row, Select, Switch, Tooltip, Upload, message } from "antd";
import { EditOutlined, UploadOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import { getAllBrands, getAllCategories, updateProduct } from "../../../../utils/ApiFunction";
import CreateCategory from "./CreateCategory";
import CreateBrand from "./CreateBrand";

const EditProduct = (props) => {
  const { record, onReload } = props;
  const [data, setData] = useState(record);
  const [open, setOpen] = useState(false);
  const [brand, setBrand] = useState();
  const [category, setCategory] = useState();
  const [imagePreview, setImagePreview] = useState(record.thumbnail); // URL của ảnh hiện tại
  const [messageApi, contextHolder] = message.useMessage();
  const [form] = Form.useForm();

  const hanldeCancel = () => {
    setOpen(false);
  };
  const showModal = () => {
    setOpen(true);
  };
  const [fileList, setFileList] = useState([
    {
      uid: '-1', // UID của file (yêu cầu của Ant Design)
      name: 'existing-image.jpg', // Tên file
      status: 'done', // Trạng thái của file
      url: record.thumbnail, // URL của ảnh
    },
  ]);
  const handleImageChange = ({ fileList }) => {
    // Lấy file mới nhất
    const newFile = fileList[fileList.length - 1];
    if (newFile) {
      const file = newFile.originFileObj || newFile;
      setImagePreview(URL.createObjectURL(file));
      setFileList(fileList);
    }
    if(fileList.length === 0) {
      setFileList([
        {
          uid: '-1', // UID của file ()
          name: 'existing-image.jpg', // Tên file
          status: 'done', // Trạng thái của file
          url: record.thumbnail, // URL của ảnh
        },
      ])
    }
  };
  useEffect(() => {
    const fetchApi = async () => {
      const response = await getAllBrands();
      if(response) {
        setBrand(response);
      }
    };
    fetchApi();
  }, []);
  useEffect(() => {
    const fetchApi = async () => {
      const response = await getAllCategories();
      if(response) {
        setCategory(response);
      }
    };
    fetchApi();
  }, []);
  useEffect(() => {
    const transformed = changeData(record);
    setData(renameAttributes(transformed));
  }, [])
  const changeData = (obj) => {
    const transformedObj = { ...obj };
    if (transformedObj.brand) {
      transformedObj.brand = {
        key: transformedObj.brand.id,
        value: transformedObj.brand.name,
      };
    }
    if (transformedObj.category) {
      transformedObj.category = {
        key: transformedObj.category.id,
        value: transformedObj.category.name,
      };
    }
    return transformedObj;
  };
  const renameAttributes = (obj) => {
    const { brand, category, ...rest } = obj;
    return {
      ...rest,
      brandId: brand,
      categoryId: category
    };
  }
  const handleSubmit = async (values) => {
    const response = await updateProduct(record.id,values);
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
        <Tooltip placement="right" title="Chỉnh sửa thông tin sản phẩm">
          <Button type="primary" icon={<EditOutlined />} onClick={showModal}></Button>
        </Tooltip>
      </div>
      {record && (
        <Modal open={open} onCancel={hanldeCancel} footer={null} title="Chỉnh sửa thông tin sản phẩm" style={{top: 20}} width={1000}>
          <Row gutter={[20]} style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Col>
              <CreateCategory />
            </Col>
            <Col>
              <CreateBrand />
            </Col>
          </Row>
          <Form layout="vertical" onFinish={handleSubmit} form={form} initialValues={data}>
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
                  ></Select>
                </Form.Item>
              </Col>
              <Col xl={8} lg={8} md={8} span={24}>
                <Form.Item label={"Danh mục"} name={"categoryId"} rules={[{required: true}]}>
                <Select
                    options={category?.map(cat => ({ label: cat.value, value: cat.key }))}
                  ></Select>
                </Form.Item>
              </Col>
              <Col xl={6} lg={6} md={6} span={24}>
                <Form.Item label={"Giá bán"} name={"price"} rules={[{required: true}]}>
                  <Input addonAfter="$"/>
                </Form.Item>
              </Col>
              <Col span={24}>
                <Form.Item label={"Mô tả sản phẩm"} name={"description"} rules={[{required: true}]}>
                  <Input.TextArea rows={8}/>
                </Form.Item>
              </Col>
              <Col span={6}>
                {/* <Form.Item label={"Trạng thái"} name={"status"} valuePropName="checked">
                  <Switch checkedChildren="bật" unCheckedChildren="tắt"  defaultChecked/>
                </Form.Item> */}
                <Form.Item name="file" label="Ảnh" valuePropName="file">
                  <Upload
                    name="file"
                    fileList={fileList}
                    listType="picture"
                    beforeUpload={() => false} // Prevent automatic upload
                    onChange={handleImageChange}
                    maxCount={1}
                  >
                    <Button icon={<UploadOutlined />}>Upload</Button>
                  </Upload>
                </Form.Item>
              </Col>
              <Col span={24}>
                <Form.Item >
                  <Button type="primary" htmlType="submit">Cập nhật</Button>
                </Form.Item>
              </Col>
            </Row>
          </Form>
        </Modal>
      )}
    </>
  )
}

export default EditProduct;