import AppRoutes from "./routes/AppRoutes";
import "./styles/index.css";
import { CurrentViewProvider } from "./contexts/CurrentViewContext"; // Import the context provider
import { BrowserRouter as Router } from "react-router-dom"; // Import Router

function App() {
  return (
    <Router>
      <CurrentViewProvider>
        <AppRoutes />
      </CurrentViewProvider>
    </Router>
  );
}

export default App;
