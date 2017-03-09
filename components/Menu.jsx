import React from 'react';
import styles from './Menu.css';
import UserMenuHeader from './UserMenuHeader.jsx';

const Menu = ({ isVisible, closeMenu }) => { 
    return (
        <div>
            <div onClick={closeMenu} className={styles.background} style={{ display: isVisible ? 'block' : 'none' }} />
            <aside className={styles.container} style={{ transform: `translateX(${isVisible ? 0 : '-101%'})` }}>
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