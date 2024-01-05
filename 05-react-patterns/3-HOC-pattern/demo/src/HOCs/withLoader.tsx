import { useCallback, useEffect, useState } from "react";

export const withLoader = (Element: React.FC, url: string) => {
  return (props: any) => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);

    const getData = useCallback(() => fetch(url).then((res) => res.json()), []);

    useEffect(() => {
      getData()
        .then((data) => setData(data))
        .catch((err) => console.error(err))
        .finally(() => setLoading(false));
    }, []);

    if (loading) {
      return <div>Loading...</div>;
    }

    return <Element {...props} data={data} />;
  };
};
