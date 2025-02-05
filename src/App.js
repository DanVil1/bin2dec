// App.js
import React, { useState } from "react";

// KaTeX for LaTeX rendering
import "katex/dist/katex.min.css";
import Bin2Dec from "./components/Bin2Dec";
import Dec2Bin from "./components/Dec2Bin";

// Optional global styling for the app
const containerStyle = {
  maxWidth: "600px",
  margin: "0 auto",
  padding: "1rem",
  border: "1px solid #ccc",
  borderRadius: "8px",
};

function App() {
  const [isBinToDec, setIsBinToDec] = useState(true);

  const toggleMode = () => {
    setIsBinToDec((prev) => !prev);
  };

  return (
    <div style={containerStyle}>
      {/* Toggle Button in top-right corner */}
      <div style={{ textAlign: "right" }}>
        <button onClick={toggleMode}>
          Switch to {isBinToDec ? "Dec→Bin" : "Bin→Dec"}
        </button>
      </div>

      {isBinToDec ? <Bin2Dec /> : <Dec2Bin />}
    </div>
  );
}

export default App;