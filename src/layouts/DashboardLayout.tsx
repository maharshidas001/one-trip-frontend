import MaxWidth from '@/components/MaxWidth';
import { Outlet } from 'react-router-dom';

const DashboardLayout = () => {
  return (
    <>
      <main className='w-full h-screen'>
        <MaxWidth className='max-w-screen-lg'>
          <div className='flex items-center gap-2 h-full'>
            <div className='w-full h-full p-2'>
              <Outlet />
            </div>
          </div>
        </MaxWidth>
      </main>
    </>
  )
}

export default DashboardLayout;