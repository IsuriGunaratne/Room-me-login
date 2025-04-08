'use client';

import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/authStore';
import { useEffect } from 'react';
import AuthGuard from '../AuthGuard';

const DashboardPage = () => {
  const { isLoggedIn, logout } = useAuthStore();
  const router = useRouter();

  useEffect(() => {
    if (!isLoggedIn) {
      router.push('/login');
    }
  }, [isLoggedIn, router]);

  const handleLogout = () => {
    logout();
    router.push('/login');
  };

  if (!isLoggedIn) {
    return <div>Loading...</div>; 
  }

  return (
    <AuthGuard>
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-3xl font-bold mb-4">Welcome, you're logged in.</h1>
      <button
        onClick={handleLogout}
        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
      >
        Logout
      </button>
    </div>
    </AuthGuard>
  );
};

export default DashboardPage;