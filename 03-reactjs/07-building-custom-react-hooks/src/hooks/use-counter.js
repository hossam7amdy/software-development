import { useEffect, useState } from "react";

const useCounter = (init, forward) => {
  const [counter, setCounter] = useState(init);

  useEffect(() => {
    const interval = setInterval(() => {
      setCounter((prevCounter) =>
        forward ? prevCounter + 1 : prevCounter - 1
      );
    }, 1000);

    return () => clearInterval(interval);
  }, [forward]);

  return counter;
};

export default useCounter;
