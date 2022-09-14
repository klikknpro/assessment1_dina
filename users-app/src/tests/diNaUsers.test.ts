import { describe, expect, it } from 'vitest';
import { getUser, createUser, changeUserStatus } from '../api/diNaUsers';
import { AxiosError } from 'axios';

describe('getUser api call function', () => {
  it('should return a User object with a correct "id"', async () => {
    const userDetails = {
      id: 435,
      created_at: '2022-09-07T13:01:13.088Z',
    };
    const result = await getUser('435');

    expect(result).toMatchObject(userDetails);
  });

  it('should return an error', async () => {
    const result = await getUser('9999');

    expect(result).toBeInstanceOf(AxiosError);
  });
});

describe('changeUserStatus api call function', () => {
  it('should change the users status', async () => {
    const { status } = await getUser('435');

    if (!status) return;
    const result = await changeUserStatus(status, 435);

    expect(result).toBeTypeOf('boolean');
  });
});

describe('createUser api call function', () => {
  it('should return the new User object with valid first_name', async () => {
    const userDetail = {
      first_name: 'John Killer',
    };

    const result = await createUser('John Killer', 'Doe');

    expect(result).toMatchObject(userDetail);
  });
});
