import React, {Component} from 'react'

import {Navbar, Nav, NavDropdown, MenuItem} from 'react-bootstrap'

import { NavItem } from '@ui/tools/bootstrap-links'

export default class AppMenu extends Component {

    render(){
        const {entities=[]} = this.props;
        const items = []
            for(let key of Object.keys(entities)){
                items.push(<NavItem key={entities[key].id} href={`/${entities[key].id}`}>{entities[key].name}</NavItem>)
            }
    ;
        return (<Nav bsClass="nav nav-sidebar">{items}</Nav>)
    }


};
