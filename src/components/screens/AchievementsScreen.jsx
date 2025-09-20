import React, { useState, useEffect } from 'react';
import { GAME_STATES, ACHIEVEMENTS } from '../../services/gameConfig.js';
import { PlayerManager } from '../../services/gameLogic.js';
import { AchievementManager } from '../../services/achievementManager.js';

function AchievementsScreen({ playerName, getAllPlayers, setGameState, newAchievements = [], setNewAchievements }) {
    const [showNotification, setShowNotification] = useState(false);
    const allPlayers = getAllPlayers();
    const playerData = allPlayers[playerName];
    const achievements = playerData?.statistics?.achievements || { unlocked: [], progress: {} };
    const achievementList = Object.values(ACHIEVEMENTS);

    // Prikaži notifikacije za nova postignuća
    useEffect(() => {
        if (newAchievements.length > 0) {
            setShowNotification(true);
            const timer = setTimeout(() => {
                setShowNotification(false);
                if (setNewAchievements) {
                    setNewAchievements([]);
                }
            }, 5000);
            return () => clearTimeout(timer);
        }
    }, [newAchievements, setNewAchievements]);

    if (!playerData) {
        return (
            <div className="text-center">
                <h2 className="text-2xl font-bold mb-4">🏆 Postignuća</h2>
                <p className="text-gray-600 mb-6">Nema dostupnih postignuća za ovog igrača.</p>
                <button 
                    onClick={() => setGameState(GAME_STATES.MENU)}
                    className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-colors"
                >
                    Povratak na meni
                </button>
            </div>
        );
    }

    const unlockedCount = achievements.unlocked.length;
    const totalCount = achievementList.length;
    const completionPercentage = Math.round((unlockedCount / totalCount) * 100);

    return (
        <div className="max-w-4xl mx-auto space-y-6">
            {/* Notifikacija za nova postignuća */}
            {showNotification && newAchievements.length > 0 && (
                <div className="fixed top-4 right-4 z-50 bg-gradient-to-r from-yellow-400 to-orange-500 text-white p-4 rounded-lg shadow-lg animate-bounce">
                    <div className="flex items-center gap-3">
                        <div className="text-2xl">🎉</div>
                        <div>
                            <div className="font-bold">Novo postignuće!</div>
                            <div className="text-sm">
                                {newAchievements.map(id => AchievementManager.getAchievementData(id)?.name).join(', ')}
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-2xl font-bold text-gray-800">🏆 Postignuća</h2>
                    <p className="text-gray-600">Tvoja postignuća, {playerName}</p>
                </div>
                <button 
                    onClick={() => setGameState(GAME_STATES.MENU)}
                    className="flex items-center gap-2 bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition-colors"
                >
                    ← Povratak
                </button>
            </div>

            {/* Progress summary */}
            <div className="bg-gradient-to-r from-blue-50 to-indigo-100 p-6 rounded-xl border border-blue-200">
                <div className="flex items-center justify-between mb-4">
                    <div>
                        <div className="text-3xl font-bold text-blue-600">
                            {unlockedCount} / {totalCount}
                        </div>
                        <div className="text-blue-800 font-medium">Otkrivenih postignuća</div>
                    </div>
                    <div className="text-right">
                        <div className="text-2xl font-bold text-indigo-600">{completionPercentage}%</div>
                        <div className="text-indigo-700 text-sm">Završeno</div>
                    </div>
                </div>
                
                <div className="w-full bg-blue-200 rounded-full h-3">
                    <div 
                        className="bg-gradient-to-r from-blue-500 to-indigo-600 h-3 rounded-full transition-all duration-500"
                        style={{ width: `${completionPercentage}%` }}
                    ></div>
                </div>
            </div>

            {/* Lista postignuća */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {achievementList.map(achievement => {
                    const isUnlocked = achievements.unlocked.includes(achievement.id);
                    const progress = achievements.progress[achievement.id];
                    const isNew = newAchievements.includes(achievement.id);

                    return (
                        <div 
                            key={achievement.id} 
                            className={`p-6 rounded-xl border transition-all transform hover:scale-105 ${
                                isUnlocked 
                                    ? 'bg-gradient-to-br from-green-50 to-emerald-100 border-green-200 shadow-lg' 
                                    : 'bg-gradient-to-br from-gray-50 to-gray-100 border-gray-200 opacity-75'
                            } ${isNew ? 'ring-4 ring-yellow-400 ring-opacity-50' : ''}`}
                        >
                            <div className="flex items-start gap-4">
                                <div className={`text-4xl transition-all ${
                                    isUnlocked ? 'transform scale-110' : 'grayscale opacity-50'
                                }`}>
                                    {isUnlocked ? achievement.emoji : '🔒'}
                                </div>
                                
                                <div className="flex-1">
                                    <div className="flex items-center gap-2 mb-1">
                                        <h3 className={`font-bold text-lg ${
                                            isUnlocked ? 'text-green-800' : 'text-gray-600'
                                        }`}>
                                            {achievement.name}
                                        </h3>
                                        {isNew && (
                                            <span className="px-2 py-1 bg-yellow-400 text-yellow-900 text-xs font-bold rounded-full animate-pulse">
                                                NOVO!
                                            </span>
                                        )}
                                    </div>
                                    
                                    <p className={`text-sm mb-3 ${
                                        isUnlocked ? 'text-green-700' : 'text-gray-500'
                                    }`}>
                                        {achievement.description}
                                    </p>
                                    
                                    {!isUnlocked && progress && (
                                        <div className="space-y-2">
                                            <div className="flex justify-between text-xs text-gray-600">
                                                <span>Napredak</span>
                                                <span>{progress.current} / {progress.target}</span>
                                            </div>
                                            <div className="w-full bg-gray-200 rounded-full h-2">
                                                <div 
                                                    className="bg-gradient-to-r from-blue-400 to-blue-600 h-2 rounded-full transition-all duration-300"
                                                    style={{ width: `${Math.min((progress.current / progress.target) * 100, 100)}%` }}
                                                ></div>
                                            </div>
                                        </div>
                                    )}
                                    
                                    {isUnlocked && (
                                        <div className="flex items-center gap-2 text-green-600">
                                            <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
                                                <span className="text-white text-xs">✓</span>
                                            </div>
                                            <span className="text-sm font-semibold">OTKRIVENO!</span>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Dodatne informacije */}
            <div className="bg-white p-6 rounded-xl shadow-sm border">
                <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                    💡 Savjeti za postignuća
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600">
                    <div>
                        <strong>🎯 Savršenstvo:</strong> Završi jedan nivo bez greške ili timeout-a
                    </div>
                    <div>
                        <strong>🔥 Niz desetke:</strong> Odgovori točno na 10 pitanja u nizu
                    </div>
                    <div>
                        <strong>⚡ Brzinski demon:</strong> Budi brž od 3 sekunde po pitanju
                    </div>
                    <div>
                        <strong>📅 Tjedni rekord:</strong> Igraj svaki dan kroz tjedan dana
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AchievementsScreen;
