import axios from 'axios';
import { Search, TrendingUp } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import BatchCard from '../components/BatchCard';
import { Badge } from '../components/ui/badge';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import { useAuth } from '../contexts/AuthContext';
import { useToast } from '../hooks/use-toast';
import { Batch } from '../types/batch';
import EnrollButton from '../components/EnrollButton';

const UserDashboard = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLevel, setSelectedLevel] = useState<string>('all');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [batches, setBatches] = useState<Batch[]>([]);
  // Fetch batches from backend
  useEffect(() => {
    axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/public-batches`)
      .then((res) => {
        const formatted = res.data.map((b: any) => ({
          ...b,
          id: b._id,
          mode: b.mode as 'online' | 'offline',
          language: b.language as 'English' | 'Hindi' | 'Marathi',
        }));
        setBatches(formatted);
      })
      .catch(err => console.error('Error fetching batches:', err));
  }, []);

  // Mock enrolled batch IDs (in real app, fetch user's enrolled batches)
  const enrolledBatchIds = ['1', '2'];
  const enrolledBatches = batches.filter(batch => enrolledBatchIds.includes(batch.id));

  const filteredBatches = batches.filter(batch => {
    const matchesSearch = batch.batchName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         batch.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesLevel = selectedLevel === 'all' || batch.language === selectedLevel;
    const matchesStatus = selectedStatus === 'all' || batch.mode === selectedStatus;
    return matchesSearch && matchesLevel && matchesStatus;
  });

  const handleViewDetails = (batchId: string) => {
    console.log('View details for batch:', batchId);
  };
  return (
    <div className="min-h-screen bg-gray-50"
    style={{
      backgroundImage: "url('/user_dashboard.jpg')",
      backgroundAttachment: "fixed",
      backgroundSize: 'cover',
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center center',
    }}
    >
      <div className="bg-white border-b border-gray-200"
      
      >
        <div className="bg-gradient-to-r from-[#0f2027] via-[#203a43] to-[#2c5364] text-white shadow-md rounded-b-xl">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
    <div className="flex items-center justify-between">
      <div>
        <h1 className="text-2xl font-bold text-white">
          Welcome back, {user?.fullName}!
        </h1>
        <p className="text-gray-300">Continue your trading education journey</p>
      </div>
      <Link to="/">
      

      </Link>
    </div>
  </div>
</div>

      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

        {enrolledBatches.length > 0 && (
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">My Enrolled Courses</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {enrolledBatches.map((batch) => (
                <Card key={batch.id} className="overflow-hidden">
                  <div className="relative">
                    <img
                      src={batch.thumbnail}
                      alt={batch.batchName}
                      className="w-full h-32 object-cover"
                    />
                    <Badge className="absolute top-2 left-2 bg-green-500">Enrolled</Badge>
                  </div>
                  <CardContent className="p-4">
                    <h3 className="font-semibold mb-2">{batch.batchName}</h3>
                    <p className="text-sm text-gray-600 mb-3">Instructor</p>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-500">{batch.duration}</span>
                      <Button size="sm">Continue Learning</Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        <div>
          <div className="flex items-center justify-between mb-6"
          >
            <h2 className="text-2xl font-bold text-gray-900">All Available Courses</h2>
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <input
                  type="text"
                  placeholder="Search courses..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </div>
              <select
                value={selectedLevel}
                onChange={(e) => setSelectedLevel(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg"
              >
                <option value="all">All Languages</option>
                <option value="English">English</option>
                <option value="Hindi">Hindi</option>
                <option value="Marathi">Marathi</option>
              </select>
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg"
              >
                <option value="all">All Modes</option>
                <option value="online">Online</option>
                <option value="offline">Offline</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredBatches.map((batch) => (
              <Card
              key={batch.id}
              className="bg-gradient-to-br from-[#0f2027] to-[#2c5364] text-white border border-white/10 shadow-xl rounded-xl overflow-hidden transition-transform hover:scale-105 duration-300"
            >
              <img
                src={batch.thumbnail}
                alt={batch.batchName}
                className="w-full h-40 object-cover"
              />
              <CardContent className="p-4 space-y-3">
                <h3 className="text-lg font-semibold text-white">{batch.batchName}</h3>
                <p className="text-sm text-slate-300">{batch.description}</p>
                <p className="text-sm text-slate-400">
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
