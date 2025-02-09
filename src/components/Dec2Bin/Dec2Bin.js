import React, { useState } from "react";
import { BlockMath } from "react-katex";

function DecExplanation({ decimalStr }) {
  
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const decVal = parseInt(decimalStr, 10);

  let n = decVal;
  const stepDetails = [];

  while (n > 0) {
    const quotient = Math.floor(n / 2);
    const remainder = n % 2;
    stepDetails.push(
      `${n} \\div 2 = ${quotient}, \\text{remainder } ${remainder}`
    );
    n = quotient;
  }

  if (decVal === 0) {
    stepDetails.push(`0 \\div 2 = 0, \\text{remainder } 0`);
  }

  const stepsLatex = 
    `\\begin{aligned}
    ${stepDetails.join(" \\\\ ")}
    \\end{aligned}`;
  
  return (
    <div style={{ marginTop: "1rem", textAlign: "center" }}>
      <button
        title="View Details"
        className="info-button"
        onClick={() => setIsDialogOpen(true)}
      >
        ?
      </button>

      {isDialogOpen && (
        <div
          className="dialog-overlay"
          onClick={() => setIsDialogOpen(false)}
        >
          <div
            className="dialog-content"
            onClick={(e) => e.stopPropagation()}
            style={{ maxWidth: "800px", width: "90%" }}
          >
            <button
              className="close-dialog"
              onClick={() => setIsDialogOpen(false)}
            >
              X
            </button>
            <div style={{ marginTop: "1rem" }}>
              <h4>Math Expression</h4>
              <p style={{ fontStyle: "italic", marginBottom: "0.5rem" }}>
                We repeatedly divide by 2 and take the remainders:
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
                  {stepsLatex}
                </BlockMath>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default function Dec2Bin() {
  
  const [decimal, setDecimal] = useState("");
  const [error, setError] = useState("");
  const [binary, setBinary] = useState("");

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
  
    if (val === "" || /^[0-9]+$/.test(val)) {
      const numericValue = parseInt(val, 10);
  
      if (numericValue > MAX_DEC_VALUE) {
        setError(`Maximum allowed is ${MAX_DEC_VALUE}`);
        return;
      }
      
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
      <h2 style={{ textAlign: "center" }}>Decimal to Binary</h2>
      <div style={{ marginTop: "1rem", display: "flex", justifyContent: "center", alignItems: "center" }}>
        <input
          id="decInput"
          type="text"
          value={decimal}
          onChange={handleDecChange}
          placeholder="e.g. 13"
          style={{
            backgroundColor: "#363636",
            padding: "0.5rem",
            border: "none",             
            outline: "none",          
            width: "150px",           
            textAlign: "center",
            color: "#E0E0E0",           
            boxShadow: "inset 0 0 0 2px rgba(255,255,255,0.2)",
          }}
        />
        <span style={{ margin: "0 0.5rem", fontSize: "1.5rem" }}>→</span>
        <strong style={{ fontSize: "1.5rem" }}>{binary}</strong>
      </div>
      
      {error && <p style={{ color: "red", textAlign: "center" }}>{error}</p>}
      {!error && decimal && <DecExplanation decimalStr={decimal} binary={binary} />}
    </div>
  );
};


