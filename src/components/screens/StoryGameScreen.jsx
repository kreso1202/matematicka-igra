import React, { useEffect, useRef } from 'react';
import { FEEDBACK_TYPES, GAME_MODES } from '../../services/gameConfig.js';
import { GameLogic } from '../../services/gameLogic.js';

function StoryGameScreen({ 
    playerName, 
    currentQuestion, 
    answer, 
    setAnswer, 
    correctAnswer,
    showFeedback,
    timeLeft,
    lives,
    score,
    streak,
    currentLevel,
    questionsInLevel,
    gameMode,
    getLevelProgress,
    checkAnswer,
    getAllPlayers,
    setGameState
}) {
    const inputRef = useRef(null);
    const [storyContext, setStoryContext] = React.useState(null);

    useEffect(() => {
        if (inputRef.current) {
            inputRef.current.focus();
        }
    }, [currentQuestion]);

    // Parsiramo story context iz pitanja ako ga ima
    useEffect(() => {
        if (currentQuestion && typeof currentQuestion === 'object' && currentQuestion.storyContext) {
            setStoryContext(currentQuestion.storyContext);
        }
    }, [currentQuestion]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (answer.trim() && !showFeedback) {
            checkAnswer();
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter' && answer.trim() && !showFeedback) {
            checkAnswer();
        }
    };

    const allPlayers = getAllPlayers();
    const playerData = allPlayers[playerName] || {};
    const showTips = playerData?.statistics?.preferences?.showTips !== false;

    const progress = getLevelProgress();
    const questionText = typeof currentQuestion === 'object' ? currentQuestion.question : currentQuestion;

    // Style definicije
    const gameContainerStyle = {
        padding: '1rem',
        maxWidth: '800px',
        margin: '0 auto',
        color: 'white',
        minHeight: '70vh',
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
    };

    const storyHeaderStyle = {
        background: storyContext?.theme?.background || 'linear-gradient(135deg, #3b82f6, #1d4ed8)',
        borderRadius: '1rem',
        padding: '2rem',
        marginBottom: '1.5rem',
        textAlign: 'center',
        boxShadow: '0 8px 25px rgba(0,0,0,0.2)',
        position: 'relative'
    };

    const exitButtonStyle = {
        position: 'absolute',
        top: '1rem',
        right: '1rem',
        backgroundColor: 'rgba(255,255,255,0.2)',
        color: 'white',
        border: '1px solid rgba(255,255,255,0.3)',
        padding: '0.5rem 1rem',
        borderRadius: '0.5rem',
        fontSize: '0.875rem',
        cursor: 'pointer',
        transition: 'all 0.2s ease',
        fontFamily: 'inherit'
    };

    const themeEmojiStyle = {
        fontSize: '3rem',
        marginBottom: '1rem',
        display: 'block'
    };

    const themeTitleStyle = {
        fontSize: '1.5rem',
        fontWeight: 'bold',
        marginBottom: '0.5rem',
        textShadow: '0 2px 4px rgba(0,0,0,0.3)'
    };

    const levelInfoStyle = {
        fontSize: '1rem',
        opacity: 0.9,
        marginBottom: '1rem'
    };

    const storyCardStyle = {
        background: 'linear-gradient(145deg, #ffffff, #f8fafc)',
        color: '#1f2937',
        borderRadius: '1rem',
        padding: '2rem',
        marginBottom: '1.5rem',
        boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
        border: '1px solid #e5e7eb',
        position: 'relative',
        overflow: 'hidden'
    };

    const characterStyle = {
        display: 'flex',
        alignItems: 'center',
        gap: '1rem',
        marginBottom: '1rem',
        padding: '1rem',
        background: storyContext?.theme?.background || 'linear-gradient(135deg, #3b82f6, #1d4ed8)',
        borderRadius: '0.75rem',
        color: 'white'
    };

    const characterAvatarStyle = {
        width: '60px',
        height: '60px',
        borderRadius: '50%',
        background: 'rgba(255,255,255,0.2)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '2rem',
        flexShrink: 0
    };

    const speechBubbleStyle = {
        background: '#ffffff',
        color: '#1f2937',
        padding: '1.5rem',
        borderRadius: '1rem',
        fontSize: '1.1rem',
        lineHeight: '1.6',
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
        border: '2px solid #e5e7eb',
        position: 'relative'
    };

    const inputSectionStyle = {
        background: '#ffffff',
        borderRadius: '1rem',
        padding: '2rem',
        boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
        border: '1px solid #e5e7eb',
        marginBottom: '1.5rem'
    };

    const inputStyle = {
        width: '100%',
        padding: '1rem',
        fontSize: '1.5rem',
        border: '2px solid #d1d5db',
        borderRadius: '0.75rem',
        textAlign: 'center',
        outline: 'none',
        transition: 'all 0.2s ease',
        backgroundColor: '#f9fafb'
    };

    const statsBarStyle = {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))',
        gap: '1rem',
        marginBottom: '1.5rem'
    };

    const statItemStyle = {
        background: 'rgba(255,255,255,0.95)',
        color: '#1f2937',
        padding: '1rem',
        borderRadius: '0.75rem',
        textAlign: 'center',
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
    };

    const statValueStyle = {
        fontSize: '1.5rem',
        fontWeight: 'bold',
        marginBottom: '0.25rem'
    };

    const statLabelStyle = {
        fontSize: '0.875rem',
        opacity: 0.7
    };

    const progressBarStyle = {
        width: '100%',
        height: '8px',
        backgroundColor: 'rgba(255,255,255,0.3)',
        borderRadius: '4px',
        overflow: 'hidden',
        marginTop: '0.5rem'
    };

    const progressFillStyle = {
        height: '100%',
        backgroundColor: '#10b981',
        borderRadius: '4px',
        width: `${progress.percentage || 0}%`,
        transition: 'width 0.3s ease'
    };

    // Feedback stilovi
    const getFeedbackStyle = () => {
        const baseStyle = {
            position: 'fixed',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            background: 'white',
            color: '#1f2937',
            padding: '2rem',
            borderRadius: '1rem',
            textAlign: 'center',
            boxShadow: '0 25px 50px rgba(0,0,0,0.3)',
            zIndex: 1000,
            minWidth: '300px',
            border: '3px solid'
        };

        switch (showFeedback) {
            case FEEDBACK_TYPES.CORRECT:
                return { ...baseStyle, borderColor: '#10b981', background: '#ecfdf5' };
            case FEEDBACK_TYPES.WRONG:
                return { ...baseStyle, borderColor: '#ef4444', background: '#fef2f2' };
            case FEEDBACK_TYPES.TIMEOUT:
                return { ...baseStyle, borderColor: '#f59e0b', background: '#fffbeb' };
            default:
                return baseStyle;
        }
    };

    const getFeedbackMessage = () => {
        switch (showFeedback) {
            case FEEDBACK_TYPES.CORRECT:
                return {
                    emoji: '🎉',
                    title: 'Odličan odgovor!',
                    message: `Točno! Odgovor je ${correctAnswer}`
                };
            case FEEDBACK_TYPES.WRONG:
                return {
                    emoji: '❌',
                    title: 'Oops!',
                    message: `Netočno. Točan odgovor je ${correctAnswer}`,
                    tip: showTips ? GameLogic.getMathTip(currentQuestion, correctAnswer) : null
                };
            case FEEDBACK_TYPES.TIMEOUT:
                return {
                    emoji: '⏰',
                    title: 'Vrijeme je isteklo!',
                    message: `Točan odgovor je bio ${correctAnswer}`
                };
            default:
                return null;
        }
    };

    return (
        <div style={gameContainerStyle}>
            {/* Story Header s temom */}
            <div style={storyHeaderStyle}>
                <button
                    onClick={() => setGameState('MENU')}
                    style={exitButtonStyle}
                    onMouseOver={(e) => e.target.style.backgroundColor = 'rgba(255,255,255,0.3)'}
                    onMouseOut={(e) => e.target.style.backgroundColor = 'rgba(255,255,255,0.2)'}
                >
                    ✕ Izađi
                </button>
                
                <span style={themeEmojiStyle}>{storyContext?.theme?.emoji || '📚'}</span>
                <h2 style={themeTitleStyle}>{storyContext?.theme?.name || 'Avantura s pričom'}</h2>
                <p style={levelInfoStyle}>Nivo {currentLevel} • Pitanje {questionsInLevel + 1}</p>
                
                <div style={progressBarStyle}>
                    <div style={progressFillStyle}></div>
                </div>
            </div>

            {/* Stats Bar */}
            <div style={statsBarStyle}>
                <div style={statItemStyle}>
                    <div style={statValueStyle}>{score}</div>
                    <div style={statLabelStyle}>Bodova</div>
                </div>
                <div style={statItemStyle}>
                    <div style={statValueStyle}>{streak}</div>
                    <div style={statLabelStyle}>U nizu</div>
                </div>
                <div style={statItemStyle}>
                    <div style={statValueStyle}>{lives}</div>
                    <div style={statLabelStyle}>Životi</div>
                </div>
                {gameMode !== GAME_MODES.TRAINING && (
                    <div style={statItemStyle}>
                        <div style={statValueStyle}>{timeLeft}s</div>
                        <div style={statLabelStyle}>Vrijeme</div>
                    </div>
                )}
            </div>

            {/* Story Card s likom i pričom */}
            <div style={storyCardStyle}>
                {storyContext && (
                    <div style={characterStyle}>
                        <div style={characterAvatarStyle}>
                            {storyContext.theme.emoji}
                        </div>
                        <div>
                            <div style={{ fontWeight: 'bold', marginBottom: '0.5rem' }}>
                                {storyContext.character}
                            </div>
                            <div style={{ fontSize: '0.9rem', opacity: 0.9 }}>
                                govori u {storyContext.setting}...
                            </div>
                        </div>
                    </div>
                )}
                
                <div style={speechBubbleStyle}>
                    {questionText}
                </div>
            </div>

            {/* Input Section */}
            <div style={inputSectionStyle}>
                <form onSubmit={handleSubmit}>
                    <label style={{ 
                        display: 'block', 
                        marginBottom: '1rem', 
                        fontSize: '1.2rem', 
                        fontWeight: 'bold',
                        color: '#1f2937',
                        textAlign: 'center'
                    }}>
                        🤔 Tvoj odgovor:
                    </label>
                    <input
                        ref={inputRef}
                        type="number"
                        value={answer}
                        onChange={(e) => setAnswer(e.target.value)}
                        onKeyPress={handleKeyPress}
                        style={inputStyle}
                        placeholder="Upiši broj..."
                        disabled={!!showFeedback}
                    />
                    
                    <button
                        type="submit"
                        disabled={!answer.trim() || !!showFeedback}
                        style={{
                            width: '100%',
                            padding: '1rem',
                            marginTop: '1rem',
                            fontSize: '1.2rem',
                            fontWeight: 'bold',
                            border: 'none',
                            borderRadius: '0.75rem',
                            background: answer.trim() ? 
                                'linear-gradient(135deg, #10b981, #047857)' : '#9ca3af',
                            color: 'white',
                            cursor: answer.trim() ? 'pointer' : 'not-allowed',
                            transition: 'all 0.2s ease'
                        }}
                    >
                        ✨ Provjeri odgovor
                    </button>
                </form>
            </div>

            {/* Feedback Overlay */}
            {showFeedback && (
                <>
                    <div style={{
                        position: 'fixed',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        backgroundColor: 'rgba(0,0,0,0.5)',
                        zIndex: 999
                    }}></div>
                    
                    <div style={getFeedbackStyle()}>
                        {(() => {
                            const feedback = getFeedbackMessage();
                            return feedback && (
                                <>
                                    <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>
                                        {feedback.emoji}
                                    </div>
                                    <h3 style={{ 
                                        fontSize: '1.5rem', 
                                        fontWeight: 'bold', 
                                        marginBottom: '1rem' 
                                    }}>
                                        {feedback.title}
                                    </h3>
                                    <p style={{ 
                                        fontSize: '1.1rem', 
                                        marginBottom: feedback.tip ? '1rem' : 0 
                                    }}>
                                        {feedback.message}
                                    </p>
                                    {feedback.tip && (
                                        <div style={{
                                            background: '#f0f9ff',
                                            border: '1px solid #bfdbfe',
                                            borderRadius: '0.5rem',
                                            padding: '1rem',
                                            fontSize: '0.9rem',
                                            color: '#1e40af'
                                        }}>
                                            💡 <strong>Savjet:</strong> {feedback.tip}
                                        </div>
                                    )}
                                </>
                            );
                        })()}
                    </div>
                </>
            )}
        </div>
    );
}

export default StoryGameScreen;
