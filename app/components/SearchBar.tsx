import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { localityData } from '../utils/localityData';

const SearchBar: React.FC = () => {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
    setSuggestions(
      localityData.filter((locality) =>
        locality.localityName.toLowerCase().includes(value.toLowerCase())
      )
    );
  };

  const handleSelect = (localityId: string) => {
    router.push(`/${localityId}`);
  };

  return (
    <div className="relative w-full max-w-lg mx-auto">
      <input
        type="text"
        value={query}
        onChange={handleChange}
        className="w-full p-4 border border-gray-300 rounded-full"
        placeholder="Search for a locality..."
      />
      {suggestions.length > 0 && (
        <ul className="absolute w-full bg-white border border-gray-300 rounded-lg mt-1 max-h-60 overflow-y-auto">
          {suggestions.map((suggestion) => (
            <li
              key={suggestion.localityId}
              onClick={() => handleSelect(suggestion.localityId)}
              className="p-2 hover:bg-gray-200 cursor-pointer"
            >
              {suggestion.localityName}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchBar;
