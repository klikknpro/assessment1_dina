import React, { useState, useEffect } from 'react';
import { User } from '../utils/interfaces';
import { getUsers } from '../api/getUsers';
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
      <Row>
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
