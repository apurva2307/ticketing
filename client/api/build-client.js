import axios from "axios";

const buildClient = ({ req }) => {
  if (typeof window === "undefined") {
    // we are on the server and will make request from inside docker container
    return axios.create({
      baseURL: "http://ticketing.apurvasingh.dev/",
      headers: req.headers,
    });
  } else {
    //we are on client and will make request from browser
    return axios.create({
      baseURL: "/",
    });
  }
};

export default buildClient;
