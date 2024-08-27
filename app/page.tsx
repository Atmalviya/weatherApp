import SearchBar from './components/SearchBar';
import googleLogo from '../public/GoogleLogo.png';
import Image from 'next/image';

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-white px-4">
      <div className="text-center">
        {/* Responsive Google Logo */}
        <Image 
          src={googleLogo} 
          alt="Google Logo" 
          width={400} 
          height={130} 
          className="mx-auto mb-8"
          style={{ maxWidth: '100%', height: 'auto' }} 
        />
        
        {/* Responsive Search bar */}
        <div className="w-full max-w-xl mx-auto">
          <SearchBar />
        </div>

        {/* Buttons below the search bar */}
        <div className="mt-6 flex flex-col sm:flex-row justify-center space-y-2 sm:space-y-0 sm:space-x-4">
          <button className="bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium py-2 px-4 rounded">
            Google Search
          </button>
          <button className="bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium py-2 px-4 rounded">
            I'm Feeling Lucky
          </button>
        </div>

        {/* Language options or additional text */}
        <div className="mt-4 text-gray-500 text-sm">
          Google offered in: <a href="#" className="text-blue-600 hover:underline">हिन्दी</a>, <a href="#" className="text-blue-600 hover:underline">বাংলা</a>, <a href="#" className="text-blue-600 hover:underline">తెలుగు</a>, <a href="#" className="text-blue-600 hover:underline">मराठी</a>
        </div>
      </div>
    </div>
  );
}
