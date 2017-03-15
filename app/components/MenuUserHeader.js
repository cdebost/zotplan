import React from 'react';
import styles from './MenuUserHeader.css';
import PropTypes from '../validators';
import MenuListItem from './MenuListItem';

export default function MenuUserHeader({ user, isExpanded, onClickExpand, onClickSignOut }) {
  return (
    <header className={styles.container}>
      { user.iconUrl ?
        <img src={user.iconUrl} alt="" className={styles.icon} />
      : <i className={`material-icons ${styles.icon}`}>account_circle</i>
      }
      <div className={styles.subtitle}>
        <div className="font-bold">{user.name}</div>
        <div className={styles.emailRow}>
          <div style={{ flex: 1 }}>{user.email}</div>
          <button
            onClick={onClickExpand}
            className={`transparentButton ${styles.expandButton} ${isExpanded ? styles.expanded : ''}`}
          ><i className="material-icons">expand_more</i>
          </button>
        </div>
      </div>
      { isExpanded &&
        <div className={styles.details}>
          <MenuListItem
            label="Sign Out"
            onClick={onClickSignOut}
            iconName="exit_to_app"
            isFlipped
          />
        </div>
      }
    </header>
  );
}

MenuUserHeader.propTypes = {
  user: PropTypes.user.isRequired,
  isExpanded: React.PropTypes.bool.isRequired,
  onClickExpand: React.PropTypes.func.isRequired,
  onClickSignOut: React.PropTypes.func.isRequired,
};
