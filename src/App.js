import React, { useState } from "react";
import "./App.css";
import { motion, AnimatePresence } from "framer-motion";

import "katex/dist/katex.min.css";
import Bin2Dec from "./components/Bin2Dec/Bin2Dec";
import Dec2Bin from "./components/Dec2Bin/Dec2Bin";

import { MdAutorenew } from "react-icons/md";

function App() {
  const [isBinToDec, setIsBinToDec] = useState(true);
  const toggleMode = () => setIsBinToDec((prev) => !prev);

  const variants = {
    initial: { rotateY: -180, opacity: 0 },
    animate: {
      rotateY: 0,
      opacity: 1,
      transition: { duration: 0.6, ease: "easeInOut" },
    },
    exit: {
      rotateY: 180,
      opacity: 0,
      transition: { duration: 0.6, ease: "easeInOut" },
    },
  };

  return (
    <div className="app-background">
      <AnimatePresence mode="wait">
        <motion.div
          key={isBinToDec ? "bin2dec" : "dec2bin"}
          className="app-container"
          initial="initial"
          animate="animate"
          exit="exit"
          variants={variants}
          style={{ perspective: 1000, transformStyle: "preserve-3d" }}
        >
          <div style={{ textAlign: "right", marginBottom: "1rem" }}>
            <button className="toggle-button" onClick={toggleMode} style={{ position: "absolute", top: "10px", right: "10px" }}>
              <MdAutorenew size={24} style={{ display: "block" }} />
            </button>
          </div>
          {isBinToDec ? <Bin2Dec /> : <Dec2Bin />}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

export default App;