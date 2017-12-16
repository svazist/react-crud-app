import React from 'react';
import { LinkContainer } from 'react-router-bootstrap';

import { MenuItem as OriginalMenuItem, NavItem as OriginalNavItem , Button as OriginalButton } from 'react-bootstrap';

export const MenuItem = ({ href, ...props }, { router }) => (
    <LinkContainer to={href}>
        <OriginalMenuItem eventKey={props.enterKey}>{props.children}</OriginalMenuItem>
    </LinkContainer>
    // <OriginalMenuItem onClick={e => {e.preventDefault();router.transitionTo(href)}} href={href} {...props}/>
);

export const NavItem = ({ href, ...props }, { router }) => {
    return (<LinkContainer to={href}>
                <OriginalNavItem eventKey={props.enterKey}>{props.children}</OriginalNavItem>
            </LinkContainer>);
}
export const ButtonItem = ({ href, button, ...props }, { router }) => {

    return (<LinkContainer to={href} {...props}>
                <OriginalButton eventKey={props.enterKey} {...button}>{props.children}</OriginalButton>
            </LinkContainer>);
};
