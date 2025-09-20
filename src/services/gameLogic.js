import { LEVELS } from './gameConfig.js';

export class GameLogic {
    static getCurrentLevelData(currentLevel) {
        return LEVELS.find(l => l.id === currentLevel);
    }

    static generateQuestion(currentLevel) {
        const levelData = this.getCurrentLevelData(currentLevel);
        let operations = [...levelData.operations];
        let operation;

        // Use weights for higher levels to favor multiplication/division
        if (levelData.multiplyWeight && Math.random() < levelData.multiplyWeight) {
            const multiplyOps = operations.filter(op => op === '×' || op === '÷');
            if (multiplyOps.length > 0) {
                operation = multiplyOps[Math.floor(Math.random() * multiplyOps.length)];
            } else {
                operation = operations[Math.floor(Math.random() * operations.length)];
            }
        } else {
            operation = operations[Math.floor(Math.random() * operations.length)];
        }

        let num1, num2, result, question;

        switch (operation) {
            case '+':
                if (levelData.id <= 2) {
                    num1 = Math.floor(Math.random() * levelData.maxNum) + 1;
                    num2 = Math.floor(Math.random() * levelData.maxNum) + 1;
                } else {
                    num1 = Math.floor(Math.random() * 30) + 1;
                    num2 = Math.floor(Math.random() * 30) + 1;
                }
                result = num1 + num2;
                question = `${num1} + ${num2}`;
                break;
                
            case '-':
                if (levelData.id <= 2) {
                    num1 = Math.floor(Math.random() * levelData.maxNum) + 10;
                    num2 = Math.floor(Math.random() * num1) + 1;
                } else {
                    num1 = Math.floor(Math.random() * 50) + 20;
                    num2 = Math.floor(Math.random() * (num1 - 10)) + 1;
                }
                result = num1 - num2;
                question = `${num1} - ${num2}`;
                break;
                
            case '×':
                num1 = Math.floor(Math.random() * 10) + 1;
                num2 = Math.floor(Math.random() * 10) + 1;
                result = num1 * num2;
                question = `${num1} × ${num2}`;
                break;
                
            case '÷':
                num2 = Math.floor(Math.random() * 10) + 1;
                result = Math.floor(Math.random() * 10) + 1;
                num1 = num2 * result;
                question = `${num1} ÷ ${num2}`;
                break;
        }

        return { question, correctAnswer: result };
    }

    static calculateScore(timeLeft, streak, currentLevel) {
        const timeBonus = timeLeft * 2;
        const streakBonus = streak * 5;
        const levelBonus = currentLevel * 10;
        return 20 + timeBonus + streakBonus + levelBonus;
    }

    static getLevelProgress(questionsInLevel, currentLevel) {
        const levelData = this.getCurrentLevelData(currentLevel);
        return Math.min((questionsInLevel / levelData.questionsNeeded) * 100, 100);
    }

    static shouldLevelUp(questionsInLevel, currentLevel) {
        const levelData = this.getCurrentLevelData(currentLevel);
        return questionsInLevel >= levelData.questionsNeeded;
    }

    static isGameComplete(currentLevel) {
        return currentLevel >= LEVELS.length;
    }

    static focusInput(delay = 100) {
        setTimeout(() => {
            const input = document.querySelector('input[type="number"]');
            if (input) {
                input.focus();
                input.select();
            }
        }, delay);
    }
}

export class PlayerManager {
    static getAllPlayers(localData, cloudData, isCloudConfigured) {
        const merged = { ...localData };
        
        if (isCloudConfigured && cloudData.players) {
            Object.keys(cloudData.players).forEach(playerName => {
                const cloudPlayer = cloudData.players[playerName];
                const localPlayer = merged[playerName];
                
                if (!localPlayer || cloudPlayer.bestScore > localPlayer.bestScore) {
                    merged[playerName] = cloudPlayer;
                }
            });
        }
        
        return merged;
    }

    static getTopPlayers(localData, cloudData, isCloudConfigured, limit = 20) {
        const allPlayers = this.getAllPlayers(localData, cloudData, isCloudConfigured);
        return Object.values(allPlayers)
            .sort((a, b) => b.bestScore - a.bestScore)
            .slice(0, limit);
    }

