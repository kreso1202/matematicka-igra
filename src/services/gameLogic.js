import { LEVELS, GAME_MODES, DIFFICULTY_LEVELS, MATH_TIPS } from './gameConfig.js';

export class GameLogic {
    static getCurrentLevelData(currentLevel, difficulty = DIFFICULTY_LEVELS.MEDIUM) {
        const level = LEVELS.find(l => l.id === currentLevel);
        if (level && level.difficulty && level.difficulty[difficulty]) {
            return { ...level, ...level.difficulty[difficulty] };
        }
        return level;
    }

    static generateQuestion(currentLevel, gameMode = GAME_MODES.CLASSIC, difficulty = DIFFICULTY_LEVELS.MEDIUM) {
        const levelData = this.getCurrentLevelData(currentLevel, difficulty);
        
        // Special logic for specific game modes
        switch (gameMode) {
            case GAME_MODES.MULTIPLICATION:
                return this.generateMultiplicationQuestion(levelData);
            case GAME_MODES.DIVISION:
                return this.generateDivisionQuestion(levelData);
            case GAME_MODES.ADDITION:
                return this.generateAdditionQuestion(levelData);
            case GAME_MODES.SUBTRACTION:
                return this.generateSubtractionQuestion(levelData);
            default:
                return this.generateClassicQuestion(levelData);
        }
    }

    static generateClassicQuestion(levelData) {
        let operations = [...levelData.operations];
        let operation;

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

        return this.generateByOperation(operation, levelData);
    }

    static generateMultiplicationQuestion(levelData) {
        return this.generateByOperation('×', levelData);
    }

    static generateDivisionQuestion(levelData) {
        return this.generateByOperation('÷', levelData);
    }

    static generateAdditionQuestion(levelData) {
        return this.generateByOperation('+', levelData);
    }

    static generateSubtractionQuestion(levelData) {
        return this.generateByOperation('-', levelData);
    }

    static generateByOperation(operation, levelData) {
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

        return { question, correctAnswer: result, operation };
    }

    static calculateScore(timeLeft, streak, currentLevel, gameMode = GAME_MODES.CLASSIC) {
        const timeBonus = timeLeft * 2;
        const streakBonus = streak * 5;
        const levelBonus = currentLevel * 10;
        
        // Mode-specific bonuses
        let modeBonus = 0;
        switch (gameMode) {
            case GAME_MODES.SPRINT:
                modeBonus = 5;
                break;
            case GAME_MODES.MULTIPLICATION:
            case GAME_MODES.DIVISION:
                modeBonus = 15;
                break;
        }
        
        return 20 + timeBonus + streakBonus + levelBonus + modeBonus;
    }

    static getLevelProgress(questionsInLevel, currentLevel, difficulty = DIFFICULTY_LEVELS.MEDIUM) {
        const levelData = this.getCurrentLevelData(currentLevel, difficulty);
        return Math.min((questionsInLevel / levelData.questionsNeeded) * 100, 100);
    }

    static shouldLevelUp(questionsInLevel, currentLevel, difficulty = DIFFICULTY_LEVELS.MEDIUM) {
        const levelData = this.getCurrentLevelData(currentLevel, difficulty);
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

    static getTipForOperation(operation) {
        const tips = MATH_TIPS[operation === '×' ? 'multiplication' : 
                              operation === '÷' ? 'division' :
                              operation === '+' ? 'addition' : 'subtraction'];
        return tips[Math.floor(Math.random() * tips.length)];
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

    static updatePlayerData(allPlayers, playerName, score, currentLevel, sessionStats, gameMode = GAME_MODES.CLASSIC) {
        const newResult = {
            date: new Date().toLocaleDateString('hr-HR'),
            time: new Date().toLocaleTimeString('hr-HR'),
            score: score,
            level: currentLevel,
            stats: sessionStats,
            gameMode: gameMode
        };

        const existingPlayer = allPlayers[playerName] || {};
        
        return {
            ...allPlayers,
            [playerName]: {
                name: playerName,
                bestScore: Math.max(score, existingPlayer.bestScore || 0),
                maxLevel: Math.max(currentLevel, existingPlayer.maxLevel || 1),
                gamesPlayed: (existingPlayer.gamesPlayed || 0) + 1,
                totalQuestions: (existingPlayer.totalQuestions || 0) + (sessionStats.correct + sessionStats.wrong + sessionStats.timeouts),
                totalCorrect: (existingPlayer.totalCorrect || 0) + sessionStats.correct,
                results: [...(existingPlayer.results || []), newResult].slice(-10),
                achievements: existingPlayer.achievements || [],
                avatar: existingPlayer.avatar || 'robot',
                theme: existingPlayer.theme || 'default',
                settings: {
                    difficulty: DIFFICULTY_LEVELS.MEDIUM,
                    soundEnabled: true,
                    ...existingPlayer.settings
                },
                dailyStats: this.updateDailyStats(existingPlayer.dailyStats || {}, sessionStats),
                lastPlayed: new Date().toISOString()
            }
        };
    }

    static updateDailyStats(dailyStats, sessionStats) {
        const today = new Date().toDateString();
        const todayStats = dailyStats[today] || { correct: 0, wrong: 0, timeouts: 0, gamesPlayed: 0 };
        
        return {
            ...dailyStats,
            [today]: {
                correct: todayStats.correct + sessionStats.correct,
                wrong: todayStats.wrong + sessionStats.wrong,
                timeouts: todayStats.timeouts + sessionStats.timeouts,
                gamesPlayed: todayStats.gamesPlayed + 1
            }
        };
