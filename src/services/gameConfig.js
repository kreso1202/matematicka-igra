// JsonBin Configuration
export const JSONBIN_CONFIG = {
    apiKey: '$2a$10$31RITG3SmDIKuboB6WgUdurK6MSbN1lxd7wpIZWNq.TVm8JkRvHi.',
    binId: '68bf0f7ad0ea881f40764962',
    baseUrl: 'https://api.jsonbin.io/v3'
};

// Game Modes
export const GAME_MODES = {
    CLASSIC: 'classic',
    TRAINING: 'training',
    SPRINT: 'sprint',
    MULTIPLICATION: 'multiplication',
    DIVISION: 'division',
    ADDITION: 'addition',
    SUBTRACTION: 'subtraction'
};

// Difficulty Levels
export const DIFFICULTY_LEVELS = {
    EASY: 'easy',
    MEDIUM: 'medium',
    HARD: 'hard'
};

// Themes
export const THEMES = {
    DEFAULT: 'default',
    DARK: 'dark',
    OCEAN: 'ocean',
    FOREST: 'forest',
    SPACE: 'space'
};

// Avatars
export const AVATARS = [
    { id: 'robot', emoji: '🤖', name: 'Robot' },
    { id: 'cat', emoji: '🐱', name: 'Mačka' },
    { id: 'dog', emoji: '🐶', name: 'Pas' },
    { id: 'bear', emoji: '🐻', name: 'Medvjed' },
    { id: 'fox', emoji: '🦊', name: 'Lisica' },
    { id: 'owl', emoji: '🦉', name: 'Sova' },
    { id: 'wizard', emoji: '🧙', name: 'Čarobnjak' },
    { id: 'ninja', emoji: '🥷', name: 'Ninja' }
];

// Achievements
export const ACHIEVEMENTS = {
    FIRST_WIN: { id: 'first_win', name: 'Prvi pobjeda', description: 'Završi svoju prvu igru', emoji: '🏆' },
    PERFECT_LEVEL: { id: 'perfect_level', name: 'Savršenstvo', description: 'Završi nivo bez greške', emoji: '💯' },
    STREAK_10: { id: 'streak_10', name: 'Niz desetke', description: '10 točnih odgovora u nizu', emoji: '🔥' },
    SPEED_DEMON: { id: 'speed_demon', name: 'Brzinski demon', description: 'Odgovori u manje od 3 sekunde', emoji: '⚡' },
    MATH_MASTER: { id: 'math_master', name: 'Matematički majstor', description: 'Dosegni nivo 7', emoji: '🎓' },
    HUNDRED_QUESTIONS: { id: 'hundred_questions', name: 'Stotka', description: 'Odgovori na 100 pitanja', emoji: '💪' },
    WEEK_STREAK: { id: 'week_streak', name: 'Tjedni rekord', description: 'Igraj 7 dana zaredom', emoji: '📅' }
};

