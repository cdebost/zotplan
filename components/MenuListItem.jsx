import React from 'react';
import styles from './MenuListItem.css';

export default function MenuListItem({ label, iconName, extraContent, indents, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`transparentButton ${styles.container}`}
      style={{ marginLeft: indents * 50 }}
    >
      <i className={`material-icons ${styles.icon}`}>{iconName}</i>
      <span className={styles.label}>{label}</span>
      { extraContent }
    </button>
  );
}

MenuListItem.propTypes = {
  label: React.PropTypes.string.isRequired,
  iconName: React.PropTypes.string,
  extraContent: React.PropTypes.element,
  indents: React.PropTypes.number,
  onClick: React.PropTypes.func,
};

MenuListItem.defaultProps = {
  iconName: '',
  extraContent: null,
  indents: 0,
  onClick: Function.noop,
};
