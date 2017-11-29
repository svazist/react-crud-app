import React from 'react'

import {Navbar, Nav, NavDropdown, MenuItem} from 'react-bootstrap'
import {NavItem} from '../tools/bootstrap-links'


export default function AppMenu() {
  return (<Nav bsClass="nav nav-sidebar">
      <NavItem href="/entity1"> entity-1 </NavItem>
      <NavItem href="/entity2"> entity-2 </NavItem>
      <NavItem href="/entity2/123123"> entity-2/123123 </NavItem>
      <NavItem href="/entity2/1333"> entity-2/1333 </NavItem>
      <NavItem href="/entity2/1333/edit"> entity-2/1333/edit </NavItem>
      <NavItem href="/entity2/1333/view"> entity-2/1333/view </NavItem>
      <NavItem href="/entity2/add"> entity-2/add </NavItem>
  </Nav>)

};
