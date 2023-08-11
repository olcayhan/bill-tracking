import axios from "axios";
import { useEffect, useState } from "react";

const useUser = () => {
  const userID = localStorage.getItem("userID");
  const token = localStorage.getItem("token");

  const [data, setData] = useState(undefined);
  const [error, setError] = useState(undefined);
  const [isLoading, setIsLoading] = useState(true);

  const mutate = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get(
        userID ? `https://bill-track.onrender.com/users/get/${userID}` : null,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
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
