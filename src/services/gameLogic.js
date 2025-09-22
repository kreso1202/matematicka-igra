import { LEVELS, GAME_MODES, MATH_TIPS } from './gameConfig.js';

export class GameLogic {
    static getCurrentLevelData(currentLevel) {
        return LEVELS.find(l => l.id === currentLevel);
    }

    static generateQuestion(currentLevel, gameMode = GAME_MODES.CLASSIC, difficulty = 'medium') {
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

        // Generiraj brojeve na temelju operacije, mode-a i DIFFICULTY
        switch (operation) {
            case '+':
                if (gameMode === GAME_MODES.ADDITION) {
                    // POBOLJŠANA Addition mode - prilagođeno djeci do 3. razreda
                    const ranges = this.getAdditionRanges(currentLevel, difficulty);
                    num1 = Math.floor(Math.random() * ranges.max) + ranges.min;
                    num2 = Math.floor(Math.random() * ranges.max) + ranges.min;
                } else if (gameMode === GAME_MODES.SPRINT) {
                    // Sprint mode - brži, lakši brojevi
                    const ranges = this.getAdditionRanges(Math.min(currentLevel, 4), difficulty);
                    num1 = Math.floor(Math.random() * ranges.max) + ranges.min;
                    num2 = Math.floor(Math.random() * ranges.max) + ranges.min;
                } else {
                    // Classic/Training mode
                    const ranges = this.getAdditionRanges(currentLevel, difficulty);
                    num1 = Math.floor(Math.random() * ranges.max) + ranges.min;
                    num2 = Math.floor(Math.random() * ranges.max) + ranges.min;
                }
                result = num1 + num2;
                question = `${num1} + ${num2}`;
                break;
                
            case '-':
                if (gameMode === GAME_MODES.SUBTRACTION) {
                    // POBOLJŠANA Subtraction mode - prilagođeno djeci
                    const ranges = this.getSubtractionRanges(currentLevel, difficulty);
                    num1 = Math.floor(Math.random() * (ranges.maxFirst - ranges.minFirst)) + ranges.minFirst;
                    const maxSecond = Math.min(num1 - 1, ranges.maxSecond);
                    num2 = Math.floor(Math.random() * maxSecond) + 1;
                } else if (gameMode === GAME_MODES.SPRINT) {
                    const ranges = this.getSubtractionRanges(Math.min(currentLevel, 4), difficulty);
                    num1 = Math.floor(Math.random() * (ranges.maxFirst - ranges.minFirst)) + ranges.minFirst;
                    const maxSecond = Math.min(num1 - 1, ranges.maxSecond);
                    num2 = Math.floor(Math.random() * maxSecond) + 1;
                } else {
                    // Classic/Training mode
                    const ranges = this.getSubtractionRanges(currentLevel, difficulty);
                    num1 = Math.floor(Math.random() * (ranges.maxFirst - ranges.minFirst)) + ranges.minFirst;
                    const maxSecond = Math.min(num1 - 1, ranges.maxSecond);
                    num2 = Math.floor(Math.random() * maxSecond) + 1;
                }
                result = num1 - num2;
                question = `${num1} - ${num2}`;
                break;
                
            case '×':
                if (gameMode === GAME_MODES.MULTIPLICATION) {
                    // POBOLJŠANA Multiplication mode - prilagođeno djeci
                    const ranges = this.getMultiplicationRanges(currentLevel, difficulty);
                    num1 = Math.floor(Math.random() * ranges.max) + ranges.min;
                    num2 = Math.floor(Math.random() * ranges.max) + ranges.min;
                } else if (gameMode === GAME_MODES.SPRINT) {
                    const ranges = this.getMultiplicationRanges(Math.min(currentLevel, 4), difficulty);
                    num1 = Math.floor(Math.random() * ranges.max) + ranges.min;
                    num2 = Math.floor(Math.random() * ranges.max) + ranges.min;
                } else {
                    // Classic/Training mode
                    const ranges = this.getMultiplicationRanges(currentLevel, difficulty);
                    num1 = Math.floor(Math.random() * ranges.max) + ranges.min;
                    num2 = Math.floor(Math.random() * ranges.max) + ranges.min;
                }
                result = num1 * num2;
                question = `${num1} × ${num2}`;
                break;
                
            case '÷':
                if (gameMode === GAME_MODES.DIVISION) {
                    // POBOLJŠANA Division mode - prilagođeno djeci
                    const ranges = this.getDivisionRanges(currentLevel, difficulty);
                    num2 = Math.floor(Math.random() * ranges.maxDivisor) + ranges.minDivisor;
                    result = Math.floor(Math.random() * ranges.maxResult) + 1;
                } else if (gameMode === GAME_MODES.SPRINT) {
                    const ranges = this.getDivisionRanges(Math.min(currentLevel, 4), difficulty);
                    num2 = Math.floor(Math.random() * ranges.maxDivisor) + ranges.minDivisor;
                    result = Math.floor(Math.random() * ranges.maxResult) + 1;
                } else {
                    // Classic/Training mode
                    const ranges = this.getDivisionRanges(currentLevel, difficulty);
                    num2 = Math.floor(Math.random() * ranges.maxDivisor) + ranges.minDivisor;
                    result = Math.floor(Math.random() * ranges.maxResult) + 1;
                }
                num1 = num2 * result;
                question = `${num1} ÷ ${num2}`;
                break;
        }

        return { question, correctAnswer: result };
    }

