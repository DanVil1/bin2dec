// src/components/Dec2Bin.js
import React, { useState } from "react";
import { BlockMath } from "react-katex";

export default function Dec2Bin() {
  const [decimal, setDecimal] = useState("");
  const [error, setError] = useState("");
  const [binary, setBinary] = useState("");

  // Convert decimal -> binary with repeated division by 2
  // No arrays for storing the input digits themselves; we build a string.
  const convertDecToBin = (decStr) => {
    let decValue = parseInt(decStr, 10);
    if (decValue === 0) return "0";

    let result = "";
    while (decValue > 0) {
      const remainder = decValue % 2;

      result = remainder + result;
      decValue = Math.floor(decValue / 2);
    }
    return result;
  };

  const MAX_DEC_VALUE = 2147483647;

  const handleDecChange = (e) => {
    const val = e.target.value;
  
    // If empty or only digits, proceed
    if (val === "" || /^[0-9]+$/.test(val)) {
      const numericValue = parseInt(val, 10);
  
      // Limit to 2,147,483,647
      if (numericValue > MAX_DEC_VALUE) {
        setError(`Maximum allowed is ${MAX_DEC_VALUE}`);
        return;
      }
      
      // Otherwise proceed as normal
      setDecimal(val);
      setError("");
      if (val !== "") {
        const binResult = convertDecToBin(val);
        setBinary(binResult);
      } else {
        setBinary("");
      }
    } else {
      setError("Please enter only decimal digits (0-9).");
    }
  };

  return (
    <div style={{ marginTop: "1rem" }}>
      <h2 style={{ textAlign: "center" }}>Decimal → Binary</h2>

      {/* Input Field */}
      <div>
        <label htmlFor="decInput">Decimal: </label>
        <input
          id="decInput"
          type="text"
          value={decimal}
          onChange={handleDecChange}
          placeholder="e.g. 13"
          style={{ marginLeft: "0.5rem" }}
        />
      </div>

      {/* Error Message */}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {/* Output */}
      <p style={{ marginTop: "0.5rem" }}>
        Binary: <strong>{binary}</strong>
      </p>

      {/* Explanation Table if valid input */}
      {!error && decimal && <DecExplanation decimalStr={decimal} binary={binary} />}
    </div>
  );
}

/* Step-by-step explanation for Dec->Bin 
   We'll produce:
    - A table showing each "divide by 2" step
    - A final LaTeX expression that enumerates all steps
*/
function DecExplanation({ decimalStr, binary }) {
  const decVal = parseInt(decimalStr, 10);

  // We'll rebuild the logic for repeated division by 2
  // to capture each step for the table.
  let n = decVal;
  let stepIndex = 1;
  const rows = [];
  const stepDetails = []; // for building a LaTeX expression (line by line)

  while (n > 0) {
    const quotient = Math.floor(n / 2);
    const remainder = n % 2;

    // We'll store the textual step
    stepDetails.push(`${n} \\div 2 = ${quotient}, \\text{remainder } ${remainder}`);

    // Also push a table row
    rows.push(
      <tr key={stepIndex}>
        <td>{stepIndex}</td>
        <td>{n}</td>
        <td>{quotient}</td>
        <td>{remainder}</td>
      </tr>
    );

    n = quotient;
    stepIndex++;
  }

  // Handle the case where decimal = 0
  if (decVal === 0) {
    stepDetails.push(`0 \\div 2 = 0, \\text{remainder } 0`);
    rows.push(
      <tr key="0">
        <td>1</td>
        <td>0</td>
        <td>0</td>
        <td>0</td>
      </tr>
    );
  }

  // Join each step with line breaks in LaTeX
  const stepsLatex = stepDetails.join("\\\\");
  // Final LaTeX line about how remainders form the binary
  const finalLatex = `\\text{Binary (from right to left remainders): } ${binary}`;

  return (
    <div style={{ marginTop: "1rem" }}>
      <h3>Step-by-Step Table</h3>
      <table style={{ borderCollapse: "collapse", width: "100%" }}>
        <thead>
          <tr style={{ borderBottom: "1px solid #ccc" }}>
            <th>Step</th>
            <th>Current Value</th>
            <th>Quotient</th>
            <th>Remainder</th>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </table>

      <div style={{ marginTop: "1rem" }}>
        <h4>Division Steps as Math</h4>
        <p style={{ fontStyle: "italic", marginBottom: "0.5rem" }}>
          We repeatedly divide by 2 and take the remainders:
        </p>
        <BlockMath>{stepsLatex}</BlockMath>
        <BlockMath>{finalLatex}</BlockMath>
      </div>
    </div>
  );
}