// Level definitions with expanded options
export const LEVELS = [
    { 
        id: 1, 
        name: "Početnik", 
        emoji: "🌱", 
        operations: ['+', '-'], 
        maxNum: 20, 
        questionsNeeded: 10, 
        timeLimit: 20,
        difficulty: {
            easy: { maxNum: 10, timeLimit: 25 },
            medium: { maxNum: 20, timeLimit: 20 },
            hard: { maxNum: 30, timeLimit: 15 }
        }
    },
    { 
        id: 2, 
        name: "Istraživač", 
        emoji: "🔍", 
        operations: ['+', '-'], 
        maxNum: 50, 
        questionsNeeded: 15, 
        timeLimit: 18,
        difficulty: {
            easy: { maxNum: 30, timeLimit: 22 },
            medium: { maxNum: 50, timeLimit: 18 },
            hard: { maxNum: 75, timeLimit: 14 }
        }
    },
    { 
        id: 3, 
        name: "Učenik", 
        emoji: "📚", 
        operations: ['+', '-', '×'], 
        maxNum: 100, 
        questionsNeeded: 20, 
        timeLimit: 16, 
        multiplyWeight: 0.4,
        difficulty: {
            easy: { maxNum: 50, timeLimit: 20, multiplyWeight: 0.2 },
            medium: { maxNum: 100, timeLimit: 16, multiplyWeight: 0.4 },
            hard: { maxNum: 150, timeLimit: 12, multiplyWeight: 0.6 }
        }
    },
    { 
        id: 4, 
        name: "Matematičar", 
        emoji: "🧮", 
        operations: ['×', '÷', '+'], 
        maxNum: 100, 
        questionsNeeded: 25, 
        timeLimit: 15, 
        multiplyWeight: 0.6,
        difficulty: {
            easy: { maxNum: 75, timeLimit: 18, multiplyWeight: 0.4 },
            medium: { maxNum: 100, timeLimit: 15, multiplyWeight: 0.6 },
            hard: { maxNum: 144, timeLimit: 12, multiplyWeight: 0.8 }
        }
    },
    { 
        id: 5, 
        name: "Stručnjak", 
        emoji: "🎓", 
        operations: ['×', '÷', '+', '-'], 
        maxNum: 100, 
        questionsNeeded: 30, 
        timeLimit: 14, 
        multiplyWeight: 0.7,
        difficulty: {
            easy: { maxNum: 100, timeLimit: 16, multiplyWeight: 0.5 },
            medium: { maxNum: 100, timeLimit: 14, multiplyWeight: 0.7 },
            hard: { maxNum: 144, timeLimit: 11, multiplyWeight: 0.9 }
        }
    },
    { 
        id: 6, 
        name: "Majstor", 
        emoji: "👑", 
        operations: ['×', '÷', '+', '-'], 
        maxNum: 100, 
        questionsNeeded: 35, 
        timeLimit: 13, 
        multiplyWeight: 0.8,
        difficulty: {
            easy: { maxNum: 100, timeLimit: 15, multiplyWeight: 0.6 },
            medium: { maxNum: 100, timeLimit: 13, multiplyWeight: 0.8 },
            hard: { maxNum: 169, timeLimit: 10, multiplyWeight: 1.0 }
        }
    },
    { 
        id: 7, 
        name: "Genij", 
        emoji: "🧠", 
        operations: ['×', '÷', '+', '-'], 
        maxNum: 100, 
        questionsNeeded: 40, 
        timeLimit: 12, 
        multiplyWeight: 0.9,
        difficulty: {
            easy: { maxNum: 144, timeLimit: 14, multiplyWeight: 0.7 },
            medium: { maxNum: 100, timeLimit: 12, multiplyWeight: 0.9 },
            hard: { maxNum: 196, timeLimit: 9, multiplyWeight: 1.0 }
        }
    }
];

export const GAME_STATES = {
    WELCOME: 'welcome',
    MENU: 'menu',
    GAME_MODES: 'gameModes',
    SETTINGS: 'settings',
    STATISTICS: 'statistics',
    ACHIEVEMENTS: 'achievements',
    PARENT_DASHBOARD: 'parentDashboard',
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

// Math tips and explanations
export const MATH_TIPS = {
    multiplication: [
        "Za množenje s 9: pomnoži s 10 pa oduzmi broj (9×7 = 70-7 = 63)",
        "Tablice do 5×5 trebaju biti u glavi automatski!",
        "Za množenje s 11: 11×23 = 2_3 → 2(2+3)3 = 253"
    ],
    division: [
        "Dijeljenje je obrnut postupak množenja",
        "Provjeri rezultat: količnik × djelitelj = dijeljenik",
        "Koristi tablice množenja unatrag"
    ],
    addition: [
        "Brojevi koje zbrajamo mogu se mijenjati mjestima",
        "Lakše je zbrajati do okruglih brojeva: 27+15 = 27+3+12 = 42",
        "Koristite prstići za manje brojeve"
    ],
    subtraction: [
        "Oduzimanje možete provjeriti zbrajanjem",
        "Za veće brojeve: razmislite o razlici",
        "45-28 = 45-30+2 = 17"
    ]
};
