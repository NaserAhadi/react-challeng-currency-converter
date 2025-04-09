import "./App.css";
import { useState, useEffect } from "react";

function App() {
  const [fromCurrency, setFromCurrency] = useState("USD");
  const [toCurrency, setToCurrency] = useState("USD");
  const [amount, setAmount] = useState("");
  const [output, setOutput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(
    function () {
      async function fetchLatestCurrencyConverter() {
        setIsLoading(true);
        const response = await fetch(
          `https://api.frankfurter.app/latest?amount=${amount}&from=${fromCurrency}&to=${toCurrency}`,
        );
        const data = await response.json();
        setOutput((output) => (output = data.rates[toCurrency]));
        setIsLoading(false);
      }

      if (fromCurrency === toCurrency || Number(amount) === 0) {
        return setOutput(amount);
      } else if (amount?.length > 0) {
        fetchLatestCurrencyConverter();
      }
    },
    [fromCurrency, toCurrency, amount],
  );

  return (
    <div className="App">
      <input
        type="text"
        value={amount}
        disabled={isLoading}
        onInput={(e) => setAmount(e.target.value)}
      />
      <select
        id="fromCurrency"
        disabled={isLoading}
        value={fromCurrency}
        onChange={(e) => setFromCurrency(e.target.value)}
      >
        <option value="USD">USD</option>
        <option value="EUR">EUR</option>
        <option value="CAD">CAD</option>
        <option value="INR">INR</option>
      </select>
      <select
        id="toCurrency"
        value={toCurrency}
        disabled={isLoading}
        onChange={(e) => setToCurrency(e.target.value)}
      >
        <option value="USD">USD</option>
        <option value="EUR">EUR</option>
        <option value="CAD">CAD</option>
        <option value="INR">INR</option>
      </select>
      {String(output).length > 0 && (
        <p>
          OUTPUT: {output} {toCurrency}
        </p>
      )}
    </div>
  );
}

export default App;
