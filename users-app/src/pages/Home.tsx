import React, { useState, useEffect } from 'react';
import { User } from '../utils/interfaces';
import { getUsers } from '../api/diNaUsers';
import { Col, Container, Row, Button, Spinner } from 'react-bootstrap';
import UserItem from '../components/UserItem';

function Home() {
  const [userList, setUserList] = useState<User[]>([]);
  const [indexOfFirst, setIndexOfFirst] = useState<number>(0);
  const [tenUsers, setTenUsers] = useState<User[]>([]);

  const handlePrevious = (): void => {
    if (indexOfFirst >= 10) setIndexOfFirst((prevNum: number) => prevNum - 10);
  };

  const handleNext = (): void => {
    if (indexOfFirst + 10 <= userList.length) setIndexOfFirst((prevNum: number) => prevNum + 10);
  };

  useEffect(() => {
    const page = userList.slice(indexOfFirst, indexOfFirst + 10);
    setTenUsers(page);
  }, [indexOfFirst, userList]);

  useEffect(() => {
    let ignore = false;

    async function fetchData() {
      const response = await getUsers();
      // eslint-disable-next-line no-prototype-builtins
      if (response && !ignore) setUserList(response as User[]);
    }
    fetchData();

    return () => {
      ignore = true;
    };
  }, []);

  return (
    <Container>
      {userList.length === 0 ? (
        <Row>
          <Col className='d-flex justify-content-center'>
            <Spinner aria-label='spinner' animation='border' variant='warning' />
          </Col>
        </Row>
      ) : (
        <>
          <Row xs={1} s={2} md={3} lg={4} className='g-3 mb-3'>
            {tenUsers.map((user) => (
              <Col key={user.id}>
                <UserItem {...user} />
              </Col>
            ))}
          </Row>
          <Row className='text-white'>
            <Col className='d-flex justify-content-end'>
              <Button variant='outline-warning' onClick={handlePrevious}>
                Previous
              </Button>
            </Col>
            <Col aria-label='pagination-counter' className='d-flex justify-content-center align-items-center'>
              {indexOfFirst} - {indexOfFirst + 10} of {userList.length}
            </Col>
            <Col className='d-flex justify-content-start'>
              <Button aria-label='next-button' variant='outline-warning' onClick={handleNext}>
                Next
              </Button>
            </Col>
          </Row>
        </>
      )}
    </Container>
  );
}

export default Home;
