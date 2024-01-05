import "./styles.css";

interface Props {
  count: number;
  increment: () => void;
  decrement: () => void;
}

export function Count({ count, increment, decrement }: Props) {
  return (
    <div className="counter">
      <div className="btns">
        <button onClick={increment}>+</button>
        <button onClick={decrement}>-</button>
      </div>
      <p>Current count: {count}</p>
    </div>
  );
}
