import React from "react";

import Navbar from "./components/Navbar";
import Navigation from "./infrastructure/navigation";

export default function App() {
  return (
    <div>
      <Navbar />
      <div className="container py-5 mt-5 ">
        <Navigation />
      </div>
    </div>
  );
}
