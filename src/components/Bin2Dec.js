// src/components/Bin2Dec.js
import React, { useState } from "react";
import { BlockMath } from "react-katex";

export default function Bin2Dec() {
  const [binary, setBinary] = useState("");
  const [error, setError] = useState("");
  const [decimal, setDecimal] = useState("");

  // Convert binary -> decimal (no arrays, single math function Math.pow)
  const convertBinToDec = (binStr) => {
    let total = 0;
    const length = binStr.length;
    for (let i = 0; i < length; i++) {
      const char = binStr.charAt(i); // '0' or '1'
      const digit = parseInt(char, 10);
      const power = length - 1 - i;
      total += digit * Math.pow(2, power);
    }
    return total;
  };

  const handleBinChange = (e) => {
    const val = e.target.value;
    // Validate: only allow empty or 0/1
    if (val === "" || /^[01]+$/.test(val)) {
      setBinary(val);
      setError("");
      // Convert if not empty
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

      {/* Input Field */}
      <div>
        <label htmlFor="binInput">Binary (up to 8 bits): </label>
        <input
          id="binInput"
          type="text"
          maxLength={8}
          value={binary}
          onChange={handleBinChange}
          placeholder="e.g. 1011"
          style={{ marginLeft: "0.5rem" }}
        />
      </div>

      {/* Error Message */}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {/* Output */}
      <p style={{ marginTop: "0.5rem" }}>
        Decimal: <strong>{decimal}</strong>
      </p>

      {/* Show Step-by-Step Explanation (table + LaTeX) if valid input */}
      {!error && binary && <BinExplanation binary={binary} />}
    </div>
  );
}

function BinExplanation({ binary }) {
  let sum = 0;
  const length = binary.length;

  // Build table rows for each digit's contribution
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

  // Build the LaTeX expression for the sum of each term
  // e.g. 1×2^3 + 0×2^2 + 1×2^1 + 1×2^0 = 11
  let expression = "";
  for (let i = 0; i < length; i++) {
    const digit = binary.charAt(i);
    const power = length - 1 - i;
    // Add " + " if not the first term
    if (i > 0) expression += " + ";
    expression += `${digit}\\times 2^{${power}}`;
  }
  const fullLatex = `${expression} = ${sum}`;

  return (
    <div style={{ marginTop: "1rem" }}>
      <h3>Step-by-Step Table</h3>
      <table style={{ borderCollapse: "collapse", width: "100%" }}>
        <thead>
          <tr style={{ borderBottom: "1px solid #ccc" }}>
            <th>Index</th>
            <th>Digit</th>
            <th>Power of 2</th>
            <th>Partial Value</th>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
        <tfoot>
          <tr style={{ borderTop: "1px solid #ccc" }}>
            <td colSpan={3} style={{ fontWeight: "bold" }}>Total</td>
            <td style={{ fontWeight: "bold" }}>{sum}</td>
          </tr>
        </tfoot>
      </table>

      <div style={{ marginTop: "1rem" }}>
        <h4>Math Expression</h4>
        <p style={{ fontStyle: "italic", marginBottom: "0.5rem" }}>
          Each digit is multiplied by 2 raised to the power of its position.
        </p>
        <BlockMath>{fullLatex}</BlockMath>
      </div>
    </div>
  );
}
