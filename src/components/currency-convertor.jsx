import { useState, useEffect } from "react";
import CurrencyDropdown from "./currency-dropdown";
import { HiArrowsRightLeft } from "react-icons/hi2";
import { FaSpinner } from "react-icons/fa";

function CurrencyConvertor() {
  const [currencies, setCurrencies] = useState([]);
  const [amount, setAmount] = useState(1);

  const [fromCurrency, setFromCurrency] = useState("USD");
  const [toCurrency, setToCurrency] = useState("INR");

  const [convertedAmount, setConvertedAmount] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const [favorites, setFavorites] = useState(
    JSON.parse(localStorage.getItem("favoriteCurrencies")) || ["INR", "EUR"]
  );

  // Currencies: 'https://api.frankfurter.app/currencies'
  const fetchCurrencies = async () => {
    try {
      const res = await fetch("https://api.frankfurter.app/currencies");
      const data = await res.json();
      setCurrencies(Object.keys(data));
    } catch (error) {
      console.log("Error Fetching", error);
    }
  };

  useEffect(() => {
    fetchCurrencies();
  }, []);

  // Currencies: 'https://api.frankfurter.app/latest?amount=1&from=USD&to=INR'
  const convertCurrency = async () => {
    if (!amount) return;
    setIsLoading(true);

    try {
      const res = await fetch(
        `https://api.frankfurter.app/latest?amount=${amount}&from=${fromCurrency}&to=${toCurrency}`
      );
      const data = await res.json();

      setConvertedAmount(data.rates[toCurrency] + " " + toCurrency);
    } catch (error) {
      console.error("Error Fetching", error);
    } finally {
      setIsLoading(false);
      console.log(convertedAmount);
    }
  };

  const handleFavorite = (currency) => {
    let updatedFavorites = [...favorites];

    if (favorites.includes(currency)) {
      updatedFavorites = updatedFavorites.filter((fav) => fav !== currency);
    } else {
      updatedFavorites.push(currency);
    }

    setFavorites(updatedFavorites);
    localStorage.setItem("favoriteCurrencies",JSON.stringify(updatedFavorites));
  };

  const swapCurrencies = () => {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
  };

  return (
    <div className="max-w-xl mx-auto my-10 p-5 bg-white rounded-lg shadow-md">
      <h2 className="mb-5 text-2xl font-bold text-indigo-500 text-center">
        Currency Converter
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 items-end">
        <CurrencyDropdown
          currencies={currencies}
          currency={fromCurrency}
          setCurrency={setFromCurrency}
          title="From:"
          favorites={favorites}
          handleFavorite={handleFavorite}
        />
        {/* Swap Currency Button */}
        <div className="flex justify-center -mb-5 sm:mb-0">
          <button
            onClick={swapCurrencies}
            className="p-2 bg-gray-200 rounded-full cursor-pointer hover:bg-gray-300"
          >
            <HiArrowsRightLeft className="text-xl text-gray-700" />
          </button>
        </div>
        <CurrencyDropdown
          currencies={currencies}
          currency={toCurrency}
          setCurrency={setToCurrency}
          title="To:"
          favorites={favorites}
          handleFavorite={handleFavorite}
        />
      </div>

      <div className="mt-4">
        <label
          htmlFor="amount"
          className="block text-sm font-medium text-gray-700"
        >
          Amount:{" "}
        </label>
        <input
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          type="number"
          className="w-full mt-1 p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>

      <div className="flex justify-end mt-6">
        <button
          className={`px-5 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 ${
            isLoading ? "animate-pulse" : ""
          }`}
          onClick={convertCurrency}
        >
          Convert
        </button>
      </div>

      {convertedAmount && (
        <div className="mt-4 text-lg font-medium text-right text-green-600 flex flex-row items-center justify-end gap-2">
          Converted Amount:{" "}
          <div className="font-semibold">
            {isLoading ? (
              <FaSpinner className="text-xl text-indigo-600 animate-spin" />
            ) : (
              convertedAmount
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default CurrencyConvertor;
