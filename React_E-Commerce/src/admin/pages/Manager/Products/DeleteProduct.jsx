import { Button, Popconfirm, Tooltip, message } from "antd"
import { DeleteOutlined } from "@ant-design/icons";
import { useState } from "react";
import { deleteProduct } from "../../../../utils/ApiFunction";


const DeleteProduct = (props) => {
  const { id, onReload } = props;
  const [open, setOpen] = useState(false);
  const [messageApi, conTextHolder] = message.useMessage();
  const hanldeConfirm = async () => {
    const response = await deleteProduct(id);
    if(response) {
      await messageApi.open({
        type: "success",
        content: "Bạn đã xóa thành công!",
        duration: 2
      });
      setOpen(false);
      onReload();
    } else {
      messageApi.open({
        type: "error",
        content: "Thất bại",
        duration: 3
      });
    }
    
  };
  const hanldeOpen = () => {
    setOpen(true);
  };
  const hanldeCancel = () => {
    setOpen(false);
  }
  return (
    <>
    {conTextHolder}
      <div className="mgb-10">
        <Tooltip placement="right" title="Xóa sản phẩm">
          <Popconfirm title="Xóa sản phẩm" description="Bạn có chắc chắn xóa sản phẩm này không?" onConfirm={hanldeConfirm} open={open} onCancel={hanldeCancel} placement="left">
            <Button icon={<DeleteOutlined />} danger onClick={hanldeOpen}></Button>
          </Popconfirm>
        </Tooltip>
      </div>
    </>
  )
}

export default DeleteProduct;