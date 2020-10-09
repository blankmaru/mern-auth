import React from 'react';
import {
    Container,
    Header,
    Menu,
    Button
} from 'semantic-ui-react';

import { Link } from 'react-router-dom';

const AppNavbar = props => {
  return (
    <Menu inverted>
          <Container>
            <Menu.Item header>
              MERN-AUTH
            </Menu.Item>
            <Menu.Item>
              <Link to="/">Home</Link>
            </Menu.Item>
            <Menu.Item position='right'>
              <Button color="black">
                <Link to="/login">Log in</Link>
              </Button>
              <Button color="black" style={{ marginLeft: '0.5em' }}>
                <Link to="/signup">Sign Up</Link>
              </Button>
              </Menu.Item>
          </Container>
    </Menu>
  );
}

export default AppNavbar;