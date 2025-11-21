import { Outlet } from "react-router";
import Header from "./components/custom/Header/index.tsx";
import { Footer } from "./components/custom/Footer";
import { useScrollToTopOnRouteChange } from "./hooks/useScrollToTopOnRouteChange";

function App() {
  useScrollToTopOnRouteChange();
  return (
    <div className="bg-background flex flex-col min-h-screen">
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
}

export default App;
