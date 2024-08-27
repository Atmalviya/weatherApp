'use client'
import React, { useState, useMemo, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { localityData } from '@/app/utils/localityData';
import { useDispatch } from 'react-redux';
import { setCity, setLocalityId } from '@/redux/weatherSlice';
import { IoMdClose } from "react-icons/io";


type Locality = {
  cityName: string;
  localityName: string;
  localityId: string;
};
type AutocompleteProps = {
  initialCityName?: string;
};

const SearchBar: React.FC<AutocompleteProps> = ({ initialCityName  }) => {
  const dispatch = useDispatch();
  const [query, setQuery] = useState(``);
  const router = useRouter();

  const filteredSuggestions = useMemo(() =>
    localityData.filter(locality =>
      locality.localityName.toLowerCase().includes(query.toLowerCase())
    ),
    [query]
  );

  const handleSelect = useCallback((suggestion: Locality) => {
    dispatch(setCity(suggestion.localityName));
    dispatch(setLocalityId(suggestion.localityId));
    router.push(`/${suggestion.localityId}`);
  }, [dispatch, router]);

  const clearInput = () => setQuery('');

  return (
    <div className="relative w-full max-w-lg mx-auto">
      <div className="flex items-center w-full p-4 border border-blue-300 rounded-full shadow-sm focus-within:shadow-md transition-shadow duration-300">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={initialCityName ? initialCityName : "Search for a locality..."}
          className="flex-grow px-4  text-black-400 bg-transparent outline-none placeholder-blue-300"
        />
        {query && (
          <IoMdClose
            onClick={clearInput}
            className="text-xl text-black cursor-pointer hover:text-black mr-3"
          />
        )}
      </div>
      {query && filteredSuggestions.length > 0 && (
        <ul className="absolute w-full bg-white border border-gray-300 rounded-lg mt-2 max-h-60 overflow-y-auto shadow-lg">
          {filteredSuggestions.map(suggestion => (
            <li
              key={suggestion.localityId}
              onClick={() => handleSelect(suggestion)}
              className="p-2 hover:bg-gray-100 cursor-pointer"
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
