import React from 'react';
import { GAME_STATES } from '../../services/gameConfig.js';
import { ThemeManager } from '../../services/themeManager.js';

function MenuScreen({ 
    playerName, 
    setGameState, 
    getAllPlayers, 
    getTopPlayers, 
    exportResults, 
    isJsonBinConfigured, 
    refreshCloudData,
    startGame 
}) {
    const allPlayers = getAllPlayers();
    const playerData = allPlayers[playerName];
    const avatar = ThemeManager.getAvatar(playerData?.statistics?.preferences?.avatar || 'robot');
    const soundEnabled = playerData?.statistics?.preferences?.soundEnabled !== false;

    const handleButtonClick = (action) => {
        if (soundEnabled) {
            ThemeManager.playSound('click', true);
        }
        action();
    };

    const menuOptions = [
        {
            id: 'play',
            title: '🎮 Igraj',
            description: 'Počni novu igru',
            action: () => handleButtonClick(() => setGameState(GAME_STATES.GAME_MODES)),
            gradient: 'linear-gradient(135deg, #3b82f6, #1d4ed8)',
            hoverGradient: 'linear-gradient(135deg, #1d4ed8, #1e40af)'
        },
        {
            id: 'statistics',
            title: '📊 Statistike',
            description: 'Pregled napretka i rezultata',
            action: () => handleButtonClick(() => setGameState(GAME_STATES.STATISTICS)),
            gradient: 'linear-gradient(135deg, #10b981, #047857)',
            hoverGradient: 'linear-gradient(135deg, #047857, #065f46)'
        },
        {
            id: 'achievements',
            title: '🏆 Postignuća',
            description: 'Otkrivena postignuća i nagrade',
            action: () => handleButtonClick(() => setGameState(GAME_STATES.ACHIEVEMENTS)),
            gradient: 'linear-gradient(135deg, #f59e0b, #d97706)',
            hoverGradient: 'linear-gradient(135deg, #d97706, #b45309)'
        },
        {
            id: 'leaderboard',
            title: '🏅 Ljestvica',
            description: 'Najbolji rezultati',
            action: () => handleButtonClick(() => setGameState(GAME_STATES.LEADERBOARD)),
            gradient: 'linear-gradient(135deg, #8b5cf6, #7c3aed)',
            hoverGradient: 'linear-gradient(135deg, #7c3aed, #6d28d9)'
        },
        {
            id: 'settings',
            title: '⚙️ Postavke',
            description: 'Personaliziraj svoju igru',
            action: () => handleButtonClick(() => setGameState(GAME_STATES.SETTINGS)),
            gradient: 'linear-gradient(135deg, #6b7280, #4b5563)',
            hoverGradient: 'linear-gradient(135deg, #4b5563, #374151)'
        }
    ];

    // Statistike igrača za prikaz na vrhu
    const playerStats = playerData?.statistics || {};
    const achievements = playerData?.statistics?.achievements || { unlocked: [] };

    // Inline stilovi
    const containerStyle = {
        maxWidth: '1024px',
        margin: '0 auto',
        padding: '1.5rem',
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
    };

    const headerStyle = {
        textAlign: 'center',
        marginBottom: '2rem'
    };

    const playerInfoStyle = {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '1rem',
        marginBottom: '1rem'
    };

    const titleStyle = {
        fontSize: '2rem',
        fontWeight: 'bold',
        color: '#1f2937',
        margin: '0 0 0.5rem 0'
    };

    const subtitleStyle = {
        fontSize: '1.125rem',
        color: '#6b7280',
        margin: 0
    };

    const statsGridStyle = {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: '1rem',
        marginTop: '1.5rem'
    };

    const statCardStyle = {
        backgroundColor: '#f8fafc',
        border: '1px solid #e5e7eb',
        borderRadius: '0.5rem',
        padding: '1rem',
        textAlign: 'center'
    };

    const statValueStyle = {
        fontSize: '1.5rem',
        fontWeight: 'bold',
        color: '#3b82f6',
        margin: '0 0 0.25rem 0'
    };

    const statLabelStyle = {
        fontSize: '0.875rem',
        color: '#6b7280',
        margin: 0
    };

    const menuGridStyle = {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
        gap: '1rem',
        marginBottom: '2rem'
    };

    const getButtonStyle = (option, isHovered = false) => ({
        background: isHovered ? option.hoverGradient : option.gradient,
        color: 'white',
        border: 'none',
        borderRadius: '0.75rem',
        padding: '1.5rem',
        textAlign: 'left',
        cursor: 'pointer',
        transition: 'all 0.3s ease',
        transform: isHovered ? 'translateY(-2px) scale(1.02)' : 'translateY(0) scale(1)',
        boxShadow: isHovered ? '0 10px 25px rgba(0,0,0,0.2)' : '0 4px 15px rgba(0,0,0,0.1)',
        fontFamily: 'inherit',
        width: '100%'
    });

    const buttonTitleStyle = {
        fontSize: '1.25rem',
        fontWeight: 'bold',
        margin: '0 0 0.5rem 0'
    };

    const buttonDescStyle = {
        fontSize: '0.875rem',
        opacity: 0.9,
        margin: 0
    };

    const quickActionsStyle = {
        borderTop: '1px solid #e5e7eb',
        paddingTop: '1.5rem'
    };

    const quickActionsTitleStyle = {
        fontSize: '1.125rem',
        fontWeight: 'bold',
        marginBottom: '1rem',
        color: '#1f2937'
    };

    const quickButtonsStyle = {
        display: 'flex',
        flexWrap: 'wrap',
        gap: '0.75rem'
    };

    const quickButtonStyle = {
        padding: '0.5rem 1rem',
        borderRadius: '0.5rem',
        border: 'none',
        fontWeight: '500',
        cursor: 'pointer',
        transition: 'all 0.2s ease',
        fontFamily: 'inherit'
    };

    const getQuickButtonStyle = (variant) => {
        const variants = {
            primary: {
                backgroundColor: '#dbeafe',
                color: '#1e40af',
                ':hover': { backgroundColor: '#bfdbfe' }
            },
            success: {
                backgroundColor: '#d1fae5',
                color: '#065f46',
                ':hover': { backgroundColor: '#a7f3d0' }
            },
            purple: {
                backgroundColor: '#e9d5ff',
                color: '#6b21a8',
                ':hover': { backgroundColor: '#ddd6fe' }
            }
        };
        return { ...quickButtonStyle, ...variants[variant] };
    };

    return (
        <div style={containerStyle}>
            {/* Player Info Header */}
            <div style={headerStyle}>
                <div style={playerInfoStyle}>
                    <div style={{ fontSize: '2.5rem' }}>{avatar.emoji}</div>
                    <div>
                        <h2 style={titleStyle}>
                            Dobro došao, {playerName}!
                        </h2>
                        <p style={subtitleStyle}>
                            Odaberi što želiš raditi
                        </p>
                    </div>
                </div>

                {/* Quick Stats */}
                {playerData && (
                    <div style={statsGridStyle}>
                        <div style={statCardStyle}>
                            <div style={statValueStyle}>
                                {playerData.bestScore}
                            </div>
                            <div style={statLabelStyle}>
                                Najbolji rezultat
                            </div>
                        </div>

                        <div style={statCardStyle}>
                            <div style={statValueStyle}>
                                {playerData.maxLevel}
                            </div>
                            <div style={statLabelStyle}>
                                Najviši nivo
                            </div>
                        </div>

                        <div style={statCardStyle}>
                            <div style={statValueStyle}>
                                {playerStats.averageAccuracy?.toFixed(0) || 0}%
                            </div>
                            <div style={statLabelStyle}>
                                Točnost
                            </div>
                        </div>

                        <div style={statCardStyle}>
                            <div style={statValueStyle}>
                                {achievements.unlocked.length}
                            </div>
                            <div style={statLabelStyle}>
                                Postignuća
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {/* Menu Options */}
            <div style={menuGridStyle}>
                {menuOptions.map((option) => {
                    const [isHovered, setIsHovered] = React.useState(false);
                    
                    return (
                        <button
                            key={option.id}
                            onClick={option.action}
                            style={getButtonStyle(option, isHovered)}
                            onMouseEnter={() => setIsHovered(true)}
                            onMouseLeave={() => setIsHovered(false)}
                        >
                            <div style={buttonTitleStyle}>{option.title}</div>
                            <div style={buttonDescStyle}>{option.description}</div>
                        </button>
                    );
                })}
            </div>

            {/* Quick Actions */}
            <div style={quickActionsStyle}>
                <h3 style={quickActionsTitleStyle}>
                    ⚡ Brze akcije
                </h3>
                <div style={quickButtonsStyle}>
                    <button
                        onClick={() => handleButtonClick(() => startGame())}
                        style={getQuickButtonStyle('primary')}
                    >
                        🚀 Brza igra
                    </button>
                    
                    {isJsonBinConfigured && (
                        <button
                            onClick={() => handleButtonClick(refreshCloudData)}
                            style={getQuickButtonStyle('success')}
                        >
                            ☁️ Osvježi podatke
                        </button>
                    )}
                    
                    <button
                        onClick={() => handleButtonClick(exportResults)}
                        style={getQuickButtonStyle('purple')}
                    >
                        📥 Izvezi podatke
                    </button>
                </div>
            </div>
        </div>
    );
}

export default MenuScreen;
