function AllOrders({ orders }) {
  return (
    <div>
      <ul>
        {orders.map((order) => {
          return (
            <li>
              {order.ticket.title}: {order.status}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
AllOrders.getInitialProps = async (context, client) => {
  const {
    data: { orders },
  } = await client.get(`/api/orders`);
  return { orders };
};
export default AllOrders;
