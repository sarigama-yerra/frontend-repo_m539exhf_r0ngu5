import React, { useState } from "react";

const buttons = [
  { label: "C", type: "action" },
  { label: "±", type: "action" },
  { label: "%", type: "op" },
  { label: "÷", type: "op", value: "/" },
  { label: "7" },
  { label: "8" },
  { label: "9" },
  { label: "×", type: "op", value: "*" },
  { label: "4" },
  { label: "5" },
  { label: "6" },
  { label: "-", type: "op" },
  { label: "1" },
  { label: "2" },
  { label: "3" },
  { label: "+", type: "op" },
  { label: "0", span: 2 },
  { label: "." },
  { label: "=", type: "equals" },
];

function Calculator() {
  const [display, setDisplay] = useState("0");
  const [prev, setPrev] = useState(null);
  const [op, setOp] = useState(null);
  const [justEvaluated, setJustEvaluated] = useState(false);

  const inputDigit = (d) => {
    setDisplay((cur) => {
      if (justEvaluated) {
        setJustEvaluated(false);
        return d;
      }
      if (cur === "0" && d !== ".") return d;
      if (d === "." && cur.includes(".")) return cur; // prevent double dots
      return cur + d;
    });
  };

  const clearAll = () => {
    setDisplay("0");
    setPrev(null);
    setOp(null);
    setJustEvaluated(false);
  };

  const toggleSign = () => {
    setDisplay((cur) => (cur.startsWith("-") ? cur.slice(1) : cur === "0" ? cur : "-" + cur));
  };

  const percent = () => {
    setDisplay((cur) => String(parseFloat(cur) / 100));
  };

  const chooseOp = (nextOp) => {
    if (op && prev != null && !justEvaluated) {
      // chain operations
      const result = evaluate(prev, op, parseFloat(display));
      setPrev(result);
      setDisplay(String(result));
    } else {
      setPrev(parseFloat(display));
    }
    setOp(nextOp);
    setJustEvaluated(false);
    setDisplay("0");
  };

  const evaluate = (a, operator, b) => {
    switch (operator) {
      case "+":
        return a + b;
      case "-":
        return a - b;
      case "*":
        return a * b;
      case "/":
        return b === 0 ? NaN : a / b;
      case "%":
        return a % b;
      default:
        return b;
    }
  };

  const doEquals = () => {
    if (op == null || prev == null) return;
    const result = evaluate(prev, op, parseFloat(display));
    setDisplay(Number.isNaN(result) || !Number.isFinite(result) ? "Error" : String(result));
    setPrev(null);
    setOp(null);
    setJustEvaluated(true);
  };

  const handleKey = (label) => {
    const value = buttons.find((b) => b.label === label)?.value ?? label;

    if (/^\d$/.test(value)) return inputDigit(value);
    if (value === ".") return inputDigit(".");

    if (label === "C") return clearAll();
    if (label === "±") return toggleSign();
    if (label === "%") return percent();

    if (["+", "-", "*", "/"].includes(value)) return chooseOp(value);
    if (label === "=") return doEquals();
  };

  return (
    <div className="mx-auto w-full max-w-sm">
      <div className="bg-slate-900/70 border border-blue-500/20 rounded-3xl shadow-2xl p-6">
        <div className="mb-4">
          <div className="h-16 rounded-xl bg-black/60 text-right text-3xl text-white flex items-center justify-end px-4 font-mono tracking-wider overflow-x-auto">
            {display}
          </div>
        </div>

        <div className="grid grid-cols-4 gap-3">
          {buttons.map((b, idx) => (
            <button
              key={idx}
              onClick={() => handleKey(b.label)}
              className={
                "h-14 rounded-xl text-white text-lg font-semibold transition-all active:scale-95 " +
                (b.type === "equals"
                  ? "bg-blue-600 hover:bg-blue-500 col-span-1"
                  : b.type === "op" || b.type === "action"
                  ? "bg-slate-700/80 hover:bg-slate-700"
                  : "bg-slate-800/80 hover:bg-slate-700") +
                (b.span === 2 ? " col-span-2" : "")
              }
            >
              {b.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Calculator;