    // NOVE HELPER FUNKCIJE ZA RANGES - PRILAGOĐENO DJECI DO 3. RAZREDA
    static getAdditionRanges(level, difficulty) {
        const ranges = {
            1: {
                easy: { min: 1, max: 5 },      // 1+1 do 5+5 = 10
                medium: { min: 1, max: 10 },   // 1+1 do 10+10 = 20  
                hard: { min: 1, max: 15 }      // 1+1 do 15+15 = 30
            },
            2: {
                easy: { min: 1, max: 10 },     // do 20
                medium: { min: 1, max: 15 },   // do 30
                hard: { min: 1, max: 20 }      // do 40
            },
            3: {
                easy: { min: 1, max: 15 },     // do 30
                medium: { min: 1, max: 25 },   // do 50
                hard: { min: 1, max: 35 }      // do 70
            },
            4: {
                easy: { min: 1, max: 20 },     // do 40
                medium: { min: 1, max: 30 },   // do 60
                hard: { min: 1, max: 40 }      // do 80
            },
            5: {
                easy: { min: 1, max: 25 },     // do 50
                medium: { min: 1, max: 35 },   // do 70
                hard: { min: 1, max: 45 }      // do 90
            },
            6: {
                easy: { min: 1, max: 30 },     // do 60
                medium: { min: 1, max: 40 },   // do 80
                hard: { min: 1, max: 50 }      // do 100
            },
            7: {
                easy: { min: 1, max: 35 },     // do 70
                medium: { min: 1, max: 45 },   // do 90
                hard: { min: 1, max: 55 }      // do 110
            }
        };
        return ranges[level] ? ranges[level][difficulty] : ranges[7][difficulty];
    }

