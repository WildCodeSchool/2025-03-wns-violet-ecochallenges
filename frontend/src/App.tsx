// import { Button } from "@/components/ui/button";

import { Outlet } from "react-router";

function App() {
  return (
  <div className="bg-background">
    <Outlet />; 
  </div>)
}

export default App;
