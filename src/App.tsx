import React, { useState } from "react";
import Home from "@/views/home";
function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="App">
      <Home></Home>
    </div>
  );
}

export default App;
