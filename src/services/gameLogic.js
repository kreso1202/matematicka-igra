import { LEVELS, GAME_MODES } from './gameConfig.js';

export class GameLogic {
    static getCurrentLevelData(currentLevel) {
        return LEVELS.find(l => l.id === currentLevel);
    }

    static generateQuestion(currentLevel, gameMode = GAME_MODES.CLASSIC) {
        const levelData = this.getCurrentLevelData(currentLevel);
        let operations, operation;
        let num1, num2, result, question;

        // Odaberi operacije na temelju game mode-a
        switch (gameMode) {
            case GAME_MODES.ADDITION:
                operations = ['+'];
                break;
            case GAME_MODES.SUBTRACTION:
                operations = ['-'];
                break;
            case GAME_MODES.MULTIPLICATION:
                operations = ['×'];
                break;
            case GAME_MODES.DIVISION:
                operations = ['÷'];
                break;
            case GAME_MODES.SPRINT:
                // Sprint mode - brže pitanja, sve operacije
                operations = ['+', '-', '×', '÷'];
                break;
            case GAME_MODES.TRAINING:
            case GAME_MODES.CLASSIC:
            default:
                // Koristi operacije iz level definicije
                operations = [...levelData.operations];
                break;
        }

        // Odaberi operaciju
        if (gameMode === GAME_MODES.CLASSIC || gameMode === GAME_MODES.TRAINING) {
            // Za classic/training mode, koristi level weights
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
        } else {
            // Za specifične modove, random iz dostupnih operacija
            operation = operations[Math.floor(Math.random() * operations.length)];
        }

        // Generiraj brojeve na temelju operacije i mode-a
        switch (operation) {
            case '+':
                if (gameMode === GAME_MODES.ADDITION) {
                    // POBOLJŠANA Addition mode progresija
                    switch (currentLevel) {
                        case 1:
                            num1 = Math.floor(Math.random() * 10) + 1;      // 1-10
                            num2 = Math.floor(Math.random() * 10) + 1;      // 1-10
                            break;
                        case 2:
                            num1 = Math.floor(Math.random() * 20) + 1;      // 1-20
                            num2 = Math.floor(Math.random() * 20) + 1;      // 1-20
                            break;
                        case 3:
                            num1 = Math.floor(Math.random() * 35) + 15;     // 15-50
                            num2 = Math.floor(Math.random() * 35) + 15;     // 15-50
                            break;
                        case 4:
                            num1 = Math.floor(Math.random() * 50) + 25;     // 25-75
                            num2 = Math.floor(Math.random() * 50) + 25;     // 25-75
                            break;
                        case 5:
                            num1 = Math.floor(Math.random() * 75) + 50;     // 50-125
                            num2 = Math.floor(Math.random() * 75) + 50;     // 50-125
                            break;
                        case 6:
                            num1 = Math.floor(Math.random() * 100) + 75;    // 75-175
                            num2 = Math.floor(Math.random() * 100) + 75;    // 75-175
                            break;
                        case 7:
                            num1 = Math.floor(Math.random() * 150) + 100;   // 100-250
                            num2 = Math.floor(Math.random() * 150) + 100;   // 100-250
                            break;
                        default:
                            num1 = Math.floor(Math.random() * 200) + 150;   // 150-350
                            num2 = Math.floor(Math.random() * 200) + 150;   // 150-350
                    }
                } else if (gameMode === GAME_MODES.SPRINT) {
                    // Sprint mode - lakši brojevi za brzinu
                    num1 = Math.floor(Math.random() * (15 + currentLevel * 5)) + 1;
                    num2 = Math.floor(Math.random() * (15 + currentLevel * 5)) + 1;
                } else {
                    // Classic/Training mode - umjereno progresivno
                    if (levelData.id <= 2) {
                        num1 = Math.floor(Math.random() * levelData.maxNum) + 1;
                        num2 = Math.floor(Math.random() * levelData.maxNum) + 1;
                    } else {
                        const range = Math.min(20 + (currentLevel * 10), 100);
                        num1 = Math.floor(Math.random() * range) + 1;
                        num2 = Math.floor(Math.random() * range) + 1;
                    }
                }
                result = num1 + num2;
                question = `${num1} + ${num2}`;
                break;
                
            case '-':
                if (gameMode === GAME_MODES.SUBTRACTION) {
                    // POBOLJŠANA Subtraction mode progresija
                    switch (currentLevel) {
                        case 1:
                            num1 = Math.floor(Math.random() * 15) + 10;     // 10-25
                            num2 = Math.floor(Math.random() * (num1 - 5)) + 1; // rezultat 1-20
                            break;
                        case 2:
                            num1 = Math.floor(Math.random() * 30) + 20;     // 20-50
                            num2 = Math.floor(Math.random() * (num1 - 10)) + 1; // rezultat 1-40
                            break;
                        case 3:
                            num1 = Math.floor(Math.random() * 50) + 40;     // 40-90
                            num2 = Math.floor(Math.random() * (num1 - 15)) + 1; // rezultat 1-75
                            break;
                        case 4:
                            num1 = Math.floor(Math.random() * 75) + 75;     // 75-150
                            num2 = Math.floor(Math.random() * (num1 - 25)) + 1; // rezultat 1-125
                            break;
                        case 5:
                            num1 = Math.floor(Math.random() * 100) + 125;   // 125-225
                            num2 = Math.floor(Math.random() * (num1 - 50)) + 1; // rezultat 1-175
                            break;
                        case 6:
                            num1 = Math.floor(Math.random() * 150) + 200;   // 200-350
                            num2 = Math.floor(Math.random() * (num1 - 75)) + 1; // rezultat 1-275
                            break;
                        case 7:
                            num1 = Math.floor(Math.random() * 200) + 300;   // 300-500
                            num2 = Math.floor(Math.random() * (num1 - 100)) + 1; // rezultat 1-400
                            break;
                        default:
                            num1 = Math.floor(Math.random() * 300) + 400;   // 400-700
                            num2 = Math.floor(Math.random() * (num1 - 150)) + 1; // rezultat 1-550
                    }
                } else if (gameMode === GAME_MODES.SPRINT) {
                    // Sprint mode
                    const maxNum = 25 + (currentLevel * 10);
                    num1 = Math.floor(Math.random() * maxNum) + 15;
                    num2 = Math.floor(Math.random() * (num1 - 5)) + 1;
                } else {
                    // Classic/Training mode
                    if (levelData.id <= 2) {
                        num1 = Math.floor(Math.random() * levelData.maxNum) + 10;
                        num2 = Math.floor(Math.random() * num1) + 1;
                    } else {
                        const range = Math.min(30 + (currentLevel * 15), 150);
                        num1 = Math.floor(Math.random() * range) + 20;
                        num2 = Math.floor(Math.random() * (num1 - 10)) + 1;
                    }
                }
                result = num1 - num2;
                question = `${num1} - ${num2}`;
                break;
                
            case '×':
                if (gameMode === GAME_MODES.MULTIPLICATION) {
                    // POBOLJŠANA Multiplication mode progresija
                    switch (currentLevel) {
                        case 1:
                            // Tablice 1-3
                            num1 = Math.floor(Math.random() * 3) + 1;       // 1-3
                            num2 = Math.floor(Math.random() * 10) + 1;      // 1-10
                            break;
                        case 2:
                            // Tablice 1-5
                            num1 = Math.floor(Math.random() * 5) + 1;       // 1-5
                            num2 = Math.floor(Math.random() * 10) + 1;      // 1-10
                            break;
                        case 3:
                            // Tablice 1-7
                            num1 = Math.floor(Math.random() * 7) + 1;       // 1-7
                            num2 = Math.floor(Math.random() * 12) + 1;      // 1-12
                            break;
                        case 4:
                            // Tablice 1-9
                            num1 = Math.floor(Math.random() * 9) + 1;       // 1-9
                            num2 = Math.floor(Math.random() * 12) + 1;      // 1-12
                            break;
                        case 5:
                            // Tablice 1-12
                            num1 = Math.floor(Math.random() * 12) + 1;      // 1-12
                            num2 = Math.floor(Math.random() * 12) + 1;      // 1-12
                            break;
                        case 6:
                            // Proširene tablice 1-15
                            num1 = Math.floor(Math.random() * 15) + 1;      // 1-15
                            num2 = Math.floor(Math.random() * 15) + 1;      // 1-15
                            break;
                        case 7:
                            // Teške tablice 1-20
                            num1 = Math.floor(Math.random() * 20) + 1;      // 1-20
                            num2 = Math.floor(Math.random() * 20) + 1;      // 1-20
                            break;
                        default:
                            // Ekstremne tablice
                            num1 = Math.floor(Math.random() * 25) + 1;      // 1-25
                            num2 = Math.floor(Math.random() * 25) + 1;      // 1-25
                    }
                } else if (gameMode === GAME_MODES.SPRINT) {
                    // Sprint mode - fokus na brzinu
                    const maxFactor = Math.min(6 + currentLevel, 12);
                    num1 = Math.floor(Math.random() * maxFactor) + 1;
                    num2 = Math.floor(Math.random() * maxFactor) + 1;
                } else {
                    // Classic/Training mode
                    const maxFactor = Math.min(8 + currentLevel, 15);
                    num1 = Math.floor(Math.random() * maxFactor) + 1;
                    num2 = Math.floor(Math.random() * maxFactor) + 1;
                }
                result = num1 * num2;
                question = `${num1} × ${num2}`;
                break;
                
            case '÷':
                if (gameMode === GAME_MODES.DIVISION) {
                    // POBOLJŠANA Division mode progresija
                    switch (currentLevel) {
                        case 1:
                            // Lakše dijeljenje (rezultat 1-5)
                            num2 = Math.floor(Math.random() * 5) + 2;       // djelitelj 2-6
                            result = Math.floor(Math.random() * 5) + 1;     // rezultat 1-5
                            break;
                        case 2:
                            // Umjereno dijeljenje (rezultat 1-8)
                            num2 = Math.floor(Math.random() * 7) + 2;       // djelitelj 2-8
                            result = Math.floor(Math.random() * 8) + 1;     // rezultat 1-8
                            break;
                        case 3:
                            // Standardne tablice (rezultat 1-10)
                            num2 = Math.floor(Math.random() * 9) + 2;       // djelitelj 2-10
                            result = Math.floor(Math.random() * 10) + 1;    // rezultat 1-10
                            break;
                        case 4:
                            // Proširene tablice (rezultat 1-12)
                            num2 = Math.floor(Math.random() * 11) + 2;      // djelitelj 2-12
                            result = Math.floor(Math.random() * 12) + 1;    // rezultat 1-12
                            break;
                        case 5:
                            // Teže tablice (rezultat 1-15)
                            num2 = Math.floor(Math.random() * 13) + 2;      // djelitelj 2-14
                            result = Math.floor(Math.random() * 15) + 1;    // rezultat 1-15
                            break;
                        case 6:
                            // Vrlo teške tablice (rezultat 1-20)
                            num2 = Math.floor(Math.random() * 18) + 2;      // djelitelj 2-19
                            result = Math.floor(Math.random() * 20) + 1;    // rezultat 1-20
                            break;
                        case 7:
                            // Ekstremne tablice (rezultat 1-25)
                            num2 = Math.floor(Math.random() * 23) + 2;      // djelitelj 2-24
                            result = Math.floor(Math.random() * 25) + 1;    // rezultat 1-25
                            break;
                        default:
                            // Najteže tablice
                            num2 = Math.floor(Math.random() * 28) + 2;      // djelitelj 2-29
                            result = Math.floor(Math.random() * 30) + 1;    // rezultat 1-30
                    }
                } else if (gameMode === GAME_MODES.SPRINT) {
                    // Sprint mode - fokus na brzinu
                    const maxDivisor = Math.min(5 + currentLevel, 12);
                    const maxResult = Math.min(6 + currentLevel, 10);
                    num2 = Math.floor(Math.random() * maxDivisor) + 2;
                    result = Math.floor(Math.random() * maxResult) + 1;
                } else {
                    // Classic/Training mode
                    const maxDivisor = Math.min(8 + currentLevel, 15);
                    const maxResult = Math.min(8 + currentLevel, 15);
                    num2 = Math.floor(Math.random() * maxDivisor) + 2;
                    result = Math.floor(Math.random() * maxResult) + 1;
                }
                num1 = num2 * result;
                question = `${num1} ÷ ${num2}`;
                break;
        }

        return { question, correctAnswer: result };
    }

