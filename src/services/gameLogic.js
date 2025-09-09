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

    static updatePlayerData(allPlayers, playerName, score, currentLevel, sessionStats) {
        const newResult = {
            date: new Date().toLocaleDateString('hr-HR'),
            time: new Date().toLocaleTimeString('hr-HR'),
            score: score,
            level: currentLevel,
            stats: sessionStats
        };

        return {
            ...allPlayers,
            [playerName]: {
                name: playerName,
                bestScore: Math.max(score, allPlayers[playerName]?.bestScore || 0),
                maxLevel: Math.max(currentLevel, allPlayers[playerName]?.maxLevel || 1),
                gamesPlayed: (allPlayers[playerName]?.gamesPlayed || 0) + 1,
                results: [...(allPlayers[playerName]?.results || []), newResult].slice(-10)
            }
        };
    }
}
