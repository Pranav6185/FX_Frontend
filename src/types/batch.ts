
export interface Batch {
  id: string;
  batchName: string;
  description: string;
  startDate: string;
  duration: string;
  mode: "online" | "offline";
  price: number;
  thumbnail: string;
  totalSlots: number;
  filledSlots: number;
  language: "English" | "Hindi" | "Marathi";
  registeredUsers: string[];
}

export interface Enrollment {
  id: string;
  userId: string;
  batchId: string;
  enrollmentDate: string;
  status: 'Active' | 'Completed' | 'Cancelled';
}
