import AppRoutes from "./routes/AppRoutes";
import "./styles/index.css";
import { CurrentViewProvider } from "./contexts/CurrentViewContext"; // Import the context provider

function App() {
  return (
    <CurrentViewProvider>
      <AppRoutes />
    </CurrentViewProvider>
  );
}

export default App;
