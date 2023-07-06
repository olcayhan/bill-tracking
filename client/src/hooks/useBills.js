import axios from "axios";
import { useEffect, useState } from "react";

const useBills = () => {
  const [data, setData] = useState(undefined);
  const [isLoading, setIsLoading] = useState(false);

  const mutate = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get(
        "https://fatura-takip-backend.onrender.com/bill/get"
      );
      setData(response.data.bills);
    } catch (err) {
      console.log(err);
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
