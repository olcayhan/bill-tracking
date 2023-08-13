import axios from "axios";
import { useEffect, useState } from "react";
import config from "../env/config";

const useBill = (id) => {
  const [data, setData] = useState(undefined);
  const [isLoading, setIsLoading] = useState(false);

  const billURL = new URL("/bill/get/" + id, config.API_URL);
  const mutate = async () => {
    try {
      setIsLoading(true);
      const response = id ? await axios.get(billURL) : null;
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

export default useBill;
