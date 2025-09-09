import { useState, useEffect } from 'react';
import { GAME_STATES, FEEDBACK_TYPES } from '../services/gameConfig.js';
import { CloudStorage, LocalStorage } from '../services/cloudStorage.js';
import { GameLogic, PlayerManager } from '../services/gameLogic.js';
import WelcomeScreen from './screens/WelcomeScreen.jsx';
import MenuScreen from './screens/MenuScreen.jsx';
import GameScreen from './screens/GameScreen.jsx';
import LevelCompleteScreen from './screens/LevelCompleteScreen.jsx';
import GameOverScreen from './screens/GameOverScreen.jsx';
import LeaderboardScreen from './screens/LeaderboardScreen.jsx';
import CloudStatus from './common/CloudStatus.jsx';
import { Cloud } from './Icons';

function App() {
    // Game state
    const [gameState, setGameState] = useState(GAME_STATES.WELCOME);
    const [playerName, setPlayerName] = useState('');
    
    // Question state
    const [currentQuestion, setCurrentQuestion] = useState('');
    const [answer, setAnswer] = useState('');
    const [correctAnswer, setCorrectAnswer] = useState(0);
    const [showFeedback, setShowFeedback] = useState('');
    
    // Game progress
    const [score, setScore] = useState(0);
    const [timeLeft, setTimeLeft] = useState(20);
    const [lives, setLives] = useState(3);
    const [currentLevel, setCurrentLevel] = useState(1);
    const [questionsInLevel, setQuestionsInLevel] = useState(0);
    const [streak, setStreak] = useState(0);
    const [sessionStats, setSessionStats] = useState({ correct: 0, wrong: 0, timeouts: 0 });
    
    // UI state
    const [isOnline, setIsOnline] = useState(true);
    const [isLoading, setIsLoading] = useState(false);

    // Cloud data
    const [cloudData, setCloudData] = useState({ players: {}, lastUpdate: null });
    const [localData, setLocalData] = useState(() => LocalStorage.load());

    // Helper functions
    const isJsonBinConfigured = () => CloudStorage.isConfigured();

    const loadFromCloud = async () => {
        if (!isJsonBinConfigured()) return;

        setIsLoading(true);
        try {
            const data = await CloudStorage.loadFromCloud();
            setCloudData(data);
            setIsOnline(true);
        } catch (error) {
            setIsOnline(false);
        } finally {
            setIsLoading(false);
        }
    };

    const saveToCloud = async (newData) => {
        if (!isJsonBinConfigured()) return false;

        try {
            const result = await CloudStorage.saveToCloud(newData);
            setCloudData(result);
            setIsOnline(true);
            return true;
        } catch (error) {
            setIsOnline(false);
            return false;
        }
    };

    const generateQuestion = () => {
        const { question, correctAnswer: answer } = GameLogic.generateQuestion(currentLevel);
        const levelData = GameLogic.getCurrentLevelData(currentLevel);
        
        setCurrentQuestion(question);
        setCorrectAnswer(answer);
        setTimeLeft(levelData.timeLimit);
    };

    const startGame = () => {
        setGameState(GAME_STATES.PLAYING);
        setScore(0);
        setLives(3);
        setCurrentLevel(1);
        setQuestionsInLevel(0);
        setStreak(0);
        setAnswer('');
        setShowFeedback('');
        setSessionStats({ correct: 0, wrong: 0, timeouts: 0 });
        generateQuestion();
        GameLogic.focusInput(300);
    };

    const nextLevel = () => {
        setAnswer('');
        setShowFeedback('');
        setCurrentLevel(currentLevel + 1);
        setQuestionsInLevel(0);
        setLives(3);
        setGameState(GAME_STATES.PLAYING);
        setTimeout(() => {
            generateQuestion();
            GameLogic.focusInput(200);
        }, 100);
    };

    const checkAnswer = () => {
        const userAnswer = parseInt(answer);
        
        if (userAnswer === correctAnswer) {
            handleCorrectAnswer();
        } else {
            handleWrongAnswer();
        }
    };

    const handleCorrectAnswer = () => {
        const points = GameLogic.calculateScore(timeLeft, streak, currentLevel);
        
        setScore(score + points);
        setStreak(streak + 1);
        setQuestionsInLevel(questionsInLevel + 1);
        setSessionStats(prev => ({ ...prev, correct: prev.correct + 1 }));
        setShowFeedback(FEEDBACK_TYPES.CORRECT);
        
        if (GameLogic.shouldLevelUp(questionsInLevel + 1, currentLevel)) {
            setTimeout(() => {
                setAnswer('');
                setShowFeedback('');
                if (!GameLogic.isGameComplete(currentLevel)) {
                    setGameState(GAME_STATES.LEVEL_COMPLETE);
                } else {
                    endGame();
                }
            }, 1000);
        } else {
            setTimeout(() => {
                continueGame();
            }, 1500);
        }
    };

    const handleWrongAnswer = () => {
        setLives(lives - 1);
        setStreak(0);
        setSessionStats(prev => ({ ...prev, wrong: prev.wrong + 1 }));
        setShowFeedback(FEEDBACK_TYPES.WRONG);
        
        setTimeout(() => {
            setShowFeedback('');
            if (lives - 1 <= 0) {
                endGame();
            } else {
                continueGame();
            }
        }, 1500);
    };

    const handleTimeout = () => {
        setLives(lives - 1);
        setStreak(0);
        setSessionStats(prev => ({ ...prev, timeouts: prev.timeouts + 1 }));
        setShowFeedback(FEEDBACK_TYPES.TIMEOUT);
        
        setTimeout(() => {
            setShowFeedback('');
            if (lives - 1 <= 0) {
                endGame();
            } else {
                continueGame();
            }
        }, 1500);
    };

    const continueGame = () => {
        setAnswer('');
        generateQuestion();
        GameLogic.focusInput();
    };

    const endGame = async () => {
        setGameState(GAME_STATES.GAME_OVER);
        
        const allPlayers = PlayerManager.getAllPlayers(localData, cloudData, isJsonBinConfigured());
        const updatedPlayerData = PlayerManager.updatePlayerData(
            allPlayers, 
            playerName, 
            score, 
            currentLevel, 
            sessionStats
        );

        setLocalData(updatedPlayerData);
        LocalStorage.save(updatedPlayerData);

        if (isJsonBinConfigured()) {
            await saveToCloud(updatedPlayerData);
        }
    };

    const getAllPlayers = () => PlayerManager.getAllPlayers(localData, cloudData, isJsonBinConfigured());
    const getTopPlayers = () => PlayerManager.getTopPlayers(localData, cloudData, isJsonBinConfigured());
    const getLevelProgress = () => GameLogic.getLevelProgress(questionsInLevel, currentLevel);
    const exportResults = () => LocalStorage.exportData();
    const refreshCloudData = async () => await loadFromCloud();

    // Effects
    useEffect(() => {
        loadFromCloud();
    }, []);

    useEffect(() => {
        LocalStorage.save(localData);
    }, [localData]);

    useEffect(() => {
        if (gameState === GAME_STATES.PLAYING && timeLeft > 0) {
            const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
            return () => clearTimeout(timer);
        } else if (timeLeft === 0 && gameState === GAME_STATES.PLAYING) {
            handleTimeout();
        }
    }, [timeLeft, gameState]);

    useEffect(() => {
        if (gameState === GAME_STATES.PLAYING && currentQuestion && !showFeedback) {
            GameLogic.focusInput(300);
        }
    }, [currentQuestion, questionsInLevel, currentLevel, gameState]);

    const commonProps = {
        playerName,
        setPlayerName,
        setGameState,
        isJsonBinConfigured: isJsonBinConfigured(),
        getAllPlayers,
        getTopPlayers,
        exportResults,
        refreshCloudData,
        isLoading,
        cloudData,
        startGame,
        nextLevel,
        currentLevel,
        score,
        sessionStats,
        streak
    };

    const gameProps = {
        ...commonProps,
        currentQuestion,
        answer,
        setAnswer,
        correctAnswer,
        showFeedback,
        timeLeft,
        lives,
        questionsInLevel,
        getLevelProgress,
        checkAnswer
    };

    return (
        <div className="game-container">
            <div className="game-card">
                {isJsonBinConfigured() && (
                    <CloudStatus 
                        isOnline={isOnline}
                        isLoading={isLoading}
                    />
                )}

                {!isJsonBinConfigured() && (
                    <div className="mb-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg text-sm">
                        <div className="flex items-center gap-2 text-yellow-800">
                            <Cloud size={16} />
                            <span>Lokalni način - podaci se spremaju samo na ovom uređaju</span>
                        </div>
                    </div>
                )}

                {gameState === GAME_STATES.WELCOME && <WelcomeScreen {...commonProps} />}
                {gameState === GAME_STATES.MENU && <MenuScreen {...commonProps} />}
                {gameState === GAME_STATES.PLAYING && <GameScreen {...gameProps} />}
                {gameState === GAME_STATES.LEVEL_COMPLETE && <LevelCompleteScreen {...commonProps} />}
                {gameState === GAME_STATES.GAME_OVER && <GameOverScreen {...commonProps} />}
                {gameState === GAME_STATES.LEADERBOARD && <LeaderboardScreen {...commonProps} />}
            </div>
        </div>
    );
}

export default App;
