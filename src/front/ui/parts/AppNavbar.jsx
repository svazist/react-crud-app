import React from 'react'

import {Navbar, Nav,Glyphicon} from 'react-bootstrap'
import { NavItem } from '../tools/bootstrap-links'
import { Link } from 'react-router-dom'

export default function AppNavbar() {
  return (<Navbar fixedTop inverse>
      <Navbar.Header>
          <Navbar.Brand>
              <Link to="/"><Glyphicon glyph="list-alt" /> react-crud-app</Link>
          </Navbar.Brand>
      </Navbar.Header>
      <Nav pullRight>
          <NavItem eventKey={1} href="/about"><Glyphicon glyph="info-sign" /> О проекте</NavItem>
          <NavItem eventKey={2} href="https://github.com/svazist/react-crud-app">GitHub</NavItem>
      </Nav>
  </Navbar>)
};
