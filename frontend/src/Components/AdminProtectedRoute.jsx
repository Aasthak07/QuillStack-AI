'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';

export default function AdminProtectedRoute({ children }) {
  const [isVerifying, setIsVerifying] = useState(true);
  const [isAuthorized, setIsAuthorized] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const verifyAdmin = async () => {
      try {
        // Get admin token from localStorage
        const adminToken = localStorage.getItem('adminToken');
        
        if (!adminToken) {
          // No token, redirect to admin login
          router.push('/admin-login');
          return;
        }

        // Verify token with backend
        const response = await axios.get('http://localhost:5000/admin/check', {
          headers: {
            'Authorization': `Bearer ${adminToken}`
          }
        });

        if (response.data.isAdmin) {
          setIsAuthorized(true);
        } else {
          // Not an admin, clear token and redirect
          localStorage.removeItem('adminToken');
          localStorage.removeItem('adminUser');
          router.push('/admin-login');
        }
      } catch (error) {
        console.error('Admin verification failed:', error);
        // Token invalid or expired, clear and redirect
        localStorage.removeItem('adminToken');
        localStorage.removeItem('adminUser');
        router.push('/admin-login');
      } finally {
        setIsVerifying(false);
      }
    };

    verifyAdmin();
  }, [router]);

  if (isVerifying) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0B0F1C]">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-[#3B82F6]/30 border-t-[#3B82F6] rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-400">Verifying admin access...</p>
        </div>
      </div>
    );
  }

  if (!isAuthorized) {
    return null; // Will be redirected by the useEffect
  }

  return children;
}
