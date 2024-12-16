import React, { useState, useEffect } from "react";

const flags = {
  SGD: "/images/sgd-flag.png",
  USD: "/images/usd-flag.png",
  INR: "/images/inr-flag.png",
  EUR: "/images/eur-flag.png",
  GBP: "/images/gbp-flag.png",
  AED: "/images/aed-flag.png",
};

export default function App() {
  const [fromCurrency, setFromCurrency] = useState("SGD");
  const [toCurrency, setToCurrency] = useState("USD");
  const [fromAmount, setFromAmount] = useState(1000);
  const [toAmount, setToAmount] = useState("");
  const [exchangeRate, setExchangeRate] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchExchangeRate();
  }, [fromCurrency, toCurrency, fromAmount]);

  const fetchExchangeRate = async () => {
    try {
      const response = await fetch(
        `https://api.exchangerate-api.com/v4/latest/${fromCurrency}`
      );
      const data = await response.json();
      const rate = data.rates[toCurrency];

      if (rate) {
        setExchangeRate(rate);
        setToAmount((fromAmount * rate).toFixed(2));
        setError(null);
      } else {
        setError("Error fetching rate");
      }
    } catch (err) {
      console.error("Error fetching exchange rate:", err);
      setError("Error fetching rate");
    }
  };

  const handleSwap = () => {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
  };

  return (
    <div className="currency-container">
      <h1 className="cchead">Currency Converter</h1>
      <p className="cccontent">
        Check live rates, set rate alerts, receive notifications and more.
      </p>

      <div className="primarybox">
        <div className="firstbox">
          <h2 className="firstname">Amount</h2>
          <div className="input-group">
            <div className="firstselectflag">
              <img
                src={flags[fromCurrency]}
                alt={`${fromCurrency} Flag`}
                className="firstflag"
              />
              <select className="firstselectopt"
                value={fromCurrency}
                onChange={(e) => setFromCurrency(e.target.value)}
              >
                {Object.keys(flags).map((currency) => (
                  <option className="jasil1" key={currency} value={currency}>
                    {currency}
                  </option>
                ))}
              </select>
            </div>
            <input
                className="firstinputdata"
              type="number"
              value={fromAmount}
              onChange={(e) => setFromAmount(parseFloat(e.target.value) || 0)}
            />
          </div>
        </div>

        <div className="middle">
          <button className="swap-btn" onClick={handleSwap}>
            <img className="vector1" src="/images/Vector.svg" />
            <img className="vector2" src="/images/Vector2.svg" />
          </button>
          <div className="line"></div>
        </div>

        <div className="secondbox">
          <h2 className="secondname">Converted Amount</h2>
          <div className="input-group">
            <div className="secondselectflag">
              <img
                className="secondflag"
                src={flags[toCurrency]}
                alt={`${toCurrency} Flag`}
              />
              <select className="secondselectopt"
                value={toCurrency}
                onChange={(e) => setToCurrency(e.target.value)}
              >
                {Object.keys(flags).map((currency) => (
                  <option className="jasil2" key={currency} value={currency}>
                    {currency}
                  </option>
                ))}
              </select>
            </div>
            <input className="secondinputdata" type="text" value={toAmount} readOnly />
          </div>
        </div>
      </div>

      <p className="ccendtext">Indicative Exchange Rate</p>
      <div className="exchange-rate">
        {error
          ? error
          : exchangeRate
          ? `1 ${fromCurrency} = ${exchangeRate} ${toCurrency}`
          : "Loading..."}
      </div>
      <div className="ellipse2"></div>
      <div className="ellipse1"></div>
    </div>
  );
}
