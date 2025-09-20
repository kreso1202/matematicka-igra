import { ACHIEVEMENTS } from './gameConfig.js';

export class AchievementManager {
    static checkAchievements(playerData, sessionStats, gameTime, streak) {
        const achievements = playerData.statistics?.achievements || { unlocked: [], progress: {} };
        const newUnlocked = [];

        // First Win
        if (!achievements.unlocked.includes('first_win') && playerData.gamesPlayed >= 1) {
            newUnlocked.push('first_win');
        }

        // Perfect Level
        if (!achievements.unlocked.includes('perfect_level') && 
            sessionStats.wrong === 0 && sessionStats.timeouts === 0 && sessionStats.correct > 0) {
            newUnlocked.push('perfect_level');
        }

        // Streak 10
        if (!achievements.unlocked.includes('streak_10') && streak >= 10) {
            newUnlocked.push('streak_10');
        }

        // Speed Demon - prosječno vrijeme po pitanju manje od 3 sekunde
        if (!achievements.unlocked.includes('speed_demon') && 
            sessionStats.correct > 0 && (gameTime / sessionStats.correct) < 3) {
            newUnlocked.push('speed_demon');
        }

        // Math Master
        if (!achievements.unlocked.includes('math_master') && playerData.maxLevel >= 7) {
            newUnlocked.push('math_master');
        }

        // Hundred Questions
        const totalQuestions = playerData.statistics?.totalQuestionsAnswered || 0;
        if (!achievements.unlocked.includes('hundred_questions') && totalQuestions >= 100) {
            newUnlocked.push('hundred_questions');
        }

        // Week Streak - igrao zadnjih 7 dana
        if (!achievements.unlocked.includes('week_streak')) {
            const dailyStats = playerData.statistics?.dailyStats || {};
            const last7Days = this.getLast7Days();
            const streakDays = last7Days.every(date => dailyStats[date]?.gamesPlayed > 0);
            if (streakDays) {
                newUnlocked.push('week_streak');
            }
        }

        // Ažurirati progress za achievements koji nisu unlocked
        const updatedProgress = { ...achievements.progress };
        
        if (!achievements.unlocked.includes('streak_10')) {
            updatedProgress.streak_10 = { current: Math.min(streak, 10), target: 10 };
        }
        
        if (!achievements.unlocked.includes('hundred_questions')) {
            updatedProgress.hundred_questions = { current: Math.min(totalQuestions, 100), target: 100 };
        }

        return {
            unlocked: [...achievements.unlocked, ...newUnlocked],
            progress: updatedProgress,
            newUnlocked
        };
    }

    static getLast7Days() {
        const days = [];
        for (let i = 6; i >= 0; i--) {
            const date = new Date();
            date.setDate(date.getDate() - i);
            days.push(date.toDateString());
        }
        return days;
    }

    static getAchievementData(achievementId) {
        return ACHIEVEMENTS[achievementId.toUpperCase()];
    }

    static formatAchievementNotification(achievementId) {
        const achievement = this.getAchievementData(achievementId);
        if (!achievement) return null;

        return {
            id: achievementId,
            title: achievement.name,
            description: achievement.description,
            emoji: achievement.emoji
        };
    }
}
