import React, { useState } from 'react';
import { Card } from 'react-bootstrap';
import { User } from '../utils/interfaces';
import { changeUserStatus } from '../api/diNaUsers';

function UserItem({ first_name, last_name, created_at, status, id }: User) {
  const [userStatus, setUserStatus] = useState<boolean>(() => {
    return status === 'active' ? true : false;
  });

  const handleToggle = async (): Promise<void> => {
    const updatedUserStatus = await changeUserStatus(status, id);
    if (updatedUserStatus !== undefined) setUserStatus(updatedUserStatus);
  };

  return (
    <Card className='h-100'>
      <Card.Body className='d-flex flex-column'>
        <Card.Title>
          {first_name} {last_name}
        </Card.Title>
        <Card.Subtitle className='text-muted'>Created at:</Card.Subtitle>
        <Card.Text>{created_at}</Card.Text>
        <Card.Footer>
          <div className='form-check form-switch'>
            <input
              className='form-check-input'
              type='checkbox'
              id='switch'
              checked={userStatus}
              onChange={handleToggle}
            />
            <label className='form-check-label' htmlFor='switch'>
              {userStatus ? 'User is active' : 'User is locked'}
            </label>
          </div>
        </Card.Footer>
      </Card.Body>
    </Card>
  );
}

export default UserItem;
