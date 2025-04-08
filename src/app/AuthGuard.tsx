// components/AuthGuard.tsx
'use client';

import { useEffect, useState } from 'react';
import { useAuthStore } from '@/store/authStore';
import { useRouter } from 'next/navigation';

export default function AuthGuard({ children }: { children: React.ReactNode }) {
  const [hasMounted, setHasMounted] = useState(false);
  const { isLoggedIn } = useAuthStore();
  const router = useRouter();

  useEffect(() => {
    setHasMounted(true);
    if (!isLoggedIn) {
      router.push('/login');
    }
  }, [isLoggedIn]);

  if (!hasMounted) return null;

  return <>{isLoggedIn && children}</>;
}
