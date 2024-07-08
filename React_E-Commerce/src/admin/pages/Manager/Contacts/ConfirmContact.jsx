import { Button, Popconfirm, Tooltip, message } from "antd"
import { CheckSquareOutlined, DeleteOutlined } from "@ant-design/icons";
import { useState } from "react";
import { confirmContact } from "../../../../utils/ApiFunction";


const ConfirmContact = (props) => {
  const { id, onReload } = props;
  const [open, setOpen] = useState(false);
  const [messageApi, conTextHolder] = message.useMessage();
  const hanldeConfirm = async () => {
    let response = await confirmContact(id);
    if(response) {
      await messageApi.open({
        type: "success",
        content: "Đã xác nhận liên hệ thành công",
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
        <Tooltip placement="right" title="Xác nhận đã liên hệ">
          <Popconfirm title="Xóa sản phẩm" description="Bạn muốn xác nhận đã liên hệ?" onConfirm={hanldeConfirm} open={open} onCancel={hanldeCancel} placement="left">
            <Button icon={<CheckSquareOutlined />} primary onClick={hanldeOpen}></Button>
          </Popconfirm>
        </Tooltip>
      </div>
    </>
  )
}

export default ConfirmContact;