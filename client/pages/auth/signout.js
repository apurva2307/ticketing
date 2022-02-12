import { useEffect } from "react";
import useRequest from "../../hooks/useRequest";
import Router from "next/router";

const Signout = () => {
  const { doRequest, errors } = useRequest({
    url: "/api/users/signout",
    method: "post",
    body: "",
    onSuccess: () => Router.push("/"),
  });
  useEffect(() => {
    doRequest();
  }, []);

  return (
    <div className="p-3">
      <h1>Signing you out....</h1>
      {errors}
    </div>
  );
};

export default Signout;
