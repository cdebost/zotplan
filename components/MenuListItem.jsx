import React from 'react';
import styles from './MenuListItem.css';

const MenuListItem = ({label, iconName, extraContent, onClick}) => {
    return (
        <div onClick={onClick} className={styles.container} style={{ display: 'flex', padding: 16 }}>
            <i className="material-icons" style={{color: '#757575'}}>{iconName}</i>
            <span className={styles.label}>{label}</span>
            { extraContent }
        </div>
    );
}

MenuListItem.PropTypes = {
    label: React.PropTypes.string.isRequired,
    iconName: React.PropTypes.string,
    extraContent: React.PropTypes.element,
    onClick: React.PropTypes.func
};

export default MenuListItem;