import { useState } from "react";

export const Input = (props: any) => {
  const [value, setValue] = useState("");

  return (
    <>
      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      {props.children(value)}
    </>
  );
};
