import React from 'react';
import { GAME_STATES, GAME_MODES } from '../../services/gameConfig.js';
import { GameLogic } from '../../services/gameLogic.js';
import { ThemeManager } from '../../services/themeManager.js';

function GameOverScreen({ 
    setGameState, 
    startGame, 
    score, 
    currentLevel, 
    sessionStats, 
    gameMode,
    playerName,
    getAllPlayers,
    newAchievements = [],
    setNewAchievements,
    isJsonBinConfigured 
}) {
    const allPlayers = getAllPlayers();
    const playerData = allPlayers[playerName];
    const soundEnabled = playerData?.statistics?.preferences?.soundEnabled !== false;
    const showTips = playerData?.statistics?.preferences?.showTips !== false;
    const previousBestScore = playerData?.bestScore || 0;
    const isNewRecord = score > previousBestScore;

    const handleNewGame = () => {
        if (soundEnabled) {
            ThemeManager.playSound('click', true);
        }
        startGame(gameMode);
    };

    const handleMenu = () => {
        if (soundEnabled) {
            ThemeManager.playSound('click', true);
        }
        if (setNewAchievements) {
            setNewAchievements([]);
        }
        setGameState(GAME_STATES.MENU);
    };

    // Get performance-based tip
    const getPerformanceTip = () => {
        if (!showTips) return null;
        
        const accuracy = sessionStats.correct + sessionStats.wrong + sessionStats.timeouts > 0 
            ? sessionStats.correct / (sessionStats.correct + sessionStats.wrong + sessionStats.timeouts)
            : 0;

        // Determine which operation type had most errors based on game mode
        let tipCategory = 'addition'; // default
        switch (gameMode) {
            case GAME_MODES.MULTIPLICATION:
                tipCategory = 'multiplication';
                break;
            case GAME_MODES.DIVISION:
                tipCategory = 'division';
                break;
            case GAME_MODES.SUBTRACTION:
                tipCategory = 'subtraction';
                break;
            case GAME_MODES.ADDITION:
                tipCategory = 'addition';
                break;
            default:
                // For classic/training/sprint, choose based on performance or random
                const categories = ['addition', 'subtraction', 'multiplication', 'division'];
                tipCategory = categories[Math.floor(Math.random() * categories.length)];
        }

        return GameLogic.getMathTip('+', gameMode); // Get tip for the category
    };

    const getMotivationMessage = () => {
        const accuracy = sessionStats.correct + sessionStats.wrong + sessionStats.timeouts > 0 
            ? Math.round((sessionStats.correct / (sessionStats.correct + sessionStats.wrong + sessionStats.timeouts)) * 100)
            : 0;

        if (isNewRecord) return "🎉 Novi rekord! Odličan napredak!";
        if (accuracy >= 80) return "💪 Izvrsno! Nastavi ovako!";
        if (accuracy >= 60) return "👍 Dobro! Možeš još bolje!";
        return "💪 Nastavi vježbati, postajat ćeš sve bolji!";
    };

    // Inline styles
    const containerStyle = {
        maxWidth: '600px',
        margin: '0 auto',
        padding: '1.5rem',
        textAlign: 'center',
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
    };

    const headerStyle = {
        marginBottom: '2rem'
    };

    const titleStyle = {
        fontSize: '2.5rem',
        fontWeight: 'bold',
        color: '#7c3aed',
        margin: '0 0 1rem 0'
    };

    const subtitleStyle = {
        fontSize: '1.125rem',
        color: '#6b7280',
        margin: '0 0 1.5rem 0'
    };

    const gameInfoStyle = {
        fontSize: '1rem',
        color: '#374151',
        margin: 0
    };

    const resultCardStyle = {
        background: isNewRecord 
            ? 'linear-gradient(135deg, #fbbf24, #f59e0b)' 
            : 'linear-gradient(135deg, #a78bfa, #8b5cf6)',
        borderRadius: '1rem',
        padding: '2rem',
        marginBottom: '1.5rem',
        color: 'white',
        boxShadow: '0 10px 25px rgba(0,0,0,0.15)'
    };

    const scoreStyle = {
        fontSize: '2rem',
        fontWeight: 'bold',
        margin: '0 0 0.75rem 0'
    };

    const recordBadgeStyle = {
        backgroundColor: 'rgba(255,255,255,0.3)',
        color: 'white',
        padding: '0.5rem 1rem',
        borderRadius: '0.5rem',
        fontSize: '0.875rem',
        fontWeight: 'bold',
        margin: '0.5rem 0',
        display: 'inline-block'
    };

    const statsRowStyle = {
        display: 'flex',
        justifyContent: 'center',
        gap: '2rem',
        fontSize: '0.875rem',
        marginTop: '1rem',
        flexWrap: 'wrap'
    };

    const statItemStyle = {
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem'
    };

    const cloudInfoStyle = {
        backgroundColor: '#d1fae5',
        color: '#065f46',
        padding: '0.75rem',
        borderRadius: '0.5rem',
        fontSize: '0.875rem',
        marginTop: '1rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '0.5rem'
    };

    const achievementNotificationStyle = {
        backgroundColor: '#fef3c7',
        border: '2px solid #f59e0b',
        borderRadius: '0.75rem',
        padding: '1.5rem',
        marginBottom: '1.5rem',
        textAlign: 'center'
    };

    const achievementTitleStyle = {
        fontSize: '1.125rem',
        fontWeight: 'bold',
        color: '#92400e',
        margin: '0 0 0.5rem 0'
    };

    const achievementListStyle = {
        fontSize: '0.875rem',
        color: '#b45309',
        margin: 0
    };

    const motivationMessageStyle = {
        backgroundColor: '#ede9fe',
        color: '#5b21b6',
        padding: '1rem',
        borderRadius: '0.5rem',
        fontSize: '0.875rem',
        marginBottom: '1rem',
        fontStyle: 'italic'
    };

    // NEW: Math tip styling
    const mathTipContainerStyle = {
        backgroundColor: '#f0f9ff',
        border: '2px solid #0ea5e9',
        borderRadius: '0.75rem',
        padding: '1.5rem',
        marginBottom: '1.5rem',
        textAlign: 'left'
    };

    const mathTipTitleStyle = {
        fontSize: '1rem',
        fontWeight: 'bold',
        color: '#0369a1',
        margin: '0 0 0.75rem 0',
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem'
    };

    const mathTipTextStyle = {
        fontSize: '0.875rem',
        color: '#0c4a6e',
        lineHeight: '1.5',
        margin: 0
    };

    const buttonContainerStyle = {
        display: 'flex',
        flexDirection: 'column',
        gap: '0.75rem'
    };

    const primaryButtonStyle = {
        background: 'linear-gradient(135deg, #10b981, #047857)',
        color: 'white',
        border: 'none',
        padding: '1rem 1.5rem',
        fontSize: '1.125rem',
        fontWeight: 'bold',
        borderRadius: '0.75rem',
        cursor: 'pointer',
        transition: 'all 0.3s ease',
        fontFamily: 'inherit',
        boxShadow: '0 4px 15px rgba(16, 185, 129, 0.4)'
    };

    const secondaryButtonStyle = {
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

    const gameModeName = GameLogic.getGameModeDisplayName(gameMode);
    const accuracy = sessionStats.correct + sessionStats.wrong + sessionStats.timeouts > 0 
        ? Math.round((sessionStats.correct / (sessionStats.correct + sessionStats.wrong + sessionStats.timeouts)) * 100)
        : 0;

    const performanceTip = getPerformanceTip();

    return (
        <div style={containerStyle}>
            {/* Header */}
            <div style={headerStyle}>
                <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>🎮</div>
                <h2 style={titleStyle}>Igra završena!</h2>
                <p style={subtitleStyle}>
                    Završili ste <strong>Nivo {currentLevel}</strong>
                </p>
                <p style={gameInfoStyle}>
                    Način igre: <strong>{gameModeName}</strong>
                </p>
            </div>

            {/* Achievement Notification */}
            {newAchievements.length > 0 && (
                <div style={achievementNotificationStyle}>
                    <h3 style={achievementTitleStyle}>🏆 Nova postignuća!</h3>
                    <p style={achievementListStyle}>
                        Odličan posao! Otključali ste nova postignuća.
                    </p>
                </div>
            )}

            {/* Motivation Message */}
            <div style={motivationMessageStyle}>
                {getMotivationMessage()}
            </div>

            {/* Result Card */}
            <div style={resultCardStyle}>
                <div style={scoreStyle}>
                    Rezultat: {score.toLocaleString()} 🌟
                </div>
                
                {isNewRecord && (
                    <div style={recordBadgeStyle}>
                        🏆 NOVI REKORD!
                    </div>
                )}
                
                <div style={statsRowStyle}>
                    <div style={statItemStyle}>
                        <span>✅</span>
                        <span>Točno: {sessionStats.correct}</span>
                    </div>
                    <div style={statItemStyle}>
                        <span>❌</span>
                        <span>Netočno: {sessionStats.wrong}</span>
                    </div>
                    <div style={statItemStyle}>
                        <span>⏰</span>
                        <span>Timeout: {sessionStats.timeouts}</span>
                    </div>
                    <div style={statItemStyle}>
                        <span>🎯</span>
                        <span>Točnost: {accuracy}%</span>
                    </div>
                </div>

                {isJsonBinConfigured && (
                    <div style={cloudInfoStyle}>
                        <span>☁️</span>
                        <span>Rezultat spremljen u oblak</span>
                    </div>
                )}
            </div>

            {/* NEW: Math Tip Based on Performance */}
            {performanceTip && (
                <div style={mathTipContainerStyle}>
                    <h3 style={mathTipTitleStyle}>
                        <span>💡</span>
                        <span>Savjet za poboljšanje:</span>
                    </h3>
                    <p style={mathTipTextStyle}>
                        {performanceTip}
                    </p>
                </div>
            )}

            {/* Action Buttons */}
            <div style={buttonContainerStyle}>
                <button 
                    onClick={handleNewGame}
                    style={primaryButtonStyle}
                    onMouseOver={(e) => {
                        e.target.style.background = 'linear-gradient(135deg, #047857, #065f46)';
                        e.target.style.transform = 'translateY(-2px)';
                        e.target.style.boxShadow = '0 6px 20px rgba(16, 185, 129, 0.6)';
                    }}
                    onMouseOut={(e) => {
                        e.target.style.background = 'linear-gradient(135deg, #10b981, #047857)';
                        e.target.style.transform = 'translateY(0)';
                        e.target.style.boxShadow = '0 4px 15px rgba(16, 185, 129, 0.4)';
                    }}
                >
                    🔥 Nova igra ({gameModeName})
                </button>
                
                <button 
                    onClick={handleMenu}
                    style={secondaryButtonStyle}
                    onMouseOver={(e) => {
                        e.target.style.backgroundColor = '#e5e7eb';
                        e.target.style.transform = 'translateY(-1px)';
                    }}
                    onMouseOut={(e) => {
                        e.target.style.backgroundColor = '#f3f4f6';
                        e.target.style.transform = 'translateY(0)';
                    }}
                >
                    🏠 Glavni meni
                </button>
            </div>
        </div>
    );
}

export default GameOverScreen;
