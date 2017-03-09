import React from 'react';

export default ({ user }) => {
    const outerStyle = {
        padding: '24px 16px 8px 16px',
        backgroundColor: 'var(--uci-yellow)',
        borderBottom: '1px solid #E4E4E4'
    };
    return (
        <header style={outerStyle}>
            { user.iconUrl ?
                <img src={user.iconUrl} style={{ marginTop: 16, width: 64, height: 64 }} />
                : <i className="material-icons" style={{ fontSize: 64, color: '#757575' }}>account_circle</i>
            }
            <div style={{ height: '56px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                <div className='font-bold' style={{ color: '#757575' }}>{user.name}</div>
                <div style={{ color: '#757575'}}>{user.email}</div>
            </div>
        </header>
    );
}