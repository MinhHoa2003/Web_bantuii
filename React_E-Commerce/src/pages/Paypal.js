import React, { useRef, useEffect } from "react";
import { message } from "antd";
import { createOrder } from "../utils/ApiFunction";

export default function Paypal(props) {
  const { orderDTO } = props;
  const paypal = useRef();
  const [messageApi, conTextHolder] = message.useMessage();

  useEffect(() => {
    window.paypal
      .Buttons({
        createOrder: (data, actions, err) => {
          return actions.order.create({
            intent: "CAPTURE",
            purchase_units: [
              {
                description: orderDTO?.note,
                amount: {
                  currency_code: "USD",
                  value: orderDTO?.totalMoney,
                },
              },
            ],
          });
        },
        onApprove: async (data, actions) => {
          const order = await actions.order.capture();
          if(order.id) {
            const results = await createOrder(orderDTO);
            if(results.id) {
              messageApi.open({
                type: "success",
                content: "Bạn đã đặt hàng thành công!",
                // duration: 2
              });
              setTimeout(() => {
                window.location.reload();
              }, 2000);
            } else {
              messageApi.open({
                type: "error",
                content: "Thất bại!",
                duration: 1
              })
            }
            console.log(orderDTO);
          }
        },
        onError: (err) => {
          console.log(err);
        },
      })
      .render(paypal.current);
  }, []);

  return (
    <>
      {conTextHolder}
      <div>
        <div ref={paypal}></div>
      </div>
    </>
  );
}