    static getSubtractionRanges(level, difficulty) {
        const ranges = {
            1: {
                easy: { minFirst: 5, maxFirst: 10, maxSecond: 5 },    // 5-1 do 10-5
                medium: { minFirst: 10, maxFirst: 20, maxSecond: 10 }, // 10-1 do 20-10
                hard: { minFirst: 15, maxFirst: 30, maxSecond: 15 }    // 15-1 do 30-15
            },
            2: {
                easy: { minFirst: 10, maxFirst: 20, maxSecond: 10 },
                medium: { minFirst: 15, maxFirst: 30, maxSecond: 15 },
                hard: { minFirst: 20, maxFirst: 40, maxSecond: 20 }
            },
            3: {
                easy: { minFirst: 15, maxFirst: 30, maxSecond: 15 },
                medium: { minFirst: 20, maxFirst: 50, maxSecond: 25 },
                hard: { minFirst: 30, maxFirst: 70, maxSecond: 35 }
            },
            4: {
                easy: { minFirst: 20, maxFirst: 40, maxSecond: 20 },
                medium: { minFirst: 30, maxFirst: 60, maxSecond: 30 },
                hard: { minFirst: 40, maxFirst: 80, maxSecond: 40 }
            },
            5: {
                easy: { minFirst: 25, maxFirst: 50, maxSecond: 25 },
                medium: { minFirst: 35, maxFirst: 70, maxSecond: 35 },
                hard: { minFirst: 45, maxFirst: 90, maxSecond: 45 }
            },
            6: {
                easy: { minFirst: 30, maxFirst: 60, maxSecond: 30 },
                medium: { minFirst: 40, maxFirst: 80, maxSecond: 40 },
                hard: { minFirst: 50, maxFirst: 100, maxSecond: 50 }
            },
            7: {
                easy: { minFirst: 35, maxFirst: 70, maxSecond: 35 },
                medium: { minFirst: 45, maxFirst: 90, maxSecond: 45 },
                hard: { minFirst: 55, maxFirst: 110, maxSecond: 55 }
            }
        };
        return ranges[level] ? ranges[level][difficulty] : ranges[7][difficulty];
    }

    static getMultiplicationRanges(level, difficulty) {
        const ranges = {
            1: {
                easy: { min: 1, max: 2 },      // 1x1, 1x2, 2x1, 2x2
                medium: { min: 1, max: 3 },    // tablice do 3
                hard: { min: 1, max: 4 }       // tablice do 4
            },
            2: {
                easy: { min: 1, max: 3 },      // tablice do 3
                medium: { min: 1, max: 4 },    // tablice do 4
                hard: { min: 1, max: 5 }       // tablice do 5
            },
            3: {
                easy: { min: 1, max: 4 },      // tablice do 4
                medium: { min: 1, max: 5 },    // tablice do 5
                hard: { min: 1, max: 6 }       // tablice do 6
            },
            4: {
                easy: { min: 1, max: 5 },      // tablice do 5
                medium: { min: 1, max: 6 },    // tablice do 6
                hard: { min: 1, max: 7 }       // tablice do 7
            },
            5: {
                easy: { min: 1, max: 6 },      // tablice do 6
                medium: { min: 1, max: 7 },    // tablice do 7
                hard: { min: 1, max: 8 }       // tablice do 8
            },
            6: {
                easy: { min: 1, max: 7 },      // tablice do 7
                medium: { min: 1, max: 8 },    // tablice do 8
                hard: { min: 1, max: 10 }      // tablice do 10
            },
            7: {
                easy: { min: 1, max: 8 },      // tablice do 8
                medium: { min: 1, max: 10 },   // tablice do 10
                hard: { min: 1, max: 12 }      // tablice do 12 (tek na kraju!)
            }
        };
        return ranges[level] ? ranges[level][difficulty] : ranges[7][difficulty];
    }

    static getDivisionRanges(level, difficulty) {
        const ranges = {
            1: {
                easy: { minDivisor: 2, maxDivisor: 2, maxResult: 3 },    // 2÷2, 4÷2, 6÷2
                medium: { minDivisor: 2, maxDivisor: 3, maxResult: 4 },   // do 3÷3, 12÷3
                hard: { minDivisor: 2, maxDivisor: 4, maxResult: 5 }      // do 4÷4, 20÷4
            },
            2: {
                easy: { minDivisor: 2, maxDivisor: 3, maxResult: 4 },
                medium: { minDivisor: 2, maxDivisor: 4, maxResult: 5 },
                hard: { minDivisor: 2, maxDivisor: 5, maxResult: 6 }
            },
            3: {
                easy: { minDivisor: 2, maxDivisor: 4, maxResult: 5 },
                medium: { minDivisor: 2, maxDivisor: 5, maxResult: 6 },
                hard: { minDivisor: 2, maxDivisor: 6, maxResult: 7 }
            },
            4: {
                easy: { minDivisor: 2, maxDivisor: 5, maxResult: 6 },
                medium: { minDivisor: 2, maxDivisor: 6, maxResult: 7 },
                hard: { minDivisor: 2, maxDivisor: 7, maxResult: 8 }
            },
            5: {
                easy: { minDivisor: 2, maxDivisor: 6, maxResult: 7 },
                medium: { minDivisor: 2, maxDivisor: 7, maxResult: 8 },
                hard: { minDivisor: 2, maxDivisor: 8, maxResult: 9 }
            },
            6: {
                easy: { minDivisor: 2, maxDivisor: 7, maxResult: 8 },
                medium: { minDivisor: 2, maxDivisor: 8, maxResult: 9 },
                hard: { minDivisor: 2, maxDivisor: 10, maxResult: 10 }
            },
            7: {
                easy: { minDivisor: 2, maxDivisor: 8, maxResult: 9 },
                medium: { minDivisor: 2, maxDivisor: 10, maxResult: 10 },
                hard: { minDivisor: 2, maxDivisor: 12, maxResult: 12 }  // tek na kraju!
            }
        };
        return ranges[level] ? ranges[level][difficulty] : ranges[7][difficulty];
    }

