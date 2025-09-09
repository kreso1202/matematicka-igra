import { Heart, Clock } from '../Icons';
import { GameLogic } from '../../services/gameLogic';
import { FEEDBACK_TYPES } from '../../services/gameConfig';

function GameScreen({ 
    currentQuestion, 
    answer, 
    setAnswer, 
    correctAnswer, 
    showFeedback, 
    timeLeft, 
    lives, 
    score, 
    currentLevel,
    questionsInLevel,
    streak,
    getLevelProgress,
    checkAnswer
}) {
    const levelData = GameLogic.getCurrentLevelData(currentLevel);

    const renderFeedback = () => {
        if (!showFeedback) return null;

        const feedbackClasses = {
            [FEEDBACK_TYPES.CORRECT]: 'feedback-correct',
            [FEEDBACK_TYPES.WRONG]: 'feedback-wrong',
            [FEEDBACK_TYPES.TIMEOUT]: 'feedback-timeout'
        };

        return (
            <div className={`mb-4 ${feedbackClasses[showFeedback]}`}>
                {showFeedback === FEEDBACK_TYPES.CORRECT && (
                    <div className="flex items-center justify-center gap-3">
                        <div className="animate-ping text-yellow-400 text-xl">⭐</div>
                        <div className="flex flex-col items-center">
                            <div className="text-3xl animate-bounce mb-1">🎉</div>
                            <div className="font-bold">Odlično!</div>
                        </div>
                        <div className="animate-ping text-yellow-400 text-xl">⭐</div>
                    </div>
                )}
                {showFeedback === FEEDBACK_TYPES.WRONG && `❌ Odgovor je ${correctAnswer}`}
                {showFeedback === FEEDBACK_TYPES.TIMEOUT && '⏰ Vrijeme je isteklo!'}
            </div>
        );
    };

    return (
        <div className="text-center">
            {/* Lives and Score */}
            <div className="flex justify-between items-center mb-4">
                <div className="flex gap-1">
                    {[...Array(3)].map((_, i) => (
                        <Heart 
                            key={i} 
                            className={`w-5 h-5 ${i < lives ? 'text-red-500 fill-current' : 'text-gray-300'}`} 
                        />
                    ))}
                </div>
                <div className="text-lg font-bold text-purple-600">
                    <span className={score > 0 ? 'animate-pulse' : ''}>{score}</span> 🌟
                </div>
            </div>

            {/* Level Progress */}
            <div className="mb-4">
                <div className="flex items-center justify-center gap-2 mb-2">
                    <span className="text-2xl">{levelData.emoji}</span>
                    <span className="font-bold text-lg text-purple-700">
                        Nivo {currentLevel}: {levelData.name}
                    </span>
                </div>
                
                <div className="w-full bg-gray-200 rounded-full h-3 mb-2">
                    <div 
                        className="level-progress"
                        style={{ width: `${getLevelProgress()}%` }}
                    ></div>
                </div>
                <div className="text-sm text-gray-600">
                    {questionsInLevel}/{levelData.questionsNeeded} zadataka
                </div>
            </div>

            {/* Timer and Streak */}
            <div className="flex justify-between items-center mb-6">
                <div className="flex items-center gap-2">
                    <Clock className="text-blue-500" size={18} />
                    <span className={`text-lg font-bold ${timeLeft <= 5 ? 'text-red-500' : 'text-blue-500'}`}>
                        {timeLeft}s
                    </span>
                </div>
                {streak > 0 && (
                    <span className="bg-orange-100 text-orange-800 px-3 py-1 rounded-full text-sm font-bold">
                        🔥 {streak}
                    </span>
                )}
            </div>

            {/* Question */}
            <div className="mb-6">
                <div className="text-3xl font-bold text-gray-800 mb-4 p-6 bg-gray-50 rounded-xl">
                    {currentQuestion} = ?
                </div>
            </div>

            {/* Feedback */}
            {renderFeedback()}

            {/* Answer Input */}
            <div className="mb-6">
                <input
                    key={`level-${currentLevel}-q-${questionsInLevel}`}
                    type="number"
                    value={answer}
                    onChange={(e) => setAnswer(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && answer && checkAnswer()}
                    className="input-answer"
                    placeholder="Vaš odgovor..."
                    disabled={showFeedback !== ''}
                    autoFocus
                />
            </div>

            {/* Submit Button */}
            <button 
                onClick={checkAnswer}
                disabled={!answer || showFeedback !== ''}
                className="button-primary disabled:opacity-50 disabled:cursor-not-allowed"
            >
                ✓ Potvrdi
            </button>
        </div>
    );
}

export default GameScreen;
