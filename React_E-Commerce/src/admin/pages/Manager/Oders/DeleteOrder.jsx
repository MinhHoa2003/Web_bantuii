import { Button, Popconfirm, Tooltip, message } from "antd"
import { CloseSquareOutlined, DeleteOutlined } from "@ant-design/icons";
import { useState } from "react";
import { confirmOrder, deleteOrder } from "../../../../utils/ApiFunction";


const DeleteOrder = (props) => {
  const { id, onReload, profile } = props;
  const [open, setOpen] = useState(false);
  const [messageApi, conTextHolder] = message.useMessage();
  const hanldeConfirm = async () => {
    let response;
    if(profile === true) {
      response = await confirmOrder(id, "cancelling")
    } else {
      response = await deleteOrder(id);
    }
    if(response) {
      await messageApi.open({
        type: "success",
        content: `${(profile === true) ? ("Bạn đã xác nhận hủy đơn hàng! Vui lòng chờ phản hồi") : ("Bạn đã xóa thành công!")}`,
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
        <Tooltip placement="right" title={(profile === true) ? ("Hủy đơn hàng"):("Xóa đơn hàng")}>
          <Popconfirm title="Xóa sản phẩm" description={(profile === true) ? ("Bạn có chắc chắn muốn hủy đơn hàng không") : ("Bạn có chắc chắn xóa đơn hàng này không?")} onConfirm={hanldeConfirm} open={open} onCancel={hanldeCancel} placement="left">
            <Button icon={(profile === true) ? (<CloseSquareOutlined />): (<DeleteOutlined />)} danger onClick={hanldeOpen}></Button>
          </Popconfirm>
        </Tooltip>
      </div>
    </>
  )
}

export default DeleteOrder;