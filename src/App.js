import React, { useState, useEffect } from "react";
import "./App.css";

const Currencyconverter = () => {
  const [usd, setUsd] = useState(1);
  const [eur, setEur] = useState(1);
  const [disable, setDisable] = useState(false);
  const [exchangeRate, setExchangeRate] = useState(0.94);
  const [conversionHistory, updateHistoryData] = useState([]);

  const handleExchangeRateChange = (e) => {
    e.target.value > 1 ? setExchangeRate(e.target.value) : setExchangeRate(1);
  };

  const handleUsdChange = (e) => {
    const usdValue = e.target.value;
    const exchangeEuro = usdValue * exchangeRate;
    setUsd(usdValue);
    setEur(exchangeEuro);
    updateHistoryData([{ usd: usd, eur: eur }]);
  };

  const handleEurChange = (e) => {
    const euroValue = e.target.value;
    const exchangeUsd = euroValue / exchangeRate;
    setEur(euroValue);
    setUsd(exchangeUsd);
    updateHistoryData([{ usd: usd, eur: eur }]);
  };

  const handleDisabled = () => {
    setDisable(!disable);
  };

  useEffect(() => {
    setTimeout(() => {
      setExchangeRate((exchangeRate) => exchangeRate + 0.05);
    }, 3000);

    setTimeout(() => {
      setExchangeRate((exchangeRate) => exchangeRate - 0.05);
    }, 3000);
  }, []);

  useEffect(() => {
    if (conversionHistory.length < 5) {
      updateHistoryData(usd, eur);
    }
    if (conversionHistory.length === 5) {
      conversionHistory.shift();
      updateHistoryData(usd, eur);
    }
  }, [usd, eur, conversionHistory]);

  console.log(conversionHistory);

  return (
    <React.Fragment>
      <div className="exchangeRate">
        Exchange Rate:&nbsp;&nbsp;
        <input
          type="number"
          value={exchangeRate}
          onChange={handleExchangeRateChange}
        />
      </div>
      <br />
      <div>
        <span>USD&nbsp;&nbsp;</span>
        <label className="switch">
          <input type="checkbox" />
          <span className="slider round" onClick={handleDisabled}></span>
        </label>
        <span>&nbsp;&nbsp;EUR</span>
      </div>
      <br />
      <div className="usdValue">
        <label>USD&nbsp;&nbsp;</label>
        <input
          type="number"
          value={usd}
          onChange={handleUsdChange}
          disabled={disable}
        />
        &nbsp;&nbsp;&nbsp;&nbsp;
      </div>
      <div className="eurValue">
        <label>EUR&nbsp;&nbsp;</label>
        <input
          type="number"
          value={eur}
          onChange={handleEurChange}
          disabled={!disable}
        />
      </div>
      {/* <div>{conversionHistory.map(entry => <div>{entry}</div>)}</div> */}
      <div>{conversionHistory.usd}</div>
    </React.Fragment>
  );
};

export default Currencyconverter;
