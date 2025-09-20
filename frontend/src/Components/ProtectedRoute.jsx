'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';

export default function ProtectedRoute({ children, requireAdmin = false }) {
  const { user, loading, isAuthenticated } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !isAuthenticated()) {
      // Redirect to login if not authenticated
      router.push('/login');
    } else if (!loading && requireAdmin && user?.role !== 'admin') {
      // Redirect to home if user is not admin but admin access is required
      router.push('/');
    }
  }, [user, loading, isAuthenticated, requireAdmin, router]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
      </div>
    );
  }

  if (!isAuthenticated()) {
    return null; // Will be redirected by the useEffect
  }

  if (requireAdmin && user?.role !== 'admin') {
    return null; // Will be redirected by the useEffect
  }

  return children;
}
