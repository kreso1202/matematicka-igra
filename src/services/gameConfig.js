// JsonBin Configuration
export const JSONBIN_CONFIG = {
    apiKey: '$2a$10$31RITG3SmDIKuboB6WgUdurK6MSbN1lxd7wpIZWNq.TVm8JkRvHi.',
    binId: '68bf0f7ad0ea881f40764962',
    baseUrl: 'https://api.jsonbin.io/v3'
};

// Game Modes
export const GAME_MODES = {
    CLASSIC: 'classic',
    STORY: 'story',          // ⭐ DODANO SAMO OVO
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

// Math tips and explanations - prilagođeno djeci do 3. razreda
export const MATH_TIPS = {
    multiplication: [
        "Za množenje s 2: dodaj broj sam sebi (5×2 = 5+5 = 10)",
        "Za množenje s 5: završava uvijek s 0 ili 5 (5×3 = 15, 5×4 = 20)", 
        "Za množenje s 10: samo dodaj 0 na kraj (7×10 = 70)",
        "Tablice do 5×5 treba znati napamet!",
        "Množenje možeš obrnuti: 3×4 = 4×3",
        "Za 9×broj: oduzmi 1 od broja, a ostatak je 10 minus taj broj (9×6: 6-1=5, 10-6=4, pa je 54)"
    ],
    division: [
        "Dijeljenje je obrnut postupak množenja", 
        "Provjeri rezultat: pomnožiš pa vidiš jesi dobio prvi broj",
        "Dijeljenje s 2 znači 'podijeli po pol'",
        "Dijeljenje s 5: broj mora završavati s 0 ili 5",
        "Za dijeljenje s 10: ukloni zadnju nulu",
        "Ako ne ide točno, možda nisi dobro pomnožio tablice"
    ],
    addition: [
        "Brojevi se mogu mijenjati mjestima: 3+7 = 7+3",
        "Koristi prste za manje brojeve do 10", 
        "Za veće brojeve: 8+7 = 8+2+5 = 10+5 = 15",
        "Zbrajaj do okruglog broja pa onda dodaj ostatak",
        "Kad zbrajaš 9, dodaj 10 pa oduzmi 1",
        "Brojevni pravac ti može pomoći"
    ],
    subtraction: [
        "Provjeri odgovor zbrajanjem: 15-8=7, pa 7+8=15 ✓",
        "Za lakše oduzimanje: 32-18 = 32-20+2 = 14", 
        "Oduzimanje 9: oduzmi 10 pa dodaj 1",
        "Koristi brojevni pravac za manje brojeve",
        "Misli koliko još treba do većeg broja",
        "Počni od manjeg broja i broji naviše"
    ]
};
