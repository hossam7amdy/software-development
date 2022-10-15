import { useState } from "react";

import Output from "./Output";
import Acync from "./Async";

export const Greeting = () => {
  const [changeText, setChangeText] = useState(false);

  return (
    <div>
      <Acync />
      <h1>Hello World!</h1>
      {!changeText && <Output>React is really fun</Output>}
      {changeText && <Output>Changed!</Output>}
      <button onClick={() => setChangeText(true)}>Change Text!</button>
    </div>
  );
};
