import useRequest from "../../hooks/useRequest";
import Router from "next/router";

const TicketShow = ({ ticket }) => {
  const { doRequest, errors } = useRequest({
    url: "/api/orders",
    method: "post",
    body: { ticketId: ticket.id },
    onSuccess: (data) =>
      Router.push("/orders/[orderId]", `/orders/${data.order.id}`),
  });
  return (
    <div>
      <h2>{ticket.title}</h2>
      <h4>Price: {ticket.price}</h4>
      {errors}
      <button className="btn btn-primary" onClick={doRequest}>
        Purchase
      </button>
    </div>
  );
};
TicketShow.getInitialProps = async (context, client) => {
  const { ticketId } = context.query;
  const {
    data: { ticket },
  } = await client.get(`/api/tickets/${ticketId}`);
  return { ticket };
};
export default TicketShow;
