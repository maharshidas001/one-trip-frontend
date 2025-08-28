import MaxWidth from '@/components/MaxWidth';
import HeroPlace from '@/assets/HeroPlace.jpg'
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search } from 'lucide-react'
import FeaturedDestinations from '@/components/FeaturedDestinations';
import Footer from '@/components/Footer';
import useDebounce from '@/hooks/useDebounce';
import { useEffect, useState } from 'react';
import { envConfig } from '@/config/envConfig';
import { useNavigate } from 'react-router-dom';

const Home = () => {

  const [searchInput, setSearchInput] = useState('');
  const [suggestions, setSuggestions] = useState<any[]>([]);

  const navigate = useNavigate();

  const handlePlanTripBtn = () => {
    if (searchInput.trim() !== '') {
      const planTripFromHomeData = { destination: searchInput, isFromHome: true };
      localStorage.setItem('planTripFromHome', JSON.stringify(planTripFromHomeData));

      navigate('/auth/login');
    }
  };

  const debouncedSearch = useDebounce(searchInput, 600);

  const fetchPlaces = async (searchText: string) => {
    try {
      const res = await fetch("https://places.googleapis.com/v1/places:autocomplete", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Goog-Api-Key": envConfig.cloudKey,
          "X-Goog-FieldMask": "suggestions.placePrediction.placeId,suggestions.placePrediction.text"
        },
        body: JSON.stringify({
          input: searchText,
          includedPrimaryTypes: [
            "locality",
            "country",
            "tourist_attraction",
            "point_of_interest"
          ],
        })
      });
      const places = await res.json();

      setSuggestions(places.suggestions);
    } catch (error) {
      console.log('Error while fetching places...', error)
    }
  };

  useEffect(() => {
    fetchPlaces(debouncedSearch);
  }, [debouncedSearch]);

  // Handle input change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchInput(value);
  };

  return (
    <>
      <section id='hero-section' className='py-10'>
        <MaxWidth className="max-w-screen-lg">
          <div className='px-4 flex flex-col items-center justify-center bg-no-repeat bg-cover bg-center h-[440px] rounded-md'
            style={{
              backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)), url(${HeroPlace})`
            }}
          >
            <div className='max-w-3xl'>
              <h1 className='text-5xl text-center text-white'>Plan Your Perfect Trip with AI</h1>
              <p className='text-white text-center mt-3'>Discover personalized travel itineraries tailored to your preferences. Our AI-powered trip planner makes travel planning effortless and fun.</p>
            </div>

            <div className='relative'>
              <div className='bg-white flex items-center py-2 px-3 mt-6 rounded-lg gap-3'>
                <Search size={35} />
                <Input type='text' placeholder='Destination' className='border-0 bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 shadow-none focus:border-0 focus:outline-none' value={searchInput} onChange={handleChange} />
                <Button onClick={handlePlanTripBtn}>Plan Your Trip</Button>
              </div>

              {searchInput.trim() !== '' &&
                <div id='home-page-places-div' className='w-full mt-2 py-2 bg-white max-h-[130px] overflow-hidden overflow-y-scroll shadow-lg rounded-sm absolute grid gap-1.5'>
                  {suggestions.map((place, index) => (
                    <p className='px-4 cursor-pointer shadow-sm hover:bg-gray-100' onClick={() => setSearchInput(place.placePrediction.text.text)} key={index}>{place.placePrediction.text.text}</p>
                  ))}
                </div>
              }
            </div>
          </div>
        </MaxWidth>
      </section>

      <section className="py-10 bg-blue-50">
        <MaxWidth className='max-w-screen-lg'>
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl font-bold mb-6 text-black">Featured Destinations</h2>
            <FeaturedDestinations />
          </div>
        </MaxWidth>
      </section>

      <section id='cta-home' className='py-10'>
        <MaxWidth className='max-w-screen-lg'>
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl font-bold mb-3 text-center text-black">Ready to Start Your Adventure?</h2>
            <p className='text-center text-black'>Let our AI trip planner create your dream vacation. Sign up today and begin your journey!</p>
            <div className='flex justify-center'>
              <Button className='mt-6'>Create Your Trip Now</Button>
            </div>
          </div>
        </MaxWidth>
      </section>

      <section className='py-10'>
        <Footer />
      </section>
    </>
  )
}

export default Home;