    static calculateScore(timeLeft, streak, currentLevel, gameMode = GAME_MODES.CLASSIC, difficulty = 'medium') {
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
        
        // Difficulty multiplikatori
        let difficultyMultiplier = 1;
        switch (difficulty) {
            case 'easy':
                difficultyMultiplier = 0.8;
                break;
            case 'medium':
                difficultyMultiplier = 1.0;
                break;
            case 'hard':
                difficultyMultiplier = 1.3;
                break;
        }
        
        return Math.round((20 + timeBonus + streakBonus + levelBonus) * modeMultiplier * difficultyMultiplier);
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

    static getMathTip(operation, gameMode) {
        // Mapiranje operacija na tip kategorije
        const operationMap = {
            '+': 'addition',
            '-': 'subtraction', 
            '×': 'multiplication',
            '÷': 'division'
        };

        // Za game modove, koristi specifičnu kategoriju
        let category;
        switch (gameMode) {
            case GAME_MODES.ADDITION:
                category = 'addition';
                break;
            case GAME_MODES.SUBTRACTION:
                category = 'subtraction';
                break;
            case GAME_MODES.MULTIPLICATION:
                category = 'multiplication';
                break;
            case GAME_MODES.DIVISION:
                category = 'division';
                break;
            default:
                // Za classic/training/sprint, koristi operaciju iz pitanja
                category = operationMap[operation] || 'addition';
        }

        const tips = MATH_TIPS[category];
        if (!tips || tips.length === 0) return null;

        // Vrati random savjet iz kategorije
        return tips[Math.floor(Math.random() * tips.length)];
    }

    static getOperationFromQuestion(question) {
        if (question.includes(' + ')) return '+';
        if (question.includes(' - ')) return '-';
        if (question.includes(' × ')) return '×';
        if (question.includes(' ÷ ')) return '÷';
        return '+'; // fallback
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

    static updatePlayerData(allPlayers, playerName, score, currentLevel, sessionStats, gameTime = 0, gameMode = GAME_MODES.CLASSIC, fastestAnswerTime = null, preferences = {}) {
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
                fastestAnswer: null, // NEW: Track fastest answer time
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
        
        // NEW: Update fastest answer time
        const currentFastest = existing.statistics.fastestAnswer;
        const newFastestAnswer = fastestAnswerTime && (!currentFastest || fastestAnswerTime < currentFastest) 
            ? fastestAnswerTime 
            : currentFastest;
        
        const newStats = {
            ...existing.statistics,
            totalTimeSpent: existing.statistics.totalTimeSpent + gameTime,
            totalQuestionsAnswered: newTotalQuestions,
            totalCorrectAnswers: newTotalCorrect,
            averageAccuracy: newTotalQuestions > 0 ? (newTotalCorrect / newTotalQuestions * 100) : 0,
            bestStreak: Math.max(existing.statistics.bestStreak || 0, sessionStats.maxStreak || 0),
            fastestAnswer: newFastestAnswer, // NEW: Add fastest answer tracking
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
            gameTime: gameTime,
            fastestAnswer: fastestAnswerTime // NEW: Include fastest answer in results
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
