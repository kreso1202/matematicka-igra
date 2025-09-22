import React from 'react';
import { GAME_STATES, STORY_ADVENTURES, STORY_PROGRESS } from '../../services/gameConfig.js';
import { StoryManager } from '../../services/gameConfig.js';
import { ThemeManager } from '../../services/themeManager.js';

function StoryMenuScreen({ playerName, getAllPlayers, setGameState, startStoryMode }) {
    const allPlayers = getAllPlayers();
    const playerData = allPlayers[playerName];
    const soundEnabled = playerData?.statistics?.preferences?.soundEnabled !== false;
    const playerLevel = playerData?.maxLevel || 1;

    const handleStorySelect = (storyId) => {
        if (soundEnabled) {
            ThemeManager.playSound('click', true);
        }
        startStoryMode(storyId);
    };

    // Inline styles
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

    const storiesGridStyle = {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
        gap: '1.5rem',
        marginBottom: '2rem'
    };

    const getStoryCardStyle = (isLocked, isCompleted) => ({
        background: isCompleted 
            ? 'linear-gradient(135deg, #10b981, #047857)' 
            : isLocked 
            ? 'linear-gradient(135deg, #9ca3af, #6b7280)'
            : 'linear-gradient(135deg, #3b82f6, #1d4ed8)',
        color: 'white',
        border: 'none',
        borderRadius: '1rem',
        padding: '2rem',
        cursor: isLocked ? 'not-allowed' : 'pointer',
        transition: 'all 0.3s ease',
        textAlign: 'left',
        fontFamily: 'inherit',
        boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
        opacity: isLocked ? 0.6 : 1,
        position: 'relative',
        overflow: 'hidden'
    });

    const storyHeaderStyle = {
        display: 'flex',
        alignItems: 'center',
        gap: '1rem',
        marginBottom: '1rem'
    };

    const storyIconStyle = {
        fontSize: '3rem',
        width: '4rem',
        height: '4rem',
        backgroundColor: 'rgba(255,255,255,0.2)',
        borderRadius: '1rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    };

    const storyTitleStyle = {
        fontSize: '1.5rem',
        fontWeight: 'bold',
        margin: '0 0 0.25rem 0'
    };

    const storyDifficultyStyle = {
        fontSize: '0.875rem',
        opacity: 0.9,
        margin: 0
    };

    const storyDescriptionStyle = {
        fontSize: '1rem',
        lineHeight: '1.5',
        opacity: 0.95,
        marginBottom: '1.5rem'
    };

    const storyProgressStyle = {
        backgroundColor: 'rgba(255,255,255,0.2)',
        borderRadius: '0.5rem',
        padding: '0.75rem',
        fontSize: '0.875rem',
        textAlign: 'center'
    };

    const lockIconStyle = {
        position: 'absolute',
        top: '1rem',
        right: '1rem',
        fontSize: '1.5rem',
        backgroundColor: 'rgba(0,0,0,0.3)',
        padding: '0.5rem',
        borderRadius: '0.5rem'
    };

    const completedBadgeStyle = {
        position: 'absolute',
        top: '1rem',
        right: '1rem',
        backgroundColor: '#22c55e',
        color: 'white',
        padding: '0.25rem 0.5rem',
        borderRadius: '0.375rem',
        fontSize: '0.75rem',
        fontWeight: 'bold'
    };

    const requirementStyle = {
        fontSize: '0.75rem',
        opacity: 0.8,
        marginTop: '0.5rem'
    };

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

    const availableStories = StoryManager.getAvailableStories(playerLevel);
    const allStories = Object.values(STORY_ADVENTURES);

    const getDifficultyRequirement = (difficulty) => {
        switch (difficulty) {
            case 'easy': return 'Potreban nivo 1';
            case 'medium': return 'Potreban nivo 3';
            case 'hard': return 'Potreban nivo 5';
            default: return '';
        }
    };

    const getProgressText = (story) => {
        const progress = StoryManager.getStoryProgress(playerData, story.id);
        switch (progress) {
            case STORY_PROGRESS.COMPLETED:
                return '✅ Završeno!';
            case STORY_PROGRESS.IN_PROGRESS:
                return '📖 U tijeku...';
            case STORY_PROGRESS.AVAILABLE:
                return '🎮 Spreman za igru';
            default:
                return '🔒 Zaključano';
        }
    };

    return (
        <div style={containerStyle}>
            {/* Header */}
            <div style={headerStyle}>
                <button 
                    onClick={() => setGameState(GAME_STATES.GAME_MODES)}
                    style={backButtonStyle}
                    onMouseOver={(e) => e.target.style.backgroundColor = '#4b5563'}
                    onMouseOut={(e) => e.target.style.backgroundColor = '#6b7280'}
                >
                    ← Povratak
                </button>
                
                <h2 style={titleStyle}>📚 Matematičke priče</h2>
                <p style={subtitleStyle}>
                    Rješavaj matematiku kroz uzbudljive avanture
                </p>
            </div>

            {/* Stories Grid */}
            <div style={storiesGridStyle}>
                {allStories.map((story) => {
                    const isAvailable = availableStories.includes(story);
                    const isLocked = !isAvailable;
                    const progress = StoryManager.getStoryProgress(playerData, story.id);
                    const isCompleted = progress === STORY_PROGRESS.COMPLETED;
                    const [isHovered, setIsHovered] = React.useState(false);
                    
                    return (
                        <button
                            key={story.id}
                            onClick={() => !isLocked && handleStorySelect(story.id)}
                            disabled={isLocked}
                            style={{
                                ...getStoryCardStyle(isLocked, isCompleted),
                                transform: (!isLocked && isHovered) ? 'translateY(-4px) scale(1.02)' : 'translateY(0) scale(1)',
                                boxShadow: (!isLocked && isHovered) 
                                    ? '0 12px 30px rgba(0,0,0,0.2)' 
                                    : '0 4px 15px rgba(0,0,0,0.1)'
                            }}
                            onMouseEnter={() => !isLocked && setIsHovered(true)}
                            onMouseLeave={() => setIsHovered(false)}
                        >
                            {/* Lock indicator */}
                            {isLocked && (
                                <div style={lockIconStyle}>
                                    🔒
                                </div>
                            )}

                            {/* Completed badge */}
                            {isCompleted && (
                                <div style={completedBadgeStyle}>
                                    ZAVRŠENO!
                                </div>
                            )}

                            {/* Header */}
                            <div style={storyHeaderStyle}>
                                <div style={storyIconStyle}>
                                    {story.emoji}
                                </div>
                                <div>
                                    <h3 style={storyTitleStyle}>
                                        {story.title}
                                    </h3>
                                    <p style={storyDifficultyStyle}>
                                        {story.difficulty === 'easy' ? 'Lako' : 
                                         story.difficulty === 'medium' ? 'Srednje' : 'Teško'}
                                    </p>
                                </div>
                            </div>

                            {/* Description */}
                            <p style={storyDescriptionStyle}>
                                {story.description}
                            </p>

                            {/* Progress or Requirements */}
                            <div style={storyProgressStyle}>
                                {isAvailable ? getProgressText(story) : getDifficultyRequirement(story.difficulty)}
                            </div>

                            {/* Operations info */}
                            <div style={requirementStyle}>
                                Operacije: {story.targetOperations.join(', ')}
                            </div>
                        </button>
                    );
                })}
            </div>

            {/* Info Section */}
            <div style={infoSectionStyle}>
                <h3 style={infoTitleStyle}>
                    💡 O matematičkim pričama
                </h3>

                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                    gap: '1rem',
                    fontSize: '0.875rem',
                    color: 'var(--text-secondary, #6b7280)'
                }}>
                    <div>
                        <strong style={{ color: '#3b82f6' }}>📚 Učenje kroz priče:</strong> Matematika postaje zabavna kada ima smisla u stvarnom svijetu
                    </div>
                    <div>
                        <strong style={{ color: '#10b981' }}>🌟 Napredovanje:</strong> Otključavaj nove priče kako napreduješ kroz nivoe
                    </div>
                    <div>
                        <strong style={{ color: '#f59e0b' }}>🎯 Kontekst:</strong> Svaki zadatak ima jasnu svrhu i značenje
                    </div>
                    <div>
                        <strong style={{ color: '#ef4444' }}>🏆 Postignuća:</strong> Završi sve priče za posebne nagrade
                    </div>
                </div>
            </div>
        </div>
    );
}

export default StoryMenuScreen;
