export interface User {
    id: number;
    email: string;
    role: string;
    createdAt: Date;
    updatedAt: Date;
    [key: string]: any;
  }