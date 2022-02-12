import { useState } from "react";
import axios from "axios";

const useRequest = ({ url, method, body, onSuccess }) => {
  const [errors, setErrors] = useState(null);
  const doRequest = async () => {
    try {
      setErrors(null);
      const response = await axios[method](url, body);
      if (response.data && onSuccess) {
        onSuccess(response.data);
      }
      return response.data;
    } catch (error) {
      setErrors(
        <div className="alert alert-danger my-3">
          <ul className="my-0">
            {error.response?.data?.errors.map((err, index) => (
              <li key={index.toString()}>{err.message}</li>
            ))}
          </ul>
        </div>
      );
    }
  };
  return { doRequest, errors };
};

export default useRequest;
