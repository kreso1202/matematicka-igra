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
    setGameState,
    playerName,
    getAllPlayers 
}) {
    const [inputFocused, setInputFocused] = useState(false);
    const [currentTip, setCurrentTip] = useState(null); // NEW: Store current tip
    
    // Get player preferences for tips
    const allPlayers = getAllPlayers();
    const playerData = allPlayers[playerName];
    const showTips = playerData?.statistics?.preferences?.showTips !== false;

    useEffect(() => {
        const handleKeyPress = (e) => {
            if (e.key === 'Enter' && answer.trim() && !showFeedback) {
                checkAnswer();
            }
        };

        document.addEventListener('keydown', handleKeyPress);
        return () => document.removeEventListener('keydown', handleKeyPress);
    }, [answer, showFeedback, checkAnswer]);

    // NEW: Set tip when wrong feedback is shown, clear when moving to next question
    useEffect(() => {
        if (showFeedback === FEEDBACK_TYPES.WRONG && showTips && !currentTip) {
            // Generate tip only once when wrong feedback first appears
            const operation = GameLogic.getOperationFromQuestion(currentQuestion);
            const tip = GameLogic.getMathTip(operation, gameMode);
            setCurrentTip(tip);
        } else if (!showFeedback) {
            // Clear tip when moving to next question
            setCurrentTip(null);
        }
    }, [showFeedback, showTips, currentQuestion, gameMode, currentTip]);

    // Inline stilovi za suženi layout
    const containerStyle = {
        maxWidth: '600px',
        margin: '0 auto',
        padding: '1rem',
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
    };

    const headerStyle = {
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem',
        marginBottom: '1.5rem',
        padding: '1rem',
        backgroundColor: '#f8fafc',
        borderRadius: '1rem',
        border: '1px solid #e5e7eb'
    };

    const gameInfoStyle = {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
        gap: '0.75rem',
        fontSize: '0.875rem',
        color: '#6b7280'
    };

    const infoItemStyle = {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '0.25rem',
        minWidth: 'auto'
    };

    const infoLabelStyle = {
        fontSize: '0.75rem',
        fontWeight: '500',
        textTransform: 'uppercase',
        letterSpacing: '0.025em'
    };

    const infoValueStyle = {
        fontSize: '1rem',
        fontWeight: 'bold',
        color: '#1f2937'
    };

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
        maxWidth: '120px'
    };

    const questionContainerStyle = {
        backgroundColor: 'white',
        borderRadius: '1.5rem',
        padding: '2rem 1rem',
        textAlign: 'center',
        boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)',
        border: '1px solid #e5e7eb',
        marginBottom: '1.5rem',
        minHeight: '280px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        gap: '1.5rem'
    };

    const levelIndicatorStyle = {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '0.5rem',
        fontSize: '0.875rem',
        color: '#6b7280',
        marginBottom: '1rem'
    };

    const questionStyle = {
        fontSize: '2.5rem',
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
        fontSize: '1.5rem',
        fontWeight: 'bold',
        padding: '0.75rem 1rem',
        border: `3px solid ${inputFocused ? '#3b82f6' : '#d1d5db'}`,
        borderRadius: '1rem',
        textAlign: 'center',
        width: '150px',
        maxWidth: '90%',
        outline: 'none',
        transition: 'all 0.2s ease',
        backgroundColor: showFeedback ? (showFeedback === FEEDBACK_TYPES.CORRECT ? '#d1fae5' : '#fee2e2') : 'white'
    };

    const submitButtonStyle = {
        background: 'linear-gradient(135deg, #10b981, #047857)',
        color: 'white',
        border: 'none',
        padding: '0.75rem 1.5rem',
        fontSize: '1rem',
        fontWeight: '600',
        borderRadius: '0.75rem',
        cursor: 'pointer',
        transition: 'all 0.3s ease',
        opacity: (!answer.trim() || showFeedback) ? 0.5 : 1,
        transform: (!answer.trim() || showFeedback) ? 'none' : 'scale(1)',
        boxShadow: '0 4px 15px rgba(16, 185, 129, 0.4)'
    };

    const feedbackContainerStyle = {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '1rem'
    };

    const feedbackStyle = {
        fontSize: '1.25rem',
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

    // NEW: Math tip styling
    const mathTipStyle = {
        backgroundColor: '#ede9fe',
        color: '#6b21a8',
        padding: '1rem',
        borderRadius: '0.75rem',
        fontSize: '0.875rem',
        lineHeight: '1.4',
        textAlign: 'center',
        border: '2px solid #c4b5fd',
        maxWidth: '400px',
        margin: '0 auto'
    };

    const tipIconStyle = {
        fontSize: '1.25rem',
        marginRight: '0.5rem'
    };

    const progressStyle = {
        backgroundColor: 'white',
        borderRadius: '1rem',
        padding: '1rem',
        border: '1px solid #e5e7eb'
    };

    const progressHeaderStyle = {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '1rem',
        flexWrap: 'wrap',
        gap: '0.5rem'
    };

    const progressTitleStyle = {
        fontSize: '0.875rem',
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
        fontSize: '0.75rem',
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
            {/* Mobile-responsive header */}
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
                    <div style={feedbackContainerStyle}>
                        <div style={feedbackStyle}>
                            {getFeedbackText()}
                        </div>
                        
                        {/* NEW: Math tip display for wrong answers */}
                        {currentTip && (
                            <div style={mathTipStyle}>
                                <span style={tipIconStyle}>💡</span>
                                <strong>Savjet:</strong> {currentTip}
                            </div>
                        )}
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
