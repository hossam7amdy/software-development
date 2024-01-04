import "./App.css";
import { proxy, useSnapshot } from "./hooks/useSnapshot";

const state = proxy({ count: 0, text: "hello" });

function App() {
  const snap = useSnapshot(state);

  console.log(snap);

  return (
    <div>
      {snap.count} <button onClick={() => ++state.count}>+1</button>
    </div>
  );
}

// you can mutate the state from anywhere
setInterval(() => {
  ++state.count;
}, 1000);

export default App;
