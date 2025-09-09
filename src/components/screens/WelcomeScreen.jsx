import { User } from '../Icons';
import { GAME_STATES } from '../../services/gameConfig';

function WelcomeScreen({ playerName, setPlayerName, setGameState, isJsonBinConfigured }) {
    const handleSubmit = (e) => {
        e.preventDefault();
        if (playerName.trim()) {
            setGameState(GAME_STATES.MENU);
        }
    };

    return (
        <div className="text-center">
            <div className="mb-6">
                <h1 className="text-4xl font-bold text-purple-600 mb-2">
                    🧮 Matematička Igrica v2.1
                </h1>
                <p className="text-gray-600">
                    {isJsonBinConfigured ? 'Dobrodošli u online natjecanje!' : 'Dobrodošli u svijet brojeva!'}
                </p>
            </div>
            
            <form onSubmit={handleSubmit} className="mb-6">
                <User className="mx-auto text-purple-500 mb-4" size={48} />
                <label className="block text-lg font-bold text-gray-700 mb-2">
                    Unesite svoje ime i prezime:
                </label>
                <input
                    type="text"
                    value={playerName}
                    onChange={(e) => setPlayerName(e.target.value)}
                    className="w-full p-3 border-2 border-purple-300 rounded-xl focus:border-purple-500 focus:outline-none text-center text-lg"
                    placeholder="Ana Anić"
                    autoFocus
                />
            </form>
            
            <button 
                onClick={handleSubmit}
                disabled={!playerName.trim()}
                className="button-primary disabled:opacity-50 disabled:cursor-not-allowed"
            >
                Nastavi 🚀
            </button>
        </div>
    );
}

export default WelcomeScreen;
