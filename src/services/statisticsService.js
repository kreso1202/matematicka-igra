export class StatisticsService {
    static getPlayerStatistics(playerData) {
        if (!playerData) return null;

        const totalQuestions = playerData.totalQuestions || 0;
        const totalCorrect = playerData.totalCorrect || 0;
        const accuracy = totalQuestions > 0 ? Math.round((totalCorrect / totalQuestions) * 100) : 0;

        return {
            gamesPlayed: playerData.gamesPlayed || 0,
            bestScore: playerData.bestScore || 0,
            maxLevel: playerData.maxLevel || 1,
            totalQuestions,
            totalCorrect,
            accuracy,
            averageScore: this.getAverageScore(playerData.results || []),
            recentStreak: this.getCurrentStreak(playerData.results || []),
            weakestOperation: this.getWeakestOperation(playerData.results || []),
            strongestOperation: this.getStrongestOperation(playerData.results || []),
            playTime: this.getTotalPlayTime(playerData.results || []),
            dailyProgress: this.getDailyProgress(playerData.dailyStats || {}),
            weeklyProgress: this.getWeeklyProgress(playerData.dailyStats || {}),
            achievements: playerData.achievements || []
        };
    }

    static getAverageScore(results) {
        if (results.length === 0) return 0;
        const total = results.reduce((sum, result) => sum + result.score, 0);
        return Math.round(total / results.length);
    }

    static getCurrentStreak(results) {
        if (results.length === 0) return 0;
        
        let streak = 0;
        for (let i = results.length - 1; i >= 0; i--) {
            if (results[i].stats.correct > results[i].stats.wrong) {
                streak++;
            } else {
                break;
            }
        }
        return streak;
    }

    static getWeakestOperation(results) {
        const operationStats = { '+': [], '-': [], '×': [], '÷': [] };
        
        results.forEach(result => {
            // This would need more detailed tracking of which operations were used
            // For now, return a placeholder
        });
        
        return 'Trebamo više podataka';
    }

    static getStrongestOperation(results) {
        // Similar to weakest operation
        return 'Trebamo više podataka';
    }

    static getTotalPlayTime(results) {
        // Estimate based on number of games and average game time
        return results.length * 3; // Assume 3 minutes per game
    }

    static getDailyProgress(dailyStats) {
        const last7Days = [];
        const today = new Date();
        
        for (let i = 6; i >= 0; i--) {
            const date = new Date(today);
            date.setDate(date.getDate() - i);
            const dateStr = date.toDateString();
            
            last7Days.push({
                date: dateStr,
                correct: dailyStats[dateStr]?.correct || 0,
                wrong: dailyStats[dateStr]?.wrong || 0,
                gamesPlayed: dailyStats[dateStr]?.gamesPlayed || 0
            });
        }
        
        return last7Days;
    }

    static getWeeklyProgress(dailyStats) {
        const dailyProgress = this.getDailyProgress(dailyStats);
        return {
            totalCorrect: dailyProgress.reduce((sum, day) => sum + day.correct, 0),
            totalWrong: dailyProgress.reduce((sum, day) => sum + day.wrong, 0),
            totalGames: dailyProgress.reduce((sum, day) => sum + day.gamesPlayed, 0),
            averageAccuracy: this.calculateWeeklyAccuracy(dailyProgress)
        };
    }

    static calculateWeeklyAccuracy(dailyProgress) {
        const totalQuestions = dailyProgress.reduce((sum, day) => sum + day.correct + day.wrong, 0);
        const totalCorrect = dailyProgress.reduce((sum, day) => sum + day.correct, 0);
        return totalQuestions > 0 ? Math.round((totalCorrect / totalQuestions) * 100) : 0;
    }

    static generateProgressChart(dailyProgress) {
        return dailyProgress.map(day => ({
            date: new Date(day.date).toLocaleDateString('hr-HR', { weekday: 'short' }),
            accuracy: day.correct + day.wrong > 0 ? Math.round((day.correct / (day.correct + day.wrong)) * 100) : 0,
            questions: day.correct + day.wrong
        }));
    }
}