    static calculateScore(timeLeft, streak, currentLevel, gameMode = GAME_MODES.CLASSIC) {
        const timeBonus = timeLeft * 2;
        const streakBonus = streak * 5;
        const levelBonus = currentLevel * 10;
        
        // Mode multiplikatori
        let modeMultiplier = 1;
        switch (gameMode) {
            case GAME_MODES.SPRINT:
                modeMultiplier = 1.5; // Bonus za sprint mode
                break;
            case GAME_MODES.MULTIPLICATION:
            case GAME_MODES.DIVISION:
                modeMultiplier = 1.3; // Bonus za teže operacije
                break;
            case GAME_MODES.ADDITION:
            case GAME_MODES.SUBTRACTION:
                modeMultiplier = 1.1; // Mali bonus za specifične operacije
                break;
            case GAME_MODES.TRAINING:
                modeMultiplier = 0.8; // Manji score za training
                break;
            default:
                modeMultiplier = 1;
        }
        
        return Math.round((20 + timeBonus + streakBonus + levelBonus) * modeMultiplier);
    }

    static getLevelProgress(questionsInLevel, currentLevel, gameMode = GAME_MODES.CLASSIC) {
        const levelData = this.getCurrentLevelData(currentLevel);
        
        // Za specifične modove, možda treba više pitanja
        let questionsNeeded = levelData.questionsNeeded;
        if (gameMode === GAME_MODES.SPRINT) {
            questionsNeeded = Math.floor(questionsNeeded * 1.5); // Više pitanja za sprint
        } else if (gameMode === GAME_MODES.TRAINING) {
            questionsNeeded = Math.floor(questionsNeeded * 0.8); // Manje pitanja za training
        }
        
        return Math.min((questionsInLevel / questionsNeeded) * 100, 100);
    }

