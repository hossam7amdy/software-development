import { createContext, useCallback, useContext, useState } from "react";
import Icon from "./Icon";
import "./styles.css";
import { useClickOutside } from "./useClickOutside";

const FlyoutContext = createContext(
  {} as {
    open: boolean;
    toggle: () => void;
  }
);

export function Flyout({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  const ref = useClickOutside(useCallback(() => setOpen(false), []));

  const toggle = () => setOpen(!open);

  return (
    <div ref={ref} className="flyout">
      <FlyoutContext.Provider value={{ open, toggle }}>
        {children}
      </FlyoutContext.Provider>
    </div>
  );
}

function List(props: { children: React.ReactNode }) {
  const { open } = useContext(FlyoutContext);
  return open && <ul className="flyout-list">{props.children}</ul>;
}

function Item(props: { children: React.ReactNode }) {
  return <li className="flyout-item">{props.children}</li>;
}

function Toggle() {
  const { toggle } = useContext(FlyoutContext);

  return (
    <div className="flyout-btn" onClick={toggle}>
      <Icon />
    </div>
  );
}

Flyout.Toggle = Toggle;
Flyout.List = List;
Flyout.Item = Item;
