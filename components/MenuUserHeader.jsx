import React from 'react';
import styles from './MenuUserHeader.css';

export default ({ user }) => {
    return (
        <header className={styles.container}>
            { user.iconUrl ?
                <img src={user.iconUrl} className={styles.icon} />
                : <i className="material-icons" style={{ fontSize: 64, color: '#757575' }}>account_circle</i>
            }
            <div className={styles.className}>
                <div className='font-bold' style={{ color: '#757575' }}>{user.name}</div>
                <div style={{ color: '#757575'}}>{user.email}</div>
            </div>
        </header>
    );
}