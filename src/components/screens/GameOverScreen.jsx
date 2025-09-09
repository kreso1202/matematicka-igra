import { GAME_STATES } from '../../services/gameConfig';

function GameOverScreen({ 
    setGameState, 
    startGame, 
    score, 
    currentLevel, 
    sessionStats, 
    isJsonBinConfigured 
}) {
    return (
        <div className="text-center">
            <div className="mb-6">
                <h2 className="text-3xl font-bold text-purple-600 mb-4">🎮 Igra završena!</h2>
                <div className="bg-purple-100 rounded-xl p-6 mb-4">
                    <div className="text-2xl font-bold text-purple-800 mb-2">
                        Rezultat: {score} 🌟
                    </div>
                    <div className="text-lg text-purple-700 mb-2">
                        Dostignuti nivo: {currentLevel}
                    </div>
                    <div className="text-sm text-purple-600">
                        ✅ Točno: {sessionStats.correct} | ❌ Netočno: {sessionStats.wrong} | ⏰ Timeout: {sessionStats.timeouts}
                    </div>
                    {isJsonBinConfigured && (
                        <div className="text-xs text-green-600 mt-2">
                            ☁️ Rezultat spremljen u oblak
                        </div>
                    )}
                </div>
            </div>

            <div className="space-y-3">
                <button 
                    onClick={startGame}
                    className="w-full bg-gradient-to-r from-green-400 to-blue-500 text-white font-bold py-4 px-6 rounded-xl text-lg hover:scale-105 transform transition-all duration-200"
                >
                    🔥 Nova igra
                </button>
                <button 
                    onClick={() => setGameState(GAME_STATES.MENU)}
                    className="button-secondary"
                >
                    🏠 Glavni meni
                </button>
            </div>
        </div>
    );
}

export default GameOverScreen;
