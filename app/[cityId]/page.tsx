'use client';
import SearchBar from '../components/SearchBar';
import WeatherCard from '../components/WeatherCard';
import { RootState } from '@/redux/store';
import { useSelector } from 'react-redux';

interface Props {
  params: {
    cityId: string;
  };
}

const WeatherPage = ({ params }: Props) => {
  const city = useSelector((state: RootState) => state.weather.city);

  return (
    <div className="min-h-screen flex flex-col gap-72 items-center bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 py-10 px-4">
      <div className="relative w-full max-w-lg mb-8 z-10">
        <SearchBar />
      </div>
      <div className="relative w-full max-w-md z-0">
        <WeatherCard localityId={params.cityId} />
      </div>
    </div>
  );
};

export default WeatherPage;
