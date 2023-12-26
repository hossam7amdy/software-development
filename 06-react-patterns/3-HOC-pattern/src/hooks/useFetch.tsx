import { useCallback, useEffect, useState } from "react";

export const useFetch = (url: string) => {
  const [error, setError] = useState(null);
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const fetchData = useCallback(
    (url: string) => fetch(url).then((res) => res.json()),
    []
  );

  useEffect(() => {
    fetchData(url)
      .then((data) => setData(data))
      .catch((err) => setError(err))
      .finally(() => setLoading(false));
  }, [url]);

  return { loading, error, data };
};
