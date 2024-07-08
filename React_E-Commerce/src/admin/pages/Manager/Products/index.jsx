import { Button } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import ProductList from "./ProductList";

const ManagerProduct = () => {
  return (
    <>
      <div className="manage-job">
      <h1>Danh sách sản phẩm</h1>
      <Link to={"/admin/manager-products/create-product"}>
        <Button icon={<PlusOutlined />}>Thêm mới</Button>
      </Link>
      </div>
      <ProductList />
    </>
  )
}

export default ManagerProduct;