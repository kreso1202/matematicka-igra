import { ACHIEVEMENTS } from './gameConfig.js';

export class AchievementManager {
    static checkAchievements(playerData, sessionStats, gameTime, maxStreak) {
        const currentAchievements = playerData.statistics?.achievements?.unlocked || [];
        const newUnlocked = [];
        const updatedProgress = { ...playerData.statistics?.achievements?.progress || {} };
        
        // Check each achievement
        Object.values(ACHIEVEMENTS).forEach(achievement => {
            if (!currentAchievements.includes(achievement.id)) {
                const result = this.isAchievementUnlocked(achievement.id, playerData, sessionStats, { gameTime, maxStreak });
                if (result.unlocked) {
                    newUnlocked.push(achievement.id);
                } else if (result.progress) {
                    updatedProgress[achievement.id] = result.progress;
                }
            }
        });
        
        return {
            newUnlocked,
            unlocked: [...currentAchievements, ...newUnlocked],
            progress: updatedProgress
        };
    }
    
    static isAchievementUnlocked(achievementId, playerData, sessionStats, gameResults) {
        const stats = playerData.statistics || {};
        
        switch (achievementId) {
            case 'first_win':
                return {
                    unlocked: playerData.gamesPlayed >= 1,
                    progress: null
                };
                
            case 'perfect_level':
                const isPerfect = sessionStats.wrong === 0 && sessionStats.timeouts === 0 && sessionStats.correct > 0;
                return {
                    unlocked: isPerfect,
                    progress: null
                };
                
            case 'streak_10':
                const hasStreak10 = gameResults.maxStreak >= 10;
                return {
                    unlocked: hasStreak10,
                    progress: hasStreak10 ? null : {
                        current: gameResults.maxStreak || 0,
                        target: 10
                    }
                };
                
            case 'speed_demon':
                // Since we don't track fastestAnswer yet, return false for now
                // TODO: Implement fastestAnswer tracking in PlayerManager
                return {
                    unlocked: false,
                    progress: {
                        current: 0,
                        target: 1
                    }
                };
                
            case 'math_master':
                const hasMathMaster = playerData.maxLevel >= 7;
                return {
                    unlocked: hasMathMaster,
                    progress: hasMathMaster ? null : {
                        current: playerData.maxLevel || 1,
                        target: 7
                    }
                };
                
            case 'hundred_questions':
                const totalQuestions = stats.totalQuestionsAnswered || 0;
                const hasHundred = totalQuestions >= 100;
                return {
                    unlocked: hasHundred,
                    progress: hasHundred ? null : {
                        current: totalQuestions,
                        target: 100
                    }
                };
                
            case 'week_streak':
                const hasWeekStreak = this.checkWeekStreak(stats.dailyStats);
                const consecutiveDays = this.getConsecutiveDays(stats.dailyStats);
                return {
                    unlocked: hasWeekStreak,
                    progress: hasWeekStreak ? null : {
                        current: consecutiveDays,
                        target: 7
                    }
                };
                
            default:
                return {
                    unlocked: false,
                    progress: null
                };
        }
    }
    
    static checkWeekStreak(dailyStats) {
        if (!dailyStats) return false;
        
        const today = new Date();
        let consecutiveDays = 0;
        
        for (let i = 0; i < 7; i++) {
            const date = new Date(today);
            date.setDate(date.getDate() - i);
            const dateStr = date.toDateString();
            
            if (dailyStats[dateStr] && dailyStats[dateStr].gamesPlayed > 0) {
                consecutiveDays++;
            } else {
                break;
            }
        }
        
        return consecutiveDays >= 7;
    }
    
    static getConsecutiveDays(dailyStats) {
        if (!dailyStats) return 0;
        
        const today = new Date();
        let consecutiveDays = 0;
        
        for (let i = 0; i < 30; i++) {
            const date = new Date(today);
            date.setDate(date.getDate() - i);
            const dateStr = date.toDateString();
            
            if (dailyStats[dateStr] && dailyStats[dateStr].gamesPlayed > 0) {
                consecutiveDays++;
            } else {
                break;
            }
        }
        
        return consecutiveDays;
    }
    
    static getAchievementProgress(achievementId, playerData) {
        const stats = playerData.statistics || {};
        
        switch (achievementId) {
            case 'hundred_questions':
                const totalQuestions = stats.totalQuestionsAnswered || 0;
                return Math.min((totalQuestions / 100) * 100, 100);
                
            case 'math_master':
                const currentLevel = playerData.maxLevel || 1;
                return Math.min((currentLevel / 7) * 100, 100);
                
            case 'week_streak':
                const consecutiveDays = this.getConsecutiveDays(stats.dailyStats);
                return Math.min((consecutiveDays / 7) * 100, 100);
                
            case 'streak_10':
                const bestStreak = stats.bestStreak || 0;
                return Math.min((bestStreak / 10) * 100, 100);
                
            default:
                return 0;
        }
    }
    
    // NEW: Missing function that AchievementsScreen tries to call
    static getAchievementData(achievementId) {
        return ACHIEVEMENTS[achievementId.toUpperCase()] || null;
    }
    
    // NEW: Get all achievements with their unlock status
    static getAllAchievementsWithStatus(playerData) {
        const currentAchievements = playerData.statistics?.achievements?.unlocked || [];
        const progress = playerData.statistics?.achievements?.progress || {};
        
        return Object.values(ACHIEVEMENTS).map(achievement => ({
            ...achievement,
            isUnlocked: currentAchievements.includes(achievement.id),
            progress: progress[achievement.id] || null
        }));
    }
}
