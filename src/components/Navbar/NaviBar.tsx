import React from 'react';
import { Navbar, Form, Button, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { logOut } from '../../redux/auth/actions';

interface IProps {
  logOutDisconnect: () => void;
}

const NaviBar = ({ logOutDisconnect }: IProps) => {
  return (
    <Navbar bg="light" expand="lg">
      <Navbar.Brand href="#">
        <b>Innovance Interviewers</b>
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link>
            <Link to="/">Home</Link>
          </Nav.Link>
          <Nav.Link>
            <Link to="/interviwers">Interviwers</Link>
          </Nav.Link>
          <Nav.Link>
            <Link to="/lorem">Lorem</Link>
          </Nav.Link>
        </Nav>
        <Form inline>
          <Button variant="outline-success" onClick={logOutDisconnect}>
            Sign out
          </Button>
        </Form>
      </Navbar.Collapse>
    </Navbar>
  );
};

const mapDispatchToProps = {
  logOutDisconnect: logOut,
};

export default connect(null, mapDispatchToProps)(NaviBar);
