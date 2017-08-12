import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {NavLink} from 'react-router-dom';
import {Icon, Menu, Input} from 'semantic-ui-react';

export default class Header extends Component {
    render() {
        return (
            <header>
                <Menu>
                    <Menu.Item as={NavLink} exact to='/' icon="home" />
                    <Menu.Item as={NavLink} to='/edit' icon="add" />
                    <Menu.Menu position="right">
                        <Menu.Item>
                            <Input className='icon' icon='search' placeholder='Search...' />
                        </Menu.Item>
                        <Menu.Item as={NavLink} to='/help' icon="help" />
                        <Menu.Item as={NavLink} to='/settings' icon="setting" />
                    </Menu.Menu>
                </Menu>
            </header>
        );
    }
}
