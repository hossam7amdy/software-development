import "./App.css";
import { Fahrenheit } from "./components/Fahrenheit";
import { Input } from "./components/Input";
import { Kelvin } from "./components/Kelvin";

function App() {
  return (
    <div style={{ textAlign: "center" }}>
      <h1>☃️ Temperature Converter 🌞</h1>
      <Input>
        {(value: string) => (
          <>
            <Kelvin value={parseFloat(value) || 0} />
            <Fahrenheit value={parseFloat(value) || 0} />
          </>
        )}
      </Input>
    </div>
  );
}

export default App;
