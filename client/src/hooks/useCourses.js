import axios from "axios";
import { useEffect, useState } from "react";

const useCourses = () => {
  const [data, setData] = useState(undefined);
  const [isLoading, setIsLoading] = useState(false);

  const mutate = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get(
        "https://bill-track.onrender.com/course/get"
      );
      setData(response.data.courses);
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

export default useCourses;
