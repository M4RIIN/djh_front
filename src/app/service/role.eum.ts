export const enum Role {
    ADMIN = 'admin',HOST = 'host',DEV='dev'
}

export function fromString(roleString: string): Role | null {
    switch (roleString.toLowerCase()) {
        case 'admin':
            return Role.ADMIN;
        case 'host':
            return Role.HOST;
        case 'dev':
            return Role.DEV;
        default:
            return null;
    }
}