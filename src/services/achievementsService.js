import { ACHIEVEMENTS } from './gameConfig.js';

export class AchievementsService {
    static checkAchievements(playerData, sessionStats, gameResults) {
        const newAchievements = [];
        const existingAchievements = playerData.achievements || [];
        
        // Check each achievement
        Object.values(ACHIEVEMENTS).forEach(achievement => {
            if (!existingAchievements.includes(achievement.id)) {
                if (this.isAchievementUnlocked(achievement.id, playerData, sessionStats, gameResults)) {
                    newAchievements.push(achievement.id);
                }
            }
        });

        return newAchievements;
    }

    static isAchievementUnlocked(achievementId, playerData, sessionStats, gameResults) {
        switch (achievementId) {
            case 'first_win':
                return playerData.gamesPlayed >= 1;
                
            case 'perfect_level':
                return sessionStats.wrong === 0 && sessionStats.timeouts === 0 && sessionStats.correct > 0;
                
            case 'streak_10':
                return gameResults.maxStreak >= 10;
                
            case 'speed_demon':
                return gameResults.fastestAnswer <= 3;
                
            case 'math_master':
                return playerData.maxLevel >= 7;
                
            case 'hundred_questions':
                return playerData.totalQuestions >= 100;
                
            case 'week_streak':
                return this.checkWeekStreak(playerData.dailyStats);
                
            default:
                return false;
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

    static getAchievementProgress(achievementId, playerData) {
        switch (achievementId) {
            case 'hundred_questions':
                return Math.min((playerData.totalQuestions || 0) / 100 * 100, 100);
                
            case 'math_master':
                return Math.min((playerData.maxLevel || 1) / 7 * 100, 100);
                
            case 'week_streak':
                const consecutiveDays = this.getConsecutiveDays(playerData.dailyStats);
                return Math.min(consecutiveDays / 7 * 100, 100);
                
            default:
                return 0;
        }
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
}
