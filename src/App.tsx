import "./App.css";
import HomePage from "./components/HomePage";
import RandawayProvider from "./components/RandawayProvider";

function App() {
  return (
  <RandawayProvider>
    <HomePage/>
  </RandawayProvider>);
}

export default App;
