// VisualStoryComponents.jsx - Dodajte u screens/components/
import React, { useState, useEffect } from 'react';

// Komponenta za animirane objekte (kovanice, kristali, itd.)
export function AnimatedObjects({ count, type, operation }) {
    const [animationPhase, setAnimationPhase] = useState(0);
    
    useEffect(() => {
        const timer = setTimeout(() => setAnimationPhase(1), 500);
        return () => clearTimeout(timer);
    }, []);

    const getObjectEmoji = (type) => {
        const objects = {
            gold: '🪙',
            crystal: '💎', 
            gem: '💍',
            pearl: '🏊',
            apple: '🍎',
            star: '⭐',
            treasure: '💰',
            potion: '🧪'
        };
        return objects[type] || '⚪';
    };

    const renderObjects = () => {
        const emoji = getObjectEmoji(type);
        const objects = [];
        
        for (let i = 0; i < count && i < 20; i++) { // Limit to 20 for performance
            objects.push(
                <span
                    key={i}
                    style={{
                        fontSize: '1.5rem',
                        display: 'inline-block',
                        margin: '0.2rem',
                        animation: `fadeInScale 0.3s ease ${i * 0.1}s both`,
                        transform: animationPhase === 1 ? 'scale(1)' : 'scale(0)',
                        transition: `transform 0.3s ease ${i * 0.05}s`
                    }}
                >
                    {emoji}
                </span>
            );
        }
        
        if (count > 20) {
            objects.push(
                <span key="more" style={{ fontSize: '1rem', opacity: 0.7 }}>
                    ... (ukupno {count})
                </span>
            );
        }
        
        return objects;
    };

    return (
        <div style={{
            textAlign: 'center',
            padding: '1rem',
            backgroundColor: 'rgba(255,255,255,0.1)',
            borderRadius: '0.5rem',
            margin: '1rem 0',
            minHeight: '80px',
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'center'
        }}>
            {renderObjects()}
        </div>
    );
}

// Progresivni pokazivač računanja
export function MathVisualizer({ num1, num2, operation, showResult, result }) {
    const [step, setStep] = useState(0);
    
    useEffect(() => {
        const timer = setInterval(() => {
            setStep(s => s < 3 ? s + 1 : s);
        }, 800);
        
        return () => clearInterval(timer);
    }, []);

    const getOperationSymbol = () => {
        const symbols = { addition: '+', subtraction: '-', multiplication: '×', division: '÷' };
        return symbols[operation] || '+';
    };

    return (
        <div style={{
            backgroundColor: '#f0f9ff',
            padding: '2rem',
            borderRadius: '1rem',
            textAlign: 'center',
            margin: '1rem 0',
            border: '2px solid #0ea5e9'
        }}>
            <div style={{
                fontSize: '2rem',
                fontFamily: 'monospace',
                letterSpacing: '0.1em',
                lineHeight: 1.5
            }}>
                <span style={{
                    opacity: step >= 0 ? 1 : 0.3,
                    transition: 'opacity 0.5s ease',
                    color: '#3b82f6',
                    fontWeight: 'bold'
                }}>
                    {num1}
                </span>
                
                <span style={{
                    opacity: step >= 1 ? 1 : 0.3,
                    transition: 'opacity 0.5s ease',
                    margin: '0 1rem',
                    color: '#ef4444',
                    fontWeight: 'bold'
                }}>
                    {getOperationSymbol()}
                </span>
                
                <span style={{
                    opacity: step >= 2 ? 1 : 0.3,
                    transition: 'opacity 0.5s ease',
                    color: '#3b82f6',
                    fontWeight: 'bold'
                }}>
                    {num2}
                </span>
                
                <span style={{
                    opacity: step >= 3 ? 1 : 0.3,
                    transition: 'opacity 0.5s ease',
                    margin: '0 1rem',
                    color: '#059669',
                    fontWeight: 'bold'
                }}>
                    =
                </span>
                
                <span style={{
                    opacity: showResult ? 1 : (step >= 3 ? 0.5 : 0.3),
                    transition: 'opacity 0.5s ease',
                    color: showResult ? '#059669' : '#6b7280',
                    fontWeight: 'bold'
                }}>
                    {showResult ? result : '?'}
                </span>
            </div>
        </div>
    );
}

