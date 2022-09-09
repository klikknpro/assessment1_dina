import http from 'axios';
import { User } from '../utils/interfaces';

export async function getUsers() {
  try {
    const response = await http.get<User[]>('https://assessment-users-backend.herokuapp.com/users.json');

    return response;
  } catch (err) {
    alert(err);
  }
}

export async function changeUserStatus(status: string, id: number) {
  try {
    await http.put(`https://assessment-users-backend.herokuapp.com/users/${id}.json`, {
      status: status === 'active' ? 'locked' : 'active',
    });

    const response = await http.get<User>(`https://assessment-users-backend.herokuapp.com/users/${id}.json`);

    if (response.data.status === 'active') return true;
    return false;
  } catch (err) {
    alert(err);
  }
}
