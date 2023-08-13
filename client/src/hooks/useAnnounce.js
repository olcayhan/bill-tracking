import axios from "axios";
import { useEffect, useState } from "react";
import config from "../env/config";
const useAnnounce = () => {
  const [data, setData] = useState(undefined);
  const [isLoading, setIsLoading] = useState(true);

  const USER_ID = localStorage.getItem("userID");
  const announceURL = new URL("/announce/get/" + USER_ID, config.API_URL);

  const mutate = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get(announceURL);
      setData(response.data.announce);
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

export default useAnnounce;
