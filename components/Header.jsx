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
        display: 'flex'
    };
    return (
        <div style={outerStyle}>
            <button onClick={onHamburgerClick}>=</button>
            <h1>ZotPlan</h1>
        </div>
    );
}

Header.propTypes = {
    onHamburgerClick: React.PropTypes.func.isRequired
};

export default Header;