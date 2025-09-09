// JsonBin Configuration
export const JSONBIN_CONFIG = {
    apiKey: '$2a$10$31RITG3SmDIKuboB6WgUdurK6MSbN1lxd7wpIZWNq.TVm8JkRvHi.',
    binId: '68bf0f7ad0ea881f40764962',
    baseUrl: 'https://api.jsonbin.io/v3'
};

// Level definitions with multiplication/division focus
export const LEVELS = [
    { 
        id: 1, 
        name: "Početnik", 
        emoji: "🌱", 
        operations: ['+', '-'], 
        maxNum: 20, 
        questionsNeeded: 10, 
        timeLimit: 20 
    },
    { 
        id: 2, 
        name: "Istraživač", 
        emoji: "🔍", 
        operations: ['+', '-'], 
        maxNum: 50, 
        questionsNeeded: 15, 
        timeLimit: 18 
    },
    { 
        id: 3, 
        name: "Učenik", 
        emoji: "📚", 
        operations: ['+', '-', '×'], 
        maxNum: 100, 
        questionsNeeded: 20, 
        timeLimit: 16, 
        multiplyWeight: 0.4 
    },
    { 
        id: 4, 
        name: "Matematičar", 
        emoji: "🧮", 
        operations: ['×', '÷', '+'], 
        maxNum: 100, 
        questionsNeeded: 25, 
        timeLimit: 15, 
        multiplyWeight: 0.6 
    },
    { 
        id: 5, 
        name: "Stručnjak", 
        emoji: "🎓", 
        operations: ['×', '÷', '+', '-'], 
        maxNum: 100, 
        questionsNeeded: 30, 
        timeLimit: 14, 
        multiplyWeight: 0.7 
    },
    { 
        id: 6, 
        name: "Majstor", 
        emoji: "👑", 
        operations: ['×', '÷', '+', '-'], 
        maxNum: 100, 
        questionsNeeded: 35, 
        timeLimit: 13, 
        multiplyWeight: 0.8 
    },
    { 
        id: 7, 
        name: "Genij", 
        emoji: "🧠", 
        operations: ['×', '÷', '+', '-'], 
        maxNum: 100, 
        questionsNeeded: 40, 
        timeLimit: 12, 
        multiplyWeight: 0.9 
    }
];

export const GAME_STATES = {
    WELCOME: 'welcome',
    MENU: 'menu',
    PLAYING: 'playing',
    LEVEL_COMPLETE: 'levelComplete',
    GAME_OVER: 'gameOver',
    LEADERBOARD: 'leaderboard'
};

export const FEEDBACK_TYPES = {
    CORRECT: 'correct',
    WRONG: 'wrong',
    TIMEOUT: 'timeout'
};
