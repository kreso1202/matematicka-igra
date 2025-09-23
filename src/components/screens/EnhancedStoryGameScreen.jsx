import React, { useEffect, useRef } from 'react';
import { FEEDBACK_TYPES, GAME_MODES, GAME_STATES } from '../../services/gameConfig.js';
import { GameLogic } from '../../services/gameLogic.js';
import { AnimatedObjects, MathVisualizer, AnimatedTimer, LevelProgress } from './VisualStoryComponents.jsx';

function EnhancedStoryGameScreen({ 
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
    const [currentTip, setCurrentTip] = React.useState(null);
    const [showVisualMath, setShowVisualMath] = React.useState(false);
    const [totalTime, setTotalTime] = React.useState(45); // For timer calculation

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
        
        // Set total time when question changes
        if (currentQuestion) {
            setTotalTime(GameLogic.getTimeLimitForMode(currentLevel, gameMode, 'medium'));
            setShowVisualMath(false); // Reset visual math
        }
    }, [currentQuestion]);

    // GENERIRAJ STABILAN SAVJET SAMO JEDNOM kad se prikaže greška
    useEffect(() => {
        if (showFeedback === FEEDBACK_TYPES.WRONG && !currentTip) {
            const tip = GameLogic.getMathTip(currentQuestion, gameMode);
            setCurrentTip(tip);
        } else if (!showFeedback) {
            setCurrentTip(null);
        }
    }, [showFeedback, currentTip]);

    // Show visual math after 3 seconds if no answer
    useEffect(() => {
        const timer = setTimeout(() => {
            if (!answer && !showFeedback) {
                setShowVisualMath(true);
            }
        }, 3000);
        
        return () => clearTimeout(timer);
    }, [currentQuestion, answer, showFeedback]);

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

    // Extract numbers and operation from story context
    const getVisualData = () => {
        if (!currentQuestion || typeof currentQuestion !== 'object') return null;
        
        const { originalNumbers, operation } = currentQuestion;
        if (!originalNumbers) return null;
        
        return {
            num1: originalNumbers.num1,
            num2: originalNumbers.num2,
            operation,
            objectType: getObjectTypeFromStory()
        };
    };

    const getObjectTypeFromStory = () => {
        if (!storyContext) return 'gold';
        
        const themeObjects = {
            'Piratska Avantura': 'gold',
            'Svemirska Misija': 'star', 
            'Šumska Potraga': 'apple',
            'Podvodni Svijet': 'pearl'
        };
        
        return themeObjects[storyContext.theme?.name] || 'gold';
    };

    const gameContainerStyle = {
        padding: '1rem',
        maxWidth: '900px',
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
        display: 'block',
        animation: 'bounce 2s infinite'
    };

    const themeTitleStyle = {
        fontSize: '1.5rem',
        fontWeight: 'bold',
        marginBottom: '0.5rem',
        textShadow: '0 2px 4px rgba(0,0,0,0.3)'
    };

    const storyCardStyle = {
        background: 'linear-gradient(145deg, #ffffff, #f8fafc)',
        color: '#1f2937',
        borderRadius: '1rem',
        padding: '2rem',
        marginBottom: '1.5rem',
        boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
        border: '1px solid #e5e7eb',
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
        flexShrink: 0,
        animation: 'pulse 2s infinite'
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
        position: 'relative',
        marginBottom: '1rem'
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
        border: `3px solid ${answer ? '#3b82f6' : '#d1d5db'}`,
        borderRadius: '0.75rem',
        textAlign: 'center',
        outline: 'none',
        transition: 'all 0.2s ease',
        backgroundColor: '#f9fafb'
    };

    const statsGridStyle = {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
        gap: '1rem',
        marginBottom: '1.5rem'
    };

    const statItemStyle = {
        background: 'rgba(255,255,255,0.95)',
        color: '#1f2937',
        padding: '1rem',
        borderRadius: '0.75rem',
        textAlign: 'center',
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
        transition: 'transform 0.2s ease'
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

    const visualData = getVisualData();

    return (
        <div style={gameContainerStyle}>
            {/* Story Header s temom */}
            <div style={storyHeaderStyle}>
                <button
                    onClick={() => {
                        console.log('Kliknuo izlaz iz Story Mode');
                        if (typeof setAnswer === 'function') setAnswer('');
                        setGameState(GAME_STATES.MENU);
                    }}
                    style={exitButtonStyle}
                    onMouseOver={(e) => e.target.style.backgroundColor = 'rgba(255,255,255,0.3)'}
                    onMouseOut={(e) => e.target.style.backgroundColor = 'rgba(255,255,255,0.2)'}
                >
                    ✕ Izađi
                </button>
                
                <span style={themeEmojiStyle}>{storyContext?.theme?.emoji || '📚'}</span>
                <h2 style={themeTitleStyle}>{storyContext?.theme?.name || 'Avantura s pričom'}</h2>
                
                {/* Vizualni progres */}
                <LevelProgress 
                    current={progress.current} 
                    total={progress.total} 
                    levelName={`Nivo ${currentLevel}`} 
                />
            </div>

            {/* Stats Grid s animacijama */}
            <div style={statsGridStyle}>
                <div style={statItemStyle} 
                     onMouseOver={(e) => e.target.style.transform = 'translateY(-2px)'}
                     onMouseOut={(e) => e.target.style.transform = 'translateY(0)'}>
                    <div style={statValueStyle}>{score}</div>
                    <div style={statLabelStyle}>Bodova</div>
                </div>
                <div style={statItemStyle}
                     onMouseOver={(e) => e.target.style.transform = 'translateY(-2px)'}
                     onMouseOut={(e) => e.target.style.transform = 'translateY(0)'}>
                    <div style={statValueStyle}>{streak}</div>
                    <div style={statLabelStyle}>U nizu</div>
                </div>
                <div style={statItemStyle}
                     onMouseOver={(e) => e.target.style.transform = 'translateY(-2px)'}
                     onMouseOut={(e) => e.target.style.transform = 'translateY(0)'}>
                    <div style={statValueStyle}>{lives}</div>
                    <div style={statLabelStyle}>Životi</div>
                </div>
            </div>

            {/* Animirani Timer */}
            {gameMode !== GAME_MODES.TRAINING && (
                <AnimatedTimer timeLeft={timeLeft} totalTime={totalTime} />
            )}

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

                {/* Vizualne objekte za brojeve */}
                {visualData && visualData.operation === 'addition' && (
                    <AnimatedObjects 
                        count={visualData.num1} 
                        type={visualData.objectType}
                        operation="addition"
                    />
                )}

                {/* Progresivni math visualizer */}
                {showVisualMath && visualData && (
                    <MathVisualizer 
                        num1={visualData.num1}
                        num2={visualData.num2}
                        operation={visualData.operation}
                        showResult={showFeedback === FEEDBACK_TYPES.CORRECT}
                        result={correctAnswer}
                    />
                )}
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
                        className={answer.trim() ? 'pulse-animation' : ''}
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
                            transition: 'all 0.3s ease',
                            boxShadow: answer.trim() ? '0 4px 15px rgba(16, 185, 129, 0.3)' : 'none'
                        }}
                        onMouseOver={(e) => {
                            if (answer.trim()) {
                                e.target.style.transform = 'translateY(-2px)';
                                e.target.style.boxShadow = '0 8px 25px rgba(16, 185, 129, 0.4)';
                            }
                        }}
                        onMouseOut={(e) => {
                            if (answer.trim()) {
                                e.target.style.transform = 'translateY(0)';
                                e.target.style.boxShadow = '0 4px 15px rgba(16, 185, 129, 0.3)';
                            }
                        }}
                    >
                        ✨ Provjeri odgovor
                    </button>
                </form>

                {!showVisualMath && !answer && !showFeedback && (
                    <div style={{
                        textAlign: 'center',
                        marginTop: '1rem',
                        fontSize: '0.875rem',
                        color: '#6b7280',
                        fontStyle: 'italic'
                    }}>
                        💡 Savjet: Pričekaj 3 sekunde za vizualnu pomoć!
                    </div>
                )}
            </div>

            {/* Feedback Overlay s boljim animacijama */}
            {showFeedback && (
                <>
                    <div style={{
                        position: 'fixed',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        backgroundColor: 'rgba(0,0,0,0.5)',
                        zIndex: 999,
                        animation: 'fadeIn 0.3s ease'
                    }}></div>
                    
                    <div style={{
                        position: 'fixed',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        background: 'white',
                        color: '#1f2937',
                        padding: '3rem',
                        borderRadius: '1.5rem',
                        textAlign: 'center',
                        boxShadow: '0 25px 50px rgba(0,0,0,0.3)',
                        zIndex: 1000,
                        minWidth: '350px',
                        border: `4px solid ${showFeedback === FEEDBACK_TYPES.CORRECT ? '#10b981' : '#ef4444'}`,
                        animation: 'scaleIn 0.3s ease'
                    }}>
                        <div style={{ 
                            fontSize: '4rem', 
                            marginBottom: '1rem',
                            animation: 'bounce 0.6s ease'
                        }}>
                            {showFeedback === FEEDBACK_TYPES.CORRECT ? '🎉' : '❌'}
                        </div>
                        <h3 style={{ 
                            fontSize: '1.8rem', 
                            fontWeight: 'bold', 
                            marginBottom: '1rem',
                            color: showFeedback === FEEDBACK_TYPES.CORRECT ? '#10b981' : '#ef4444'
                        }}>
                            {showFeedback === FEEDBACK_TYPES.CORRECT ? 'Odličan odgovor!' : 'Oops!'}
                        </h3>
                        <p style={{ 
                            fontSize: '1.2rem', 
                            marginBottom: currentTip ? '1rem' : 0,
                            lineHeight: '1.4'
                        }}>
                            {showFeedback === FEEDBACK_TYPES.CORRECT 
                                ? `Točno! Odgovor je ${correctAnswer}` 
                                : `Netočno. Točan odgovor je ${correctAnswer}`}
                        </p>
                        {currentTip && showFeedback === FEEDBACK_TYPES.WRONG && (
                            <div style={{
                                background: 'linear-gradient(135deg, #f0f9ff, #e0f2fe)',
                                border: '2px solid #38bdf8',
                                borderRadius: '1rem',
                                padding: '1.5rem',
                                fontSize: '1rem',
                                color: '#0c4a6e',
                                lineHeight: '1.5'
                            }}>
                                💡 <strong>Savjet:</strong> {currentTip}
                            </div>
                        )}
                    </div>
                </>
            )}

            <style jsx>{`
                @keyframes fadeIn {
                    from { opacity: 0; }
                    to { opacity: 1; }
                }
                
                @keyframes scaleIn {
                    from { 
                        opacity: 0; 
                        transform: translate(-50%, -50%) scale(0.8);
                    }
                    to { 
                        opacity: 1; 
                        transform: translate(-50%, -50%) scale(1);
                    }
                }
                
                @keyframes bounce {
                    0%, 20%, 53%, 80%, 100% {
                        transform: translateY(0);
                    }
                    40%, 43% {
                        transform: translateY(-10px);
                    }
                    70% {
                        transform: translateY(-5px);
                    }
                }
                
                @keyframes pulse {
                    0% { transform: scale(1); }
                    50% { transform: scale(1.05); }
                    100% { transform: scale(1); }
                }
                
                .bounce-animation {
                    animation: bounce 2s infinite;
                }
                
                .pulse-animation {
                    animation: pulse 1.5s infinite;
                }
            `}</style>
        </div>
    );
}

export default EnhancedStoryGameScreen;
