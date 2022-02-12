export const fetchPayment = async (order, currentUser) => {
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  myHeaders.append("x-client-id", process.env.CASHFREE_APPID);
  myHeaders.append("x-client-secret", process.env.CASHFREE_SECRET_KEY);
  myHeaders.append("x-api-version", "2022-01-01");

  var raw = JSON.stringify({
    order_amount: order.ticket.price,
    order_currency: "INR",
    customer_details: {
      customer_id: order.userId,
      customer_email: currentUser.email,
      customer_phone: "9908734801",
    },
    order_meta: {
      return_url:
        "https://ticketing.dev?order_id={order_id}&order_token={order_token}",
    },
    order_expiry_time: order.expiresAt,
  });

  var requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };
  try {
    const res = await fetch("/api/pay", requestOptions);
    const data = await res.json();
    return { data };
  } catch (error) {
    console.log(error);
    return { err: "something went wrong" };
  }
};
