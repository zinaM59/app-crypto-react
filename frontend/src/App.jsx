import "./App.css";
import AppLayout from "./components/layout/AppLayout";
import { CryptoContextProvider } from "../src/context/crypto-context";

function App() {
  return (
    <CryptoContextProvider>
      <AppLayout></AppLayout>
    </CryptoContextProvider>
  );
}

export default App;
