import { useCallback, useEffect, useState } from "react";

export function proxy<T extends object>(initialValue: T): T {
  const rerender = new CustomEvent("rerender");

  return new Proxy(initialValue, {
    get: (obj, prop) => {
      return Reflect.get(obj, prop);
    },
    set: (obj, prop, newValue) => {
      const updated = Reflect.set(obj, prop, newValue);

      if (updated) {
        dispatchEvent(rerender);
      }

      return updated;
    },
  });
}

export function useSnapshot<T extends object>(proxy: T): T {
  const [_, setRender] = useState(1);

  const forceRender = useCallback(() => setRender((prev) => prev + 1), []);

  useEffect(() => {
    window.addEventListener("rerender", forceRender);
    return () => window.removeEventListener("rerender", forceRender);
  }, []);

  return proxy;
}
