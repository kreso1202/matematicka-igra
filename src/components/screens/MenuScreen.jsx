import React from 'react';
import { GAME_STATES } from '../../services/gameConfig.js';
import { ThemeManager } from '../../services/themeManager.js';

function MenuScreen({ 
    playerName, 
    setGameState, 
    getAllPlayers, 
    getTopPlayers, 
    exportResults, 
    isJsonBinConfigured, 
    refreshCloudData,
    startGame 
}) {
    const allPlayers = getAllPlayers();
    const playerData = allPlayers[playerName];
    const avatar = ThemeManager.getAvatar(playerData?.statistics?.preferences?.avatar || 'robot');
    const soundEnabled = playerData?.statistics?.preferences?.soundEnabled !== false;

    const handleButtonClick = (action) => {
        if (soundEnabled) {
            ThemeManager.playSound('click', true);
        }
        action();
    };

    const menuOptions = [
        {
            id: 'play',
            title: '🎮 Igraj',
            description: 'Počni novu igru',
            action: () => handleButtonClick(() => setGameState(GAME_STATES.GAME_MODES)),
            color: 'from-blue-500 to-blue-600',
            hoverColor: 'hover:from-blue-600 hover:to-blue-700'
        },
        {
            id: 'statistics',
            title: '📊 Statistike',
            description: 'Pregled napretka i rezultata',
            action: () => handleButtonClick(() => setGameState(GAME_STATES.STATISTICS)),
            color: 'from-green-500 to-green-600',
            hoverColor: 'hover:from-green-600 hover:to-green-700'
        },
        {
            id: 'achievements',
            title: '🏆 Postignuća',
            description: 'Otkrivena postignuća i nagrade',
            action: () => handleButtonClick(() => setGameState(GAME_STATES.ACHIEVEMENTS)),
            color: 'from-yellow-500 to-yellow-600',
            hoverColor: 'hover:from-yellow-600 hover:to-yellow-700'
        },
        {
            id: 'leaderboard',
            title: '🏅 Ljestvica',
            description: 'Najbolji rezultati',
            action: () => handleButtonClick(() => setGameState(GAME_STATES.LEADERBOARD)),
            color: 'from-purple-500 to-purple-600',
            hoverColor: 'hover:from-purple-600 hover:to-purple-700'
        },
        {
            id: 'settings',
            title: '⚙️ Postavke',
            description: 'Personaliziraj svoju igru',
            action: () => handleButtonClick(() => setGameState(GAME_STATES.SETTINGS)),
            color: 'from-gray-500 to-gray-600',
            hoverColor: 'hover:from-gray-600 hover:to-gray-700'
        }
    ];

    // Statistike igrača za prikaz na vrhu
    const playerStats = playerData?.statistics || {};
    const achievements = playerData?.statistics?.achievements || { unlocked: [] };

    return (
        <div className="max-w-4xl mx-auto space-y-6">
            {/* Player Info Header */}
            <div className="text-center mb-8">
                <div className="flex items-center justify-center gap-4 mb-4">
                    <div className="text-4xl">{avatar.emoji}</div>
                    <div>
                        <h2 className="text-3xl font-bold" style={{ color: 'var(--text-primary)' }}>
                            Dobro došao, {playerName}!
                        </h2>
                        <p className="text-lg" style={{ color: 'var(--text-secondary)' }}>
                            Odaberi što želiš raditi
                        </p>
                    </div>
                </div>

                {/* Quick Stats */}
                {playerData && (
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-6">
                        <div className="p-4 rounded-lg" style={{ 
                            backgroundColor: 'var(--bg-card, #ffffff)', 
                            border: '1px solid var(--border-color, #d1d5db)' 
                        }}>
                            <div className="text-2xl font-bold" style={{ color: 'var(--accent-color)' }}>
                                {playerData.bestScore}
                            </div>
                            <div className="text-sm" style={{ color: 'var(--text-secondary)' }}>
                                Najbolji rezultat
                            </div>
                        </div>

                        <div className="p-4 rounded-lg" style={{ 
                            backgroundColor: 'var(--bg-card, #ffffff)', 
                            border: '1px solid var(--border-color, #d1d5db)' 
                        }}>
                            <div className="text-2xl font-bold" style={{ color: 'var(--accent-color)' }}>
                                {playerData.maxLevel}
                            </div>
                            <div className="text-sm" style={{ color: 'var(--text-secondary)' }}>
                                Najviši nivo
                            </div>
                        </div>

                        <div className="p-4 rounded-lg" style={{ 
                            backgroundColor: 'var(--bg-card, #ffffff)', 
                            border: '1px solid var(--border-color, #d1d5db)' 
                        }}>
                            <div className="text-2xl font-bold" style={{ color: 'var(--accent-color)' }}>
                                {playerStats.averageAccuracy?.toFixed(0) || 0}%
                            </div>
                            <div className="text-sm" style={{ color: 'var(--text-secondary)' }}>
                                Točnost
                            </div>
                        </div>

                        <div className="p-4 rounded-lg" style={{ 
                            backgroundColor: 'var(--bg-card, #ffffff)', 
                            border: '1px solid var(--border-color, #d1d5db)' 
                        }}>
                            <div className="text-2xl font-bold" style={{ color: 'var(--accent-color)' }}>
                                {achievements.unlocked.length}
                            </div>
                            <div className="text-sm" style={{ color: 'var(--text-secondary)' }}>
                                Postignuća
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {/* Menu Options */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {menuOptions.map((option) => (
                    <button
                        key={option.id}
                        onClick={option.action}
                        className={`p-6 rounded-xl text-white font-bold text-left transition-all transform hover:scale-105 hover:shadow-lg bg-gradient-to-br ${option.color} ${option.hoverColor}`}
                    >
                        <div className="text-xl mb-2">{option.title}</div>
                        <div className="text-sm opacity-90">{option.description}</div>
                    </button>
                ))}
            </div>

            {/* Quick Actions */}
            <div className="border-t pt-6" style={{ borderColor: 'var(--border-color, #d1d5db)' }}>
                <h3 className="text-lg font-bold mb-4" style={{ color: 'var(--text-primary)' }}>
                    ⚡ Brze akcije
                </h3>
                <div className="flex flex-wrap gap-3">
                    <button
                        onClick={() => handleButtonClick(() => startGame())}
                        className="px-4 py-2 rounded-lg font-medium transition-colors bg-blue-100 text-blue-800 hover:bg-blue-200"
                    >
                        🚀 Brza igra
                    </button>
                    
                    {isJsonBinConfigured && (
                        <button
                            onClick={() => handleButtonClick(refreshCloudData)}
                            className="px-4 py-2 rounded-lg font-medium transition-colors bg-green-100 text-green-800 hover:bg-green-200"
                        >
                            ☁️ Osvježi podatke
                        </button>
                    )}
                    
                    <button
                        onClick={() => handleButtonClick(exportResults)}
                        className="px-4 py-2 rounded-lg font-medium transition-colors bg-purple-100 text-purple-800 hover:bg-purple-200"
                    >
                        📥 Izvezi podatke
                    </button>
                </div>
            </div>
        </div>
    );
}

export default MenuScreen;
