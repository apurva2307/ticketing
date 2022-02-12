import Router from "next/router";
import { useState } from "react";
import useRequest from "../../hooks/useRequest";
const NewTicket = () => {
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const { doRequest, errors } = useRequest({
    url: "/api/tickets",
    method: "post",
    body: { title, price },
    onSuccess: () => Router.push("/"),
  });
  const onBlur = () => {
    const value = parseFloat(price);
    // if (isNaN(value)) {
    //   return;
    // }
    setPrice(value.toFixed(2));
  };
  const onSubmit = async (e) => {
    e.preventDefault();
    doRequest();
  };
  return (
    <>
      <h1>Create a ticket</h1>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label>Title</label>
          <input
            type="text"
            className="form-control"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="form-group my-2">
          <label>Price</label>
          <input
            type="number"
            onBlur={onBlur}
            className="form-control"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </div>
        <button className="btn btn-primary my-2">Submit</button>
        {errors}
      </form>
    </>
  );
};

export default NewTicket;
