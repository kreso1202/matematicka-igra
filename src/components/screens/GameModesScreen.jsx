import React from 'react';
import { GAME_STATES, GAME_MODES } from '../../services/gameConfig.js';
import { GameLogic } from '../../services/gameLogic.js';
import { ThemeManager } from '../../services/themeManager.js';
import { StoryManager } from '../../services/gameConfig.js';

function GameModesScreen({ playerName, setGameState, startGame, getAllPlayers, startStoryMode }) {
    const allPlayers = getAllPlayers();
    const playerData = allPlayers[playerName];
    const soundEnabled = playerData?.statistics?.preferences?.soundEnabled !== false;
    
    // Get current theme for dynamic styling
    const currentTheme = playerData?.statistics?.preferences?.theme || 'default';

    const handleGameModeSelect = (mode) => {
        if (soundEnabled) {
            ThemeManager.playSound('click', true);
        }
        
        // Handle story mode differently
        if (mode === GAME_MODES.STORY) {
            setGameState('storyMenu');
        } else {
            startGame(mode);
        }
    };

    const gameModesConfig = [
        {
            mode: GAME_MODES.CLASSIC,
            gradient: 'linear-gradient(135deg, #3b82f6, #1d4ed8)',
            difficulty: 'Svi nivoi'
        },
        {
            mode: GAME_MODES.TRAINING,
            gradient: 'linear-gradient(135deg, #10b981, #047857)',
            difficulty: 'Bez vremena'
        },
        {
            mode: GAME_MODES.SPRINT,
            gradient: 'linear-gradient(135deg, #f59e0b, #d97706)',
            difficulty: 'Brža igra'
        },
        {
            mode: GAME_MODES.STORY, // NEW: Story mode
            gradient: 'linear-gradient(135deg, #7c3aed, #5b21b6)',
            difficulty: 'Matematičke priče'
        },
        {
            mode: GAME_MODES.ADDITION,
            gradient: 'linear-gradient(135deg, #06b6d4, #0891b2)',
            difficulty: 'Samo zbrajanje'
        },
        {
            mode: GAME_MODES.SUBTRACTION,
            gradient: 'linear-gradient(135deg, #8b5cf6, #7c3aed)',
            difficulty: 'Samo oduzimanje'
        },
        {
            mode: GAME_MODES.MULTIPLICATION,
            gradient: 'linear-gradient(135deg, #ef4444, #dc2626)',
            difficulty: 'Tablice množenja'
        },
        {
            mode: GAME_MODES.DIVISION,
            gradient: 'linear-gradient(135deg, #f97316, #ea580c)',
            difficulty: 'Tablice dijeljenja'
        }
    ];

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

    const titleStyle = {
        fontSize: '2rem',
        fontWeight: 'bold',
        color: 'var(--text-primary, #1f2937)',
        margin: '0 0 0.5rem 0'
    };

    const subtitleStyle = {
        fontSize: '1.125rem',
        color: 'var(--text-secondary, #6b7280)',
        margin: 0
    };

    const backButtonStyle = {
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem',
        backgroundColor: '#6b7280',
        color: 'white',
        border: 'none',
        padding: '0.5rem 1rem',
        borderRadius: '0.5rem',
        cursor: 'pointer',
        fontFamily: 'inherit',
        transition: 'background-color 0.2s ease',
        marginBottom: '1rem'
    };

    const modesGridStyle = {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        gap: '1.5rem',
        marginBottom: '2rem'
    };

    const modeCardStyle = (gradient) => ({
        background: gradient,
        color: 'white',
        border: 'none',
        borderRadius: '1rem',
        padding: '2rem',
        cursor: 'pointer',
        transition: 'all 0.3s ease',
        textAlign: 'left',
        fontFamily: 'inherit',
        boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
        position: 'relative',
        overflow: 'hidden'
    });

    const modeHeaderStyle = {
        display: 'flex',
        alignItems: 'center',
        gap: '1rem',
        marginBottom: '1rem'
    };

    const modeIconStyle = {
        fontSize: '2.5rem',
        width: '4rem',
        height: '4rem',
        backgroundColor: 'rgba(255,255,255,0.2)',
        borderRadius: '1rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    };

    const modeTitleStyle = {
        fontSize: '1.5rem',
        fontWeight: 'bold',
        margin: '0 0 0.25rem 0'
    };

    const modeDifficultyStyle = {
        fontSize: '0.875rem',
        opacity: 0.9,
        margin: 0
    };

    // FIXED: Better text visibility for all themes
    const modeDescriptionStyle = {
        fontSize: '1rem',
        lineHeight: '1.5',
        opacity: 0.98, // Increased opacity for better readability
        marginBottom: '1.5rem',
        color: 'rgba(255, 255, 255, 0.95)', // Explicit white color with high opacity
        textShadow: currentTheme === 'dark' ? '0 1px 2px rgba(0,0,0,0.5)' : 'none' // Add shadow for dark themes
    };

    const modeStatsStyle = {
        display: 'grid',
        gridTemplateColumns: 'repeat(2, 1fr)',
        gap: '1rem',
        marginTop: '1rem'
    };

    const statItemStyle = {
        textAlign: 'center',
        padding: '0.75rem',
        backgroundColor: 'rgba(255,255,255,0.1)',
        borderRadius: '0.5rem'
    };

    const statValueStyle = {
        fontSize: '1.25rem',
        fontWeight: 'bold',
        margin: '0 0 0.25rem 0'
    };

    const statLabelStyle = {
        fontSize: '0.75rem',
        opacity: 0.8,
        margin: 0
    };

    // FIXED: Better visibility for info section
    const infoSectionStyle = {
        backgroundColor: 'var(--bg-card, #ffffff)',
        padding: '1.5rem',
        borderRadius: '0.75rem',
        border: '1px solid var(--border-color, #e5e7eb)',
        boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
    };

    const infoTitleStyle = {
        fontSize: '1.125rem',
        fontWeight: 'bold',
        marginBottom: '1rem',
        color: 'var(--text-primary, #1f2937)',
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem'
    };

    const infoGridStyle = {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
        gap: '1rem',
        fontSize: '0.875rem',
        color: 'var(--text-secondary, #6b7280)' // Use CSS variable for theme support
    };

    const infoItemStyle = {
        lineHeight: '1.5'
    };

    const playerStats = playerData?.statistics?.gameModeStats || {};

    // Helper function to get mode icon
    const getModeIcon = (mode) => {
        if (mode === GAME_MODES.STORY) {
            return StoryManager.getStoryModeIcon();
        }
        return GameLogic.getGameModeIcon(mode);
    };

    // Helper function to get mode display name
    const getModeDisplayName = (mode) => {
        if (mode === GAME_MODES.STORY) {
            return StoryManager.getStoryModeDisplayName();
        }
        return GameLogic.getGameModeDisplayName(mode);
    };

    // Helper function to get mode description
    const getModeDescription = (mode) => {
        if (mode === GAME_MODES.STORY) {
            return StoryManager.getStoryModeDescription();
        }
        return GameLogic.getGameModeDescription(mode);
    };

    return (
        <div style={containerStyle}>
            {/* Header */}
            <div style={headerStyle}>
                <button 
                    onClick={() => setGameState(GAME_STATES.MENU)}
                    style={backButtonStyle}
                    onMouseOver={(e) => e.target.style.backgroundColor = '#4b5563'}
                    onMouseOut={(e) => e.target.style.backgroundColor = '#6b7280'}
                >
                    ← Povratak
                </button>
                
                <h2 style={titleStyle}>🎮 Odaberi način igre</h2>
                <p style={subtitleStyle}>Svaki način ima jedinstvene izazove</p>
            </div>

            {/* Game Modes Grid */}
            <div style={modesGridStyle}>
                {gameModesConfig.map((config) => {
                    const modeStats = playerStats[config.mode] || { gamesPlayed: 0, bestScore: 0 };
                    const [isHovered, setIsHovered] = React.useState(false);
                    
                    // Special handling for story mode stats
                    const isStoryMode = config.mode === GAME_MODES.STORY;
                    const storyStats = isStoryMode ? playerData?.statistics?.storyMode : null;
                    const storyCount = storyStats ? Object.keys(storyStats).length : 0;
                    
                    return (
                        <button
                            key={config.mode}
                            onClick={() => handleGameModeSelect(config.mode)}
                            style={{
                                ...modeCardStyle(config.gradient),
                                transform: isHovered ? 'translateY(-4px) scale(1.02)' : 'translateY(0) scale(1)',
                                boxShadow: isHovered 
                                    ? '0 12px 30px rgba(0,0,0,0.2)' 
                                    : '0 4px 15px rgba(0,0,0,0.1)'
                            }}
                            onMouseEnter={() => setIsHovered(true)}
                            onMouseLeave={() => setIsHovered(false)}
                        >
                            {/* Header */}
                            <div style={modeHeaderStyle}>
                                <div style={modeIconStyle}>
                                    {getModeIcon(config.mode)}
                                </div>
                                <div>
                                    <h3 style={modeTitleStyle}>
                                        {getModeDisplayName(config.mode)}
                                    </h3>
                                    <p style={modeDifficultyStyle}>
                                        {config.difficulty}
                                    </p>
                                </div>
                            </div>

                            {/* FIXED: Description with better visibility */}
                            <p style={modeDescriptionStyle}>
                                {getModeDescription(config.mode)}
                            </p>

                            {/* Player Stats - Different for story mode */}
                            {isStoryMode && storyCount > 0 ? (
                                <div style={modeStatsStyle}>
                                    <div style={statItemStyle}>
                                        <div style={statValueStyle}>{storyCount}</div>
                                        <div style={statLabelStyle}>Priča</div>
                                    </div>
                                    <div style={statItemStyle}>
                                        <div style={statValueStyle}>
                                            {Object.values(storyStats).filter(s => s.status === 'completed').length}
                                        </div>
                                        <div style={statLabelStyle}>Završeno</div>
                                    </div>
                                </div>
                            ) : !isStoryMode && modeStats.gamesPlayed > 0 ? (
                                <div style={modeStatsStyle}>
                                    <div style={statItemStyle}>
                                        <div style={statValueStyle}>{modeStats.gamesPlayed}</div>
                                        <div style={statLabelStyle}>Igara</div>
                                    </div>
                                    <div style={statItemStyle}>
                                        <div style={statValueStyle}>{modeStats.bestScore}</div>
                                        <div style={statLabelStyle}>Najbolji</div>
                                    </div>
                                </div>
                            ) : null}

                            {/* New Mode Indicator */}
                            {((isStoryMode && storyCount === 0) || (!isStoryMode && modeStats.gamesPlayed === 0)) && (
                                <div style={{
                                    position: 'absolute',
                                    top: '1rem',
                                    right: '1rem',
                                    backgroundColor: '#22c55e',
                                    color: 'white',
                                    padding: '0.25rem 0.5rem',
                                    borderRadius: '0.375rem',
                                    fontSize: '0.75rem',
                                    fontWeight: 'bold'
                                }}>
                                    NOVO!
                                </div>
                            )}
                        </button>
                    );
                })}
            </div>

            {/* FIXED: Info Section with theme-aware colors */}
            <div style={infoSectionStyle}>
                <h3 style={infoTitleStyle}>
                    💡 Savjeti za različite načine
                </h3>

                <div style={infoGridStyle}>
                    <div style={infoItemStyle}>
                        <strong style={{ color: '#3b82f6' }}>🎯 Klasična:</strong> Najbolji način za napredovanje kroz sve nivoe
                    </div>
                    <div style={infoItemStyle}>
                        <strong style={{ color: '#10b981' }}>🏋️ Trening:</strong> Vježbaj bez pritiska vremena
                    </div>
                    <div style={infoItemStyle}>
                        <strong style={{ color: '#f59e0b' }}>⚡ Sprint:</strong> Test brzine s povećanim brojem pitanja
                    </div>
                    <div style={infoItemStyle}>
                        <strong style={{ color: '#7c3aed' }}>📚 Priče:</strong> Učenje kroz zabavne matematičke avanture
                    </div>
                    <div style={infoItemStyle}>
                        <strong style={{ color: '#ef4444' }}>✖️ Množenje:</strong> Savladaj tablice množenja do 12x12
                    </div>
                    <div style={infoItemStyle}>
                        <strong style={{ color: '#f97316' }}>➗ Dijeljenje:</strong> Tablice dijeljenja s korak-po-korak pristupom
                    </div>
                </div>
            </div>
        </div>
    );
}

export default GameModesScreen;
