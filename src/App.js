import React, { useState } from "react";
import "./App.css";

import "katex/dist/katex.min.css";
import Bin2Dec from "./components/Bin2Dec";
import Dec2Bin from "./components/Dec2Bin";


function App() {
  const [isBinToDec, setIsBinToDec] = useState(true);

  const toggleMode = () => setIsBinToDec((prev) => !prev);

  return (
    <div className="app-background">
      <div className="app-container">
        <div style={{ textAlign: "right", marginBottom: "1rem" }}>
          <button className="toggle-button" onClick={toggleMode}>
            {isBinToDec ? "Dec→Bin" : "Bin→Dec"}
          </button>
        </div>
        {isBinToDec ? <Bin2Dec /> : <Dec2Bin />}
      </div>
    </div>
  );
}

export default App;