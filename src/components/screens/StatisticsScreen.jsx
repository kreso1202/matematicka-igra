import React from 'react';
import { GAME_STATES, LEVELS } from '../../services/gameConfig.js';
import { PlayerManager } from '../../services/gameLogic.js';
import { ThemeManager } from '../../services/themeManager.js';

function StatisticsScreen({ playerName, getAllPlayers, setGameState }) {
    const allPlayers = getAllPlayers();
    const playerData = allPlayers[playerName];
    const stats = PlayerManager.getPlayerStatistics(playerData);
    const dailyProgress = PlayerManager.getDailyProgress(playerData);

    // Inline stilovi
    const containerStyle = {
        maxWidth: '1200px',
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

    const statsGridStyle = {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
        gap: '1rem',
        marginBottom: '1.5rem'
    };

    const statCardStyle = (gradient) => ({
        background: gradient,
        padding: '1.5rem',
        borderRadius: '0.75rem',
        border: '1px solid rgba(255,255,255,0.2)',
        color: 'white'
    });

    const statHeaderStyle = {
        display: 'flex',
        alignItems: 'center',
        gap: '0.75rem',
        marginBottom: '0.5rem'
    };

    const statIconStyle = {
        width: '2.5rem',
        height: '2.5rem',
        backgroundColor: 'rgba(255,255,255,0.2)',
        borderRadius: '0.5rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '1.125rem'
    };

    const statTitleStyle = {
        fontWeight: '600',
        fontSize: '0.875rem'
    };

    const statValueStyle = {
        fontSize: '1.875rem',
        fontWeight: 'bold',
        margin: '0 0 0.25rem 0'
    };

    const statSubtitleStyle = {
        fontSize: '0.75rem',
        opacity: 0.8,
        margin: 0
    };

    const sectionStyle = {
        backgroundColor: 'white',
        padding: '1.5rem',
        borderRadius: '0.75rem',
        border: '1px solid #e5e7eb',
        marginBottom: '1.5rem',
        boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
    };

    const sectionTitleStyle = {
        fontSize: '1.25rem',
        fontWeight: 'bold',
        marginBottom: '1.5rem',
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem',
        color: '#1f2937'
    };

    const levelCardStyle = (isUnlocked) => ({
        padding: '1rem',
        borderRadius: '0.5rem',
        border: '1px solid #e5e7eb',
        backgroundColor: isUnlocked ? '#f9fafb' : '#f3f4f6',
        opacity: isUnlocked ? 1 : 0.6,
        transition: 'all 0.2s ease'
    });

    const levelHeaderStyle = {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: '0.75rem'
    };

    const levelInfoStyle = {
        display: 'flex',
        alignItems: 'center',
        gap: '1rem'
    };

    const levelEmojiStyle = {
        fontSize: '1.5rem'
    };

    const levelNameStyle = {
        fontWeight: '600',
        color: '#1f2937',
        margin: '0 0 0.25rem 0'
    };

    const levelSubtitleStyle = {
        fontSize: '0.875rem',
        color: '#6b7280',
        margin: 0
    };

    const levelStatsStyle = {
        display: 'flex',
        alignItems: 'center',
        gap: '1.5rem',
        fontSize: '0.875rem'
    };

    const progressBarStyle = {
        width: '100%',
        backgroundColor: '#e5e7eb',
        borderRadius: '0.25rem',
        height: '0.5rem',
        overflow: 'hidden'
    };

    const progressFillStyle = (accuracy) => ({
        height: '100%',
        background: 'linear-gradient(to right, #3b82f6, #1d4ed8)',
        borderRadius: 'inherit',
        width: `${Math.min(accuracy, 100)}%`,
        transition: 'width 0.3s ease'
    });

    const dailyGridStyle = {
        display: 'grid',
        gridTemplateColumns: 'repeat(7, 1fr)',
        gap: '0.75rem'
    };

    const dayColumnStyle = {
        textAlign: 'center'
    };

    const dayLabelStyle = {
        fontSize: '0.75rem',
        color: '#6b7280',
        fontWeight: '500',
        marginBottom: '0.5rem'
    };

    const dayBarStyle = (hasActivity, intensity) => ({
        height: '4rem',
        borderRadius: '0.5rem',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '0.875rem',
        fontWeight: 'bold',
        transition: 'all 0.2s ease',
        backgroundColor: hasActivity 
            ? `rgba(34, 197, 94, ${0.3 + (intensity * 0.7)})` 
            : '#f3f4f6',
        color: hasActivity ? 'white' : '#9ca3af',
        border: hasActivity ? 'none' : '2px dashed #d1d5db'
    });

    const dayDateStyle = {
        fontSize: '0.75rem',
        color: '#6b7280',
        marginTop: '0.25rem'
    };

    const summaryStyle = {
        marginTop: '1rem',
        fontSize: '0.875rem',
        color: '#6b7280',
        textAlign: 'center'
    };

    if (!playerData) {
        return (
            <div style={{ ...containerStyle, textAlign: 'center' }}>
                <h2 style={titleStyle}>📊 Statistike</h2>
                <p style={subtitleStyle}>Nema dostupnih statistika za ovog igrača.</p>
                <button 
                    onClick={() => setGameState(GAME_STATES.MENU)}
                    style={backButtonStyle}
                >
                    Povratak na meni
                </button>
            </div>
        );
    }

    const formatTime = (seconds) => {
        if (!seconds) return '0m';
        const hours = Math.floor(seconds / 3600);
        const mins = Math.floor((seconds % 3600) / 60);
        if (hours > 0) return `${hours}h ${mins}m`;
        return `${mins}m`;
    };

    const getWeekday = (dateStr) => {
        const date = new Date(dateStr.split('.').reverse().join('-'));
        const days = ['Ned', 'Pon', 'Uto', 'Sri', 'Čet', 'Pet', 'Sub'];
        return days[date.getDay()];
    };

    return (
        <div style={containerStyle}>
            {/* Header */}
            <div style={headerStyle}>
                <div>
                    <h2 style={titleStyle}>📊 Statistike</h2>
                    <p style={subtitleStyle}>Pregled napretka za {playerName}</p>
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

            {/* Osnovne statistike */}
            <div style={statsGridStyle}>
                <div style={statCardStyle('linear-gradient(135deg, #3b82f6, #1d4ed8)')}>
                    <div style={statHeaderStyle}>
                        <div style={statIconStyle}>🏆</div>
                        <span style={statTitleStyle}>Najbolji rezultat</span>
                    </div>
                    <div style={statValueStyle}>{playerData.bestScore.toLocaleString()}</div>
                    <div style={statSubtitleStyle}>Nivo {playerData.maxLevel}</div>
                </div>

                <div style={statCardStyle('linear-gradient(135deg, #10b981, #047857)')}>
                    <div style={statHeaderStyle}>
                        <div style={statIconStyle}>🎯</div>
                        <span style={statTitleStyle}>Točnost</span>
                    </div>
                    <div style={statValueStyle}>
                        {stats.averageAccuracy?.toFixed(1) || 0}%
                    </div>
                    <div style={statSubtitleStyle}>
                        {stats.totalCorrectAnswers} / {stats.totalQuestionsAnswered} točnih
                    </div>
                </div>

                <div style={statCardStyle('linear-gradient(135deg, #8b5cf6, #7c3aed)')}>
                    <div style={statHeaderStyle}>
                        <div style={statIconStyle}>⏱️</div>
                        <span style={statTitleStyle}>Ukupno vrijeme</span>
                    </div>
                    <div style={statValueStyle}>
                        {formatTime(stats.totalTimeSpent || 0)}
                    </div>
                    <div style={statSubtitleStyle}>{playerData.gamesPlayed} igara</div>
                </div>

                <div style={statCardStyle('linear-gradient(135deg, #f59e0b, #d97706)')}>
                    <div style={statHeaderStyle}>
                        <div style={statIconStyle}>🔥</div>
                        <span style={statTitleStyle}>Najbolji niz</span>
                    </div>
                    <div style={statValueStyle}>
                        {stats.bestStreak || 0}
                    </div>
                    <div style={statSubtitleStyle}>uzastopnih točnih</div>
                </div>
            </div>

            {/* Napredak po nivoima */}
            <div style={sectionStyle}>
                <h3 style={sectionTitleStyle}>
                    🎯 Napredak po nivoima
                </h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    {LEVELS.map((level) => {
                        const levelData = stats.levelStats?.[level.id] || { gamesPlayed: 0, questionsAnswered: 0, correctAnswers: 0, bestScore: 0 };
                        const accuracy = levelData.questionsAnswered > 0 ? 
                            (levelData.correctAnswers / levelData.questionsAnswered * 100) : 0;
                        const isUnlocked = playerData.maxLevel >= level.id;
                        
                        return (
                            <div key={level.id} style={levelCardStyle(isUnlocked)}>
                                <div style={levelHeaderStyle}>
                                    <div style={levelInfoStyle}>
                                        <div style={levelEmojiStyle}>{level.emoji}</div>
                                        <div>
                                            <div style={levelNameStyle}>
                                                Nivo {level.id}: {level.name}
                                            </div>
                                            <div style={levelSubtitleStyle}>
                                                {isUnlocked ? `${levelData.gamesPlayed} igara` : 'Zaključano'}
                                            </div>
                                        </div>
                                    </div>
                                    
                                    {isUnlocked && levelData.gamesPlayed > 0 && (
                                        <div style={levelStatsStyle}>
                                            <div style={{ textAlign: 'center' }}>
                                                <div style={{ fontWeight: '600', color: '#10b981' }}>
                                                    {accuracy.toFixed(1)}%
                                                </div>
                                                <div style={{ color: '#6b7280' }}>Točnost</div>
                                            </div>
                                            <div style={{ textAlign: 'center' }}>
                                                <div style={{ fontWeight: '600', color: '#3b82f6' }}>
                                                    {levelData.bestScore.toLocaleString()}
                                                </div>
                                                <div style={{ color: '#6b7280' }}>Najbolji</div>
                                            </div>
                                        </div>
                                    )}
                                </div>
                                
                                {isUnlocked && levelData.gamesPlayed > 0 && (
                                    <div style={{ marginTop: '0.75rem' }}>
                                        <div style={progressBarStyle}>
                                            <div style={progressFillStyle(accuracy)}></div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Tjedni pregled */}
            <div style={sectionStyle}>
                <h3 style={sectionTitleStyle}>
                    📅 Aktivnost zadnjih 7 dana
                </h3>
                <div style={dailyGridStyle}>
                    {dailyProgress.map((day, index) => {
                        const hasActivity = day.gamesPlayed > 0;
                        const intensity = Math.min(day.gamesPlayed / 3, 1);
                        
                        return (
                            <div key={index} style={dayColumnStyle}>
                                <div style={dayLabelStyle}>
                                    {getWeekday(day.date)}
                                </div>
                                <div 
                                    style={dayBarStyle(hasActivity, intensity)}
                                    title={hasActivity ? 
                                        `${day.gamesPlayed} igara, ${formatTime(day.timeSpent)}` : 
                                        'Nema aktivnosti'
                                    }
                                >
                                    {hasActivity ? (
                                        <>
                                            <div style={{ fontSize: '1.125rem' }}>{day.gamesPlayed}</div>
                                            <div style={{ fontSize: '0.75rem', opacity: 0.9 }}>igara</div>
                                        </>
                                    ) : (
                                        <div style={{ fontSize: '1.25rem', opacity: 0.5 }}>·</div>
                                    )}
                                </div>
                                <div style={dayDateStyle}>
                                    {day.date.split('.')[0]}.
                                </div>
                            </div>
                        );
                    })}
                </div>
                
                <div style={summaryStyle}>
                    Ukupno ovu sedmicu: {dailyProgress.reduce((sum, day) => sum + day.gamesPlayed, 0)} igara, {formatTime(dailyProgress.reduce((sum, day) => sum + day.timeSpent, 0))}
                </div>
            </div>
        </div>
    );
}

export default StatisticsScreen;
