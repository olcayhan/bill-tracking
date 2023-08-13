import axios from "axios";
import { useEffect, useState } from "react";
import config from "../env/config";

const useUser = () => {
  const token = localStorage.getItem("token");

  const [data, setData] = useState(undefined);
  const [error, setError] = useState(undefined);
  const [isLoading, setIsLoading] = useState(true);

  const USER_ID = localStorage.getItem("userID");
  const userURL = USER_ID
    ? new URL("/users/get/" + USER_ID, config.API_URL)
    : null;

  const mutate = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get(userURL, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setData(response.data);
    } catch (err) {
      setError(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    mutate();
  }, []);

  return { data, isLoading, error, mutate };
};

export default useUser;
