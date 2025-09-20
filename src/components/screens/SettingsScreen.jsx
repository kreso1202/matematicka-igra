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
        <div className="max-w-4xl mx-auto space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-2xl font-bold text-gray-800">⚙️ Postavke</h2>
                    <p className="text-gray-600">Personaliziraj svoju igru, {playerName}</p>
                </div>
                <button 
                    onClick={() => setGameState(GAME_STATES.MENU)}
                    className="flex items-center gap-2 bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition-colors"
                >
                    ← Povratak
                </button>
            </div>

            {/* Avatar Selection */}
            <div className="bg-white p-6 rounded-xl shadow-sm border">
                <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                    👤 Odaberi avatar
                </h3>
                <div className="grid grid-cols-4 md:grid-cols-8 gap-3">
                    {AVATARS.map(avatar => (
                        <button
                            key={avatar.id}
                            onClick={() => {
                                setSelectedAvatar(avatar.id);
                                previewSound('click');
                            }}
                            className={`p-4 rounded-xl border-2 transition-all transform hover:scale-105 ${
                                selectedAvatar === avatar.id 
                                    ? 'border-blue-500 bg-blue-50 shadow-lg' 
                                    : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                            }`}
                        >
                            <div className="text-3xl mb-2">{avatar.emoji}</div>
                            <div className="text-xs font-medium text-gray-700">{avatar.name}</div>
                        </button>
                    ))}
                </div>
                <div className="mt-4 text-sm text-gray-600">
                    Odabrani avatar: <strong>{AVATARS.find(a => a.id === selectedAvatar)?.name}</strong> {AVATARS.find(a => a.id === selectedAvatar)?.emoji}
                </div>
            </div>

            {/* Theme Selection */}
            <div className="bg-white p-6 rounded-xl shadow-sm border">
                <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                    🎨 Odaberi temu
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                    {Object.values(THEMES).map(theme => {
                        const themeColors = {
                            default: 'bg-gradient-to-br from-blue-400 to-blue-600',
                            dark: 'bg-gradient-to-br from-gray-700 to-gray-900',
                            ocean: 'bg-gradient-to-br from-cyan-400 to-blue-500',
                            forest: 'bg-gradient-to-br from-green-400 to-emerald-600',
                            space: 'bg-gradient-to-br from-purple-500 to-indigo-700'
                        };

                        return (
                            <button
                                key={theme}
                                onClick={() => handleThemeChange(theme)}
                                className={`p-4 rounded-xl border-2 transition-all transform hover:scale-105 ${
                                    selectedTheme === theme 
                                        ? 'border-blue-500 bg-blue-50 shadow-lg' 
                                        : 'border-gray-200 hover:border-gray-300'
                                }`}
                            >
                                <div className={`w-full h-12 rounded-lg ${themeColors[theme]} mb-3`}></div>
                                <div className="font-semibold text-sm capitalize">
                                    {ThemeManager.getThemeDisplayName(theme)}
                                </div>
                            </button>
                        );
                    })}
                </div>
            </div>

            {/* Sound Settings */}
            <div className="bg-white p-6 rounded-xl shadow-sm border">
                <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                    🔊 Zvučni efekti
                </h3>
                <div className="space-y-4">
                    <button
                        onClick={handleSoundToggle}
                        className={`flex items-center gap-3 p-4 rounded-xl border-2 transition-all w-full md:w-auto ${
                            soundEnabled 
                                ? 'border-green-500 bg-green-50 text-green-800' 
                                : 'border-gray-300 bg-gray-50 text-gray-600'
                        }`}
                    >
                        <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                            soundEnabled ? 'bg-green-500' : 'bg-gray-400'
                        }`}>
                            <span className="text-white text-lg">
                                {soundEnabled ? '🔊' : '🔇'}
                            </span>
                        </div>
                        <span className="font-medium">
                            {soundEnabled ? 'Zvuk uključen' : 'Zvuk isključen'}
                        </span>
                    </button>

                    {soundEnabled && (
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 pt-4 border-t">
                            <button
                                onClick={() => previewSound('correct')}
                                className="p-3 bg-green-100 text-green-800 rounded-lg hover:bg-green-200 transition-colors text-sm font-medium"
                            >
                                ✅ Točan odgovor
                            </button>
                            <button
                                onClick={() => previewSound('wrong')}
                                className="p-3 bg-red-100 text-red-800 rounded-lg hover:bg-red-200 transition-colors text-sm font-medium"
                            >
                                ❌ Netočan odgovor
                            </button>
                            <button
                                onClick={() => previewSound('levelUp')}
                                className="p-3 bg-blue-100 text-blue-800 rounded-lg hover:bg-blue-200 transition-colors text-sm font-medium"
                            >
                                🎉 Novi nivo
                            </button>
                            <button
                                onClick={() => previewSound('achievement')}
                                className="p-3 bg-purple-100 text-purple-800 rounded-lg hover:bg-purple-200 transition-colors text-sm font-medium"
                            >
                                🏆 Postignuće
                            </button>
                        </div>
                    )}
                </div>
            </div>

            {/* Difficulty Settings */}
            <div className="bg-white p-6 rounded-xl shadow-sm border">
                <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                    🎯 Težina igre
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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
                                className={`p-4 rounded-xl border-2 transition-all transform hover:scale-105 ${
                                    selectedDifficulty === difficulty 
                                        ? 'border-blue-500 bg-blue-50 shadow-lg' 
                                        : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                                }`}
                            >
                                <div className="text-3xl mb-2">{difficultyInfo[difficulty].emoji}</div>
                                <div className="font-semibold mb-1 capitalize">
                                    {ThemeManager.getDifficultyDisplayName(difficulty)}
                                </div>
                                <div className="text-xs text-gray-600">
                                    {difficultyInfo[difficulty].description}
                                </div>
                            </button>
                        );
                    })}
                </div>
            </div>

            {/* Tips Settings */}
            <div className="bg-white p-6 rounded-xl shadow-sm border">
                <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                    💡 Matematički savjeti
                </h3>
                <button
                    onClick={() => {
                        setShowTips(!showTips);
                        previewSound('click');
                    }}
                    className={`flex items-center gap-3 p-4 rounded-xl border-2 transition-all ${
                        showTips 
                            ? 'border-yellow-500 bg-yellow-50 text-yellow-800' 
                            : 'border-gray-300 bg-gray-50 text-gray-600'
                    }`}
                >
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                        showTips ? 'bg-yellow-500' : 'bg-gray-400'
                    }`}>
                        <span className="text-white text-lg">
                            {showTips ? '💡' : '❌'}
                        </span>
                    </div>
                    <div>
                        <div className="font-medium">
                            {showTips ? 'Prikaži savjete tijekom igre' : 'Sakrij savjete tijekom igre'}
                        </div>
                        <div className="text-sm opacity-75">
                            {showTips ? 'Korisni savjeti će ti pomagati učiti' : 'Fokus samo na pitanja'}
                        </div>
                    </div>
                </button>
            </div>

            {/* Save Button */}
            <div className="flex justify-center">
                <button
                    onClick={handleSave}
                    className="bg-gradient-to-r from-green-500 to-emerald-600 text-white py-4 px-8 rounded-xl font-bold text-lg hover:from-green-600 hover:to-emerald-700 transform hover:scale-105 transition-all shadow-lg"
                >
                    💾 Spremi postavke
                </button>
            </div>
        </div>
    );
}

export default SettingsScreen;
