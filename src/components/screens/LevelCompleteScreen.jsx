import React from 'react';
import { GAME_STATES, LEVELS } from '../../services/gameConfig.js';
import { ThemeManager } from '../../services/themeManager.js';

function LevelCompleteScreen({ 
    setGameState, 
    nextLevel, 
    currentLevel, 
    score, 
    sessionStats, 
    streak,
    playerName,
    getAllPlayers 
}) {
    const allPlayers = getAllPlayers();
    const playerData = allPlayers[playerName];
    const soundEnabled = playerData?.statistics?.preferences?.soundEnabled !== false;

    const handleNextLevel = () => {
        if (soundEnabled) {
            ThemeManager.playSound('levelUp', true);
        }
        nextLevel();
    };

    const handleMenu = () => {
        if (soundEnabled) {
            ThemeManager.playSound('click', true);
        }
        setGameState(GAME_STATES.MENU);
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

    const celebrationIconStyle = {
        fontSize: '4rem',
        marginBottom: '1rem',
        display: 'block'
    };

    const titleStyle = {
        fontSize: '1.875rem',
        fontWeight: 'bold',
        color: '#7c3aed',
        margin: '0 0 0.75rem 0'
    };

    const subtitleStyle = {
        fontSize: '1.125rem',
        color: '#6b7280',
        margin: '0 0 1.5rem 0'
    };

    const resultCardStyle = {
        background: 'linear-gradient(135deg, #d1fae5, #a7f3d0)',
        borderRadius: '1rem',
        padding: '1.5rem',
        marginBottom: '1.5rem',
        color: '#065f46',
        boxShadow: '0 4px 15px rgba(34, 197, 94, 0.3)'
    };

    const scoreStyle = {
        fontSize: '1.5rem',
        fontWeight: 'bold',
        margin: '0 0 0.75rem 0'
    };

    const statsRowStyle = {
        display: 'flex',
        justifyContent: 'center',
        gap: '1.5rem',
        fontSize: '0.875rem',
        flexWrap: 'wrap'
    };

    const statItemStyle = {
        display: 'flex',
        alignItems: 'center',
        gap: '0.25rem'
    };

    const nextLevelCardStyle = {
        background: 'linear-gradient(135deg, #dbeafe, #bfdbfe)',
        borderRadius: '1rem',
        padding: '1.5rem',
        marginBottom: '1.5rem',
        color: '#1e40af',
        border: '1px solid #3b82f6'
    };

    const nextLevelTitleStyle = {
        fontSize: '1.125rem',
        fontWeight: 'bold',
        margin: '0 0 0.75rem 0'
    };

    const nextLevelDetailsStyle = {
        fontSize: '0.875rem',
        display: 'flex',
        justifyContent: 'center',
        gap: '1rem',
        flexWrap: 'wrap'
    };

    const completionCardStyle = {
        background: 'linear-gradient(135deg, #fef3c7, #fde68a)',
        borderRadius: '1rem',
        padding: '2rem',
        marginBottom: '1.5rem',
        color: '#92400e',
        border: '2px solid #f59e0b'
    };

    const completionTitleStyle = {
        fontSize: '1.5rem',
        fontWeight: 'bold',
        margin: '0 0 0.75rem 0'
    };

    const completionSubtitleStyle = {
        fontSize: '0.875rem',
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

    const progressInfoStyle = {
        backgroundColor: '#ede9fe',
        color: '#5b21b6',
        padding: '1rem',
        borderRadius: '0.5rem',
        fontSize: '0.875rem',
        marginBottom: '1rem'
    };

    const isLastLevel = currentLevel >= LEVELS.length;
    const nextLevelData = !isLastLevel ? LEVELS[currentLevel] : null;

    return (
        <div style={containerStyle}>
            {/* Header */}
            <div style={headerStyle}>
                <span style={celebrationIconStyle}>🎉</span>
                <h2 style={titleStyle}>
                    Nivo završen!
                </h2>
                <p style={subtitleStyle}>
                    Uspješno ste završili <strong>Nivo {currentLevel}</strong>!
                </p>
            </div>

            {/* Performance Summary */}
            <div style={progressInfoStyle}>
                Odličan napredak! Riješili ste {sessionStats.correct} pitanja s {streak} uzastopnih točnih odgovora.
            </div>

            {/* Result Card */}
            <div style={resultCardStyle}>
                <div style={scoreStyle}>
                    Vaš rezultat: {score.toLocaleString()} 🌟
                </div>
                <div style={statsRowStyle}>
                    <div style={statItemStyle}>
                        <span>✅</span>
                        <span>Točni odgovori: {sessionStats.correct}</span>
                    </div>
                    <div style={statItemStyle}>
                        <span>🔥</span>
                        <span>Niz: {streak}</span>
                    </div>
                </div>
            </div>

            {/* Next Level Info or Completion Message */}
            {!isLastLevel ? (
                <div style={nextLevelCardStyle}>
                    <div style={nextLevelTitleStyle}>
                        Sljedeći nivo: {nextLevelData.emoji} {nextLevelData.name}
                    </div>
                    <div style={nextLevelDetailsStyle}>
                        <div>
                            <strong>Potrebno:</strong> {nextLevelData.questionsNeeded} zadataka
                        </div>
                        <div>
                            <strong>Vrijeme:</strong> {nextLevelData.timeLimit}s po zadatku
                        </div>
                    </div>
                </div>
            ) : (
                <div style={completionCardStyle}>
                    <div style={completionTitleStyle}>
                        🏆 Čestitamo! 🏆
                    </div>
                    <div style={completionSubtitleStyle}>
                        Završili ste sve nivoe! Nevjerojatan uspjeh!
                    </div>
                </div>
            )}

            {/* Action Buttons */}
            <div style={buttonContainerStyle}>
                {!isLastLevel ? (
                    <button 
                        onClick={handleNextLevel}
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
                        🚀 Sljedeći nivo
                    </button>
                ) : (
                    <div style={{
                        background: 'linear-gradient(135deg, #fbbf24, #f59e0b)',
                        color: 'white',
                        padding: '1rem',
                        borderRadius: '0.75rem',
                        fontSize: '1.125rem',
                        fontWeight: 'bold',
                        marginBottom: '0.75rem'
                    }}>
                        🎖️ Matematički šampion! 🎖️
                    </div>
                )}
                
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

export default LevelCompleteScreen;
