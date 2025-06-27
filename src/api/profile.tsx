import type { FormData } from '@/components/profiles/RegistartionForm';
import type { Profile, Admin, Student, Complain, Feedback } from '../components/profiles/interface';

const url = 'https://hostel-management-system-csxv.onrender.com'; // Base URL for the API

export type UpdateProfileData = {
  id: number;
  userName: string;
  email: string;
  password: string;
  role: 'student' | 'admin' | 'guest';
};

const handleApiResponse = async (response: Response) => {
  if (!response.ok) {
    let errorMessage = `Request failed with status ${response.status}: ${response.statusText}`;

    try {
      const contentType = response.headers.get('content-type');
      if (contentType && contentType.includes('application/json')) {
        const errorData = await response.json();
        errorMessage = errorData.message || errorData.error || errorMessage;
      } else {
        const errorText = await response.text();
        if (errorText) {
          errorMessage = errorText;
        }
      }
    } catch (parseError) {
      console.warn('Failed to parse error response:', parseError);
    }

    throw new Error(errorMessage);
  }
  return response;
};

// ========== PROFILE ==========
export const getProfiles = async (): Promise<Profile[]> => {
  const response = await fetch(`${url}/profile`);
  await handleApiResponse(response);
  return response.json();
};

export const getProfile = async (id: number): Promise<Profile> => {
  const response = await fetch(`${url}/profile/${id}`);
  await handleApiResponse(response);
  return response.json();
};

export const createProfile = async (profileData: FormData): Promise<Profile> => {
  const response = await fetch(`${url}/profile`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(profileData),
  });
  await handleApiResponse(response);
  return response.json();
};

export const updateProfile = async ({ id, ...profileData }: UpdateProfileData): Promise<Profile> => {
  const response = await fetch(`${url}/profile/${id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(profileData),
  });
  await handleApiResponse(response);
  return response.json();
};

export const deleteProfile = async (id: number): Promise<void> => {
  const response = await fetch(`${url}/profile/${id}`, {
    method: 'DELETE',
  });
  await handleApiResponse(response);
};

// ========== ADMIN ==========
export const getAdmins = async (): Promise<Admin[]> => {
  const response = await fetch(`${url}/admin`);
  await handleApiResponse(response);
  return response.json();
};

export const getAdmin = async (id: number): Promise<Admin> => {
  const response = await fetch(`${url}/admin/${id}`);
  await handleApiResponse(response);
  return response.json();
};

export const createAdmin = async (adminData: Partial<Admin>): Promise<Admin> => {
  const response = await fetch(`${url}/admin`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(adminData),
  });
  await handleApiResponse(response);
  return response.json();
};

export const updateAdmin = async (adminData: Partial<Admin>): Promise<Admin> => {
  const response = await fetch(`${url}/admin/${adminData.id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(adminData),
  });
  await handleApiResponse(response);
  return response.json();
};

export const deleteAdmin = async (id: number): Promise<void> => {
  const response = await fetch(`${url}/admin/${id}`, {
    method: 'DELETE',
  });
  await handleApiResponse(response);
};

// ========== STUDENT ==========
export const getStudents = async (): Promise<Student[]> => {
  const response = await fetch(`${url}/students`);
  await handleApiResponse(response);
  return response.json();
};

export const getStudent = async (id: number): Promise<Student> => {
  const response = await fetch(`${url}/students/${id}`);
  await handleApiResponse(response);
  return response.json();
};

export const createStudent = async (studentData: Partial<Student>): Promise<Student> => {
  const response = await fetch(`${url}/students`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(studentData),
  });
  await handleApiResponse(response);
  return response.json();
};

export const updateStudent = async (studentData: Partial<Student>): Promise<Student> => {
  const response = await fetch(`${url}/students/${studentData.id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(studentData),
  });
  await handleApiResponse(response);
  return response.json();
};

export const deleteStudent = async (id: number): Promise<void> => {
  const response = await fetch(`${url}/students/${id}`, {
    method: 'DELETE',
  });
  await handleApiResponse(response);
};

// ========== COMPLAIN ==========
export const getComplains = async (): Promise<Complain[]> => {
  const response = await fetch(`${url}/complains`);
  await handleApiResponse(response);
  return response.json();
};

export const getComplain = async (id: number): Promise<Complain> => {
  const response = await fetch(`${url}/complains/${id}`);
  await handleApiResponse(response);
  return response.json();
};

export const createComplain = async (complainData: Partial<Complain>): Promise<Complain> => {
  const response = await fetch(`${url}/complains`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(complainData),
  });
  await handleApiResponse(response);
  return response.json();
};

export const updateComplain = async (complainData: Partial<Complain> & { id: number }): Promise<Complain> => {
  const response = await fetch(`${url}/complains/${complainData.id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(complainData),
  });
  await handleApiResponse(response);
  return response.json();
};

export const deleteComplain = async (id: number): Promise<void> => {
  const response = await fetch(`${url}/complains/${id}`, {
    method: 'DELETE',
  });
  await handleApiResponse(response);
};

// ========== FEEDBACK ==========
export const getFeedbacks = async (): Promise<Feedback[]> => {
  const response = await fetch(`${url}/feedback`);
  await handleApiResponse(response);
  return response.json();
};

export const getFeedback = async (id: number): Promise<Feedback> => {
  const response = await fetch(`${url}/feedback/${id}`);
  await handleApiResponse(response);
  return response.json();
};

export const createFeedback = async (feedbackData: Partial<Feedback>): Promise<Feedback> => {
  const response = await fetch(`${url}/feedback`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(feedbackData),
  });
  await handleApiResponse(response);
  return response.json();
};

export const updateFeedback = async (feedbackData: Partial<Feedback> & { id: number }): Promise<Feedback> => {
  const response = await fetch(`${url}/feedback/${feedbackData.id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(feedbackData),
  });
  await handleApiResponse(response);
  return response.json();
};

export const deleteFeedback = async (id: number): Promise<void> => {
  const response = await fetch(`${url}/feedback/${id}`, {
    method: 'DELETE',
  });
  await handleApiResponse(response);
};
