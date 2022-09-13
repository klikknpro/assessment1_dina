import http from 'axios';
import { AxiosError } from 'axios';
import { User, CreatedUser } from '../utils/interfaces';

export async function getUser(id: string | undefined) {
  if (!id) return;
  try {
    const response = await http.get<User>(`https://assessment-users-backend.herokuapp.com/users/${id}.json`);

    return response;
  } catch (error) {
    if (http.isAxiosError(error)) alert(error.message);
  }
}

export async function getUsers() {
  try {
    const response = await http.get<User[]>('https://assessment-users-backend.herokuapp.com/users.json');

    return response;
  } catch (error) {
    if (http.isAxiosError(error)) alert(error.message);
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
  } catch (error) {
    if (http.isAxiosError(error)) alert(error.message);
  }
}
export async function editUserNames(firstName: string, lastName: string, id: string) {
  try {
    await http.put(`https://assessment-users-backend.herokuapp.com/users/${id}.json`, {
      first_name: firstName,
      last_name: lastName,
    });

    const response = await http.get<User>(`https://assessment-users-backend.herokuapp.com/users/${id}.json`);

    if (response.data !== undefined) return response.data;
  } catch (error) {
    if (http.isAxiosError(error)) alert(error.message);
  }
}

// for NewUser.tsx
// export async function createUser(firstName: string, lastName: string): Promise<CreatedUser | undefined> {
//   try {
//     const response = await http.post(`https://assessment-users-backend.herokuapp.com/users.json`, {
//       first_name: firstName,
//       last_name: lastName,
//       status: 'active',
//     });

//     if (response.data !== undefined) {
//       const newUser: CreatedUser = {
//         firstName: response.data.first_name,
//         lastName: response.data.last_name,
//         status: response.data.status,
//       };
//       return newUser;
//     }
//   } catch (error) {
//     if (http.isAxiosError(error)) alert(error.message);
//   }
// }

// for CreateUser.tsx
export async function createUser(firstName: string, lastName: string): Promise<User | undefined> {
  try {
    const response = await http.post(`https://assessment-users-backend.herokuapp.com/users.json`, {
      first_name: firstName,
      last_name: lastName,
      status: 'active',
    });

    if (response.data !== undefined) return response.data;
  } catch (error) {
    if (http.isAxiosError(error)) alert(error.message);
  }
}
