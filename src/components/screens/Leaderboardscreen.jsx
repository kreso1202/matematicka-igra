import { Download } from '../Icons';
import { GAME_STATES } from '../../services/gameConfig';

function LeaderboardScreen({ 
    playerName, 
    setGameState, 
    isJsonBinConfigured, 
    getTopPlayers, 
    exportResults, 
    refreshCloudData, 
    isLoading, 
    cloudData 
}) {
    const topPlayers = getTopPlayers();

    return (
        <div className="text-center">
            <div className="mb-6">
                <div className="flex items-center justify-center gap-2 mb-4">
                    <h2 className="text-3xl font-bold text-purple-600">🏆</h2>
                    <h2 className="text-3xl font-bold text-purple-600">
                        {isJsonBinConfigured ? 'Online ljestvica' : 'Najbolji igrači'}
                    </h2>
                </div>
                {isJsonBinConfigured && (
                    <div className="flex items-center justify-center gap-2 mb-4">
                        <button 
                            onClick={refreshCloudData}
                            disabled={isLoading}
                            className="text-blue-500 hover:text-blue-700 flex items-center gap-1"
                        >
                            {isLoading ? '🔄' : '🔄'} Osvježi
                        </button>
                        {cloudData.lastUpdate && (
                            <span className="text-xs text-gray-500">
                                Zadnje ažuriranje: {new Date(cloudData.lastUpdate).toLocaleString('hr-HR')}
                            </span>
                        )}
                    </div>
                )}
            </div>

            <div className="mb-6 max-h-96 overflow-y-auto">
                {topPlayers.length > 0 ? (
                    topPlayers.map((player, index) => (
                        <div 
                            key={index} 
                            className={`p-3 rounded-xl mb-2 ${
                                index === 0 ? 'bg-yellow-100 border-2 border-yellow-400' :
                                index === 1 ? 'bg-gray-100 border-2 border-gray-400' :
                                index === 2 ? 'bg-orange-100 border-2 border-orange-400' :
                                'bg-blue-50'
                            }`}
                        >
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <span className="text-xl">
                                        {index === 0 ? '🥇' : index === 1 ? '🥈' : index === 2 ? '🥉' : `${index + 1}.`}
                                    </span>
                                    <span className={`font-bold ${player.name === playerName ? 'text-purple-600' : ''}`}>
                                        {player.name}
                                        {player.name === playerName && ' (Vi)'}
                                    </span>
                                </div>
                                <div className="text-right">
                                    <div className="font-bold text-purple-600">{player.bestScore} 🌟</div>
                                    <div className="text-xs text-gray-600">
                                        Nivo {player.maxLevel} • {player.gamesPlayed} igara
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="text-gray-500">Nema još zabilježenih rezultata</div>
                )}
            </div>

            <div className="space-y-3">
                <button 
                    onClick={exportResults}
                    disabled={topPlayers.length === 0}
                    className="w-full bg-green-500 text-white font-bold py-3 px-6 rounded-xl text-lg hover:scale-105 transform transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                    <Download size={20} />
                    Izvezi rezultate
                </button>
                <button 
                    onClick={() => setGameState(GAME_STATES.MENU)}
                    className="button-secondary"
                >
                    🏠 Povratak
                </button>
            </div>
        </div>
    );
}

export default LeaderboardScreen;
