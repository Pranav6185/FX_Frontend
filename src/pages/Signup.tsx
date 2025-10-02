import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff, Phone, TrendingUp } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { useToast } from '../hooks/use-toast';
import { LegalConsent } from '../components/ui/LegalConsent';
import axios from 'axios';

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

interface FormData {
  name: string;
  email: string;
  contact: string;   // ✅ Added
  password: string;
  confirmPassword: string;
  aadharCardNo: string;
  panCardNo: string;
  address: string;
  aadharImg: File | null;
  panImg: File | null;
}

const Signup: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    contact: '',   // ✅ Added
    password: '',
    confirmPassword: '',
    aadharCardNo: '',
    panCardNo: '',
    address: '',
    aadharImg: null,
    panImg: null,
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  // ✅ Upload file to your backend
  const uploadFile = async (file: File) => {
    const formData = new FormData();
    formData.append('file', file);

    const res = await axios.post(`${BASE_URL}/api/upload/image`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return res.data.url;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, files } = e.target as HTMLInputElement;

    // Handle file inputs
    if (files && files.length > 0) {
      setFormData({ ...formData, [name]: files[0] });
      return;
    }

    // Format Aadhar as XXXX-XXXX-XXXX
    if (name === 'aadharCardNo') {
      const clean = value.replace(/\D/g, '').slice(0, 12);
      const formatted = clean.replace(/(\d{4})(\d{4})?(\d{4})?/, (m, p1, p2, p3) => {
        if (p3) return `${p1}-${p2}-${p3}`;
        if (p2) return `${p1}-${p2}`;
        return p1;
      });
      setFormData({ ...formData, [name]: formatted });
      return;
    }

    // Uppercase PAN
    if (name === 'panCardNo') {
      setFormData({ ...formData, [name]: value.toUpperCase().slice(0, 10) });
      return;
    }

    // Digits only for contact
    if (name === 'contact') {
      const clean = value.replace(/\D/g, '').slice(0, 10);
      setFormData({ ...formData, [name]: clean });
      return;
    }

    setFormData({ ...formData, [name]: value });
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // ✅ Validation
    if (!formData.name || !formData.email || !formData.contact ||
        !formData.password || !formData.confirmPassword ||
        !formData.aadharCardNo || !formData.panCardNo || !formData.address ||
        !formData.aadharImg || !formData.panImg) {
      toast({ title: 'Error', description: 'Please fill all fields', variant: 'destructive' });
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      toast({ title: 'Error', description: 'Passwords do not match', variant: 'destructive' });
      return;
    }

    if (!agreedToTerms) {
      toast({ title: 'Error', description: 'You must agree to the Terms and Privacy Policy.', variant: 'destructive' });
      return;
    }

    try {
      // ✅ Upload images
      const aadharUrl = await uploadFile(formData.aadharImg);
      const panUrl = await uploadFile(formData.panImg);

      // ✅ Register user
      await axios.post(`${BASE_URL}/api/auth/register`, {
        fullName: formData.name,
        email: formData.email,
        phone: formData.contact,   // ✅ Added in API
        password: formData.password,
        aadharCardNo: formData.aadharCardNo.replace(/\D/g, ''),
        panCardNo: formData.panCardNo,
        address: formData.address,
        aadharImgUrl: aadharUrl,
        panImgUrl: panUrl,
      });

      toast({ title: 'Success', description: 'Registered successfully!' });
      navigate('/login');
    } catch (err: any) {
      toast({
        title: 'Error',
        description: err.response?.data?.message || 'Registration failed',
        variant: 'destructive',
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center px-4 py-8">
      <div className="max-w-md w-full">
        {/* Logo */}
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
            <form onSubmit={handleFormSubmit} className="space-y-6">
              {/* Full Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                <input
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="John Doe"
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="your@email.com"
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </div>

              {/* Contact */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Contact Number</label>
                <input
                  type="tel"
                  name="contact"
                  value={formData.contact}
                  onChange={handleChange}
                  placeholder="9876543210"
                  required
                  maxLength={10}
                  pattern="[0-9]{10}"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </div>

              {/* Address */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Address</label>
                <textarea
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  placeholder="Your address"
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </div>

              {/* Aadhar */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Aadhar Card Number</label>
                <input
                  type="text"
                  name="aadharCardNo"
                  value={formData.aadharCardNo}
                  onChange={handleChange}
                  placeholder="1234-5678-9012"
                  required
                  maxLength={14}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
                <input
                  type="file"
                  name="aadharImg"
                  accept="image/*"
                  onChange={handleChange}
                  required
                  className="mt-2"
                />
              </div>

              {/* PAN */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">PAN Card Number</label>
                <input
                  type="text"
                  name="panCardNo"
                  value={formData.panCardNo}
                  onChange={handleChange}
                  placeholder="ABCDE1234F"
                  required
                  maxLength={10}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent uppercase"
                />
                <input
                  type="file"
                  name="panImg"
                  accept="image/*"
                  onChange={handleChange}
                  required
                  className="mt-2"
                />
              </div>

              {/* Password */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="••••••••"
                    required
                    className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
              </div>

              {/* Confirm Password */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Confirm Password</label>
                <div className="relative">
                  <input
                    type={showConfirmPassword ? 'text' : 'password'}
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    placeholder="••••••••"
                    required
                    className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
              </div>

              {/* Terms */}
              <LegalConsent agreed={agreedToTerms} onChange={setAgreedToTerms} />

              <Button type="submit" className="w-full">Register</Button>
            </form>

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
