import Link from "next/link";
const Home = ({ currentUser, tickets }) => {
  const alltickets = tickets.map((ticket) => {
    return (
      <tr key={ticket.id}>
        <td>{ticket.title}</td>
        <td>{ticket.price}</td>
        <td>
          <Link href="/tickets/[ticketId]" as={`/tickets/${ticket.id}`}>
            <a>View</a>
          </Link>
        </td>
      </tr>
    );
  });
  return (
    <>
      <h1>Tickets</h1>
      <table className="table">
        <thead>
          <tr>
            <th>Title</th>
            <th>Price</th>
            <th>Link</th>
          </tr>
        </thead>
        <tbody>{alltickets}</tbody>
      </table>
    </>
  );
};
Home.getInitialProps = async (context, client, currentuser) => {
  const {
    data: { tickets },
  } = await client.get("/api/tickets");
  return { tickets };
};
export default Home;
