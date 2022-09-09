import React from 'react';
import { User } from '../utils/interfaces';

function UserItem({ first_name, last_name }: User) {
  return <div>{first_name}</div>;
}

export default UserItem;
