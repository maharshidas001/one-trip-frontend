import { useEffect, type ReactNode } from 'react';
import useAuthStore from '@/zustand/authStore';
import { useNavigate } from 'react-router-dom';
import { authService } from '@/services/Auth';
import { Ring } from 'ldrs/react';
import { useAuthStatus } from '@/hooks/useAuthStatus';

interface IProtectedRouteProp {
  children: ReactNode;
}

const ProtectedRoute = ({ children }: IProtectedRouteProp) => {

  const { login, logout } = useAuthStore();
  const { data, isLoading, isSuccess, isError } = useAuthStatus(getAuthStatus);

  const navigate = useNavigate();

  async function getAuthStatus() {
    const res = await authService.getAuthStatus();

    return res.data;
  };

  useEffect(() => {
    getAuthStatus();

    if (isSuccess && data) {
      login(data);
    };

    if (isError) {
      logout();
      navigate('/auth/login', { replace: true });
    };
  }, [isSuccess, isError, data, login, logout, navigate]);

  if (isLoading) {
    return <div className="flex justify-center items-center h-screen">
      <Ring color='black' size={20} />
    </div>
  };

  if (isSuccess && data) {
    return <>{children}</>;
  };

  return null;
}

export default ProtectedRoute;