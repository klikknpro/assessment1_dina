import { ReactNode } from 'react';

export interface User {
  id: number;
  last_name: string;
  first_name: string;
  status: string;
  created_at: string;
  updated_at: string;
  url?: string;
}

export interface UserItemProps {
  id: number;
  last_name: string;
  first_name: string;
  status: string;
  created_at: string;
  updated_at: string;
  url?: string;
  handleStatusChange: () => void;
}

export interface FormData {
  firstName: string;
  lastName: string;
}

export interface FormError {
  first_name?: string[];
  last_name?: string[];
  status?: string[];
}
