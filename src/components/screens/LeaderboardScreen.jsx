import React from 'react';
import { Download } from '../Icons.jsx';
import { GAME_STATES } from '../../services/gameConfig.js';
import { ThemeManager } from '../../services/themeManager.js';

function LeaderboardScreen({ 
    playerName, 
    setGameState, 
    isJsonBinConfigured, 
    getTopPlayers, 
    exportResults, 
    refreshCloudData, 
    isLoading, 
    cloudData,
    getAllPlayers 
}) {
    const topPlayers = getTopPlayers();
    const allPlayers = getAllPlayers();
    const playerData = allPlayers[playerName];
    const soundEnabled = playerData?.statistics?.preferences?.soundEnabled !== false;

    const handleRefresh = () => {
        if (soundEnabled) {
            ThemeManager.playSound('click', true);
        }
        refreshCloudData();
    };

    const handleExport = () => {
        if (soundEnabled) {
            ThemeManager.playSound('click', true);
        }
        exportResults();
    };

    const handleBack = () => {
        if (soundEnabled) {
            ThemeManager.playSound('click', true);
        }
        setGameState(GAME_STATES.MENU);
    };

    // Inline styles
    const containerStyle = {
        maxWidth: '800px',
        margin: '0 auto',
        padding: '1.5rem',
        textAlign: 'center',
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
    };

    const headerStyle = {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '0.5rem',
        marginBottom: '1rem'
    };

    const titleStyle = {
        fontSize: '1.875rem',
        fontWeight: 'bold',
        color: '#7c3aed',
        margin: 0
    };

    const cloudActionsStyle = {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '0.5rem',
        marginBottom: '1.5rem',
        fontSize: '0.875rem'
    };

    const refreshButtonStyle = {
        backgroundColor: 'transparent',
        color: '#3b82f6',
        border: 'none',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        gap: '0.25rem',
        padding: '0.25rem',
        borderRadius: '0.25rem',
        transition: 'color 0.2s ease',
        fontFamily: 'inherit',
        fontSize: 'inherit'
    };

    const lastUpdateStyle = {
        color: '#6b7280',
        fontSize: '0.75rem'
    };

    const leaderboardContainerStyle = {
        marginBottom: '1.5rem',
        maxHeight: '24rem',
        overflowY: 'auto',
        padding: '0.5rem',
        backgroundColor: '#f8fafc',
        borderRadius: '0.75rem',
        border: '1px solid #e5e7eb'
    };

    const getPlayerCardStyle = (index, isCurrentPlayer) => {
        let backgroundColor, borderColor;
        
        if (index === 0) {
            backgroundColor = '#fef3c7';
            borderColor = '#f59e0b';
        } else if (index === 1) {
            backgroundColor = '#f3f4f6';
            borderColor = '#9ca3af';
        } else if (index === 2) {
            backgroundColor = '#fed7aa';
            borderColor = '#ea580c';
        } else {
            backgroundColor = '#dbeafe';
            borderColor = '#3b82f6';
        }

        return {
            padding: '0.75rem',
            borderRadius: '0.75rem',
            marginBottom: '0.5rem',
            border: `2px solid ${borderColor}`,
            backgroundColor,
            transition: 'all 0.2s ease'
        };
    };

    const playerRowStyle = {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
    };

    const playerInfoStyle = {
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem'
    };

    const rankStyle = {
        fontSize: '1.25rem'
    };

    const playerNameStyle = (isCurrentPlayer) => ({
        fontWeight: 'bold',
        color: isCurrentPlayer ? '#7c3aed' : '#1f2937'
    });

    const playerStatsStyle = {
        textAlign: 'right'
    };

    const scoreStyle = {
        fontWeight: 'bold',
        color: '#7c3aed',
        fontSize: '1rem'
    };

    const detailsStyle = {
        fontSize: '0.75rem',
        color: '#6b7280'
    };

    const noDataStyle = {
        color: '#6b7280',
        fontSize: '1rem',
        padding: '2rem'
    };

    const buttonContainerStyle = {
        display: 'flex',
        flexDirection: 'column',
        gap: '0.75rem'
    };

    const exportButtonStyle = {
        backgroundColor: '#10b981',
        color: 'white',
        border: 'none',
        padding: '0.75rem 1.5rem',
        fontSize: '1.125rem',
        fontWeight: 'bold',
        borderRadius: '0.75rem',
        cursor: 'pointer',
        transition: 'all 0.3s ease',
        fontFamily: 'inherit',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '0.5rem',
        boxShadow: '0 4px 15px rgba(16, 185, 129, 0.4)',
        opacity: topPlayers.length === 0 ? 0.5 : 1
    };

    const backButtonStyle = {
        backgroundColor: '#f3f4f6',
        color: '#374151',
        border: '1px solid #d1d5db',
        padding: '0.75rem 1.5rem',
        fontSize: '1rem',
        fontWeight: '500',
        borderRadius: '0.75rem',
        cursor: 'pointer',
        transition: 'all 0.2s ease',
        fontFamily: 'inherit'
    };

    const getRankIcon = (index) => {
        if (index === 0) return '🥇';
        if (index === 1) return '🥈';
        if (index === 2) return '🥉';
        return `${index + 1}.`;
    };

    return (
        <div style={containerStyle}>
            {/* Header */}
            <div style={headerStyle}>
                <h2 style={{ ...titleStyle, fontSize: '1.875rem' }}>🏆</h2>
                <h2 style={titleStyle}>
                    {isJsonBinConfigured ? 'Online ljestvica' : 'Najbolji igrači'}
                </h2>
            </div>

            {/* Cloud Actions */}
            {isJsonBinConfigured && (
                <div style={cloudActionsStyle}>
                    <button 
                        onClick={handleRefresh}
                        disabled={isLoading}
                        style={{
                            ...refreshButtonStyle,
                            color: isLoading ? '#9ca3af' : '#3b82f6',
                            cursor: isLoading ? 'not-allowed' : 'pointer'
                        }}
                        onMouseOver={(e) => {
                            if (!isLoading) {
                                e.target.style.color = '#1d4ed8';
                            }
                        }}
                        onMouseOut={(e) => {
                            if (!isLoading) {
                                e.target.style.color = '#3b82f6';
                            }
                        }}
                    >
                        <span style={{ 
                            transform: isLoading ? 'rotate(360deg)' : 'rotate(0deg)',
                            transition: 'transform 1s linear',
                            display: 'inline-block'
                        }}>
                            🔄
                        </span>
                        <span>Osvježi</span>
                    </button>
                    
                    {cloudData.lastUpdate && (
                        <span style={lastUpdateStyle}>
                            Zadnje ažuriranje: {new Date(cloudData.lastUpdate).toLocaleString('hr-HR')}
                        </span>
                    )}
                </div>
            )}

            {/* Leaderboard */}
            <div style={leaderboardContainerStyle}>
                {topPlayers.length > 0 ? (
                    topPlayers.map((player, index) => (
                        <div 
                            key={index} 
                            style={getPlayerCardStyle(index, player.name === playerName)}
                        >
                            <div style={playerRowStyle}>
                                <div style={playerInfoStyle}>
                                    <span style={rankStyle}>
                                        {getRankIcon(index)}
                                    </span>
                                    <span style={playerNameStyle(player.name === playerName)}>
                                        {player.name}
                                        {player.name === playerName && ' (Vi)'}
                                    </span>
                                </div>
                                <div style={playerStatsStyle}>
                                    <div style={scoreStyle}>
                                        {player.bestScore.toLocaleString()} 🌟
                                    </div>
                                    <div style={detailsStyle}>
                                        Nivo {player.maxLevel} • {player.gamesPlayed} igara
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <div style={noDataStyle}>
                        Nema još zabilježenih rezultata
                    </div>
                )}
            </div>

            {/* Action Buttons */}
            <div style={buttonContainerStyle}>
                <button 
                    onClick={handleExport}
                    disabled={topPlayers.length === 0}
                    style={exportButtonStyle}
                    onMouseOver={(e) => {
                        if (topPlayers.length > 0) {
                            e.target.style.backgroundColor = '#047857';
                            e.target.style.transform = 'translateY(-2px)';
                            e.target.style.boxShadow = '0 6px 20px rgba(16, 185, 129, 0.6)';
                        }
                    }}
                    onMouseOut={(e) => {
                        if (topPlayers.length > 0) {
                            e.target.style.backgroundColor = '#10b981';
                            e.target.style.transform = 'translateY(0)';
                            e.target.style.boxShadow = '0 4px 15px rgba(16, 185, 129, 0.4)';
                        }
                    }}
                >
                    <Download size={20} />
                    Izvezi rezultate
                </button>
                
                <button 
                    onClick={handleBack}
                    style={backButtonStyle}
                    onMouseOver={(e) => {
                        e.target.style.backgroundColor = '#e5e7eb';
                        e.target.style.transform = 'translateY(-1px)';
                    }}
                    onMouseOut={(e) => {
                        e.target.style.backgroundColor = '#f3f4f6';
                        e.target.style.transform = 'translateY(0)';
                    }}
                >
                    🏠 Povratak
                </button>
            </div>
        </div>
    );
}

export default LeaderboardScreen;
