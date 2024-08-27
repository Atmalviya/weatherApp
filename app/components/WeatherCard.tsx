
"use client";

import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { setWeatherData } from '@/redux/weatherSlice';

type WeatherCardProps = {
  localityId: string;
};

const WeatherCard: React.FC<WeatherCardProps> = ({ localityId }) => {
  const dispatch = useDispatch();
  const weatherData = useSelector((state: RootState) => state.weather.data);

  useEffect(() => {
    // Fetch weather data for the selected locality
    const fetchWeatherData = async () => {
      const response = await fetch(
        `https://www.weatherunion.com/gw/weather/external/v0/get_locality_weather_data?locality_id=${localityId}`,
        {
          headers: {
            'X-Zomato-Api-Key': 'ea66e0be558db26d4c7ac6eb56bf1fb2',
          },
        }
      );
      const data = await response.json();
      dispatch(setWeatherData(data));
    };

    fetchWeatherData();
  }, [localityId, dispatch]);

  return (
    <div>
      <h2>Weather Information</h2>
      <p>Temperature: {weatherData?.temperature}</p>
      <p>Condition: {weatherData?.condition}</p>
    </div>
  );
};

export default WeatherCard;
