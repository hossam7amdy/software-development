import { useEffect, useState } from "react";
import { Count } from "./Count/Count";
import { Width } from "./Width/Width";

const useCount = () => {
  const [count, setCount] = useState(0);

  const increment = () => setCount((count) => count + 1);
  const decrement = () => setCount((count) => count - 1);

  return { count, increment, decrement };
};

const useWidth = () => {
  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return { width };
};

export default function FunctionCounter() {
  const { count, increment, decrement } = useCount();
  const { width } = useWidth();

  return (
    <div className="App">
      <Count count={count} increment={increment} decrement={decrement} />
      <div id="divider" />
      <Width width={width} />
    </div>
  );
}
