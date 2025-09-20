import { GAME_MODES, GAME_STATES } from '../../services/gameConfig';

function GameModesScreen({ setGameState, startGame, playerName }) {
    const gameModes = [
        {
            mode: GAME_MODES.CLASSIC,
            name: "Klasična igra",
            description: "Standardna igra kroz nivoe",
            emoji: "🎯",
            color: "from-blue-400 to-blue-600"
        },
        {
            mode: GAME_MODES.TRAINING,
            name: "Trening",
            description: "Bez vremena i života - samo učenje",
            emoji: "📚",
            color: "from-green-400 to-green-600"
        },
        {
            mode: GAME_MODES.SPRINT,
            name: "Sprint",
            description: "Što više zadataka u 60 sekundi",
            emoji: "⚡",
            color: "from-yellow-400 to-orange-500"
        },
        {
            mode: GAME_MODES.MULTIPLICATION,
            name: "Samo množenje",
            description: "Vježbaj tablice množenja",
            emoji: "✖️",
            color: "from-purple-400 to-purple-600"
        },
        {
            mode: GAME_MODES.DIVISION,
            name: "Samo dijeljenje",
            description: "Usavršavaj dijeljenje",
            emoji: "➗",
            color: "from-red-400 to-red-600"
        },
        {
            mode: GAME_MODES.ADDITION,
            name: "Samo zbrajanje",
            description: "Osnove zbrajanja",
            emoji: "➕",
            color: "from-teal-400 to-teal-600"
        },
        {
            mode: GAME_MODES.SUBTRACTION,
            name: "Samo oduzimanje", 
            description: "Vježbaj oduzimanje",
            emoji: "➖",
            color: "from-indigo-400 to-indigo-600"
        }
    ];

    const handleModeSelect = (gameMode) => {
        startGame(gameMode);
    };

    return (
        <div className="text-center">
            <div className="mb-6">
                <h2 className="text-3xl font-bold text-purple-600 mb-2">
                    Načini igre 🎮
                </h2>
                <p className="text-gray-600">Odaberi kako želiš igrati, {playerName}!</p>
            </div>

            <div className="space-y-3 mb-6">
                {gameModes.map((mode) => (
                    <button
                        key={mode.mode}
                        onClick={() => handleModeSelect(mode.mode)}
                        className={`w-full bg-gradient-to-r ${mode.color} text-white font-bold py-4 px-6 rounded-xl hover:scale-105 transform transition-all duration-200 flex items-center justify-between`}
                    >
                        <div className="flex items-center gap-3">
                            <span className="text-2xl">{mode.emoji}</span>
                            <div className="text-left">
                                <div className="text-lg font-bold">{mode.name}</div>
                                <div className="text-sm opacity-90">{mode.description}</div>
                            </div>
                        </div>
                        <span className="text-xl">▶️</span>
                    </button>
                ))}
            </div>

            <button 
                onClick={() => setGameState(GAME_STATES.MENU)}
                className="button-secondary"
            >
                🏠 Povratak
            </button>
        </div>
    );
}

export default GameModesScreen;
