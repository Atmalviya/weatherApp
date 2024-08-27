'use client'
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
    <div className="flex flex-col items-center justify-center h-screen">
      <SearchBar/>
      <WeatherCard localityId={params.cityId} />
      
    </div>
  );
};

export default WeatherPage;
