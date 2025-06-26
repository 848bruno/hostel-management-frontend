export interface Profile {
    id: number; // Changed from string to number to match backend
    first_name: string;
    last_name: string;
    phone_number: string;
    email: string;
    role: 'user' | 'admin' | 'guest'; // More specific typing
    createdAt: string;
    updatedAt: string;
}

export interface CreateProfileInput {
    first_name: string;
    last_name: string;
    phone_number: string;
    email: string;
    password: string;
    role: 'user' | 'admin' | 'guest';
}