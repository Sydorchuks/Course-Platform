export enum UserRole {
    ADMIN = 'ADMIN',
    USER = 'USER',
  }
  
  export interface User {
    id: string;
    name: string | null;
    email: string | null;
  }