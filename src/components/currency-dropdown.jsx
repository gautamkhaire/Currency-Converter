import { HiOutlineStar, HiStar } from "react-icons/hi2";
function CurrencyDropdown({
  currencies,
  currency,
  setCurrency,
  favorites,
  handleFavorite,
  title = "",
}) {
  const isFavorite = (curr) => favorites.includes(curr);

  return (
    <div>
      <label
        htmlFor={title}
        className="block text-sm font-medium text-gray-700"
      >
        {title}
      </label>
      <div className="mt-1 relative">
        <select
          value={currency}
          onChange={(e) => setCurrency(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          {favorites.map((currency) => {
            return (
              <option value={currency} key={currency} className="bg-gray-200">
                {currency}
              </option>
            );
          })}
          <hr />
          {currencies
            .filter((c) => !favorites.includes(c))
            .map((currency) => {
              return (
                <option value={currency} key={currency}>
                  {currency}
                </option>
              );
            })}
        </select>
        <button
          className="absolute inset-y-0 right-0 pr-5 flex items-center text-sm leading-5"
          onClick={() => handleFavorite(currency)}
        >
          {isFavorite(currency) ? <HiStar className="text-yellow-400 text-lg"/> : <HiOutlineStar />}
        </button>
      </div>
    </div>
  );
}

export default CurrencyDropdown;
