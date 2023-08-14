import './App.css';
import { useState } from "react"

function App() {
  const btnValues = [
    {
      id: "clear",
      value: "C"
    },
    {
      id: "plus-minus",
      value: "+/-"
    },
    {
      id: "percent",
      value: "%"
    },
    {
      id: "divide",
      value: "/"
    },
    {
      id: "seven",
      value: 7
    },
    {
      id: "eight",
      value: 8
    },
    {
      id: "nine",
      value: 9
    },
    {
      id: "multiply",
      value: "x"
    },
    {
      id: "four",
      value: 4
    },

    {
      id: "five",
      value: 5
    },
    {
      id: "six",
      value: 6
    },
    {
      id: "subtract",
      value: "-"
    },
    {
      id: "one",
      value: 1
    },
    {
      id: "two",
      value: 2
    },
    {
      id: "three",
      value: 3
    },
    {
      id: "add",
      value: "+"
    },
    {
      id: "decimal",
      value: "."
    },
    {
      id: "zero",
      value: 0
    },
    {
      id: "equals",
      value: "="
    },
  ];

  const [count, setCount] = useState("0");
  const [currentValue, setCurrentValue] = useState("");
  const [operator, setOperator] = useState("");
  const [nextNumber, setNextNumber] = useState(false);

  function clear() {
    setCount("0");
    setCurrentValue("");
    setOperator("");
    setNextNumber(false);
  }

  function plusminus() {
    setCount((prevCount) => (-parseFloat(prevCount)).toString());
  }


  function percent() {
    setCount((prevCount) => (parseFloat(prevCount) / 100).toString());
  }

  function inputNum(e) {
    const input = e.target.value;

    console.log("🚀 ~ file: App.js:107 ~ inputNum ~ input:", input)
    if (count === "0" || nextNumber) {
      setCount(input);
      setNextNumber(false);
    } else if (count.length <= 12) {
      setCount((prevCount) => prevCount + input);
    }
  }

  function inputOperator(e) {
    const oper_input = e.target.value;
    setOperator(oper_input);
    setCurrentValue(count);
    setNextNumber(true);
    if (oper_input === "+") {
      setCount("+");
    } else if (oper_input === "-") {
      setCount("-");
    }
    else if (oper_input === "/") {
      setCount("/");
    }
    else if (oper_input === "x") {
      setCount("x");
    }
  }


  function calculate() {
    const prevValue = parseFloat(currentValue);
    const currentValueFloat = parseFloat(count);

    let result;
    let limitedResult;

    switch (operator) {
      case "+":
        result = prevValue + currentValueFloat;
        break;
      case "-":
        result = prevValue - currentValueFloat;
        break;
      case "x":
        result = prevValue * currentValueFloat;
        break;
      case "/":
        if (currentValueFloat !== 0) {
          result = prevValue / currentValueFloat;
        } else {
          setCount("ERROR");
          return;
        }
        break;
      default:
        break;
    }

    if (result < 1) {
      limitedResult = parseFloat(result.toFixed(8));
    } else {
      limitedResult = result;
    }

    setCount(limitedResult);
    setCurrentValue("");
    setOperator("");
    setNextNumber(false);
  }

  function decimal() {
    if (!count.includes(".")) {
      setCount((prevCount) => prevCount + ".");
    }
  }


  return (
    <div className="App">
      <div className="calculator">
        <div id="display">
          <div className="counts">{count}</div>
        </div>
        <hr />
        <div className="button">
          {btnValues.map(btn => (
            <div key={btn.id}>
              <button
                onClick={(e) => {
                  switch (btn.value) {
                    case "C":
                      clear();
                      break;
                    case "+/-":
                      plusminus();
                      break;
                    case "%":
                      percent();
                      break;
                    case "=":
                      calculate();
                      break;
                    case 0:
                    case 1:
                    case 2:
                    case 3:
                    case 4:
                    case 5:
                    case 6:
                    case 7:
                    case 8:
                    case 9:
                      inputNum(e);
                      break;
                    case "/":
                    case "x":
                    case "-":
                    case "+":
                      inputOperator(e);
                      break;
                    case ".":
                      decimal(e)
                      break;
                    default:
                      break;
                  }
                }}
                value={btn.value}
                id={btn.id}
              >
                {btn.value}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div >
  );
}

export default App;

