import { useAuthStatus } from '@/hooks/useAuthStatus';
import { useEffect, type ReactNode } from 'react';
import useAuthStore from '@/zustand/authStore';
import { useNavigate } from 'react-router-dom';
import { Ring } from 'ldrs/react';
import { authService } from '@/services/Auth';

interface IPublicRouteProp {
  children: ReactNode;
}

const PublicRoute = ({ children }: IPublicRouteProp) => {
  const { login, isAuthenticated, logout } = useAuthStore();
  const navigate = useNavigate();

  // Use TanStack Query hook directly to get data, loading, and error states
  const { data, isLoading, isSuccess } = useAuthStatus(getAuthStatus);

  async function getAuthStatus() {
    const res = await authService.getAuthStatus();

    return res.data;
  };

  useEffect(() => {
    if (isSuccess && data?.isAuthenticated) {
      // If the API call is successful and the user is authenticated, redirect to the dashboard.
      login(data);
      navigate('/dashboard', { replace: true });
    } else logout();
  }, [isSuccess, data, login, navigate]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Ring color="black" size={20} />
      </div>
    );
  };

  // If the user is authenticated, don't render children
  if (isAuthenticated) {
    return null;
  };

  // If the user is not authenticated, render the children
  return <>{children}</>;
};

export default PublicRoute;