// Animirani vremenski pokazivač
export function AnimatedTimer({ timeLeft, totalTime }) {
    const percentage = (timeLeft / totalTime) * 100;
    
    const getTimerColor = () => {
        if (percentage > 60) return '#10b981'; // zelena
        if (percentage > 30) return '#f59e0b'; // žuta
        return '#ef4444'; // crvena
    };

    const getTimerIcon = () => {
        if (percentage > 60) return '🟢';
        if (percentage > 30) return '🟡';
        return '🔴';
    };

    return (
        <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '1rem',
            padding: '1rem',
            backgroundColor: 'rgba(255,255,255,0.95)',
            borderRadius: '0.75rem',
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
        }}>
            <span style={{ fontSize: '1.5rem' }}>
                {getTimerIcon()}
            </span>
            
            <div style={{ flex: 1 }}>
                <div style={{
                    height: '8px',
                    backgroundColor: '#e5e7eb',
                    borderRadius: '4px',
                    overflow: 'hidden'
                }}>
                    <div style={{
                        height: '100%',
                        width: `${percentage}%`,
                        backgroundColor: getTimerColor(),
                        transition: 'all 0.3s ease',
                        borderRadius: '4px'
                    }} />
                </div>
                
                <div style={{
                    fontSize: '0.875rem',
                    color: '#6b7280',
                    marginTop: '0.25rem',
                    textAlign: 'center'
                }}>
                    {timeLeft}s preostalo
                </div>
            </div>
        </div>
    );
}

// Animirana karakteristika napretka
export function LevelProgress({ current, total, levelName }) {
    const percentage = (current / total) * 100;
    
    return (
        <div style={{
            backgroundColor: 'rgba(255,255,255,0.1)',
            padding: '1rem',
            borderRadius: '0.75rem',
            margin: '1rem 0'
        }}>
            <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '0.5rem'
            }}>
                <span style={{ color: 'white', fontWeight: 'bold' }}>
                    {levelName}
                </span>
                <span style={{ color: 'rgba(255,255,255,0.8)', fontSize: '0.875rem' }}>
                    {current} / {total}
                </span>
            </div>
            
            <div style={{
                height: '12px',
                backgroundColor: 'rgba(255,255,255,0.2)',
                borderRadius: '6px',
                overflow: 'hidden'
            }}>
                <div style={{
                    height: '100%',
                    width: `${percentage}%`,
                    background: 'linear-gradient(90deg, #10b981, #34d399)',
                    borderRadius: '6px',
                    transition: 'width 0.5s ease',
                    boxShadow: percentage > 0 ? '0 2px 4px rgba(16, 185, 129, 0.4)' : 'none'
                }} />
            </div>
            
            {/* Zvjezdice za pokazivanje napretka */}
            <div style={{ 
                display: 'flex', 
                justifyContent: 'center', 
                marginTop: '0.5rem',
                gap: '0.25rem' 
            }}>
                {[...Array(total)].map((_, i) => (
                    <span key={i} style={{
                        fontSize: '1rem',
                        color: i < current ? '#fbbf24' : 'rgba(255,255,255,0.3)',
                        transition: 'color 0.3s ease'
                    }}>
                        ⭐
                    </span>
                ))}
            </div>
        </div>
    );
}

// CSS animacije
const animationStyles = `
@keyframes fadeInScale {
    from {
        opacity: 0;
        transform: scale(0);
    }
    to {
        opacity: 1;
        transform: scale(1);
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
    0% {
        transform: scale(1);
    }
    50% {
        transform: scale(1.05);
    }
    100% {
        transform: scale(1);
    }
}

.bounce-animation {
    animation: bounce 2s infinite;
}

.pulse-animation {
    animation: pulse 2s infinite;
}
`;

// Ubaci CSS stilove
if (typeof document !== 'undefined') {
    const style = document.createElement('style');
    style.textContent = animationStyles;
    document.head.appendChild(style);
}
