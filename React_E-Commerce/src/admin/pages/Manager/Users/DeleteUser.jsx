import { Button, Popconfirm, Tooltip, message } from "antd"
import { DeleteOutlined } from "@ant-design/icons";
import { useState } from "react";
import { deleteUser } from "../../../../utils/ApiFunction";


const DeleteUser = (props) => {
  const { email, onReload } = props;
  const [open, setOpen] = useState(false);
  const [messageApi, conTextHolder] = message.useMessage();
  const hanldeConfirm = async () => {
    const response = await deleteUser(email);
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
        <Tooltip placement="right" title="Xóa tài khoản">
          <Popconfirm title="Xóa tài khoản" description="Bạn có chắc chắn xóa tài khoản này không?" onConfirm={hanldeConfirm} open={open} onCancel={hanldeCancel} placement="left">
            <Button icon={<DeleteOutlined />} danger onClick={hanldeOpen}></Button>
          </Popconfirm>
        </Tooltip>
      </div>
    </>
  )
}

export default DeleteUser;