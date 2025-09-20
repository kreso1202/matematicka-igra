import { GAME_STATES } from '../../services/gameConfig';

function MenuScreen({ playerName, setGameState, isJsonBinConfigured, getAllPlayers, startGame }) {
    const allPlayers = getAllPlayers();
    const player = allPlayers[playerName];

    return (
        <div className="text-center">
            <div className="mb-6">
                <h2 className="text-3xl font-bold text-purple-600 mb-2">
                    Pozdrav, {playerName}! 👋
                </h2>
                <p className="text-gray-600">Što želite raditi?</p>
            </div>

            {player && (
                <div className="bg-blue-100 rounded-xl p-4 mb-6">
                    <div className="text-sm text-blue-800 mb-2">
                        🏆 Najbolji rezultat: <strong>{player.bestScore}</strong>
                    </div>
                    <div className="text-sm text-blue-800 mb-2">
                        📊 Maksimalni nivo: <strong>{player.maxLevel}</strong>
                    </div>
                    <div className="text-sm text-blue-800">
                        🎮 Odigrano igara: <strong>{player.gamesPlayed}</strong>
                    </div>
                </div>
            )}

            <div className="space-y-4">
                <button 
                    onClick={() => setGameState(GAME_STATES.GAME_MODES)}
                    className="w-full bg-gradient-to-r from-green-400 to-blue-500 text-white font-bold py-4 px-8 rounded-xl text-xl hover:scale-105 transform transition-all duration-200"
                >
                    🎮 Načini igre
                </button>
                
                <button 
                    onClick={startGame}
                    className="button-primary"
                >
                    ⚡ Brza igra
                </button>
                
                <button 
                    onClick={() => setGameState(GAME_STATES.LEADERBOARD)}
                    className="w-full bg-gradient-to-r from-yellow-400 to-orange-500 text-white font-bold py-3 px-6 rounded-xl text-lg hover:scale-105 transform transition-all duration-200"
                >
                    🏆 {isJsonBinConfigured ? 'Online ljestvica' : 'Najbolji igrači'}
                </button>

                <button 
                    onClick={() => setGameState(GAME_STATES.WELCOME)}
                    className="button-secondary"
                >
                    👤 Promijeni ime
                </button>
            </div>
        </div>
    );
}

export default MenuScreen;
