import axios from "axios";
import { useEffect, useState } from "react";

const useBill = (id) => {
  const [data, setData] = useState(undefined);
  const [isLoading, setIsLoading] = useState(false);

  const mutate = async () => {
    try {
      setIsLoading(true);

      const response = id
        ? await axios.get(`https://bill-track.onrender.com/bill/get/${id}`)
        : null;
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
