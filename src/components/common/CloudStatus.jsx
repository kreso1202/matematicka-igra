import React from 'react';
import { Wifi, WifiOff } from '../Icons.jsx';

function CloudStatus({ isOnline, isLoading }) {
    // Inline styles
    const containerStyle = {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: '1rem',
        padding: '0.5rem',
        backgroundColor: '#f9fafb',
        borderRadius: '0.5rem',
        fontSize: '0.875rem',
        border: '1px solid #e5e7eb'
    };

    const statusStyle = {
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem'
    };

    const onlineTextStyle = {
        color: '#047857',
        fontWeight: '500'
    };

    const offlineTextStyle = {
        color: '#ea580c',
        fontWeight: '500'
    };

    const loadingStyle = {
        color: '#3b82f6',
        fontSize: '1rem',
        animation: 'spin 1s linear infinite'
    };

    return (
        <div style={containerStyle}>
            <div style={statusStyle}>
                {isOnline ? (
                    <>
                        <Wifi 
                            style={{ color: '#10b981' }} 
                            size={16} 
                        />
                        <span style={onlineTextStyle}>Online natjecanje</span>
                    </>
                ) : (
                    <>
                        <WifiOff 
                            style={{ color: '#f97316' }} 
                            size={16} 
                        />
                        <span style={offlineTextStyle}>Offline način</span>
                    </>
                )}
            </div>
            {isLoading && (
                <div style={loadingStyle}>
                    🔄
                </div>
            )}

            <style>
                {`
                    @keyframes spin {
                        from { transform: rotate(0deg); }
                        to { transform: rotate(360deg); }
                    }
                `}
            </style>
        </div>
    );
}

export default CloudStatus;
