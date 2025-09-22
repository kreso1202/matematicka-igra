import React, { useState, useEffect } from 'react';
import { GAME_STATES, FEEDBACK_TYPES, STORY_ADVENTURES, STORY_PROGRESS } from '../../services/gameConfig.js';
import { StoryManager } from '../../services/gameConfig.js';
import { ThemeManager } from '../../services/themeManager.js';

function StoryGameScreen({ 
    playerName,
    getAllPlayers,
    setGameState,
    currentStory,
    storyProgress,
    updateStoryProgress,
    currentStoryQuestion,
    onStoryAnswered
}) {
    const [answer, setAnswer] = useState('');
    const [showFeedback, setShowFeedback] = useState('');
    const [currentTip, setCurrentTip] = useState(null);
    const [inputFocused, setInputFocused] = useState(false);

    const allPlayers = getAllPlayers();
    const playerData = allPlayers[playerName];
    const soundEnabled = playerData?.statistics?.preferences?.soundEnabled !== false;
    const showTips = playerData?.statistics?.preferences?.showTips !== false;

    const story = STORY_ADVENTURES[currentStory];
    const currentLevel = story.levels[storyProgress.levelIndex || 0];
    const questionIndex = storyProgress.questionIndex || 0;
    const storyQuestion = currentLevel.questions[questionIndex];

    useEffect(() => {
        const handleKeyPress = (e) => {
            if (e.key === 'Enter' && answer.trim() && !showFeedback) {
                checkAnswer();
            }
        };

        document.addEventListener('keydown', handleKeyPress);
        return () => document.removeEventListener('keydown', handleKeyPress);
    }, [answer, showFeedback]);

    useEffect(() => {
        if (showFeedback === FEEDBACK_TYPES.WRONG && showTips && !currentTip) {
            const tip = `Pokušaj ponovo! ${storyQuestion.operation === '+' ? 'Brojimo sve zajedno.' : 
                         storyQuestion.operation === '-' ? 'Uzimamo dio od cjeline.' :
                         storyQuestion.operation === '×' ? 'Grupiraj u jednake dijelove.' : 
                         'Dijeli jednako među sve.'}`;
            setCurrentTip(tip);
        } else if (!showFeedback) {
            setCurrentTip(null);
        }
    }, [showFeedback, showTips, storyQuestion, currentTip]);

    const checkAnswer = () => {
        const userAnswer = parseInt(answer);
        
        if (userAnswer === storyQuestion.correctAnswer) {
            handleCorrectAnswer();
        } else {
            handleWrongAnswer();
        }
    };

    const handleCorrectAnswer = () => {
        setShowFeedback(FEEDBACK_TYPES.CORRECT);
        if (soundEnabled) {
            ThemeManager.playSound('correct', true);
        }

        setTimeout(() => {
            setAnswer('');
            setShowFeedback('');
            onStoryAnswered(true);
        }, 3000); // Longer delay to read success message
    };

    const handleWrongAnswer = () => {
        setShowFeedback(FEEDBACK_TYPES.WRONG);
        if (soundEnabled) {
            ThemeManager.playSound('wrong', true);
        }

        const feedbackDelay = showTips ? 4000 : 2000;
        setTimeout(() => {
            setAnswer('');
            setShowFeedback('');
            // Don't advance story on wrong answer, let them try again
        }, feedbackDelay);
    };

    // Inline styles
    const containerStyle = {
        maxWidth: '800px',
        margin: '0 auto',
        padding: '1.5rem',
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
    };

    const storyHeaderStyle = {
        background: 'linear-gradient(135deg, #7c3aed, #5b21b6)',
        color: 'white',
        padding: '1.5rem',
        borderRadius: '1rem',
        marginBottom: '2rem',
        textAlign: 'center'
    };

    const storyTitleStyle = {
        fontSize: '1.5rem',
        fontWeight: 'bold',
        margin: '0 0 0.5rem 0'
    };

    const storyEmojiStyle = {
        fontSize: '3rem',
        marginBottom: '0.5rem'
    };

    const progressStyle = {
        fontSize: '0.875rem',
        opacity: 0.9,
        margin: 0
    };

    const contextContainerStyle = {
        backgroundColor: '#f0f9ff',
        border: '2px solid #0ea5e9',
        borderRadius: '1rem',
        padding: '2rem',
        marginBottom: '2rem',
        textAlign: 'center'
    };

    const contextTextStyle = {
        fontSize: '1.125rem',
        lineHeight: '1.6',
        color: '#0c4a6e',
        marginBottom: '1.5rem'
    };

    const visualStyle = {
        fontSize: '2rem',
        letterSpacing: '0.1em',
        backgroundColor: '#e0f2fe',
        padding: '1rem',
        borderRadius: '0.5rem',
        fontFamily: 'monospace',
        margin: '1rem 0'
    };

    const questionContainerStyle = {
        backgroundColor: 'white',
        borderRadius: '1.5rem',
        padding: '2rem',
        textAlign: 'center',
        boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)',
        border: '1px solid #e5e7eb',
        marginBottom: '2rem'
    };

    const questionStyle = {
        fontSize: '1.5rem',
        fontWeight: 'bold',
        color: '#1f2937',
        margin: '0 0 1.5rem 0',
        lineHeight: '1.4'
    };

    const mathQuestionStyle = {
        fontSize: '2.5rem',
        fontWeight: 'bold',
        color: '#3b82f6',
        margin: '1rem 0',
        padding: '1rem',
        backgroundColor: '#f0f9ff',
        borderRadius: '0.5rem'
    };

    const inputContainerStyle = {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '1rem'
    };

    const answerInputStyle = {
        fontSize: '2rem',
        fontWeight: 'bold',
        padding: '1rem 1.5rem',
        border: `3px solid ${inputFocused ? '#3b82f6' : '#d1d5db'}`,
        borderRadius: '1rem',
        textAlign: 'center',
        width: '200px',
        outline: 'none',
        transition: 'all 0.2s ease',
        backgroundColor: showFeedback ? (showFeedback === FEEDBACK_TYPES.CORRECT ? '#d1fae5' : '#fee2e2') : 'white'
    };

    const submitButtonStyle = {
        background: 'linear-gradient(135deg, #10b981, #047857)',
        color: 'white',
        border: 'none',
        padding: '1rem 2rem',
        fontSize: '1.125rem',
        fontWeight: '600',
        borderRadius: '0.75rem',
        cursor: 'pointer',
        transition: 'all 0.3s ease',
        opacity: (!answer.trim() || showFeedback) ? 0.5 : 1,
        boxShadow: '0 4px 15px rgba(16, 185, 129, 0.4)',
        fontFamily: 'inherit'
    };

    const feedbackContainerStyle = {
        marginTop: '2rem'
    };

    const feedbackStyle = {
        fontSize: '1.25rem',
        fontWeight: 'bold',
        padding: '1.5rem',
        borderRadius: '0.75rem',
        color: 'white',
        marginBottom: '1rem',
        background: showFeedback === FEEDBACK_TYPES.CORRECT 
            ? 'linear-gradient(135deg, #10b981, #047857)' 
            : 'linear-gradient(135deg, #ef4444, #dc2626)'
    };

    const mathTipStyle = {
        backgroundColor: '#ede9fe',
        color: '#6b21a8',
        padding: '1rem',
        borderRadius: '0.75rem',
        fontSize: '0.875rem',
        lineHeight: '1.4',
        textAlign: 'center',
        border: '2px solid #c4b5fd'
    };

    const exitButtonStyle = {
        backgroundColor: '#ef4444',
        color: 'white',
        border: 'none',
        padding: '0.5rem 1rem',
        borderRadius: '0.5rem',
        fontSize: '0.875rem',
        cursor: 'pointer',
        transition: 'all 0.2s ease',
        position: 'absolute',
        top: '1rem',
        right: '1rem'
    };

    const getFeedbackText = () => {
        if (showFeedback === FEEDBACK_TYPES.CORRECT) {
            return storyQuestion.successMessage;
        }
        return `Netočno! Pokušaj ponovo. Točan odgovor je ${storyQuestion.correctAnswer}.`;
    };

    return (
        <div style={containerStyle}>
            <button
                onClick={() => setGameState(GAME_STATES.MENU)}
                style={exitButtonStyle}
                onMouseOver={(e) => e.target.style.backgroundColor = '#dc2626'}
                onMouseOut={(e) => e.target.style.backgroundColor = '#ef4444'}
            >
                ✕ Izađi
            </button>

            {/* Story Header */}
            <div style={storyHeaderStyle}>
                <div style={storyEmojiStyle}>{story.emoji}</div>
                <h2 style={storyTitleStyle}>{story.title}</h2>
                <p style={progressStyle}>
                    Pitanje {questionIndex + 1} od {currentLevel.questions.length}
                </p>
            </div>

            {/* Story Context */}
            <div style={contextContainerStyle}>
                <p style={contextTextStyle}>
                    {storyQuestion.story}
                </p>
                
                {storyQuestion.visual && (
                    <div style={visualStyle}>
                        {storyQuestion.visual}
                    </div>
                )}

                <div style={mathQuestionStyle}>
                    {storyQuestion.num1} {storyQuestion.operation} {storyQuestion.num2} = ?
                </div>
            </div>

            {/* Question Input */}
            <div style={questionContainerStyle}>
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
                            ✓ Potvrdi odgovor
                        </button>
                    </div>
                ) : (
                    <div style={feedbackContainerStyle}>
                        <div style={feedbackStyle}>
                            {getFeedbackText()}
                        </div>
                        
                        {currentTip && showFeedback === FEEDBACK_TYPES.WRONG && (
                            <div style={mathTipStyle}>
                                💡 <strong>Savjet:</strong> {currentTip}
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}

export default StoryGameScreen;
