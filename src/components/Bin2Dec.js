import React, { useState } from "react";
import { BlockMath } from "react-katex";

export default function Bin2Dec() {
  const [binary, setBinary] = useState("");
  const [error, setError] = useState("");
  const [decimal, setDecimal] = useState("");

  const convertBinToDec = (binStr) => {
    let total = 0;
    const length = binStr.length;
    for (let i = 0; i < length; i++) {
      const char = binStr.charAt(i);
      const digit = parseInt(char, 10);
      const power = length - 1 - i;
      total += digit * Math.pow(2, power);
    }
    return total;
  };

  const handleBinChange = (e) => {
    const val = e.target.value;
    if (val === "" || /^[01]+$/.test(val)) {
      setBinary(val);
      setError("");
      if (val !== "") {
        setDecimal(convertBinToDec(val));
      } else {
        setDecimal("");
      }
    } else {
      setError("Please enter only 0 or 1.");
    }
  };

  return (
    <div style={{ marginTop: "1rem" }}>
      <h2 style={{ textAlign: "center" }}>Binary → Decimal</h2>
      <div
        style={{
          margin: "1rem 0",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <input
          id="binInput"
          type="text"
          maxLength={8}
          value={binary}
          onChange={handleBinChange}
          placeholder="e.g. 1011"
          style={{
            backgroundColor: "#363636",
            padding: "0.5rem",
            borderRadius: "30px",      
            border: "none",           
            outline: "none",         
            width: "150px",             
            textAlign: "center",
            color: "#E0E0E0",           
            boxShadow: "inset 0 0 0 2px rgba(255,255,255,0.2)", 
          }}
        />
        <span style={{ margin: "0 0.5rem", fontSize: "1.5rem" }}>→</span>
        <strong style={{ fontSize: "1.5rem" }}>{decimal}</strong>
      </div>
  
      {error && <p style={{ color: "red", textAlign: "center" }}>{error}</p>}
      {!error && binary && <BinExplanation binary={binary} />}
    </div>
  );
}

function BinExplanation({ binary }) {
  let sum = 0;
  const length = binary.length;

  const rows = [];
  for (let i = 0; i < length; i++) {
    const digitChar = binary.charAt(i);
    const digit = parseInt(digitChar, 10);
    const power = length - 1 - i;
    const partial = digit * Math.pow(2, power);

    sum += partial;

    rows.push(
      <tr key={i} style={{ textAlign: "left" }}>
        <td>{i}</td>
        <td>{digit}</td>
        <td>{`2^${power}`}</td>
        <td>{partial}</td>
      </tr>
    );
  }

  let expression = "";
  for (let i = 0; i < length; i++) {
    const digit = binary.charAt(i);
    const power = length - 1 - i;
    if (i > 0) expression += " + ";
    expression += `${digit}\\times 2^{${power}}`;
  }
  const fullLatex = `${expression} = ${sum}`;

  return (
    <div style={{ marginTop: "1rem" }}>
      <div style={{ marginTop: "1rem" }}>
        <h4>Math Expression</h4>
        <p style={{ fontStyle: "italic", marginBottom: "0.5rem" }}>
          Each digit is multiplied by 2 raised to the power of its position.
        </p>
        <div
          style={{
            overflowX: "auto",
            maxWidth: "100%",
            backgroundColor: "#21282c",
            padding: "0.5rem",
            borderRadius: "4px",
          }}
        >
          <BlockMath options={{ strict: "ignore" }}>
            {fullLatex}
          </BlockMath>
        </div>
      </div>
    </div>
  );
}
