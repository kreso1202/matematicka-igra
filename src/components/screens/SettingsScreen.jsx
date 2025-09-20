import React, { useState } from 'react';
import { GAME_STATES, THEMES, AVATARS, DIFFICULTY_LEVELS } from '../../services/gameConfig.js';
import { ThemeManager } from '../../services/themeManager.js';

function SettingsScreen({ playerName, getAllPlayers, setGameState, updatePlayerPreferences }) {
    const allPlayers = getAllPlayers();
    const playerData = allPlayers[playerName];
    const preferences = playerData?.statistics?.preferences || {};
    
    const [selectedTheme, setSelectedTheme] = useState(preferences.theme || 'default');
    const [selectedAvatar, setSelectedAvatar] = useState(preferences.avatar || 'robot');
    const [soundEnabled, setSoundEnabled] = useState(preferences.soundEnabled !== false);
    const [selectedDifficulty, setSelectedDifficulty] = useState(preferences.difficulty || 'medium');
    const [showTips, setShowTips] = useState(preferences.showTips !== false);

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
        marginBottom: '1rem',
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem',
        color: '#1f2937'
    };

    const avatarGridStyle = {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(80px, 1fr))',
        gap: '0.75rem',
        marginBottom: '1rem'
    };

    const avatarButtonStyle = (isSelected) => ({
        padding: '1rem',
        borderRadius: '0.75rem',
        border: `2px solid ${isSelected ? '#3b82f6' : '#e5e7eb'}`,
        backgroundColor: isSelected ? '#dbeafe' : 'white',
        cursor: 'pointer',
        transition: 'all 0.2s ease',
        textAlign: 'center',
        fontFamily: 'inherit',
        boxShadow: isSelected ? '0 4px 12px rgba(59, 130, 246, 0.3)' : '0 1px 3px rgba(0,0,0,0.1)'
    });

    const avatarEmojiStyle = {
        fontSize: '1.875rem',
        marginBottom: '0.5rem',
        display: 'block'
    };

    const avatarNameStyle = {
        fontSize: '0.75rem',
        fontWeight: '500',
        color: '#374151'
    };

    const selectedInfoStyle = {
        fontSize: '0.875rem',
        color: '#6b7280',
        marginTop: '0.5rem'
    };

    const themeGridStyle = {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))',
        gap: '1rem'
    };

    const themeButtonStyle = (isSelected) => ({
        padding: '1rem',
        borderRadius: '0.75rem',
        border: `2px solid ${isSelected ? '#3b82f6' : '#e5e7eb'}`,
        backgroundColor: isSelected ? '#dbeafe' : 'white',
        cursor: 'pointer',
        transition: 'all 0.2s ease',
        textAlign: 'center',
        fontFamily: 'inherit',
        boxShadow: isSelected ? '0 4px 12px rgba(59, 130, 246, 0.3)' : '0 1px 3px rgba(0,0,0,0.1)'
    });

    const themePreviewStyle = (theme) => {
        const colors = {
            default: 'linear-gradient(135deg, #3b82f6, #1d4ed8)',
            dark: 'linear-gradient(135deg, #374151, #1f2937)',
            ocean: 'linear-gradient(135deg, #06b6d4, #0891b2)',
            forest: 'linear-gradient(135deg, #10b981, #047857)',
            space: 'linear-gradient(135deg, #8b5cf6, #7c3aed)'
        };
        
        return {
            width: '100%',
            height: '3rem',
            borderRadius: '0.5rem',
            background: colors[theme],
            marginBottom: '0.75rem'
        };
    };

    const themeNameStyle = {
        fontSize: '0.875rem',
        fontWeight: '600',
        textTransform: 'capitalize'
    };

    const toggleButtonStyle = (isActive) => ({
        display: 'flex',
        alignItems: 'center',
        gap: '0.75rem',
        padding: '1rem',
        borderRadius: '0.75rem',
        border: `2px solid ${isActive ? '#10b981' : '#e5e7eb'}`,
        backgroundColor: isActive ? '#d1fae5' : '#f9fafb',
        color: isActive ? '#065f46' : '#6b7280',
        cursor: 'pointer',
        transition: 'all 0.2s ease',
        fontFamily: 'inherit',
        width: '100%',
        textAlign: 'left'
    });

    const toggleIconStyle = (isActive) => ({
        width: '2rem',
        height: '2rem',
        borderRadius: '0.5rem',
        backgroundColor: isActive ? '#10b981' : '#9ca3af',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'white',
        fontSize: '1.125rem'
    });

    const toggleTextStyle = {
        flex: 1
    };

    const toggleTitleStyle = {
        fontWeight: '500',
        marginBottom: '0.25rem'
    };

    const toggleDescStyle = {
        fontSize: '0.875rem',
        opacity: 0.75
    };

    const soundTestGridStyle = {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
        gap: '0.75rem',
        marginTop: '1rem',
        paddingTop: '1rem',
        borderTop: '1px solid #e5e7eb'
    };

    const soundTestButtonStyle = {
        padding: '0.75rem',
        borderRadius: '0.5rem',
        border: 'none',
        cursor: 'pointer',
        fontFamily: 'inherit',
        fontSize: '0.875rem',
        fontWeight: '500',
        transition: 'all 0.2s ease'
    };

    const difficultyGridStyle = {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
        gap: '1rem'
    };

    const difficultyButtonStyle = (isSelected) => ({
        padding: '1rem',
        borderRadius: '0.75rem',
        border: `2px solid ${isSelected ? '#3b82f6' : '#e5e7eb'}`,
        backgroundColor: isSelected ? '#dbeafe' : 'white',
        cursor: 'pointer',
        transition: 'all 0.2s ease',
        textAlign: 'center',
        fontFamily: 'inherit',
        boxShadow: isSelected ? '0 4px 12px rgba(59, 130, 246, 0.3)' : '0 1px 3px rgba(0,0,0,0.1)'
    });

    const difficultyEmojiStyle = {
        fontSize: '1.875rem',
        marginBottom: '0.5rem'
    };

    const difficultyNameStyle = {
        fontWeight: '600',
        marginBottom: '0.25rem'
    };

    const difficultyDescStyle = {
        fontSize: '0.75rem',
        color: '#6b7280'
    };

    const saveButtonStyle = {
        background: 'linear-gradient(135deg, #10b981, #047857)',
        color: 'white',
        border: 'none',
        padding: '1rem 2rem',
        borderRadius: '0.75rem',
        fontSize: '1.125rem',
        fontWeight: 'bold',
        cursor: 'pointer',
        transition: 'all 0.3s ease',
        boxShadow: '0 4px 15px rgba(16, 185, 129, 0.4)',
        fontFamily: 'inherit',
        width: '100%',
        maxWidth: '300px',
        margin: '0 auto',
        display: 'block'
    };

    const handleSave = () => {
        const newPreferences = {
            theme: selectedTheme,
            avatar: selectedAvatar,
            soundEnabled,
            difficulty: selectedDifficulty,
            showTips
        };
        
        ThemeManager.applyTheme(selectedTheme);
        if (soundEnabled) {
            ThemeManager.playSound('click', true);
        }
        
        updatePlayerPreferences(playerName, newPreferences);
        setGameState(GAME_STATES.MENU);
    };

    const handleThemeChange = (theme) => {
        setSelectedTheme(theme);
        ThemeManager.applyTheme(theme);
        if (soundEnabled) {
            ThemeManager.playSound('click', true);
        }
    };

    const handleSoundToggle = () => {
        const newSoundState = !soundEnabled;
        setSoundEnabled(newSoundState);
        if (newSoundState) {
            ThemeManager.playSound('correct', true);
        }
    };

    const previewSound = (soundType) => {
        if (soundEnabled) {
            ThemeManager.playSound(soundType, true);
        }
    };

    return (
        <div style={containerStyle}>
            {/* Header */}
            <div style={headerStyle}>
                <div>
                    <h2 style={titleStyle}>⚙️ Postavke</h2>
                    <p style={subtitleStyle}>Personaliziraj svoju igru, {playerName}</p>
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

            {/* Avatar Selection */}
            <div style={sectionStyle}>
                <h3 style={sectionTitleStyle}>
                    👤 Odaberi avatar
                </h3>
                <div style={avatarGridStyle}>
                    {AVATARS.map(avatar => (
                        <button
                            key={avatar.id}
                            onClick={() => {
                                setSelectedAvatar(avatar.id);
                                previewSound('click');
                            }}
                            style={avatarButtonStyle(selectedAvatar === avatar.id)}
                            onMouseOver={(e) => {
                                if (selectedAvatar !== avatar.id) {
                                    e.target.style.transform = 'translateY(-2px)';
                                    e.target.style.boxShadow = '0 4px 12px rgba(0,0,0,0.15)';
                                }
                            }}
                            onMouseOut={(e) => {
                                if (selectedAvatar !== avatar.id) {
                                    e.target.style.transform = 'translateY(0)';
                                    e.target.style.boxShadow = '0 1px 3px rgba(0,0,0,0.1)';
                                }
                            }}
                        >
                            <span style={avatarEmojiStyle}>{avatar.emoji}</span>
                            <div style={avatarNameStyle}>{avatar.name}</div>
                        </button>
                    ))}
                </div>
                <div style={selectedInfoStyle}>
                    Odabrani avatar: <strong>{AVATARS.find(a => a.id === selectedAvatar)?.name}</strong> {AVATARS.find(a => a.id === selectedAvatar)?.emoji}
                </div>
            </div>

            {/* Theme Selection */}
            <div style={sectionStyle}>
                <h3 style={sectionTitleStyle}>
                    🎨 Odaberi temu
                </h3>
                <div style={themeGridStyle}>
                    {Object.values(THEMES).map(theme => (
                        <button
                            key={theme}
                            onClick={() => handleThemeChange(theme)}
                            style={themeButtonStyle(selectedTheme === theme)}
                            onMouseOver={(e) => {
                                if (selectedTheme !== theme) {
                                    e.target.style.transform = 'translateY(-2px)';
                                    e.target.style.boxShadow = '0 4px 12px rgba(0,0,0,0.15)';
                                }
                            }}
                            onMouseOut={(e) => {
                                if (selectedTheme !== theme) {
                                    e.target.style.transform = 'translateY(0)';
                                    e.target.style.boxShadow = '0 1px 3px rgba(0,0,0,0.1)';
                                }
                            }}
                        >
                            <div style={themePreviewStyle(theme)}></div>
                            <div style={themeNameStyle}>
                                {ThemeManager.getThemeDisplayName(theme)}
                            </div>
                        </button>
                    ))}
                </div>
            </div>

            {/* Sound Settings */}
            <div style={sectionStyle}>
                <h3 style={sectionTitleStyle}>
                    🔊 Zvučni efekti
                </h3>
                <div style={{ marginBottom: '1rem' }}>
                    <button
                        onClick={handleSoundToggle}
                        style={toggleButtonStyle(soundEnabled)}
                    >
                        <div style={toggleIconStyle(soundEnabled)}>
                            {soundEnabled ? '🔊' : '🔇'}
                        </div>
                        <div style={toggleTextStyle}>
                            <div style={toggleTitleStyle}>
                                {soundEnabled ? 'Zvuk uključen' : 'Zvuk isključen'}
                            </div>
                            <div style={toggleDescStyle}>
                                {soundEnabled ? 'Korisni zvučni efekti tijekom igre' : 'Tiha igra bez zvukova'}
                            </div>
                        </div>
                    </button>
                </div>

                {soundEnabled && (
                    <div style={soundTestGridStyle}>
                        <button
                            onClick={() => previewSound('correct')}
                            style={{
                                ...soundTestButtonStyle,
                                backgroundColor: '#d1fae5',
                                color: '#065f46'
                            }}
                            onMouseOver={(e) => e.target.style.backgroundColor = '#a7f3d0'}
                            onMouseOut={(e) => e.target.style.backgroundColor = '#d1fae5'}
                        >
                            ✅ Točan odgovor
                        </button>
                        <button
                            onClick={() => previewSound('wrong')}
                            style={{
                                ...soundTestButtonStyle,
                                backgroundColor: '#fee2e2',
                                color: '#991b1b'
                            }}
                            onMouseOver={(e) => e.target.style.backgroundColor = '#fecaca'}
                            onMouseOut={(e) => e.target.style.backgroundColor = '#fee2e2'}
                        >
                            ❌ Netočan odgovor
                        </button>
                        <button
                            onClick={() => previewSound('levelUp')}
                            style={{
                                ...soundTestButtonStyle,
                                backgroundColor: '#dbeafe',
                                color: '#1e40af'
                            }}
                            onMouseOver={(e) => e.target.style.backgroundColor = '#bfdbfe'}
                            onMouseOut={(e) => e.target.style.backgroundColor = '#dbeafe'}
                        >
                            🎉 Novi nivo
                        </button>
                        <button
                            onClick={() => previewSound('achievement')}
                            style={{
                                ...soundTestButtonStyle,
                                backgroundColor: '#e9d5ff',
                                color: '#6b21a8'
                            }}
                            onMouseOver={(e) => e.target.style.backgroundColor = '#ddd6fe'}
                            onMouseOut={(e) => e.target.style.backgroundColor = '#e9d5ff'}
                        >
                            🏆 Postignuće
                        </button>
                    </div>
                )}
            </div>

            {/* Difficulty Settings */}
            <div style={sectionStyle}>
                <h3 style={sectionTitleStyle}>
                    🎯 Težina igre
                </h3>
                <div style={difficultyGridStyle}>
                    {Object.values(DIFFICULTY_LEVELS).map(difficulty => {
                        const difficultyInfo = {
                            easy: { emoji: '😊', description: 'Više vremena, lakši brojevi' },
                            medium: { emoji: '🤔', description: 'Uravnotežena igra' },
                            hard: { emoji: '😤', description: 'Manje vremena, teži brojevi' }
                        };

                        return (
                            <button
                                key={difficulty}
                                onClick={() => {
                                    setSelectedDifficulty(difficulty);
                                    previewSound('click');
                                }}
                                style={difficultyButtonStyle(selectedDifficulty === difficulty)}
                                onMouseOver={(e) => {
                                    if (selectedDifficulty !== difficulty) {
                                        e.target.style.transform = 'translateY(-2px)';
                                        e.target.style.boxShadow = '0 4px 12px rgba(0,0,0,0.15)';
                                    }
                                }}
                                onMouseOut={(e) => {
                                    if (selectedDifficulty !== difficulty) {
                                        e.target.style.transform = 'translateY(0)';
                                        e.target.style.boxShadow = '0 1px 3px rgba(0,0,0,0.1)';
                                    }
                                }}
                            >
                                <div style={difficultyEmojiStyle}>{difficultyInfo[difficulty].emoji}</div>
                                <div style={difficultyNameStyle}>
                                    {ThemeManager.getDifficultyDisplayName(difficulty)}
                                </div>
                                <div style={difficultyDescStyle}>
                                    {difficultyInfo[difficulty].description}
                                </div>
                            </button>
                        );
                    })}
                </div>
            </div>

            {/* Tips Settings */}
            <div style={sectionStyle}>
                <h3 style={sectionTitleStyle}>
                    💡 Matematički savjeti
                </h3>
                <button
                    onClick={() => {
                        setShowTips(!showTips);
                        previewSound('click');
                    }}
                    style={toggleButtonStyle(showTips)}
                >
                    <div style={toggleIconStyle(showTips)}>
                        {showTips ? '💡' : '❌'}
                    </div>
                    <div style={toggleTextStyle}>
                        <div style={toggleTitleStyle}>
                            {showTips ? 'Prikaži savjete tijekom igre' : 'Sakrij savjete tijekom igre'}
                        </div>
                        <div style={toggleDescStyle}>
                            {showTips ? 'Korisni savjeti će ti pomagati učiti' : 'Fokus samo na pitanja'}
                        </div>
                    </div>
                </button>
            </div>

            {/* Save Button */}
            <div style={{ textAlign: 'center' }}>
                <button
                    onClick={handleSave}
                    style={saveButtonStyle}
                    onMouseOver={(e) => {
                        e.target.style.background = 'linear-gradient(135deg, #047857, #065f46)';
                        e.target.style.transform = 'translateY(-2px)';
                        e.target.style.boxShadow = '0 6px 20px rgba(16, 185, 129, 0.6)';
                    }}
                    onMouseOut={(e) => {
                        e.target.style.background = 'linear-gradient(135deg, #10b981, #047857)';
                        e.target.style.transform = 'translateY(0)';
                        e.target.style.boxShadow = '0 4px 15px rgba(16, 185, 129, 0.4)';
                    }}
                >
                    💾 Spremi postavke
                </button>
            </div>
        </div>
    );
}

export default SettingsScreen;
