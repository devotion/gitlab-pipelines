import { useState, useEffect, useCallback } from "react";
import fetch from "isomorphic-unfetch";

export default (endpoint, options, defaultData = {}) => {
  const [data, setData] = useState(defaultData);

  const fetchData = useCallback(async () => {
    const response = await fetch(endpoint, options);
    const data = await response.json();

    setData(data);
  });

  useEffect(() => {
    fetchData();
  }, [endpoint]);

  return [data, fetchData];
};
