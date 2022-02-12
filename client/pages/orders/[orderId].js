import { useState, useEffect } from "react";
import useRequest from "../../hooks/useRequest";
import Router from "next/router";
const OrderShow = ({ order, currentUser }) => {
  const [timeLeft, setTileLeft] = useState(0);
  const { doRequest, errors } = useRequest({
    url: "/api/payments",
    method: "post",
    body: { orderId: order.id, token: "tok_visa" },
    onSuccess: (data) => {
      console.log(data.payment.paymentId);
      Router.push("/orders");
    },
  });
  useEffect(() => {
    const getTimeLeft = () => {
      let remainingTime = new Date(order.expiresAt) - new Date();
      setTileLeft(Math.round(remainingTime / 1000) - 1);
      console.log(Math.round(remainingTime / 1000));
      if (Math.round(remainingTime / 1000) < 0) {
        clearInterval(timerId);
      }
    };
    getTimeLeft();
    const timerId = setInterval(getTimeLeft, 1000);
    return () => {
      clearInterval(timerId);
    };
  }, [order]);
  const handlePay = () => {
    doRequest();
  };
  return (
    <div>
      <h2>
        {timeLeft < 0
          ? "Order expired"
          : `Remaining time to pay for the order: ${timeLeft} second`}
      </h2>
      <button
        className="btn btn-primary"
        disabled={timeLeft < 0}
        onClick={handlePay}
      >
        Pay
      </button>
      {errors}
    </div>
  );
};

OrderShow.getInitialProps = async (context, client, currentUser) => {
  const { orderId } = context.query;
  const {
    data: { order },
  } = await client.get(`/api/orders/${orderId}`);

  return { order };
};

export default OrderShow;
