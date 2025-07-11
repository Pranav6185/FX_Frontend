import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { useToast } from '../hooks/use-toast';
import axios from '../utils/axiosInstance'; // ✅ Use your axiosInstance

const VerifyOtp = () => {
  const [otp, setOtp] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const email = localStorage.getItem('emailForOtp');
  const role = localStorage.getItem('role');

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!otp || !email) {
      toast({
        title: 'Error',
        description: 'Please enter the OTP.',
        variant: 'destructive',
      });
      return;
    }

    try {
      setIsSubmitting(true);

      // ✅ Verify OTP
      const response = await axios.post('/auth/verify-otp', {
        email,
        otp,
      });

      const { token, user } = response.data;

      // ✅ Store token & remove temporary data
      localStorage.setItem('token', token);
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      localStorage.removeItem('emailForOtp');
      localStorage.removeItem('tempToken');

      toast({
        title: 'Success',
        description: 'OTP verified! You are now logged in.',
      });

      navigate(role === 'admin' ? '/admin' : '/dashboard');
    } catch (error: any) {
      console.error(error);
      toast({
        title: 'Invalid OTP',
        description: error?.response?.data?.message || 'Invalid OTP. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center px-4">
      <div className="max-w-md w-full">
        <Card className="shadow-xl border-0">
          <CardHeader className="space-y-1 pb-6">
            <CardTitle className="text-2xl font-bold text-center">Verify OTP</CardTitle>
            <p className="text-gray-600 text-center">Enter the OTP sent to your email</p>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleVerify} className="space-y-6">
              <div>
                <label htmlFor="otp" className="block text-sm font-medium text-gray-700 mb-2">
                  OTP Code
                </label>
                <input
                  id="otp"
                  type="text"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors"
                  placeholder="Enter 6-digit OTP"
                  required
                />
              </div>

              <Button type="submit" className="w-full" size="lg" disabled={isSubmitting}>
                {isSubmitting ? 'Verifying...' : 'Verify OTP'}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default VerifyOtp;
