import React from 'react';

const Menu = ({ isVisible, closeMenu }) => { 
    const outerStyle = {
        position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
        transform: `translateX(${isVisible ? 0 : '-100%'})`,
        transition: 'transform 0.5s ease',
        display: 'flex'
    };
    const menuStyle = {
        width: 'calc(100% - 56px)', height: '100%',
        backgroundColor: 'white',
        zIndex: 15,
        boxShadow: '0 0 4px rgba(0,0,0,.28)',
        overflowY: 'auto'
    };
    return (
        <div style={outerStyle}>
            <aside style={menuStyle}>

            </aside>
            <div onClick={closeMenu} style={{ flex: 1 }} />
        </div>
    );
}

Menu.propTypes = {
    isVisible: React.PropTypes.bool.isRequired,
    closeMenu: React.PropTypes.func.isRequired
}

export default Menu;