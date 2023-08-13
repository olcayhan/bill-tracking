import axios from "axios";
import { useEffect, useState } from "react";
import config from "../env/config";

const useBills = () => {
  const [data, setData] = useState(undefined);
  const [isLoading, setIsLoading] = useState(false);

  const USER_ID = localStorage.getItem("userID");
  const billsURL = new URL("/bill/pull/" + USER_ID, config.API_URL);

  const mutate = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get(billsURL);
      setData(response.data.bills);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    mutate();
  }, []);

  return { data, isLoading, mutate };
};

export default useBills;
