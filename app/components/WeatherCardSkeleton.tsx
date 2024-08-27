const WeatherCardSkeleton: React.FC<{ city: string; message: string }> = ({ city, message }) => {
    return (
      <div className="p-6 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg shadow-xl max-w-sm w-full mx-auto animate-pulse">
        <div className="text-center mb-4">
          <h2 className="text-3xl font-bold">{city}</h2>
          <p className="text-md font-light">{new Date().toLocaleDateString()}</p>
        </div>
        <div className="flex flex-col items-center mb-16">
          <div className="text-center mt-4">
            <p className="text-6xl font-bold px-44">{message}</p>
          </div>
        </div>
        <div className="flex flex-col items-center mb-4">
        <p className="text-2xl font-bold">Weather App</p>
      </div>
        
      </div>
    );
  };
  
  
  export default WeatherCardSkeleton;