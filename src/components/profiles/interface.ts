// src/components/interfaces.ts

// ---------- Profile ----------
export interface Profile {
  id: number;
  username: string;
  email: string;
  password?: string; // optional for security in frontend
  role: 'student' | 'admin' | 'guest';
  createdAt: string;
  updatedAt?: string;
  hashedRefreshToken?: string | null;

  // Relations
  admin?: Admin;
  student?: Student;
}

export interface CreateProfileInput {
  username: string;
  email: string;
  password: string;
  role: 'student' | 'admin' | 'guest';
}

// ---------- Admin ----------
export interface Admin {
  id: number;
  last_login: string;
  createdAt: string;
  updatedAt: string;
  profile: Profile;
}

// ---------- Student ----------
export interface Student {
  id: number;
  room_id: number;
  course_id: number;
  registration_date: string;
  profile: Profile;
  complain?: Complain[];
  feedbacks?: Feedback[];
}

// ---------- Complain ----------
export interface Complain {
  complainid: number;
  complain: string;
  status: string;
  createdAt: string;
  student: Student;
  feedbacks: Feedback[];
}

// ---------- Feedback ----------
export interface Feedback {
  feedback_id: number;
  feedback_text: string;
  rating: number;
  created_at: string;
  student: Student;
  complain?: Complain[]; // Many-to-Many relation
}
