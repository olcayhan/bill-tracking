import axios from "axios";
import { useEffect, useState } from "react";

const useAnnounce = () => {
  const [data, setData] = useState(undefined);
  const [isLoading, setIsLoading] = useState(true);

  const mutate = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get(
        "https://bill-track.onrender.com/announce/get"
      );
      setData(response.data.announce);
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

export default useAnnounce;
