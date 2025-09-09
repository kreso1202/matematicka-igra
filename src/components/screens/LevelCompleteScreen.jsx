import { GAME_STATES, LEVELS } from '../../services/gameConfig';

function LevelCompleteScreen({ 
    setGameState, 
    nextLevel, 
    currentLevel, 
    score, 
    sessionStats, 
    streak 
}) {
    return (
        <div className="text-center">
            <div className="mb-6">
                <div className="text-6xl mb-4">🎉</div>
                <h2 className="text-3xl font-bold text-purple-600 mb-2">
                    Nivo završen!
                </h2>
                <p className="text-lg text-gray-600 mb-4">
                    Uspješno ste završili <strong>Nivo {currentLevel}</strong>!
                </p>
                
                <div className="bg-green-100 rounded-xl p-6 mb-6">
                    <div className="text-lg font-bold text-green-800 mb-2">
                        Vaš rezultat: {score} 🌟
                    </div>
                    <div className="text-sm text-green-700">
                        Točni odgovori: {sessionStats.correct} ✅<br/>
                        Niz: {streak} 🔥
                    </div>
                </div>

                {currentLevel < LEVELS.length && (
                    <div className="bg-blue-100 rounded-xl p-4 mb-6">
                        <div className="text-lg font-bold text-blue-800 mb-2">
                            Sljedeći nivo: {LEVELS[currentLevel].emoji} {LEVELS[currentLevel].name}
                        </div>
                        <div className="text-sm text-blue-700">
                            Potrebno: {LEVELS[currentLevel].questionsNeeded} zadataka<br/>
                            Vrijeme: {LEVELS[currentLevel].timeLimit}s po zadatku
                        </div>
                    </div>
                )}
            </div>

            <div className="space-y-3">
                {currentLevel < LEVELS.length ? (
                    <button 
                        onClick={nextLevel}
                        className="w-full bg-gradient-to-r from-green-400 to-blue-500 text-white font-bold py-4 px-6 rounded-xl text-lg hover:scale-105 transform transition-all duration-200"
                    >
                        🚀 Sljedeći nivo
                    </button>
                ) : (
                    <div className="bg-yellow-100 rounded-xl p-6">
                        <div className="text-2xl font-bold text-yellow-800 mb-2">
                            🏆 Čestitamo! 🏆
                        </div>
                        <div className="text-sm text-yellow-700">
                            Završili ste sve nivoe!
                        </div>
                    </div>
                )}
                
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

export default LevelCompleteScreen;
