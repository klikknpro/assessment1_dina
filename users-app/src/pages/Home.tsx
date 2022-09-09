import React, { useState, useEffect, ReactNode } from 'react';
import { User } from '../utils/interfaces';
import { getUsers } from '../api/diNaUsers';
import { Col, Container, Row, Button } from 'react-bootstrap';
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
      if (response && !ignore) setUserList(response.data);
    }
    fetchData();

    return () => {
      ignore = true;
    };
  }, []);

  return (
    <Container>
      <Row xs={1} s={2} md={3} lg={4} className='g-3'>
        {tenUsers.map((user) => (
          <Col key={user.id}>
            <UserItem {...user} />
          </Col>
        ))}
      </Row>
      <Row>
        <Col>
          <Button onClick={handlePrevious}>Previous</Button>
        </Col>
        <Col>
          {indexOfFirst} - {indexOfFirst + 10} of {userList.length}
        </Col>
        <Col>
          <Button onClick={handleNext}>Next</Button>
        </Col>
      </Row>
    </Container>
  );
}

export default Home;
