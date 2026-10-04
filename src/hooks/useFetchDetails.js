import axios from "axios";
import { useEffect, useState, useCallback } from "react";

const useFetchDetails = (endpoint) => {
  const [data, setData] = useState();
  const [loading, setLoading] = useState(false);

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      const response = await axios.get(endpoint);
      setData(response.data);
    } catch (error) {
      console.log("error", error);
    } finally {
      setLoading(false);
    }
  }, [endpoint]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { data, loading };
};

export default useFetchDetails;