    static updatePlayerData(allPlayers, playerName, score, currentLevel, sessionStats, gameTime = 0, preferences = {}) {
        const existing = allPlayers[playerName] || {
            name: playerName,
            bestScore: 0,
            maxLevel: 1,
            gamesPlayed: 0,
            results: [],
            statistics: {
                totalTimeSpent: 0,
                totalQuestionsAnswered: 0,
                totalCorrectAnswers: 0,
                bestStreak: 0,
                averageAccuracy: 0,
                levelStats: {},
                dailyStats: {},
                achievements: { unlocked: [], progress: {} },
                preferences: {
                    theme: 'default',
                    avatar: 'robot',
                    soundEnabled: true,
                    difficulty: 'medium',
                    showTips: true,
                    ...preferences
                }
            }
        };

        // Ažurirati statistike
        const totalQuestions = sessionStats.correct + sessionStats.wrong + sessionStats.timeouts;
        const newTotalCorrect = existing.statistics.totalCorrectAnswers + sessionStats.correct;
        const newTotalQuestions = existing.statistics.totalQuestionsAnswered + totalQuestions;
        
        const newStats = {
            ...existing.statistics,
            totalTimeSpent: existing.statistics.totalTimeSpent + gameTime,
            totalQuestionsAnswered: newTotalQuestions,
            totalCorrectAnswers: newTotalCorrect,
            averageAccuracy: newTotalQuestions > 0 ? (newTotalCorrect / newTotalQuestions * 100) : 0,
            bestStreak: Math.max(existing.statistics.bestStreak || 0, sessionStats.maxStreak || 0),
            levelStats: {
                ...existing.statistics.levelStats,
                [currentLevel]: {
                    gamesPlayed: (existing.statistics.levelStats[currentLevel]?.gamesPlayed || 0) + 1,
                    questionsAnswered: (existing.statistics.levelStats[currentLevel]?.questionsAnswered || 0) + totalQuestions,
                    correctAnswers: (existing.statistics.levelStats[currentLevel]?.correctAnswers || 0) + sessionStats.correct,
                    bestScore: Math.max(existing.statistics.levelStats[currentLevel]?.bestScore || 0, score)
                }
            },
            dailyStats: {
                ...existing.statistics.dailyStats,
                [new Date().toDateString()]: {
                    gamesPlayed: (existing.statistics.dailyStats[new Date().toDateString()]?.gamesPlayed || 0) + 1,
                    timeSpent: (existing.statistics.dailyStats[new Date().toDateString()]?.timeSpent || 0) + gameTime,
                    questionsAnswered: (existing.statistics.dailyStats[new Date().toDateString()]?.questionsAnswered || 0) + totalQuestions
                }
            }
        };

        const newResult = {
            date: new Date().toLocaleDateString('hr-HR'),
            time: new Date().toLocaleTimeString('hr-HR'),
            score: score,
            level: currentLevel,
            stats: sessionStats,
            gameTime: gameTime
        };

        return {
            ...allPlayers,
            [playerName]: {
                ...existing,
                bestScore: Math.max(score, existing.bestScore),
                maxLevel: Math.max(currentLevel, existing.maxLevel),
                gamesPlayed: existing.gamesPlayed + 1,
                results: [...existing.results, newResult].slice(-20), // zadnjih 20 igara
                statistics: newStats
            }
        };
    }

    static getPlayerStatistics(playerData) {
        return playerData?.statistics || {};
    }

    static getDailyProgress(playerData, days = 7) {
        const dailyStats = playerData?.statistics?.dailyStats || {};
        const last7Days = [];
        
        for (let i = 6; i >= 0; i--) {
            const date = new Date();
            date.setDate(date.getDate() - i);
            const dateStr = date.toDateString();
            last7Days.push({
                date: date.toLocaleDateString('hr-HR'),
                ...dailyStats[dateStr] || { gamesPlayed: 0, timeSpent: 0, questionsAnswered: 0 }
            });
        }
        
        return last7Days;
    }
}
