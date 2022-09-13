import http from 'axios';
import { AxiosError } from 'axios';
import { FormError, User } from '../utils/interfaces';

export async function getUser(id: string | undefined): Promise<User | AxiosError> {
  try {
    const response = await http.get<User>(`https://assessment-users-backend.herokuapp.com/users/${id}.json`);

    return response.data as User;
  } catch (error) {
    const err = error as AxiosError;
    return err;
  }
}

export async function getUsers(): Promise<User[] | AxiosError> {
  try {
    const response = await http.get<User[]>('https://assessment-users-backend.herokuapp.com/users.json');

    if (response.data) return response.data as User[];
    return {} as AxiosError;
  } catch (error) {
    const err = error as AxiosError;
    return err;
  }
}

export async function changeUserStatus(status: string, id: number): Promise<boolean | AxiosError> {
  try {
    await http.put(`https://assessment-users-backend.herokuapp.com/users/${id}.json`, {
      status: status === 'active' ? 'locked' : 'active',
    });

    const response = await http.get<User>(`https://assessment-users-backend.herokuapp.com/users/${id}.json`);

    if (response.data.status === 'active') return true;
    return false;
  } catch (error) {
    const err = error as AxiosError;
    return err;
  }
}

export async function editUserNames(firstName: string, lastName: string, id: string): Promise<User | FormError> {
  try {
    await http.put(`https://assessment-users-backend.herokuapp.com/users/${id}.json`, {
      first_name: firstName,
      last_name: lastName,
    });

    const response = await http.get<User>(`https://assessment-users-backend.herokuapp.com/users/${id}.json`);

    if (response.data !== undefined) return response.data as User;
    return {} as FormError;
  } catch (error) {
    const err = error as AxiosError;
    return (err.response?.data as FormError) ?? ({} as FormError);
  }
}

// for CreateUser.tsx
export async function createUser(firstName: string, lastName: string): Promise<User | FormError> {
  try {
    const response = await http.post(`https://assessment-users-backend.herokuapp.com/users.json`, {
      first_name: firstName,
      last_name: lastName,
      status: 'active',
    });

    if (response.data !== undefined) return response.data as User;
    return {} as FormError;
  } catch (error) {
    const err = error as AxiosError;
    return (err.response?.data as FormError) ?? ({} as FormError);
  }
}
