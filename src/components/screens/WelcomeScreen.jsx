import React, { useState } from 'react';
import { GAME_STATES } from '../../services/gameConfig.js';

function WelcomeScreen({ playerName, setPlayerName, setGameState }) {
    const [inputError, setInputError] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        const trimmedName = playerName.trim();
        
        if (!trimmedName) {
            setInputError('Molim unesite svoje ime');
            return;
        }
        
        if (trimmedName.length < 2) {
            setInputError('Ime mora imati barem 2 znakova');
            return;
        }
        
        if (trimmedName.length > 20) {
            setInputError('Ime može imati najviše 20 znakova');
            return;
        }
        
        setGameState(GAME_STATES.MENU);
    };

    const handleInputChange = (e) => {
        setPlayerName(e.target.value);
        if (inputError) setInputError('');
    };

    // Inline stilovi za suženi layout
    const containerStyle = {
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '1rem',
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
    };

    const cardStyle = {
        maxWidth: '420px',  // Ograničena širina umjesto pune širine
        width: '100%',
        backgroundColor: 'white',
        borderRadius: '1.5rem',
        padding: '3rem 2rem',
        boxShadow: '0 20px 50px rgba(0, 0, 0, 0.1)',
        border: '1px solid #e5e7eb',
        textAlign: 'center'
    };

    const headerStyle = {
        marginBottom: '2rem'
    };

    const iconStyle = {
        fontSize: '4rem',
        marginBottom: '1rem',
        display: 'block'
    };

    const titleStyle = {
        fontSize: '2rem',
        fontWeight: 'bold',
        color: '#1f2937',
        margin: '0 0 0.5rem 0'
    };

    const subtitleStyle = {
        fontSize: '1.125rem',
        color: '#6b7280',
        margin: 0
    };

    const formStyle = {
        display: 'flex',
        flexDirection: 'column',
        gap: '1.5rem'
    };

    const inputContainerStyle = {
        textAlign: 'left'
    };

    const labelStyle = {
        display: 'block',
        fontSize: '0.875rem',
        fontWeight: '500',
        color: '#374151',
        marginBottom: '0.5rem'
    };

    const inputStyle = {
        width: '100%',
        padding: '0.875rem 1rem',
        fontSize: '1rem',
        border: `2px solid ${inputError ? '#ef4444' : '#d1d5db'}`,
        borderRadius: '0.75rem',
        outline: 'none',
        transition: 'all 0.2s ease',
        fontFamily: 'inherit',
        backgroundColor: inputError ? '#fef2f2' : 'white'
    };

    const inputFocusStyle = {
        borderColor: '#3b82f6',
        boxShadow: '0 0 0 3px rgba(59, 130, 246, 0.1)'
    };

    const errorStyle = {
        color: '#ef4444',
        fontSize: '0.875rem',
        marginTop: '0.5rem',
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem'
    };

    const buttonStyle = {
        background: 'linear-gradient(135deg, #3b82f6, #1d4ed8)',
        color: 'white',
        border: 'none',
        padding: '1rem 2rem',
        fontSize: '1.125rem',
        fontWeight: '600',
        borderRadius: '0.75rem',
        cursor: 'pointer',
        transition: 'all 0.3s ease',
        fontFamily: 'inherit',
        boxShadow: '0 4px 15px rgba(59, 130, 246, 0.4)'
    };

    const buttonHoverStyle = {
        background: 'linear-gradient(135deg, #1d4ed8, #1e40af)',
        transform: 'translateY(-2px)',
        boxShadow: '0 8px 25px rgba(59, 130, 246, 0.6)'
    };

    const featuresStyle = {
        marginTop: '2rem',
        textAlign: 'left'
    };

    const featuresTitleStyle = {
        fontSize: '1rem',
        fontWeight: '600',
        color: '#374151',
        marginBottom: '1rem',
        textAlign: 'center'
    };

    const featuresListStyle = {
        display: 'grid',
        gridTemplateColumns: '1fr',
        gap: '0.75rem',
        fontSize: '0.875rem',
        color: '#6b7280'
    };

    const featureItemStyle = {
        display: 'flex',
        alignItems: 'center',
        gap: '0.75rem',
        padding: '0.75rem',
        backgroundColor: '#f8fafc',
        borderRadius: '0.5rem',
        border: '1px solid #e5e7eb'
    };

    const featureIconStyle = {
        fontSize: '1.25rem',
        flexShrink: 0
    };

    const [buttonHovered, setButtonHovered] = React.useState(false);

    return (
        <div style={containerStyle}>
            <div style={cardStyle}>
                {/* Header */}
                <div style={headerStyle}>
                    <span style={iconStyle}>🧮</span>
                    <h1 style={titleStyle}>Matematička igrica</h1>
                    <p style={subtitleStyle}>Učenje kroz zabavu</p>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} style={formStyle}>
                    <div style={inputContainerStyle}>
                        <label htmlFor="playerName" style={labelStyle}>
                            Kako se zoveš?
                        </label>
                        <input
                            id="playerName"
                            type="text"
                            value={playerName}
                            onChange={handleInputChange}
                            placeholder="Unesite svoje ime..."
                            style={inputStyle}
                            onFocus={(e) => {
                                Object.assign(e.target.style, inputFocusStyle);
                            }}
                            onBlur={(e) => {
                                e.target.style.borderColor = inputError ? '#ef4444' : '#d1d5db';
                                e.target.style.boxShadow = 'none';
                            }}
                            autoFocus
                            maxLength={20}
                        />
                        {inputError && (
                            <div style={errorStyle}>
                                <span>⚠️</span>
                                {inputError}
                            </div>
                        )}
                    </div>

                    <button 
                        type="submit"
                        style={buttonHovered ? {...buttonStyle, ...buttonHoverStyle} : buttonStyle}
                        onMouseEnter={() => setButtonHovered(true)}
                        onMouseLeave={() => setButtonHovered(false)}
                        disabled={!playerName.trim()}
                    >
                        🚀 Počni igru
                    </button>
                </form>

                {/* Features */}
                <div style={featuresStyle}>
                    <h3 style={featuresTitleStyle}>Što te čeka u igri?</h3>
                    <div style={featuresListStyle}>
                        <div style={featureItemStyle}>
                            <span style={featureIconStyle}>🎯</span>
                            <span>7 progresivnih nivoa različitih težina</span>
                        </div>
                        <div style={featureItemStyle}>
                            <span style={featureIconStyle}>🏆</span>
                            <span>Postignuća i nagrade za napredak</span>
                        </div>
                        <div style={featureItemStyle}>
                            <span style={featureIconStyle}>📊</span>
                            <span>Praćenje statistika i napretka</span>
                        </div>
                        <div style={featureItemStyle}>
                            <span style={featureIconStyle}>🎨</span>
                            <span>Personalizacija tema i avatara</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default WelcomeScreen;
