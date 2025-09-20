import { createContext, useContext, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  // Check if user is logged in on initial load
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error('Failed to parse user data', error);
        localStorage.removeItem('user');
      }
    }
    setLoading(false);
  }, []);

  // Signup function
  const signup = async (userData) => {
    try {
      // Format the request body to match what the backend expects
      const requestBody = {
        name: userData.name,
        email: userData.email,
        password: userData.password
      };

      const response = await fetch('http://localhost:5000/user/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      });

      const responseData = await response.json();

      if (!response.ok) {
        throw new Error(responseData.message || 'Signup failed');
      }

      if (!responseData.token) {
        throw new Error('No token received after signup');
      }

      // Store the token in localStorage
      localStorage.setItem('token', responseData.token);
      
      // Decode the token to get user info
      try {
        const payload = JSON.parse(atob(responseData.token.split('.')[1]));
        const userInfo = {
          id: payload._id,
          name: payload.name,
          email: payload.email,
          token: responseData.token
        };
        
        // Store user data in localStorage and state
        localStorage.setItem('user', JSON.stringify(userInfo));
        setUser(userInfo);
        
        return { success: true };
      } catch (error) {
        console.error('Error parsing token after signup:', error);
        throw new Error('Account created but failed to log in automatically');
      }
    } catch (error) {
      console.error('Signup error:', error);
      return { success: false, error: error.message };
    }
  };

  // Login function
  const login = async (credentials) => {
    try {
      // Format the request body to match what the backend expects
      const requestBody = {
        email: credentials.email,
        password: credentials.password
      };

      const response = await fetch('http://localhost:5000/user/authenticate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      });

      const responseData = await response.json();

      if (!response.ok) {
        throw new Error(responseData.message || 'Login failed');
      }

      if (!responseData.token) {
        throw new Error('No token received from server');
      }

      // Store the token in localStorage
      localStorage.setItem('token', responseData.token);
      
      // Decode the token to get user info
      try {
        const payload = JSON.parse(atob(responseData.token.split('.')[1]));
        const userData = {
          id: payload._id,
          name: payload.name,
          email: payload.email,
          token: responseData.token
        };
        
        // Store user data in localStorage and state
        localStorage.setItem('user', JSON.stringify(userData));
        setUser(userData);
        
        return { success: true };
      } catch (error) {
        console.error('Error parsing token:', error);
        throw new Error('Failed to process authentication');
      }
    } catch (error) {
      console.error('Login error:', error);
      return { success: false, error: error.message };
    }
  };

  // Logout function
  const logout = () => {
    try {
      // Clear all authentication data
      setUser(null);
      localStorage.removeItem('user');
      localStorage.removeItem('token');
      
      // Redirect to home page
      router.push('/');
      
      // Force a full page reload to ensure all components reset
      window.location.href = '/';
    } catch (error) {
      console.error('Error during logout:', error);
      // Even if there's an error, try to clear the data and redirect
      localStorage.clear();
      window.location.href = '/';
    }
  };

  // Check if user is authenticated
  const isAuthenticated = () => {
    // First check if we have a user in state
    if (user) {
      // Check if the token exists and is not expired
      const token = localStorage.getItem('token');
      if (token) {
        try {
          // Decode the token to check expiration
          const payload = JSON.parse(atob(token.split('.')[1]));
          // Check if token is expired
          if (payload.exp * 1000 < Date.now()) {
            // Token is expired, log the user out
            logout();
            return false;
          }
          return true;
        } catch (error) {
          console.error('Error checking token:', error);
          return false;
        }
      }
    }
    return false;
  };

  const value = {
    user,
    loading,
    signup,
    login,
    logout,
    isAuthenticated,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export default AuthContext;
