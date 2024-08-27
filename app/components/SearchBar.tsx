'use client';
import React, { useState, useMemo, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { localityData } from '@/app/utils/localityData';
import { useDispatch } from 'react-redux';
import { setCity, setLocalityId } from '@/redux/weatherSlice';
import { IoMdClose } from 'react-icons/io';

interface Locality {
  cityName: string;
  localityName: string;
  localityId: string;
}

interface SearchBarProps {
  initialCityName?: string;
}

const SearchBar: React.FC<SearchBarProps> = ({ initialCityName = '' }) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [query, setQuery] = useState<string>('');

  const filteredSuggestions = useMemo<Locality[]>(
    () =>
      localityData.filter((locality) =>
        locality.localityName.toLowerCase().includes(query.toLowerCase())
      ),
    [query]
  );

  const handleSelect = useCallback(
    (suggestion: Locality) => {
      dispatch(setCity(suggestion.localityName));
      dispatch(setLocalityId(suggestion.localityId));
      router.push(`/${suggestion.localityId}`);
      setQuery('');
    },
    [dispatch, router]
  );

  const clearInput = () => setQuery('');

  return (
    <div className="relative w-full max-w-lg mx-auto">
      <div className="flex items-center w-full p-4 border border-blue-300 rounded-full shadow-sm focus-within:shadow-md transition-shadow duration-300">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={initialCityName || 'Search for a locality...'}
          className="flex-grow px-4 text-black-400 bg-transparent outline-none placeholder-blue-300"
          aria-label="Search for a locality"
        />
        {query && (
          <IoMdClose
            onClick={clearInput}
            className="text-xl text-black cursor-pointer hover:text-black mr-3"
            aria-label="Clear search"
          />
        )}
      </div>
      {query && filteredSuggestions.length > 0 && (
        <ul
          className="absolute w-full bg-white border border-gray-300 rounded-lg mt-2 max-h-60 overflow-y-auto shadow-lg z-50 custom-scrollbar"
          role="listbox"
        >
          {filteredSuggestions.map((suggestion) => (
            <li
              key={suggestion.localityId}
              onClick={() => handleSelect(suggestion)}
              className="p-2 hover:bg-gray-100 cursor-pointer"
              role="option"
              tabIndex={0}
              onKeyDown={(e) => e.key === 'Enter' && handleSelect(suggestion)}
              aria-selected={false}
            >
              {suggestion.localityName}, {suggestion.cityName}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchBar;
