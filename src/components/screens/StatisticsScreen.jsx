import React from 'react';
import { GAME_STATES, LEVELS } from '../../services/gameConfig.js';
import { PlayerManager } from '../../services/gameLogic.js';
import { ThemeManager } from '../../services/themeManager.js';

function StatisticsScreen({ playerName, getAllPlayers, setGameState }) {
    const allPlayers = getAllPlayers();
    const playerData = allPlayers[playerName];
    const stats = PlayerManager.getPlayerStatistics(playerData);
    const dailyProgress = PlayerManager.getDailyProgress(playerData);

    if (!playerData) {
        return (
            <div className="text-center">
                <h2 className="text-2xl font-bold mb-4">📊 Statistike</h2>
                <p className="text-gray-600 mb-6">Nema dostupnih statistika za ovog igrača.</p>
                <button 
                    onClick={() => setGameState(GAME_STATES.MENU)}
                    className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-colors"
                >
                    Povratak na meni
                </button>
            </div>
        );
    }

    const formatTime = (seconds) => {
        if (!seconds) return '0m';
        const hours = Math.floor(seconds / 3600);
        const mins = Math.floor((seconds % 3600) / 60);
        if (hours > 0) return `${hours}h ${mins}m`;
        return `${mins}m`;
    };

    const getWeekday = (dateStr) => {
        const date = new Date(dateStr.split('.').reverse().join('-'));
        const days = ['Ned', 'Pon', 'Uto', 'Sri', 'Čet', 'Pet', 'Sub'];
        return days[date.getDay()];
    };

    return (
        <div className="max-w-6xl mx-auto space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-2xl font-bold text-gray-800">📊 Statistike</h2>
                    <p className="text-gray-600">Pregled napretka za {playerName}</p>
                </div>
                <button 
                    onClick={() => setGameState(GAME_STATES.MENU)}
                    className="flex items-center gap-2 bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition-colors"
                >
                    ← Povratak
                </button>
            </div>

            {/* Osnovne statistike */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-xl border border-blue-200">
                    <div className="flex items-center gap-3 mb-2">
                        <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center">
                            <span className="text-white text-lg">🏆</span>
                        </div>
                        <span className="font-semibold text-blue-800">Najbolji rezultat</span>
                    </div>
                    <div className="text-3xl font-bold text-blue-600">{playerData.bestScore.toLocaleString()}</div>
                    <div className="text-sm text-blue-700 mt-1">Nivo {playerData.maxLevel}</div>
                </div>

                <div className="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-xl border border-green-200">
                    <div className="flex items-center gap-3 mb-2">
                        <div className="w-10 h-10 bg-green-500 rounded-lg flex items-center justify-center">
                            <span className="text-white text-lg">🎯</span>
                        </div>
                        <span className="font-semibold text-green-800">Točnost</span>
                    </div>
                    <div className="text-3xl font-bold text-green-600">
                        {stats.averageAccuracy?.toFixed(1) || 0}%
                    </div>
                    <div className="text-sm text-green-700 mt-1">
                        {stats.totalCorrectAnswers} / {stats.totalQuestionsAnswered} točnih
                    </div>
                </div>

                <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-6 rounded-xl border border-purple-200">
                    <div className="flex items-center gap-3 mb-2">
                        <div className="w-10 h-10 bg-purple-500 rounded-lg flex items-center justify-center">
                            <span className="text-white text-lg">⏱️</span>
                        </div>
                        <span className="font-semibold text-purple-800">Ukupno vrijeme</span>
                    </div>
                    <div className="text-3xl font-bold text-purple-600">
                        {formatTime(stats.totalTimeSpent || 0)}
                    </div>
                    <div className="text-sm text-purple-700 mt-1">{playerData.gamesPlayed} igara</div>
                </div>

                <div className="bg-gradient-to-br from-orange-50 to-orange-100 p-6 rounded-xl border border-orange-200">
                    <div className="flex items-center gap-3 mb-2">
                        <div className="w-10 h-10 bg-orange-500 rounded-lg flex items-center justify-center">
                            <span className="text-white text-lg">🔥</span>
                        </div>
                        <span className="font-semibold text-orange-800">Najbolji niz</span>
                    </div>
                    <div className="text-3xl font-bold text-orange-600">
                        {stats.bestStreak || 0}
                    </div>
                    <div className="text-sm text-orange-700 mt-1">uzastopnih točnih</div>
                </div>
            </div>

            {/* Napredak po nivoima */}
            <div className="bg-white p-6 rounded-xl shadow-sm border">
                <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                    🎯 Napredak po nivoima
                </h3>
                <div className="space-y-4">
                    {LEVELS.map((level) => {
                        const levelData = stats.levelStats?.[level.id] || { gamesPlayed: 0, questionsAnswered: 0, correctAnswers: 0, bestScore: 0 };
                        const accuracy = levelData.questionsAnswered > 0 ? 
                            (levelData.correctAnswers / levelData.questionsAnswered * 100) : 0;
                        const isUnlocked = playerData.maxLevel >= level.id;
                        
                        return (
                            <div key={level.id} className={`p-4 rounded-lg border transition-all ${
                                isUnlocked ? 'bg-gray-50 border-gray-200' : 'bg-gray-100 border-gray-300 opacity-60'
                            }`}>
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-4">
                                        <div className="text-2xl">{level.emoji}</div>
                                        <div>
                                            <div className="font-semibold text-gray-800">
                                                Nivo {level.id}: {level.name}
                                            </div>
                                            <div className="text-sm text-gray-600">
                                                {isUnlocked ? `${levelData.gamesPlayed} igara` : 'Zaključano'}
                                            </div>
                                        </div>
                                    </div>
                                    
                                    {isUnlocked && levelData.gamesPlayed > 0 && (
                                        <div className="flex items-center gap-6 text-sm">
                                            <div className="text-center">
                                                <div className="font-semibold text-green-600">
                                                    {accuracy.toFixed(1)}%
                                                </div>
                                                <div className="text-gray-500">Točnost</div>
                                            </div>
                                            <div className="text-center">
                                                <div className="font-semibold text-blue-600">
                                                    {levelData.bestScore.toLocaleString()}
                                                </div>
                                                <div className="text-gray-500">Najbolji</div>
                                            </div>
                                        </div>
                                    )}
                                </div>
                                
                                {isUnlocked && levelData.gamesPlayed > 0 && (
                                    <div className="mt-3">
                                        <div className="w-full bg-gray-200 rounded-full h-2">
                                            <div 
                                                className="bg-gradient-to-r from-blue-400 to-blue-600 h-2 rounded-full transition-all"
                                                style={{ width: `${Math.min(accuracy, 100)}%` }}
                                            ></div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Tjedni pregled */}
            <div className="bg-white p-6 rounded-xl shadow-sm border">
                <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                    📅 Aktivnost zadnjih 7 dana
                </h3>
                <div className="grid grid-cols-7 gap-3">
                    {dailyProgress.map((day, index) => {
                        const hasActivity = day.gamesPlayed > 0;
                        const intensity = Math.min(day.gamesPlayed / 3, 1); // Max 3 games for full intensity
                        
                        return (
                            <div key={index} className="text-center">
                                <div className="text-xs text-gray-600 mb-2 font-medium">
                                    {getWeekday(day.date)}
                                </div>
                                <div 
                                    className={`h-16 rounded-lg flex flex-col items-center justify-center text-sm font-bold transition-all relative ${
                                        hasActivity 
                                            ? `bg-green-400 text-white shadow-lg` 
                                            : 'bg-gray-100 text-gray-400 border-2 border-dashed border-gray-300'
                                    }`}
                                    style={{
                                        backgroundColor: hasActivity ? 
                                            `rgba(34, 197, 94, ${0.3 + (intensity * 0.7)})` : undefined
                                    }}
                                    title={hasActivity ? 
                                        `${day.gamesPlayed} igara, ${formatTime(day.timeSpent)}` : 
                                        'Nema aktivnosti'
                                    }
                                >
                                    {hasActivity ? (
                                        <>
                                            <div className="text-lg">{day.gamesPlayed}</div>
                                            <div className="text-xs opacity-90">igara</div>
                                        </>
                                    ) : (
                                        <div className="text-xl opacity-50">·</div>
                                    )}
                                </div>
                                <div className="text-xs text-gray-500 mt-1">
                                    {day.date.split('.')[0]}.
                                </div>
                            </div>
                        );
                    })}
                </div>
                
                <div className="mt-4 text-sm text-gray-600 text-center">
                    Ukupno ovu sedmicu: {dailyProgress.reduce((sum, day) => sum + day.gamesPlayed, 0)} igara, {formatTime(dailyProgress.reduce((sum, day) => sum + day.timeSpent, 0))}
                </div>
            </div>
        </div>
    );
}

export default StatisticsScreen;
