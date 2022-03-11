import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faQuoteLeft, faQuoteRight } from "@fortawesome/fontawesome-free-solid";
import dice from "./images/icon-dice.svg";
import divider from "./images/pattern-divider-desktop.svg";

const App = () => {
  const [slip, setSlip] = useState({ advice: null, id: 0 });
  const [load, setLoad] = useState(true);
  const [disableBtn, setDisableBtn] = useState(false);

  useEffect(() => {
    fetchAdvice();
  }, []);

  const fetchAdvice = async () => {
    let response = await fetch("https://api.adviceslip.com/advice");
    let data = await response.json();
    setLoad(false);
    setSlip(data.slip);
  };

  const disableBtnTemp = () => {
    setDisableBtn(true);
    setTimeout(() => {
      setDisableBtn(false);
    }, 2000);
  };

  const btnClickHandler = () => {
    setLoad(true);
    disableBtnTemp();
    fetchAdvice();
  };

  return (
    <div
      className="text-white min-h-screen bg-dark-blue
                    text-center pt-40 px-4"
    >
      <div
        className="bg-dark-grayish-blue rounded-lg p-8 
                      max-w-md relative space-y-4 mx-auto"
      >
        <h1 className="font-bold text-xs text-neongreen tracking-[.15rem]">
          ADVICE #{slip.id}
        </h1>
        <h1 className="text-xl font-bold text-light-cyan">
          <FontAwesomeIcon className="w-2 pb-1 px-1" icon={faQuoteLeft} />
          {load ? "Loading..." : slip.advice}
          <FontAwesomeIcon className="w-2 pb-1 px-1" icon={faQuoteRight} />
        </h1>

        <img className="pt-2 pb-7" src={divider} alt="divider" />
        <button
          onClick={btnClickHandler}
          disabled={disableBtn}
          className="bg-neongreen aspect-square w-12
                      mx-auto rounded-full absolute
                      left-1/2 bottom-0 -translate-x-1/2 translate-y-1/2
                      grid place-items-center hover:shadow-neon transition-shadow"
        >
          <img
            className={`w-5 ${disableBtn ? "animate-spin" : ""}`}
            src={dice}
            alt="dice icon"
          />
        </button>
      </div>
    </div>
  );
};

export default App;
