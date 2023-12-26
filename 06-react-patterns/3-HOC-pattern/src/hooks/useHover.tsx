import { useEffect, useRef, useState } from "react";

export const useHover = () => {
  const ref = useRef<any>(null);
  const [hovering, setHovering] = useState(false);

  const enter = () => setHovering(true);
  const leave = () => setHovering(false);

  useEffect(() => {
    if (!ref.current) {
      return;
    }

    const node = ref.current;

    node.addEventListener("mouseenter", enter);
    node.addEventListener("mouseleave", leave);

    return () => {
      node.removeEventListener("mouseenter", enter);
      node.removeEventListener("mouseleave", leave);
    };
  }, [ref.current]);

  return { ref, hovering };
};
