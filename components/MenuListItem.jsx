import React from 'react';
import styles from './MenuListItem.css';

const MenuListItem = ({label, iconName, extraContent, indents = 0, onClick}) => {
    return (
        <div onClick={onClick} className={styles.container} style={{ display: 'flex', padding: 16, marginLeft: indents * 50 }}>
            <i className="material-icons" style={{ width: 50, color: '#757575' }}>{iconName}</i>
            <span className={styles.label}>{label}</span>
            { extraContent }
        </div>
    );
}

MenuListItem.PropTypes = {
    label: React.PropTypes.string.isRequired,
    iconName: React.PropTypes.string,
    extraContent: React.PropTypes.element,
    indents: React.PropTypes.number,
    onClick: React.PropTypes.func
};

export default MenuListItem;