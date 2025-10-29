import "./App.css";
import VectorList from "./components/VectorList/VectorList";
import Graph from "./components/Graph/Graph";
import { VectorProvider } from "./contexts/VectorContext";

function App() {
  return (
    <VectorProvider>
      <div className="app">
        <VectorList />
        <Graph />
      </div>
    </VectorProvider>
  );
}

export default App;
