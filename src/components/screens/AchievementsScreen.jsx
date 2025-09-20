import React, { useState, useEffect } from 'react';
import { GAME_STATES, ACHIEVEMENTS } from '../../services/gameConfig.js';
import { PlayerManager } from '../../services/gameLogic.js';
import { AchievementManager } from '../../services/achievementManager.js';

function AchievementsScreen({ playerName, getAllPlayers, setGameState, newAchievements = [], setNewAchievements }) {
    const [showNotification, setShowNotification] = useState(false);
    const allPlayers = getAllPlayers();
    const playerData = allPlayers[playerName];
    const achievements = playerData?.statistics?.achievements || { unlocked: [], progress: {} };
    const achievementList = Object.values(ACHIEVEMENTS);

    // Prikaži notifikacije za nova postignuća
    useEffect(() => {
        if (newAchievements.length > 0) {
            setShowNotification(true);
            const timer = setTimeout(() => {
                setShowNotification(false);
                if (setNewAchievements) {
                    setNewAchievements([]);
                }
            }, 5000);
            return () => clearTimeout(timer);
        }
    }, [newAchievements, setNewAchievements]);

    // Inline stilovi
    const containerStyle = {
        maxWidth: '1024px',
        margin: '0 auto',
        padding: '1.5rem',
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
    };

    const headerStyle = {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: '1.5rem',
        flexWrap: 'wrap',
        gap: '1rem'
    };

    const titleStyle = {
        fontSize: '1.875rem',
        fontWeight: 'bold',
        color: '#1f2937',
        margin: 0
    };

    const subtitleStyle = {
        color: '#6b7280',
        margin: '0.25rem 0 0 0'
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
        transition: 'background-color 0.2s ease'
    };

    const progressSummaryStyle = {
        background: 'linear-gradient(135deg, #dbeafe, #bfdbfe)',
        padding: '1.5rem',
        borderRadius: '0.75rem',
        border: '1px solid #3b82f6',
        marginBottom: '1rem'
    };

    const progressHeaderStyle = {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: '1rem'
    };

    const progressCountStyle = {
        fontSize: '1.875rem',
        fontWeight: 'bold',
        color: '#1d4ed8',
        margin: 0
    };

    const progressLabelStyle = {
        fontSize: '0.875rem',
        color: '#1e40af',
        fontWeight: '500'
    };

    const progressPercentStyle = {
        fontSize: '1.5rem',
        fontWeight: 'bold',
        color: '#4338ca',
        margin: 0
    };

    const progressBarContainerStyle = {
        width: '100%',
        backgroundColor: '#bfdbfe',
        borderRadius: '0.5rem',
        height: '0.75rem',
        overflow: 'hidden'
    };

    const progressBarFillStyle = (percentage) => ({
        background: 'linear-gradient(to right, #3b82f6, #4338ca)',
        height: '100%',
        borderRadius: 'inherit',
        width: `${percentage}%`,
        transition: 'width 0.5s ease'
    });

    const achievementsGridStyle = {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        gap: '1rem'
    };

    const achievementCardStyle = (isUnlocked, isNew) => ({
        padding: '1.5rem',
        borderRadius: '0.75rem',
        border: isNew ? '4px solid #f59e0b' : '1px solid #e5e7eb',
        background: isUnlocked 
            ? 'linear-gradient(135deg, #d1fae5, #a7f3d0)' 
            : 'linear-gradient(135deg, #f9fafb, #f3f4f6)',
        opacity: isUnlocked ? 1 : 0.75,
        transition: 'all 0.3s ease',
        transform: isNew ? 'scale(1.02)' : 'scale(1)',
        boxShadow: isUnlocked 
            ? '0 4px 15px rgba(34, 197, 94, 0.2)' 
            : '0 2px 8px rgba(0, 0, 0, 0.1)',
        cursor: 'default'
    });

    const achievementContentStyle = {
        display: 'flex',
        alignItems: 'flex-start',
        gap: '1rem'
    };

    const achievementEmojiStyle = (isUnlocked) => ({
        fontSize: '2.5rem',
        transition: 'all 0.3s ease',
        transform: isUnlocked ? 'scale(1.1)' : 'scale(1)',
        filter: isUnlocked ? 'none' : 'grayscale(100%) opacity(50%)'
    });

    const achievementInfoStyle = {
        flex: 1
    };

    const achievementNameStyle = (isUnlocked) => ({
        fontSize: '1.125rem',
        fontWeight: 'bold',
        color: isUnlocked ? '#065f46' : '#6b7280',
        margin: '0 0 0.25rem 0'
    });

    const achievementDescStyle = (isUnlocked) => ({
        fontSize: '0.875rem',
        color: isUnlocked ? '#047857' : '#9ca3af',
        marginBottom: '0.75rem'
    });

    const newBadgeStyle = {
        display: 'inline-block',
        padding: '0.25rem 0.5rem',
        backgroundColor: '#f59e0b',
        color: '#92400e',
        fontSize: '0.75rem',
        fontWeight: 'bold',
        borderRadius: '0.375rem',
        marginLeft: '0.5rem',
        animation: 'pulse 2s infinite'
    };

    const progressContainerStyle = {
        marginTop: '0.5rem'
    };

    const progressInfoStyle = {
        display: 'flex',
        justifyContent: 'space-between',
        fontSize: '0.75rem',
        color: '#6b7280',
        marginBottom: '0.25rem'
    };

    const miniProgressBarStyle = {
        width: '100%',
        backgroundColor: '#e5e7eb',
        borderRadius: '0.25rem',
        height: '0.5rem',
        overflow: 'hidden'
    };

    const miniProgressFillStyle = (percentage) => ({
        background: 'linear-gradient(to right, #3b82f6, #1d4ed8)',
        height: '100%',
        borderRadius: 'inherit',
        width: `${percentage}%`,
        transition: 'width 0.3s ease'
    });

    const unlockedBadgeStyle = {
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem',
        color: '#047857'
    };

    const checkmarkStyle = {
        width: '1.25rem',
        height: '1.25rem',
        backgroundColor: '#10b981',
        borderRadius: '50%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'white',
        fontSize: '0.75rem'
    };

    const tipsContainerStyle = {
        backgroundColor: 'white',
        padding: '1.5rem',
        borderRadius: '0.75rem',
        border: '1px solid #e5e7eb',
        boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
    };

    const tipsTitleStyle = {
        fontSize: '1.125rem',
        fontWeight: 'bold',
        marginBottom: '1rem',
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem',
        color: '#1f2937'
    };

    const tipsGridStyle = {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: '1rem'
    };

    const tipStyle = {
        fontSize: '0.875rem',
        color: '#6b7280',
        lineHeight: '1.4'
    };

    const notificationStyle = {
        position: 'fixed',
        top: '1rem',
        right: '1rem',
        zIndex: 1000,
        background: 'linear-gradient(135deg, #f59e0b, #d97706)',
        color: 'white',
        padding: '1rem 1.5rem',
        borderRadius: '0.75rem',
        boxShadow: '0 10px 25px rgba(0, 0, 0, 0.2)',
        animation: 'slideIn 0.5s ease'
    };

    const notificationContentStyle = {
        display: 'flex',
        alignItems: 'center',
        gap: '0.75rem'
    };

    if (!playerData) {
        return (
            <div style={{ ...containerStyle, textAlign: 'center' }}>
                <h2 style={titleStyle}>🏆 Postignuća</h2>
                <p style={subtitleStyle}>Nema dostupnih postignuća za ovog igrača.</p>
                <button 
                    onClick={() => setGameState(GAME_STATES.MENU)}
                    style={backButtonStyle}
                >
                    Povratak na meni
                </button>
            </div>
        );
    }

    const unlockedCount = achievements.unlocked.length;
    const totalCount = achievementList.length;
    const completionPercentage = Math.round((unlockedCount / totalCount) * 100);

    return (
        <div style={containerStyle}>
            {/* Notifikacija za nova postignuća */}
            {showNotification && newAchievements.length > 0 && (
                <div style={notificationStyle}>
                    <div style={notificationContentStyle}>
                        <div style={{ fontSize: '1.5rem' }}>🎉</div>
                        <div>
                            <div style={{ fontWeight: 'bold' }}>Novo postignuće!</div>
                            <div style={{ fontSize: '0.875rem' }}>
                                {newAchievements.map(id => AchievementManager.getAchievementData(id)?.name).join(', ')}
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Header */}
            <div style={headerStyle}>
                <div>
                    <h2 style={titleStyle}>🏆 Postignuća</h2>
                    <p style={subtitleStyle}>Tvoja postignuća, {playerName}</p>
                </div>
                <button 
                    onClick={() => setGameState(GAME_STATES.MENU)}
                    style={backButtonStyle}
                    onMouseOver={(e) => e.target.style.backgroundColor = '#4b5563'}
                    onMouseOut={(e) => e.target.style.backgroundColor = '#6b7280'}
                >
                    ← Povratak
                </button>
            </div>

            {/* Progress summary */}
            <div style={progressSummaryStyle}>
                <div style={progressHeaderStyle}>
                    <div>
                        <div style={progressCountStyle}>
                            {unlockedCount} / {totalCount}
                        </div>
                        <div style={progressLabelStyle}>Otkrivenih postignuća</div>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                        <div style={progressPercentStyle}>{completionPercentage}%</div>
                        <div style={{ fontSize: '0.875rem', color: '#4338ca' }}>Završeno</div>
                    </div>
                </div>
                
                <div style={progressBarContainerStyle}>
                    <div style={progressBarFillStyle(completionPercentage)}></div>
                </div>
            </div>

            {/* Lista postignuća */}
            <div style={achievementsGridStyle}>
                {achievementList.map(achievement => {
                    const isUnlocked = achievements.unlocked.includes(achievement.id);
                    const progress = achievements.progress[achievement.id];
                    const isNew = newAchievements.includes(achievement.id);

                    return (
                        <div 
                            key={achievement.id} 
                            style={achievementCardStyle(isUnlocked, isNew)}
                        >
                            <div style={achievementContentStyle}>
                                <div style={achievementEmojiStyle(isUnlocked)}>
                                    {isUnlocked ? achievement.emoji : '🔒'}
                                </div>
                                
                                <div style={achievementInfoStyle}>
                                    <div style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap' }}>
                                        <h3 style={achievementNameStyle(isUnlocked)}>
                                            {achievement.name}
                                        </h3>
                                        {isNew && (
                                            <span style={newBadgeStyle}>
                                                NOVO!
                                            </span>
                                        )}
                                    </div>
                                    
                                    <p style={achievementDescStyle(isUnlocked)}>
                                        {achievement.description}
                                    </p>
                                    
                                    {!isUnlocked && progress && (
                                        <div style={progressContainerStyle}>
                                            <div style={progressInfoStyle}>
                                                <span>Napredak</span>
                                                <span>{progress.current} / {progress.target}</span>
                                            </div>
                                            <div style={miniProgressBarStyle}>
                                                <div style={miniProgressFillStyle(
                                                    Math.min((progress.current / progress.target) * 100, 100)
                                                )}></div>
                                            </div>
                                        </div>
                                    )}
                                    
                                    {isUnlocked && (
                                        <div style={unlockedBadgeStyle}>
                                            <div style={checkmarkStyle}>
                                                ✓
                                            </div>
                                            <span style={{ fontSize: '0.875rem', fontWeight: '600' }}>OTKRIVENO!</span>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Dodatne informacije */}
            <div style={tipsContainerStyle}>
                <h3 style={tipsTitleStyle}>
                    💡 Savjeti za postignuća
                </h3>
                <div style={tipsGridStyle}>
                    <div style={tipStyle}>
                        <strong>🎯 Savršenstvo:</strong> Završi jedan nivo bez greške ili timeout-a
                    </div>
                    <div style={tipStyle}>
                        <strong>🔥 Niz desetke:</strong> Odgovori točno na 10 pitanja u nizu
                    </div>
                    <div style={tipStyle}>
                        <strong>⚡ Brzinski demon:</strong> Budi brž od 3 sekunde po pitanju
                    </div>
                    <div style={tipStyle}>
                        <strong>📅 Tjedni rekord:</strong> Igraj svaki dan kroz tjedan dana
                    </div>
                </div>
            </div>

            <style>
                {`
                    @keyframes slideIn {
                        from {
                            transform: translateX(100%);
                            opacity: 0;
                        }
                        to {
                            transform: translateX(0);
                            opacity: 1;
                        }
                    }
                    
                    @keyframes pulse {
                        0%, 100% { opacity: 1; }
                        50% { opacity: 0.5; }
                    }
                `}
            </style>
        </div>
    );
}

export default AchievementsScreen;
