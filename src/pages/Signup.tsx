import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff, TrendingUp, CheckCircle } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { useToast } from '../hooks/use-toast';
import { LegalConsent } from '../components/ui/LegalConsent';

const Signup = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [otp, setOtp] = useState('');
  const [step, setStep] = useState<'form' | 'otp'>('form');
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.password || !formData.confirmPassword) {
      toast({ title: "Error", description: "Please fill in all fields", variant: "destructive" });
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      toast({ title: "Error", description: "Passwords do not match", variant: "destructive" });
      return;
    }

    if (formData.password.length < 6) {
      toast({ title: "Error", description: "Password must be at least 6 characters long", variant: "destructive" });
      return;
    }

    if (!agreedToTerms) {
      toast({ title: "Error", description: "You must agree to the Terms and Privacy Policy.", variant: "destructive" });
      return;
    }

    try {
      const registerRes = await fetch("http://localhost:4000/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName: formData.name,
          email: formData.email,
          password: formData.password
        })
      });

      const registerData = await registerRes.json();

      if (!registerRes.ok) {
        toast({ title: "Error", description: registerData.message || "Registration failed", variant: "destructive" });
        return;
      }

      const otpRes = await fetch("http://localhost:4000/api/auth/send-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName: formData.name,
          email: formData.email,
          password: formData.password
        })
      });

      const otpData = await otpRes.json();

      if (otpRes.ok) {
        toast({ title: "OTP Sent", description: "Check your email for the verification code." });
        setStep('otp');
      } else {
        toast({ title: "Error", description: otpData.message || "Failed to send OTP", variant: "destructive" });
      }
    } catch (error) {
      console.error(error);
      toast({ title: "Error", description: "Something went wrong", variant: "destructive" });
    }
  };

  const handleOtpSubmit = async (e) => {
    e.preventDefault();

    try {
      const verifyRes = await fetch("http://localhost:4000/api/auth/verify-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: formData.email, otp })
      });

      const verifyData = await verifyRes.json();

      if (!verifyRes.ok) {
        toast({ title: "Error", description: verifyData.message || "Invalid OTP", variant: "destructive" });
        return;
      }

      toast({ title: "Success", description: "Account verified successfully!" });
      navigate("/login");
    } catch (err) {
      console.error(err);
      toast({ title: "Error", description: "Something went wrong", variant: "destructive" });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center px-4 py-8">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center space-x-2">
            <div className="p-3 bg-primary-600 rounded-xl">
              <TrendingUp className="h-8 w-8 text-white" />
            </div>
            <span className="text-2xl font-bold text-gray-900">FxStreampro</span>
          </Link>
        </div>

        <Card className="shadow-xl border-0">
          <CardHeader className="space-y-1 pb-8">
            <CardTitle className="text-2xl font-bold text-center">Create Your Account</CardTitle>
            <p className="text-gray-600 text-center">Join thousands of successful traders</p>
          </CardHeader>

          <CardContent>
            {step === 'form' && (
              <form onSubmit={handleFormSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                  <input id="name" name="name" type="text" value={formData.name} onChange={handleChange} className="w-full px-4 py-3 border border-gray-300 rounded-lg" placeholder="John Doe" required />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                  <input id="email" name="email" type="email" value={formData.email} onChange={handleChange} className="w-full px-4 py-3 border border-gray-300 rounded-lg" placeholder="your@email.com" required />
                </div>
                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">Password</label>
                  <div className="relative">
                    <input id="password" name="password" type={showPassword ? 'text' : 'password'} value={formData.password} onChange={handleChange} className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-lg" placeholder="••••••••" required />
                    <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                      {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                    </button>
                  </div>
                </div>
                <div>
                  <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-2">Confirm Password</label>
                  <div className="relative">
                    <input id="confirmPassword" name="confirmPassword" type={showConfirmPassword ? 'text' : 'password'} value={formData.confirmPassword} onChange={handleChange} className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-lg" placeholder="••••••••" required />
                    <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                      {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                    </button>
                  </div>
                </div>
                <LegalConsent agreed={agreedToTerms} onChange={setAgreedToTerms} />
                <Button type="submit" className="w-full">Next</Button>
              </form>
            )}

            {step === 'otp' && (
              <form onSubmit={handleOtpSubmit} className="space-y-6">
                <label htmlFor="otp" className="block text-sm font-medium text-gray-700">Enter OTP</label>
                <input
                  type="text"
                  id="otp"
                  name="otp"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg"
                  placeholder="123456"
                />
                <Button type="submit" className="w-full">Verify</Button>
              </form>
            )}

            <div className="mt-6 text-center">
              <p className="text-gray-600">
                Already have an account?{' '}
                <Link to="/login" className="text-primary-600 hover:text-primary-700 font-medium">
                  Sign in here
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Signup;