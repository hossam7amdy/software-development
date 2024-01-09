import useCounter from "../hooks/use-counter";

import Card from "./Card";

const BackwardCounter = () => {
  const counter = useCounter(0, false);

  return <Card>{counter}</Card>;
};

export default BackwardCounter;
