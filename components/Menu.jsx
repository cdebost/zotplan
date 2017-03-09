import React from 'react';
import UserMenuHeader from './UserMenuHeader.jsx';

const Menu = ({ isVisible, closeMenu }) => { 
    const backgroundStyle = {
        position: 'absolute', top: 0, left: 0, bottom: 0, right: 0,
        zIndex: 15,
        backgroundColor: 'rgba(224,224,224,.54)',
        display: isVisible ? 'block' : 'none'
    };
    const menuStyle = {
        position: 'absolute', top: 0, left: 0, bottom: 0,
        zIndex: 16,
        width: 'calc(100% - 56px)',
        transform: `translateX(${isVisible ? 0 : '-101%'})`,
        transition: 'transform 0.5s ease',
        backgroundColor: 'white',
        boxShadow: '0 0 4px rgba(0,0,0,.28)',
        overflowY: 'auto'
    };
    return (
        <div>
            <div style={backgroundStyle} onClick={closeMenu} />
            <aside style={menuStyle}>
                <UserMenuHeader user={{ name: 'John Doe', email: 'john@doe.com' }} />
            </aside>
        </div>
    );
}

Menu.propTypes = {
    isVisible: React.PropTypes.bool.isRequired,
    closeMenu: React.PropTypes.func.isRequired
}

export default Menu;