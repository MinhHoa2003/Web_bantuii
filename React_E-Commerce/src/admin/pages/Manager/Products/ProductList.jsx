import { Table, Tag, Tooltip, Image, Card } from "antd";
import { Button, Col, Form, Input, Row, Select } from "antd";
import { useEffect, useState } from "react";
import { findProducts, getAllBrands, getAllCategories, getAllProducts } from "../../../../utils/ApiFunction";
import EditProduct from "./EditProduct";
import DeleteProduct from "./DeleteProduct";
import { useNavigate, useSearchParams } from "react-router-dom";


const ProductList = () => {
  const [searchParam, setSearchParam] = useSearchParams();
  const searchName = searchParam.get("name");
  const searchCategoryName = searchParam.get("categoryName");
  const searchBrandName = searchParam.get("brandName");
  const searchSort = searchParam.get("sort");
  const [data, setData] = useState();
  const [form] = Form.useForm();
  const [brand, setBrand] = useState();
  const [category, setCategory] = useState();
  const [orderByPrice, setOrderByPrice] = useState("");
  const navigate = useNavigate();
  const [search, setSearch] = useState({
    name: searchName || "",
    categoryName: searchCategoryName || "",
    brandName: searchBrandName || "",
    orderByPrice: searchSort || "" 
  })
  const handleInputChange = (e) => {
    search.orderByPrice = e;
    setOrderByPrice(e);
    navigate(`/admin/manager-products?name=${search.name || ""}&categoryName=${search.categoryName || ""}&brandName=${search.brandName || ""}&sort=${search.orderByPrice || ""}`);
  }
  const fetchApi = async () => {
    const response = await getAllProducts();
    if (response) {
      setData(response.reverse());
    }
  };
  const fetchApiSearch = async (search) => {
    const response = await findProducts(search);
    if (response) {
      setData(response);
    }
  };
  const onReload = () => {
    fetchApi();
  }
  useEffect(() => {
    if(searchName || searchBrandName || searchCategoryName || searchSort) {
      fetchApiSearch(search);
    }
    else {
      fetchApi();
    }
  }, [searchName, searchBrandName, searchCategoryName, searchSort]);
  useEffect(() => {
    const fetchApi = async () => {
      const response = await getAllBrands();
      if(response) {
        setBrand(response.reverse());
      }
    };
    fetchApi();
  }, []);
  const columns = [
    {
      title: 'Ảnh',
      dataIndex: 'thumbnail',
      key: 'thumbnail',
      render: thumbnail => <Image src={thumbnail} width={100} />, // Sử dụng component Image để hiển thị ảnh
    },
    {
      title: 'Tên sản phẩm',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Giá bán($)',
      dataIndex: 'price',
      key: 'price',
    },
    {
      title: 'Hãng',
      dataIndex: "brand",
      key: 'brand',
      render: (_, record) => (
        <>
          {
            <Tag key={record?.brand?.id} color="green">
              {record?.brand?.name}
            </Tag>
          }
        </>
      )
    },
    {
      title: 'Danh mục',
      dataIndex: "category",
      key: 'category',
      render: (_, record) => (
        <>
          {
            <Tag key={record?.category?.id} color="blue">
              {record?.category?.name}
            </Tag>
          }
        </>
      )
    },
    {
      title: "Hành động",
      key: "action",
      render: (_, record) => (
        <>
          <EditProduct record={record} onReload={onReload} />
          <DeleteProduct id={record.id} onReload={onReload} />
        </>
      )
    }
  ];
  const handleSubmit = async (values) => {
    values['orderByPrice'] = orderByPrice;
    setSearch({...values})
    navigate(`/admin/manager-products?name=${values.name || ""}&categoryName=${values.categoryName || ""}&brandName=${values.brandName || ""}&orderByPrice=${values.orderByPrice || ""}`)
  }
  const handleClear = () => {
    form.resetFields();
    navigate(`/admin/manager-products?name=&categoryName=&brandName=&orderByPrice=${search.orderByPrice || ""}`)
  }
  useEffect(() => {
    const fetchApi = async () => {
      if(searchParam.size === 0) {
        setSearch({
          name: searchName || "",
          categoryName: searchCategoryName || "",
          brandName: searchBrandName || "",
          orderByPrice: searchSort || "" 
        })
        setOrderByPrice("")
        form.resetFields()
      } else {
        setSearch({
          name: searchName || "",
          categoryName: searchCategoryName || "",
          brandName: searchBrandName || "",
          orderByPrice: searchSort || "" 
        })
        setOrderByPrice(searchSort)
      }
      const response = await getAllCategories();
      if(response) {
        setCategory(response.reverse());
      }
    };
    fetchApi();
  }, [searchParam]);
  const orderPrice = [
    {
      key: 1,
      value: "Thấp đến cao"
    }, 
    {
      key: 2,
      value : "Cao đến thấp"
    },
    {
      key: 3,
      value : "Mặc định"
    }
  ]
  return (
    <>
    <Card>
        <Form layout="vertical" onFinish={handleSubmit} form={form}>
          <Row gutter={[20]}>
            <Col xl={8} lg={8} span={16}>
              <Form.Item label={"Tên sản phẩm"} name={"name"}>
                <Input />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label={"Hãng"} name={"brandName"}>
                <Select
                  options={brand}
                ></Select>
              </Form.Item>
            </Col>
            <Col xl={8} lg={8} md={8} span={24}>
              <Form.Item label={"Danh mục"} name={"categoryName"}>
                <Select
                  options={category}
                ></Select>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item>
                <Button type="primary" htmlType="submit">Tìm kiếm</Button>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item style={{ display: 'flex', justifyContent: 'flex-end' }}>
                <Button type="default" onClick={handleClear}>Xóa</Button>
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Card>
      <Row className="mt-3">
        <Col xl={8} lg={8} md={8} span={24}>
          <Form.Item label={"Bộ lọc giá"} name={"orderByPrice"}>
            <Select
              fieldNames={'orderByPrice'}
              options={orderPrice}
              placeholder="Sort price"
              onChange={handleInputChange}
            ></Select>
          </Form.Item>
        </Col>
      </Row>
      <Table columns={columns} dataSource={data} rowKey="id" pagination={{pageSize: 5}}></Table>
    </>
  )
}
export default ProductList;