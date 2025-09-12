// import { Button } from "@/components/ui/button";

import { Outlet } from "react-router";
import Header from "./components/custom/Header/index.tsx";

function App() {
  return (
    <div className="bg-background">
      <Header />
      <Outlet />;
    </div>
  );
}

export default App;
