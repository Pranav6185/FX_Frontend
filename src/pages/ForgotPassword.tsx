import React, { useState } from 'react';
import axios from '../api/axiosInstance';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { useToast } from '../hooks/use-toast';
import LoadingSpinner from '../components/LoadingSpinner';
import { Link, useNavigate } from 'react-router-dom';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [step, setStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  const { toast } = useToast();
  const navigate = useNavigate(); // ✅ used for redirect after success

  const handleSendOtp = async () => {
    if (!email) {
      return toast({ title: 'Error', description: 'Please enter your email.', variant: 'destructive' });
    }
    try {
      setIsLoading(true);
      await axios.post('/forgot-password/send-otp', { email });
      toast({ title: 'OTP Sent', description: 'Check your email for the OTP.' });
      setStep(2);
    } catch (err: any) {
      toast({ title: 'Error', description: err?.response?.data?.message || 'Failed to send OTP', variant: 'destructive' });
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerifyOtp = async () => {
    if (!otp) {
      return toast({ title: 'Error', description: 'Please enter the OTP.', variant: 'destructive' });
    }
    try {
      setIsLoading(true);
      await axios.post('/forgot-password/verify-otp', { email, otp });
      toast({ title: 'OTP Verified', description: 'Now set your new password.' });
      setStep(3);
    } catch (err: any) {
      toast({ title: 'Error', description: err?.response?.data?.message || 'Invalid OTP', variant: 'destructive' });
    } finally {
      setIsLoading(false);
    }
  };

  const handleResetPassword = async () => {
    if (!newPassword || newPassword.length < 6) {
      return toast({ title: 'Error', description: 'Password must be at least 6 characters.', variant: 'destructive' });
    }
    try {
      setIsLoading(true);
      await axios.post('/forgot-password/reset', { email, otp, newPassword });
      toast({ title: 'Success', description: 'Password reset successful! Please login with your new password.' });
      navigate('/login'); // ✅ Redirect to login after success
    } catch (err: any) {
      toast({ title: 'Error', description: err?.response?.data?.message || 'Failed to reset password.', variant: 'destructive' });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center px-4">
      <div className="max-w-md w-full">
        <Card className="shadow-xl border-0">
          <CardHeader className="space-y-1 pb-6">
            <CardTitle className="text-2xl font-bold text-center">Forgot Password</CardTitle>
            <p className="text-gray-600 text-center">Recover access to your account</p>
          </CardHeader>

          <CardContent className="space-y-6">
            {step === 1 && (
              <>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your registered email"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  required
                />
                <Button onClick={handleSendOtp} className="w-full" disabled={isLoading}>
                  {isLoading ? <LoadingSpinner /> : 'Send OTP'}
                </Button>
              </>
            )}

            {step === 2 && (
              <>
                <input
                  type="text"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  placeholder="Enter OTP"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  required
                />
                <Button onClick={handleVerifyOtp} className="w-full" disabled={isLoading}>
                  {isLoading ? <LoadingSpinner /> : 'Verify OTP'}
                </Button>
              </>
            )}

            {step === 3 && (
              <>
                <input
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="New Password (min 6 characters)"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  required
                />
                <Button onClick={handleResetPassword} className="w-full" disabled={isLoading}>
                  {isLoading ? <LoadingSpinner /> : 'Reset Password'}
                </Button>
              </>
            )}
          </CardContent>
        </Card>

        <div className="mt-6 text-center text-gray-600 text-sm">
          <Link to="/login" className="text-primary-600 hover:text-primary-700 font-medium">Back to Login</Link>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
