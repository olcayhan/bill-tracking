import axios from "axios";
import { useEffect, useState } from "react";

const useStudents = () => {
  const [data, setData] = useState(undefined);
  const [isLoading, setIsLoading] = useState(false);

  const mutate = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get(
        "https://fatura-takip-backend.onrender.com/student/get"
      );
      setData(response.data.students);
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

export default useStudents;
