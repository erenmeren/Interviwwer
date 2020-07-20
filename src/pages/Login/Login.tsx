import React from 'react';
import { connect } from 'react-redux';

import { Button, Container, Col, Row } from 'react-bootstrap';
import { logIn } from '../../redux/auth/actions';
import './index.css';

interface IProps {
  logInConnect: () => void;
}

const Login = ({ logInConnect }: IProps) => {
  const login = () => {
    logInConnect();
  };

  return (
    <Container
      className="justify-content-md-center"
      style={{ marginTop: '10%' }}
    >
      <Row>
        <Col style={{ display: 'flex', justifyContent: 'center' }}>
          <Button variant="primary" onClick={login}>
            Sign In
          </Button>
        </Col>
      </Row>
    </Container>
  );
};

const mapDispatchToProps = {
  logInConnect: logIn,
};

export default connect(null, mapDispatchToProps)(Login);
