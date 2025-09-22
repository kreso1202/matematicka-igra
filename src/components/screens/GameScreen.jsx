import React, { useState, useEffect } from 'react';
import { GAME_STATES, FEEDBACK_TYPES, GAME_MODES } from '../../services/gameConfig.js';
import { GameLogic } from '../../services/gameLogic.js';

function GameScreen({ 
    currentQuestion, 
    answer, 
    setAnswer, 
    correctAnswer, 
    showFeedback, 
    timeLeft, 
    lives, 
    currentLevel, 
    questionsInLevel, 
    score, 
    streak, 
    gameMode,
    getLevelProgress, 
    checkAnswer,
    setGameState 
}) {
    const [inputFocused, setInputFocused] = useState(false);

    useEffect(() => {
        const handleKeyPress = (e) => {
            if (e.key === 'Enter' && answer.trim() && !showFeedback) {
                checkAnswer();
            }
        };

        document.addEventListener('keydown', handleKeyPress);
        return () => document.removeEventListener('keydown', handleKeyPress);
    }, [answer, showFeedback, checkAnswer]);

    // Inline stilovi za suženi layout
    const containerStyle = {
        maxWidth: '600px',  // Ograničena širina za fokus
        margin: '0 auto',
        padding: '1rem', // Smanjeni padding za mobile
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
    };

    // FIXED: Mobile-responsive header
    const headerStyle = {
        display: 'flex',
        flexDirection: 'column', // Stack vertically on mobile
        gap: '1rem',
        marginBottom: '1.5rem',
        padding: '1rem',
        backgroundColor: '#f8fafc',
        borderRadius: '1rem',
        border: '1px solid #e5e7eb'
    };

    // FIXED: Mobile-responsive game info
    const gameInfoStyle = {
        display: 'flex',
        flexWrap: 'wrap', // Allow wrapping on small screens
        justifyContent: 'center',
        gap: '0.75rem', // Smaller gap for mobile
        fontSize: '0.875rem',
        color: '#6b7280'
    };

    const infoItemStyle = {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '0.25rem',
        minWidth: 'auto' // Allow flexible sizing
    };

    const infoLabelStyle = {
        fontSize: '0.75rem',
        fontWeight: '500',
        textTransform: 'uppercase',
        letterSpacing: '0.025em'
    };

    const infoValueStyle = {
        fontSize: '1rem', // Slightly smaller for mobile
        fontWeight: 'bold',
        color: '#1f2937'
    };

    // FIXED: Better positioned exit button
    const exitButtonContainerStyle = {
        display: 'flex',
        justifyContent: 'center',
        width: '100%'
    };

    const backButtonStyle = {
        backgroundColor: '#ef4444',
        color: 'white',
        border: 'none',
        padding: '0.5rem 1rem',
        borderRadius: '0.5rem',
        fontSize: '0.875rem',
        cursor: 'pointer',
        transition: 'all 0.2s ease',
        maxWidth: '120px' // Ensure it fits on mobile
    };

    // Glavni dio s pitanjem
    const questionContainerStyle = {
        backgroundColor: 'white',
        borderRadius: '1.5rem',
        padding: '2rem 1rem', // Reduced horizontal padding for mobile
        textAlign: 'center',
        boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)',
        border: '1px solid #e5e7eb',
        marginBottom: '1.5rem',
        minHeight: '280px', // Reduced for mobile
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        gap: '1.5rem' // Smaller gap for mobile
    };

    const levelIndicatorStyle = {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '0.5rem',
        fontSize: '0.875rem', // Smaller for mobile
        color: '#6b7280',
        marginBottom: '1rem'
    };

    const questionStyle = {
        fontSize: '2.5rem', // Smaller for mobile
        fontWeight: 'bold',
        color: '#1f2937',
        margin: '0',
        lineHeight: '1.2'
    };

    const inputContainerStyle = {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '1rem'
    };

    const answerInputStyle = {
        fontSize: '1.5rem', // Smaller for mobile
        fontWeight: 'bold',
        padding: '0.75rem 1rem', // Smaller padding
        border: `3px solid ${inputFocused ? '#3b82f6' : '#d1d5db'}`,
        borderRadius: '1rem',
        textAlign: 'center',
        width: '150px', // Smaller width for mobile
        maxWidth: '90%', // Responsive max width
        outline: 'none',
        transition: 'all 0.2s ease',
        backgroundColor: showFeedback ? (showFeedback === FEEDBACK_TYPES.CORRECT ? '#d1fae5' : '#fee2e2') : 'white'
    };

    const submitButtonStyle = {
        background: 'linear-gradient(135deg, #10b981, #047857)',
        color: 'white',
        border: 'none',
        padding: '0.75rem 1.5rem', // Smaller for mobile
        fontSize: '1rem',
        fontWeight: '600',
        borderRadius: '0.75rem',
        cursor: 'pointer',
        transition: 'all 0.3s ease',
        opacity: (!answer.trim() || showFeedback) ? 0.5 : 1,
        transform: (!answer.trim() || showFeedback) ? 'none' : 'scale(1)',
        boxShadow: '0 4px 15px rgba(16, 185, 129, 0.4)'
    };

    const feedbackStyle = {
        fontSize: '1.25rem', // Smaller for mobile
        fontWeight: 'bold',
        padding: '1rem',
        borderRadius: '0.75rem',
        color: 'white',
        background: showFeedback === FEEDBACK_TYPES.CORRECT 
            ? 'linear-gradient(135deg, #10b981, #047857)' 
            : showFeedback === FEEDBACK_TYPES.WRONG
            ? 'linear-gradient(135deg, #ef4444, #dc2626)'
            : 'linear-gradient(135deg, #f59e0b, #d97706)'
    };

    // Progress sekcija
    const progressStyle = {
        backgroundColor: 'white',
        borderRadius: '1rem',
        padding: '1rem', // Smaller padding for mobile
        border: '1px solid #e5e7eb'
    };

    const progressHeaderStyle = {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '1rem',
        flexWrap: 'wrap', // Allow wrapping on mobile
        gap: '0.5rem'
    };

    const progressTitleStyle = {
        fontSize: '0.875rem', // Smaller for mobile
        fontWeight: '600',
        color: '#1f2937'
    };

    const progressBarContainerStyle = {
        width: '100%',
        height: '0.75rem',
        backgroundColor: '#e5e7eb',
        borderRadius: '0.5rem',
        overflow: 'hidden'
    };

    const progressBarFillStyle = {
        height: '100%',
        background: 'linear-gradient(90deg, #3b82f6, #1d4ed8)',
        borderRadius: 'inherit',
        width: `${getLevelProgress()}%`,
        transition: 'width 0.3s ease'
    };

    const hintStyle = {
        fontSize: '0.75rem', // Smaller for mobile
        color: '#6b7280'
    };

    const levelData = GameLogic.getCurrentLevelData(currentLevel);
    const gameModeName = GameLogic.getGameModeDisplayName(gameMode);

    const getFeedbackText = () => {
        switch (showFeedback) {
            case FEEDBACK_TYPES.CORRECT:
                return '🎉 Odlično!';
            case FEEDBACK_TYPES.WRONG:
                return `❌ Netočno! Odgovor je ${correctAnswer}`;
            case FEEDBACK_TYPES.TIMEOUT:
                return `⏰ Vrijeme je isteklo! Odgovor je ${correctAnswer}`;
            default:
                return '';
        }
    };

    const getTimerColor = () => {
        if (gameMode === GAME_MODES.TRAINING) return '#6b7280';
        if (timeLeft <= 5) return '#ef4444';
        if (timeLeft <= 10) return '#f59e0b';
        return '#10b981';
    };

    return (
        <div style={containerStyle}>
            {/* FIXED: Mobile-responsive header */}
            <div style={headerStyle}>
                <div style={gameInfoStyle}>
                    <div style={infoItemStyle}>
                        <span style={infoLabelStyle}>Nivo</span>
                        <span style={infoValueStyle}>{currentLevel}</span>
                    </div>
                    <div style={infoItemStyle}>
                        <span style={infoLabelStyle}>Rezultat</span>
                        <span style={infoValueStyle}>{score.toLocaleString()}</span>
                    </div>
                    <div style={infoItemStyle}>
                        <span style={infoLabelStyle}>Niz</span>
                        <span style={infoValueStyle}>{streak}</span>
                    </div>
                    {gameMode !== GAME_MODES.TRAINING && (
                        <div style={infoItemStyle}>
                            <span style={infoLabelStyle}>Vrijeme</span>
                            <span style={{...infoValueStyle, color: getTimerColor()}}>{timeLeft}s</span>
                        </div>
                    )}
                    {gameMode !== GAME_MODES.TRAINING && (
                        <div style={infoItemStyle}>
                            <span style={infoLabelStyle}>Životi</span>
                            <span style={infoValueStyle}>
                                {'❤️'.repeat(lives) + '🤍'.repeat(Math.max(0, 3 - lives))}
                            </span>
                        </div>
                    )}
                </div>
                
                {/* FIXED: Centered exit button */}
                <div style={exitButtonContainerStyle}>
                    <button
                        onClick={() => setGameState(GAME_STATES.MENU)}
                        style={backButtonStyle}
                        onMouseOver={(e) => e.target.style.backgroundColor = '#dc2626'}
                        onMouseOut={(e) => e.target.style.backgroundColor = '#ef4444'}
                    >
                        ✕ Izađi
                    </button>
                </div>
            </div>

            {/* Glavno pitanje */}
            <div style={questionContainerStyle}>
                <div style={levelIndicatorStyle}>
                    <span>{levelData.emoji}</span>
                    <span>{levelData.name} • {gameModeName}</span>
                </div>

                <div style={questionStyle}>
                    {currentQuestion} = ?
                </div>

                {!showFeedback ? (
                    <div style={inputContainerStyle}>
                        <input
                            type="number"
                            value={answer}
                            onChange={(e) => setAnswer(e.target.value)}
                            onFocus={() => setInputFocused(true)}
                            onBlur={() => setInputFocused(false)}
                            style={answerInputStyle}
                            placeholder="?"
                            autoFocus
                        />
                        
                        <button
                            onClick={checkAnswer}
                            disabled={!answer.trim() || showFeedback}
                            style={submitButtonStyle}
                            onMouseOver={(e) => {
                                if (!e.target.disabled) {
                                    e.target.style.transform = 'translateY(-2px) scale(1.05)';
                                    e.target.style.boxShadow = '0 8px 25px rgba(16, 185, 129, 0.6)';
                                }
                            }}
                            onMouseOut={(e) => {
                                if (!e.target.disabled) {
                                    e.target.style.transform = 'translateY(0) scale(1)';
                                    e.target.style.boxShadow = '0 4px 15px rgba(16, 185, 129, 0.4)';
                                }
                            }}
                        >
                            ✓ Potvrdi
                        </button>

                        <div style={hintStyle}>
                            Pritisni Enter za brži odgovor
                        </div>
                    </div>
                ) : (
                    <div style={feedbackStyle}>
                        {getFeedbackText()}
                    </div>
                )}
            </div>

            {/* Progress bar */}
            <div style={progressStyle}>
                <div style={progressHeaderStyle}>
                    <span style={progressTitleStyle}>
                        Napredak nivoa {currentLevel}
                    </span>
                    <span style={{ fontSize: '0.75rem', color: '#6b7280' }}>
                        {questionsInLevel} / {levelData.questionsNeeded}
                    </span>
                </div>
                <div style={progressBarContainerStyle}>
                    <div style={progressBarFillStyle}></div>
                </div>
            </div>

            {/* Mobile-specific styles */}
            <style>
                {`
                    @media (max-width: 480px) {
                        .game-container {
                            padding: 0.25rem !important;
                        }
                    }
                `}
            </style>
        </div>
    );
}

export default GameScreen;
