import { useState } from "react";

export const withHover = (Element: React.FC) => {
  return (props: any) => {
    const [hovering, setHovering] = useState(false);

    return (
      <Element
        {...props}
        hovering={hovering}
        onMouseEnter={() => setHovering(true)}
        onMouseLeave={() => setHovering(false)}
      />
    );
  };
};
