import { useState, useEffect, useRef, useCallback } from "react";
import fetch from "isomorphic-unfetch";

export default (endpoint, options, defaultData = {}) => {
  const mounted = useRef(true);
  const [data, setData] = useState(defaultData);

  console.log(endpoint);

  const fetchData = useCallback(async () => {
    const response = await fetch(endpoint, options);
    const data = await response.json();

    if (mounted.current) setData(data);
  });

  useEffect(() => {
    fetchData();

    return () => {
      mounted.current = false;
    };
  }, [endpoint]);

  return [data, fetchData];
};
