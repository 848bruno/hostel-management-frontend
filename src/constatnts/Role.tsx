export const Role = {
    USER: 'user',
    ADMIN: 'admin',
    GUEST: 'guest',
} as const;

export type Role = typeof Role[keyof typeof Role];