import MaxWidth from '@/components/MaxWidth';
import HeroPlace from '@/assets/HeroPlace.jpg'
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search } from 'lucide-react'
import FeaturedDestinations from '@/components/FeaturedDestinations';
import Footer from '@/components/Footer';
import { authService } from '@/services/Auth';
import { useEffect, useState } from 'react';
import useAuthStore from '@/zustand/authStore';
import { Ring } from 'ldrs/react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const { login, isAuthenticated } = useAuthStore();
  const [isLoading, setIsLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    async function getAuthStatus() {
      try {
        const res = await authService.getAuthStatus();
        if (res && res.data) {
          login(res.data);
        }
      } finally {
        setIsLoading(false);
      }
    };

    getAuthStatus();
  }, [login, navigate]);


  if (isLoading) {
    return <div className="flex justify-center items-center h-screen">
      <Ring color='black' size={20} />
    </div>
  }

  if (isAuthenticated) {
    navigate('/dashboard');
    return null;
  };

  return (
    <>
      <section id='hero-section' className='py-10'>
        <MaxWidth className="max-w-screen-lg">
          <div className='px-4 flex flex-col items-center justify-center bg-no-repeat bg-cover bg-center h-[400px] rounded-md'
            style={{
              backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)), url(${HeroPlace})`
            }}
          >
            <div className='max-w-3xl'>
              <h1 className='text-5xl text-center text-white'>Plan Your Perfect Trip with AI</h1>
              <p className='text-white text-center mt-3'>Discover personalized travel itineraries tailored to your preferences. Our AI-powered trip planner makes travel planning effortless and fun.</p>
            </div>

            <div className='bg-white flex items-center py-2 px-3 mt-6 rounded-lg gap-3 '>
              <Search size={35} />
              <Input type='text' placeholder='Destination' className='border-0 bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 shadow-none focus:border-0 focus:outline-none' />
              <Button>Plan Your Trip</Button>
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