    static shouldLevelUp(questionsInLevel, currentLevel, gameMode = GAME_MODES.CLASSIC) {
        const levelData = this.getCurrentLevelData(currentLevel);
        
        // Za specifične modove, možda treba više pitanja
        let questionsNeeded = levelData.questionsNeeded;
        if (gameMode === GAME_MODES.SPRINT) {
            questionsNeeded = Math.floor(questionsNeeded * 1.5); // Više pitanja za sprint
        } else if (gameMode === GAME_MODES.TRAINING) {
            questionsNeeded = Math.floor(questionsNeeded * 0.8); // Manje pitanja za training
        }
        
        return questionsInLevel >= questionsNeeded;
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

    static getGameModeDisplayName(gameMode) {
        const displayNames = {
            [GAME_MODES.CLASSIC]: 'Klasična igra',
            [GAME_MODES.TRAINING]: 'Trening',
            [GAME_MODES.SPRINT]: 'Sprint',
            [GAME_MODES.ADDITION]: 'Zbrajanje',
            [GAME_MODES.SUBTRACTION]: 'Oduzimanje', 
            [GAME_MODES.MULTIPLICATION]: 'Množenje',
            [GAME_MODES.DIVISION]: 'Dijeljenje'
        };
        return displayNames[gameMode] || gameMode;
    }

    static getGameModeDescription(gameMode) {
        const descriptions = {
            [GAME_MODES.CLASSIC]: 'Sve operacije kroz progresivne nivoe',
            [GAME_MODES.TRAINING]: 'Vježbanje bez vremenskog ograničenja',
            [GAME_MODES.SPRINT]: 'Brza igra sa svim operacijama',
            [GAME_MODES.ADDITION]: 'Fokus na zbrajanje brojeva',
            [GAME_MODES.SUBTRACTION]: 'Fokus na oduzimanje brojeva',
            [GAME_MODES.MULTIPLICATION]: 'Tablice množenja',
            [GAME_MODES.DIVISION]: 'Tablice dijeljenja'
        };
        return descriptions[gameMode] || 'Opis nije dostupan';
    }

    static getGameModeIcon(gameMode) {
        const icons = {
            [GAME_MODES.CLASSIC]: '🎯',
            [GAME_MODES.TRAINING]: '🏋️',
            [GAME_MODES.SPRINT]: '⚡',
            [GAME_MODES.ADDITION]: '➕',
            [GAME_MODES.SUBTRACTION]: '➖',
            [GAME_MODES.MULTIPLICATION]: '✖️',
            [GAME_MODES.DIVISION]: '➗'
        };
        return icons[gameMode] || '🎮';
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

    static updatePlayerData(allPlayers, playerName, score, currentLevel, sessionStats, gameTime = 0, gameMode = GAME_MODES.CLASSIC, preferences = {}) {
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
                gameModeStats: {}, // Nova statistika po game mode-u
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
            gameModeStats: {
                ...existing.statistics.gameModeStats,
                [gameMode]: {
                    gamesPlayed: (existing.statistics.gameModeStats[gameMode]?.gamesPlayed || 0) + 1,
                    questionsAnswered: (existing.statistics.gameModeStats[gameMode]?.questionsAnswered || 0) + totalQuestions,
                    correctAnswers: (existing.statistics.gameModeStats[gameMode]?.correctAnswers || 0) + sessionStats.correct,
                    bestScore: Math.max(existing.statistics.gameModeStats[gameMode]?.bestScore || 0, score),
                    totalScore: (existing.statistics.gameModeStats[gameMode]?.totalScore || 0) + score
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
            gameMode: gameMode,
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

    static getGameModeStats(playerData) {
        return playerData?.statistics?.gameModeStats || {};
    }
}
