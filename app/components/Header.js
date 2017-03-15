import React from 'react';
import styles from './Header.css';

const Header = ({ onHamburgerClick }) => (
  <div className={styles.container}>
    <button
      onClick={onHamburgerClick}
      className={`${'material-icons '}${styles.icon}`}
    >menu</button>
    <h1 style={{ marginLeft: 40 }}>ZotPlan</h1>
  </div>
);

Header.propTypes = {
  onHamburgerClick: React.PropTypes.func.isRequired,
};

export default Header;
