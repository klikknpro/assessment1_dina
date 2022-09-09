import React, { useState, useEffect } from 'react';
import { User } from '../utils/interfaces';
import { getUsers } from '../api/diNaUsers';
import { Col, Container, Row } from 'react-bootstrap';
import UserItem from '../components/UserItem';

function Home() {
  const [userList, setUserList] = useState<User[]>([]);

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
        {userList.map((user) => (
          <Col key={user.id}>
            <UserItem {...user} />
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default Home;
