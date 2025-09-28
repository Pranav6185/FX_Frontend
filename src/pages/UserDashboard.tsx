import axios from 'axios';
import { Search } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Badge } from '../components/ui/badge';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import { useAuth } from '../contexts/AuthContext';
import { Batch } from '../types/batch';
import EnrollButton from '../components/EnrollButton';

const UserDashboard = () => {
  const { user } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLevel, setSelectedLevel] = useState<string>('all');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [batches, setBatches] = useState<Batch[]>([]);

  // Fetch batches from backend
  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_BASE_URL}/api/public-batches`)
      .then((res) => {
        const formatted = res.data.map((b: any) => ({
          ...b,
          id: b._id,
          mode: b.mode as 'online' | 'offline',
          language: b.language as 'English' | 'Hindi' | 'Marathi',
        }));
        setBatches(formatted);
      })
      .catch((err) => console.error('Error fetching batches:', err));
  }, []);

  // Mock enrolled batch IDs (in real app, fetch user's enrolled batches)
  const enrolledBatchIds = ['1', '2'];
  const enrolledBatches = batches.filter((batch) =>
    enrolledBatchIds.includes(batch.id)
  );

  const filteredBatches = batches.filter((batch) => {
    const matchesSearch =
      batch.batchName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      batch.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesLevel = selectedLevel === 'all' || batch.language === selectedLevel;
    const matchesStatus = selectedStatus === 'all' || batch.mode === selectedStatus;
    return matchesSearch && matchesLevel && matchesStatus;
  });

  return (
    <div
      className="min-h-screen text-gray-900"
      style={{
        backgroundImage: "url('/user_bg.jpeg')",
        backgroundAttachment: 'fixed',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center center',
      }}
    >
      {/* Header */}
      <div className="bg-white/90 backdrop-blur-md shadow-md border-b border-gray-200 rounded-b-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                Welcome back, {user?.fullName}!
              </h1>
              <p className="text-gray-600">
                Continue your trading education journey
              </p>
            </div>
            {/* <Link to="/">
              <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                Home
              </Button>
            </Link> */}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">

        {/* Enrolled Courses */}
        {enrolledBatches.length > 0 && (
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              My Enrolled Courses
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {enrolledBatches.map((batch) => (
                <Card
                  key={batch.id}
                  className="bg-white/90 backdrop-blur-sm border border-gray-200 shadow hover:shadow-lg transition-transform hover:scale-105 duration-300 overflow-hidden"
                >
                  <div className="relative">
                    <img
                      src={batch.thumbnail}
                      alt={batch.batchName}
                      className="w-full h-full object-cover"
                    />
                    <Badge className="absolute top-2 left-2 bg-green-500 text-white">
                      Enrolled
                    </Badge>
                  </div>
                  <CardContent className="p-4">
                    <h3 className="font-semibold text-gray-900 mb-2">
                      {batch.batchName}
                    </h3>
                    <p className="text-sm text-gray-600 mb-3">Instructor</p>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-500">{batch.duration}</span>
                      <Button
                        size="sm"
                        className="bg-blue-600 hover:bg-blue-700 text-white"
                      >
                        Continue Learning
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* All Available Courses */}
        <div>
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold text-yellow-50">
              All Available Courses
            </h2>
            <div className="flex items-center space-x-4">
              {/* Search */}
              {/* <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <input
                  type="text"
                  placeholder="Search courses..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 bg-white/80 text-gray-900 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div> */}
              {/* Language Filter */}
              <select
                value={selectedLevel}
                onChange={(e) => setSelectedLevel(e.target.value)}
                className="px-4 py-2 bg-white/80 text-gray-900 border border-gray-300 rounded-lg"
              >
                <option value="all">All Languages</option>
                <option value="English">English</option>
                <option value="Hindi">Hindi</option>
                
              </select>
              {/* Mode Filter */}
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="px-4 py-2 bg-white/80 text-gray-900 border border-gray-300 rounded-lg"
              >
                <option value="all">All Modes</option>
                <option value="online">Online</option>
                <option value="offline">Offline</option>
              </select>
            </div>
          </div>

          {/* Course Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredBatches.map((batch) => (
              <Card
                key={batch.id}
                className="bg-white/90 backdrop-blur-sm border border-gray-200 shadow hover:shadow-lg rounded-xl overflow-hidden transition-transform hover:scale-105 duration-300"
              >
                <img
                  src={batch.thumbnail}
                  alt={batch.batchName}
                  className="w-full h-40 object-cover"
                />
                <CardContent className="p-4 space-y-3">
                  <h3 className="text-lg font-semibold text-gray-900">
                    {batch.batchName}
                  </h3>
                  <p className="text-sm text-gray-600">{batch.description}</p>
                  <p className="text-sm text-gray-500">
                    Start Date: {new Date(batch.startDate).toLocaleDateString()}
                  </p>
                  <EnrollButton
                    amount={batch.price}
                    batchId={batch.id}
                    batchName={batch.batchName}
                  />
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
