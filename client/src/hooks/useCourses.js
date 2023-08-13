import axios from "axios";
import { useEffect, useState } from "react";
import config from "../env/config";

const useCourses = () => {
  const [data, setData] = useState(undefined);
  const [isLoading, setIsLoading] = useState(false);

  const USER_ID = localStorage.getItem("userID");
  const courseURL = new URL("/course/get/" + USER_ID, config.API_URL);

  const mutate = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get(courseURL);
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
