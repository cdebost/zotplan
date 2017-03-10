import React from 'react';
import styles from './Header.css';

const Header = ({ onHamburgerClick }) => {
    return (
        <div className={styles.container}>
            <i className={"material-icons" + ' ' + styles.icon} onClick={onHamburgerClick}>menu</i>
            <h1 style={{ marginLeft: 40 }}>ZotPlan</h1>
        </div>
    );
}

Header.propTypes = {
    onHamburgerClick: React.PropTypes.func.isRequired
};

export default Header;