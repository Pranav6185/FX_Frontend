// AdminDashboard.tsx
import axios from 'axios';
import { Edit, Eye, Plus, Search, Trash2 } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../components/ui/dialog';
import { useAuth } from '../contexts/AuthContext';
import { useToast } from '../hooks/use-toast';
import { Batch } from '../types/batch';

type User = {
  fullName: string;
  email: string;
  phone: string;
  role: string;
};

const AdminDashboard = () => {
  const { toast } = useToast();
  const { user } = useAuth();

  const [batches, setBatches] = useState<Batch[]>([]);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingBatch, setEditingBatch] = useState<Batch | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [showUsersModal, setShowUsersModal] = useState(false);
  const [currentUsers, setCurrentUsers] = useState<User[]>([]);

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    duration: '',
    price: 15000,
    image: '',
    startDate: '',
    maxStudents: 50,
  });

  useEffect(() => {
    const fetchBatches = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/batches`);
        const formatted = res.data.map((b: any) => ({ ...b, id: b._id }));
        setBatches(formatted);
      } catch (err) {
        console.error('Error fetching batches:', err);
        toast({ title: 'Error', description: 'Could not load batches.' });
      }
    };

    fetchBatches();
  }, []);

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      duration: '',
      price: 0,
      image: '',
      startDate: '',
      maxStudents: 50,
    });
  };

  const handleCreateBatch = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/batches`, {
        batchName: formData.title,
        description: formData.description,
        duration: formData.duration,
        price: formData.price,
        startDate: formData.startDate,
        totalSlots: formData.maxStudents,
        mode: 'online',
        language: 'English',
        thumbnail: formData.image,
      });
      setBatches([...batches, { ...res.data, id: res.data._id }]);
      setIsCreateModalOpen(false);
      resetForm();
      toast({ title: 'Success', description: 'Batch created successfully!' });
    } catch (err) {
      console.error('Error creating batch:', err);
      toast({ title: 'Error', description: 'Failed to create batch.' });
    }
  };

  const handleEditBatch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingBatch) return;
    try {
      const updated = {
        batchName: formData.title,
        description: formData.description,
        duration: formData.duration,
        price: formData.price,
        startDate: formData.startDate,
        totalSlots: formData.maxStudents,
        mode: 'online' as const,
        language: 'English' as const,
        thumbnail: formData.image,
      };

      await axios.put(`${import.meta.env.VITE_API_BASE_URL}/api/batches/${editingBatch.id}`, updated);
      setBatches(prev =>
        prev.map(b => (b.id === editingBatch.id ? { ...b, ...updated } : b))
      );
      setIsEditModalOpen(false);
      setEditingBatch(null);
      resetForm();
      toast({ title: 'Success', description: 'Batch updated successfully!' });
    } catch (err) {
      console.error('Error updating batch:', err);
      toast({ title: 'Error', description: 'Failed to update batch.' });
    }
  };

  const handleDeleteBatch = async (id: string) => {
    try {
      await axios.delete(`${import.meta.env.VITE_API_BASE_URL}/api/batches/${id}`);
      setBatches(prev => prev.filter(b => b.id !== id));
      toast({ title: 'Deleted', description: 'Batch deleted successfully!' });
    } catch (err) {
      console.error('Error deleting batch:', err);
      toast({ title: 'Error', description: 'Failed to delete batch.' });
    }
  };

  const handleViewUsers = async (batchId: string) => {
    const token = localStorage.getItem('token');
    if (!token) {
      toast({ title: 'Unauthorized', description: 'Login required.' });
      return;
    }

    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}/api/batches/registered-users/${batchId}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setCurrentUsers(res.data);
      setShowUsersModal(true);
    } catch (err) {
      console.error('Error fetching users:', err);
      toast({ title: 'Error', description: 'Could not fetch registered users.' });
    }
  };

  const openEditModal = (batch: Batch) => {
    setEditingBatch(batch);
    setFormData({
      title: batch.batchName,
      description: batch.description,
      duration: batch.duration,
      price: batch.price,
      image: batch.thumbnail,
      startDate: batch.startDate.slice(0, 10),
      maxStudents: batch.totalSlots,
    });
    setIsEditModalOpen(true);
  };

  const filteredBatches = batches.filter(b =>
    b.batchName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-6 flex flex-col items-center min-h-screen bg-cover bg-center bg-no-repeat"
    style={{
      backgroundImage: "url('/admin1.png')",
      backgroundAttachment: "fixed",
      backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center center',
    
    }}>
      {/* Header */}
      <div className="flex justify-between items-center mb-6 w-full max-w-4xl">
        <h1 className="text-3xl font-bold text-gray-800">Admin Dashboard</h1>
        <Dialog open={isCreateModalOpen} onOpenChange={setIsCreateModalOpen}>
          <DialogTrigger asChild>
            <Button className="bg-blue-600 hover:bg-blue-700 text-white">
              <Plus className="mr-2 h-4 w-4" />Create Batch
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create New Batch</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleCreateBatch} className="space-y-4">
              {['title', 'description', 'duration', 'image'].map(field => (
                <input
                  key={field}
                  value={(formData as any)[field]}
                  onChange={e =>
                    setFormData({ ...formData, [field]: e.target.value })
                  }
                  placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                  required
                  className="w-full px-3 py-2 border rounded-md"
                />
              ))}
              <input
                type="number"
                value={formData.price}
                onChange={e =>
                  setFormData({ ...formData, price: +e.target.value })
                }
                placeholder="Price"
                required
                className="w-full px-3 py-2 border rounded-md"
              />
              <input
                type="date"
                value={formData.startDate}
                onChange={e =>
                  setFormData({ ...formData, startDate: e.target.value })
                }
                required
                className="w-full px-3 py-2 border rounded-md"
              />
              <input
                type="number"
                value={formData.maxStudents}
                onChange={e =>
                  setFormData({ ...formData, maxStudents: +e.target.value })
                }
                placeholder="Total Slots"
                required
                className="w-full px-3 py-2 border rounded-md"
              />
              <div className="flex justify-end">
                <Button type="submit" className="bg-green-600 hover:bg-green-700 text-white">
                  Create
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Search */}
      <div className="w-full flex justify-center mb-6">
        <div className="relative w-80">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <input
            className="pl-10 pr-4 py-2 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Search batches..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* Batches List */}
      <div className="grid gap-6 w-full max-w-4xl">
        {filteredBatches.map(batch => (
       <Card
       key={batch.id}
       className="bg-white/20 backdrop-blur-lg border border-white/30 shadow-xl rounded-xl transition-all duration-300"
     >
       <CardHeader className="flex justify-between p-4 rounded-t-xl border-b border-white/20 bg-white/10">
         <div>
           <CardTitle className="text-xl font-bold text-[#072134] tracking-tight">
             {batch.batchName}
           </CardTitle>
           <p className="text-sm text-[#0d3e61] font-medium mt-1">{batch.description}</p>
         </div>
         <div className="flex space-x-2">
           <Button
             size="sm"
             className="bg-[#135b8e]/20 border border-[#135b8e] text-[#135b8e] font-semibold hover:bg-[#135b8e]/30 transition"
             onClick={() => handleViewUsers(batch.id)}
           >
             <Eye className="h-4 w-4" />
           </Button>
           <Button
             size="sm"
             className="bg-[#ffc736]/20 border border-[#ffc736] text-[#072134] font-semibold hover:bg-[#ffc736]/30 transition"
             onClick={() => openEditModal(batch)}
           >
             <Edit className="h-4 w-4" />
           </Button>
           <Button
             size="sm"
             variant="destructive"
             className="bg-[#d62839]/20 border border-[#d62839] text-[#d62839] font-semibold hover:bg-[#d62839]/30 transition"
             onClick={() => handleDeleteBatch(batch.id)}
           >
             <Trash2 className="h-4 w-4" />
           </Button>
         </div>
       </CardHeader>
     
       <CardContent className="p-4 text-sm text-[#072134] space-y-1 font-medium">
         <p><span className="text-[#0d3e61] font-bold">Start:</span> {new Date(batch.startDate).toLocaleDateString()}</p>
         <p><span className="text-[#0d3e61] font-bold">Duration:</span> {batch.duration}</p>
         <p><span className="text-[#0d3e61] font-bold">Price:</span> ₹{batch.price}</p>
         <p><span className="text-[#0d3e61] font-bold">Slots:</span> {(batch.registeredUsers?.length || 0)}/{batch.totalSlots}</p>
         <p><span className="text-[#0d3e61] font-bold">Mode:</span> {batch.mode}</p>
         <p><span className="text-[#0d3e61] font-bold">Language:</span> {batch.language}</p>
       </CardContent>
     </Card>
     
      
       
       
       
        ))}
      </div>

      {/* Registered Users Modal */}
      <Dialog open={showUsersModal} onOpenChange={setShowUsersModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Registered Students</DialogTitle>
          </DialogHeader>
          <div className="space-y-2 max-h-96 overflow-y-auto">
            {currentUsers.length === 0 ? (
              <p>No students registered yet.</p>
            ) : (
              currentUsers.map((user, index) => (
                <div key={index} className="border p-2 rounded shadow-sm">
                  <p><strong>Name:</strong> {user.fullName}</p>
                  <p><strong>Email:</strong> {user.email}</p>
                  <p><strong>Phone:</strong> {user.phone}</p>
                  <p><strong>Role:</strong> {user.role}</p>
                </div>
              ))
            )}
          </div>
        </DialogContent>
      </Dialog>

      {/* Edit Batch Modal */}
      <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Batch</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleEditBatch} className="space-y-4">
            {['title', 'description', 'duration', 'image'].map(field => (
              <input
                key={field}
                value={(formData as any)[field]}
                onChange={e =>
                  setFormData({ ...formData, [field]: e.target.value })
                }
                placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                required
                className="w-full px-3 py-2 border rounded-md"
              />
            ))}
            <input
              type="number"
              value={formData.price}
              onChange={e =>
                setFormData({ ...formData, price: +e.target.value })
              }
              placeholder="Price"
              required
              className="w-full px-3 py-2 border rounded-md"
            />
            <input
              type="date"
              value={formData.startDate}
              onChange={e =>
                setFormData({ ...formData, startDate: e.target.value })
              }
              required
              className="w-full px-3 py-2 border rounded-md"
            />
            <input
              type="number"
              value={formData.maxStudents}
              onChange={e =>
                setFormData({ ...formData, maxStudents: +e.target.value })
              }
              placeholder="Total Slots"
              required
              className="w-full px-3 py-2 border rounded-md"
            />
            <div className="flex justify-end">
              <Button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white">
                Save Changes
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminDashboard;
