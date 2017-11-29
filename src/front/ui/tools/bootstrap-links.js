import React from 'react';
import PropTypes from 'prop-types';
import { LinkContainer } from 'react-router-bootstrap';


import { MenuItem as OriginalMenuItem, NavItem as OriginalNavItem } from 'react-bootstrap';

export const MenuItem = ({ href, ...props }, { router }) => (
    <LinkContainer to={href}>
        <OriginalMenuItem eventKey={props.enterKey}>{props.children}</OriginalMenuItem>
    </LinkContainer>
    // <OriginalMenuItem onClick={e => {e.preventDefault();router.transitionTo(href)}} href={href} {...props}/>
);

// MenuItem.contextTypes = {
//     router: PropTypes.any
// };

export const NavItem = ({ href, ...props }, { router }) => {
    //
    // console.log('props', props);
    // console.log('href', href);


    return (<LinkContainer to={href}>
                <OriginalNavItem eventKey={props.enterKey}>{props.children}</OriginalNavItem>
            </LinkContainer>);
}
    // <OriginalNavItem onClick={e => {e.preventDefault();router.transitionTo(href)}} href={href} {...props}/>

// NavItem.contextTypes = {
//     router: PropTypes.any
// };
