import http from 'axios';
import { User, UsersResponse } from '../utils/interfaces';

export async function getUsers() {
  try {
    const response = await http.get<User[]>('https://assessment-users-backend.herokuapp.com/users.json');

    return response;
  } catch (err) {
    alert(err);
  }
}
