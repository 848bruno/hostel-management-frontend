export const Role = {
    STUDENT: 'student',
    ADMIN: 'admin',
    GUEST: 'guest',
} as const;

export type Role = typeof Role[keyof typeof Role];