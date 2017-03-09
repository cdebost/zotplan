import React from 'react';

const Header = ({ onHamburgerClick }) => {
    const outerStyle = {
        position: 'absolute', top: 0, left: 0,
        width: '100%',
        height: '56px',
        alignItems: 'center',
        backgroundColor: 'var(--uci-yellow)',
        padding: '0 15px 0 15px',
        boxShadow: '0 2px 5px rgba(0,0,0,.26)',
        display: 'flex',
    };
    return (
        <div style={outerStyle}>
            <i className="material-icons" onClick={onHamburgerClick}>menu</i>
            <h1 style={{ marginLeft: 40 }}>ZotPlan</h1>
        </div>
    );
}

Header.propTypes = {
    onHamburgerClick: React.PropTypes.func.isRequired
};

export default Header;