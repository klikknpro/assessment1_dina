import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from 'react-bootstrap';
import { User, UserItemProps } from '../utils/interfaces';
import { changeUserStatus } from '../api/diNaUsers';

function UserItem({ first_name, last_name, created_at, status, id, handleStatusChange }: UserItemProps) {
  const [userStatus, setUserStatus] = useState<boolean>(() => {
    return status === 'active' ? true : false;
  });
  const navigate = useNavigate();

  const handleToggle = async (): Promise<void> => {
    const updatedUserStatus = await changeUserStatus(status, id);
    if (updatedUserStatus === true || updatedUserStatus === false) {
      setUserStatus(updatedUserStatus);
      //
      handleStatusChange();
    } else {
      alert(updatedUserStatus.message);
    }
  };

  const handleEdit = () => {
    navigate(`/edit/${id}`);
  };

  const created = new Date(created_at);
  const date = created.toISOString().split('T')[0];
  const time = created.toISOString().split('T')[1].substring(0, 5);

  return (
    <Card className={userStatus ? 'h-100' : 'h-100 text-decoration-line-through'}>
      <Card.Body className='d-flex flex-column'>
        <Card.Title>
          {first_name} {last_name}
        </Card.Title>
        <Card.Subtitle className='text-muted'>Created at:</Card.Subtitle>
        <Card.Text>
          {date} {time}
        </Card.Text>
        <Card.Footer className='d-flex flex-direction-row justify-content-center'>
          <div className='form-check form-switch me-4'>
            <input
              className='form-check-input cursor-pointer'
              type='checkbox'
              id='switch'
              checked={userStatus}
              onChange={handleToggle}
            />
            <label className='form-check-label' htmlFor='switch'>
              {userStatus ? 'User is active' : 'User is locked'}
            </label>
          </div>
          <div className='cursor-pointer' onClick={handleEdit}>
            <svg xmlns='http://www.w3.org/2000/svg' width='18' height='18' viewBox='0 0 24 24'>
              <path d='M14.078 4.232l-12.64 12.639-1.438 7.129 7.127-1.438 12.641-12.64-5.69-5.69zm-10.369 14.893l-.85-.85 11.141-11.125.849.849-11.14 11.126zm2.008 2.008l-.85-.85 11.141-11.125.85.85-11.141 11.125zm18.283-15.444l-2.816 2.818-5.691-5.691 2.816-2.816 5.691 5.689z' />
            </svg>
          </div>
        </Card.Footer>
      </Card.Body>
    </Card>
  );
}

export default UserItem;
