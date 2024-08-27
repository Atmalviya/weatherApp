'use client';
import React, { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { setWeatherData, setLocalityId, setCity } from '@/redux/weatherSlice';
import { localityData } from '@/app/utils/localityData';

// Import dynamic weather icons
import { WiDaySunny, WiCloudy, WiRain, WiSnow, WiThunderstorm } from 'react-icons/wi';

interface WeatherCardProps {
  localityId: string;
}

const WeatherCard: React.FC<WeatherCardProps> = ({ localityId }) => {
  const dispatch = useDispatch();
  const weatherData = useSelector((state: RootState) => state.weather.weatherData);
  const city = useSelector((state: RootState) => state.weather.city);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const locality = useMemo(
    () => localityData.find((l) => l.localityId === localityId),
    [localityId]
  );

  const localityName = useMemo(() => locality?.localityName || '', [locality]);

  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        const response = await fetch(
          `https://www.weatherunion.com/gw/weather/external/v0/get_locality_weather_data?locality_id=${localityId}`,
          {
            headers: {
              'X-Zomato-Api-Key': 'ea66e0be558db26d4c7ac6eb56bf1fb2',
            },
          }
        );

        if (!response.ok) {
          throw new Error('Failed to fetch weather data.');
        }

        const data = await response.json();
        dispatch(setWeatherData(data.locality_weather_data));
        dispatch(setCity(localityName));
        dispatch(setLocalityId(localityId));
        setLoading(false);
      } catch (error) {
        setError(error.message || 'An unexpected error occurred.');
        setLoading(false);
      }
    };

    fetchWeatherData();
  }, [localityId, dispatch, localityName]);

  if (error) {
    return <div className="p-4 text-red-600">Error: {error}</div>;
  }

  if (!weatherData) {
    return <div className="p-4 text-gray-600">No weather data available.</div>;
  }

  return (
    <div className="p-6 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg shadow-xl max-w-sm w-full mx-auto transform hover:scale-105 transition-transform duration-300 ease-in-out">
      <div className="text-center mb-4">
        <h2 className="text-3xl font-bold">{city}</h2>
        <p className="text-md font-light">{loading ? 'Loading...' : new Date().toLocaleDateString()}</p>
      </div>

      <div className="flex flex-col items-center mb-4">
        <div className="text-center mt-4">
          <p className="text-6xl font-extrabold">{loading ? '...' : `${weatherData.temperature}°C`}</p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mt-4 text-sm">
        <p>
          <span className="font-semibold">Humidity:</span> {loading ? '...' : `${weatherData.humidity}%`}
        </p>
        <p>
          <span className="font-semibold">Wind Speed:</span> {loading ? '...' : `${weatherData.wind_speed} m/s`}
        </p>
        <p>
          <span className="font-semibold">Wind Direction:</span> {loading ? '...' : `${weatherData.wind_direction}°`}
        </p>
        <p>
          <span className="font-semibold">Rain Intensity:</span> {loading ? '...' : `${weatherData.rain_intensity} mm/h`}
        </p>
        <p>
          <span className="font-semibold">Rain Accumulation:</span> {loading ? '...' : `${weatherData.rain_accumulation} mm`}
        </p>
      </div>
    </div>
  );
};

export default WeatherCard;
