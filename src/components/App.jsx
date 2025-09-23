// Kompletni App.jsx - zamijenite postojeći file
import { useState, useEffect } from 'react';
import { GAME_STATES, FEEDBACK_TYPES, GAME_MODES } from '../services/gameConfig.js';
import { CloudStorage, LocalStorage } from '../services/cloudStorage.js';
import { GameLogic, PlayerManager } from '../services/gameLogic.js';
import { AchievementManager } from '../services/achievementManager.js';
import { ThemeManager } from '../services/themeManager.js';
import WelcomeScreen from './components/screens/WelcomeScreen.jsx';
import MenuScreen from './components/screens/MenuScreen.jsx';
import GameModesScreen from './components/screens/GameModesScreen.jsx';
import GameScreen from './components/screens/GameScreen.jsx';
import EnhancedStoryGameScreen from './components/screens/EnhancedStoryGameScreen.jsx';  // ⭐ AŽURIRANO!
import LevelCompleteScreen from './components/screens/LevelCompleteScreen.jsx';
import GameOverScreen from './components/screens/GameOverScreen.jsx';
import LeaderboardScreen from './components/screens/LeaderboardScreen.jsx';
import StatisticsScreen from './components/screens/StatisticsScreen.jsx';
import AchievementsScreen from './components/screens/AchievementsScreen.jsx';
import SettingsScreen from './components/screens/SettingsScreen.jsx';
import CloudStatus from './components/common/CloudStatus.jsx';
import { Cloud } from './components/Icons.jsx';

// CSS stilovi direktno u komponenti
const appStyles = `
  /* Base CSS Variables */
  :root {
    --bg-primary: #ffffff;
    --bg-secondary: #f8fafc;
    --bg-card: #ffffff;
    --text-primary: #1f2937;
    --text-secondary: #6b7280;
    --accent-color: #3b82f6;
    --border-color: #d1d5db;
    --shadow: rgba(0, 0, 0, 0.1);
    --success-color: #10b981;
    --error-color: #ef4444;
    --warning-color: #f59e0b;
  }

  /* Dark Theme */
  .theme-dark {
    --bg-primary: #1a1a1a;
    --bg-secondary: #2d2d2d;
    --bg-card: #374151;
    --text-primary: #ffffff;
    --text-secondary: #d1d5db;
    --accent-color: #6366f1;
    --border-color: #4b5563;
    --shadow: rgba(0, 0, 0, 0.3);
    --success-color: #34d399;
    --error-color: #f87171;
    --warning-color: #fbbf24;
  }

  /* Ocean Theme */
  .theme-ocean {
    --bg-primary: linear-gradient(135deg, #e0f2fe 0%, #b3e5fc 100%);
    --bg-secondary: #b3e5fc;
    --bg-card: #ffffff;
    --text-primary: #0d47a1;
    --text-secondary: #1565c0;
    --accent-color: #00acc1;
    --border-color: #81d4fa;
    --shadow: rgba(0, 172, 193, 0.2);
    --success-color: #00695c;
    --error-color: #d32f2f;
    --warning-color: #f57c00;
  }

  /* Forest Theme */
  .theme-forest {
    --bg-primary: linear-gradient(135deg, #e8f5e8 0%, #c8e6c9 100%);
    --bg-secondary: #c8e6c9;
    --bg-card: #ffffff;
    --text-primary: #1b5e20;
    --text-secondary: #2e7d32;
    --accent-color: #4caf50;
    --border-color: #a5d6a7;
    --shadow: rgba(76, 175, 80, 0.2);
    --success-color: #388e3c;
    --error-color: #d32f2f;
    --warning-color: #f57c00;
  }

  /* Space Theme */
  .theme-space {
    --bg-primary: linear-gradient(135deg, #0f0f23 0%, #1a1a3e 100%);
    --bg-secondary: #1a1a3e;
    --bg-card: #2d2d5f;
    --text-primary: #ffffff;
    --text-secondary: #ccccff;
    --accent-color: #9c27b0;
    --border-color: #6a1b9a;
    --shadow: rgba(156, 39, 176, 0.3);
    --success-color: #7b1fa2;
    --error-color: #e91e63;
    --warning-color: #ff9800;
  }

  /* Game Container Styles */
  .game-container {
    min-height: 100vh;
    background: var(--bg-primary);
    color: var(--text-primary);
    transition: all 0.3s ease;
    padding: 1rem;
  }

  /* Responsive Design */
  @media (max-width: 768px) {
    .game-container {
      padding: 0.5rem;
    }
  }
`;

function App() {
    // Game state
    const [gameState, setGameState] = useState(GAME_STATES.WELCOME);
    const [playerName, setPlayerName] = useState('');
    const [gameMode, setGameMode] = useState(GAME_MODES.CLASSIC);
    
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
    
    // Nova stanja za achievements i tracking
    const [gameStartTime, setGameStartTime] = useState(null);
    const [maxStreak, setMaxStreak] = useState(0);
    const [newAchievements, setNewAchievements] = useState([]);
    const [fastestAnswerTime, setFastestAnswerTime] = useState(null);
    const [questionStartTime, setQuestionStartTime] = useState(null);
    
    // UI state
    const [isOnline, setIsOnline] = useState(true);
    const [isLoading, setIsLoading] = useState(false);

    // Cloud data
    const [cloudData, setCloudData] = useState({ players: {}, lastUpdate: null });
    const [localData, setLocalData] = useState(() => LocalStorage.load());

    // Injekt CSS u head
    useEffect(() => {
        const styleElement = document.createElement('style');
        styleElement.textContent = appStyles;
        document.head.appendChild(styleElement);
        
        return () => {
            document.head.removeChild(styleElement);
        };
    }, []);

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

    const generateQuestion = (forceGameMode = null, forceLevel = null) => {
        const activeGameMode = forceGameMode || gameMode;
        const activeLevel = forceLevel || currentLevel;
        
        // Dobij difficulty iz player preferences
        const allPlayers = getAllPlayers();
        const playerData = allPlayers[playerName];
        const difficulty = playerData?.statistics?.preferences?.difficulty || 'medium';
        
        console.log('🎮 PRIJE generiranja:', { 
            currentLevel: activeLevel, 
            gameMode: activeGameMode, 
            difficulty,
            questionsInLevel,
            forceGameMode,
            forceLevel 
        }); // Debug
        
        const { question, correctAnswer: answer } = GameLogic.generateQuestion(activeLevel, activeGameMode, difficulty);
        
        // ⭐ KORISTI NOVO VREMENSKO OGRANIČENJE ZA STORY MODE
        const timeLimit = GameLogic.getTimeLimitForMode(activeLevel, activeGameMode, difficulty);
        
        console.log('🎯 Generiram pitanje:', question, '= ?', answer, 'Mode:', activeGameMode, 'Level:', activeLevel, 'Time:', timeLimit + 's'); // Debug log
        
        setCurrentQuestion(question);
        setCorrectAnswer(answer);
        setTimeLeft(timeLimit); // ⭐ KORISTI NOVO VRIJEME
        setQuestionStartTime(Date.now()); // Track kada je pitanje postavljeno
    };

    const startGame = (selectedGameMode = GAME_MODES.CLASSIC) => {
        console.log('🚀 POČINJE NOVA IGRA:', selectedGameMode); // Debug
        
        setGameState(GAME_STATES.PLAYING);
        setGameMode(selectedGameMode);
        setScore(0);
        setLives(selectedGameMode === GAME_MODES.TRAINING ? 999 : 3); // Infinite lives for training
        setCurrentLevel(1);
        setQuestionsInLevel(0);
        setStreak(0);
        setMaxStreak(0);
        setAnswer('');
        setShowFeedback('');
        setCurrentQuestion(''); // Resetiraj trenutno pitanje
        setCorrectAnswer(0);    // Resetiraj točan odgovor
        setSessionStats({ correct: 0, wrong: 0, timeouts: 0 });
        setGameStartTime(Date.now());
        setFastestAnswerTime(null);
        setQuestionStartTime(null);
        
        console.log('⏳ Čekam 100ms prije generiranja pitanja...'); // Debug
        
        // Dodaj timeout da se state resetira prije generiranja pitanja
        setTimeout(() => {
            console.log('✨ Generiram prvo pitanje za mode:', selectedGameMode); // Debug
            generateQuestion(selectedGameMode, 1); // Eksplicitno proslijedi mode i level
            GameLogic.focusInput(300);
        }, 100);
    };

    const nextLevel = () => {
        setAnswer('');
        setShowFeedback('');
        setCurrentLevel(currentLevel + 1);
        setQuestionsInLevel(0);
        setLives(gameMode === GAME_MODES.TRAINING ? 999 : 3);
        setGameState(GAME_STATES.PLAYING);
        
        // Zvuk za novi nivo
        const allPlayers = getAllPlayers();
        const playerData = allPlayers[playerName];
        const soundEnabled = playerData?.statistics?.preferences?.soundEnabled !== false;
        ThemeManager.playSound('levelUp', soundEnabled);
        
        setTimeout(() => {
            generateQuestion(null, currentLevel + 1); // Koristi trenutni gameMode, ali eksplicitni level
            GameLogic.focusInput(200);
        }, 100);
    };

    const checkAnswer = () => {
        const userAnswer = parseInt(answer);
        const answerTime = questionStartTime ? (Date.now() - questionStartTime) / 1000 : null;
        
        console.log('✅ Provjeravam:', userAnswer, 'vs', correctAnswer); // Debug log
        
        // Track fastest answer time
        if (answerTime && (!fastestAnswerTime || answerTime < fastestAnswerTime)) {
            setFastestAnswerTime(answerTime);
        }
        
        if (userAnswer === correctAnswer) {
            handleCorrectAnswer(answerTime);
        } else {
            handleWrongAnswer();
        }
    };

    const handleCorrectAnswer = (answerTime) => {
        // Dobij difficulty iz player preferences
        const allPlayers = getAllPlayers();
        const playerData = allPlayers[playerName];
        const difficulty = playerData?.statistics?.preferences?.difficulty || 'medium';
        
        const points = GameLogic.calculateScore(timeLeft, streak, currentLevel, gameMode, difficulty);
        
        setScore(score + points);
        setStreak(streak + 1);
        setMaxStreak(Math.max(maxStreak, streak + 1));
        setQuestionsInLevel(questionsInLevel + 1);
        setSessionStats(prev => ({ ...prev, correct: prev.correct + 1 }));
        setShowFeedback(FEEDBACK_TYPES.CORRECT);
        
        // Zvuk za točan odgovor
        const soundEnabled = playerData?.statistics?.preferences?.soundEnabled !== false;
        ThemeManager.playSound('correct', soundEnabled);
        
        setTimeout(() => {
            setAnswer('');
            setShowFeedback('');
            
            if (GameLogic.shouldLevelUp(questionsInLevel + 1, currentLevel, gameMode)) {
                if (!GameLogic.isGameComplete(currentLevel)) {
                    setGameState(GAME_STATES.LEVEL_COMPLETE);
                } else {
                    endGame();
                }
            } else {
                generateQuestion();
                GameLogic.focusInput(100);
            }
        }, 2000);
    };

    const handleWrongAnswer = () => {
        // Zvuk za netočan odgovor
        const allPlayers = getAllPlayers();
        const playerData = allPlayers[playerName];
        const soundEnabled = playerData?.statistics?.preferences?.soundEnabled !== false;
        const showTips = playerData?.statistics?.preferences?.showTips !== false;
        ThemeManager.playSound('wrong', soundEnabled);
        
        // Longer delay if tips are enabled to give time to read
        const feedbackDelay = showTips ? 5000 : 2000; // 5 seconds with tips, 2 seconds without
        
        if (gameMode === GAME_MODES.TRAINING) {
            // In training mode, just show feedback and continue
            setShowFeedback(FEEDBACK_TYPES.WRONG);
            setSessionStats(prev => ({ ...prev, wrong: prev.wrong + 1 }));
            setTimeout(() => {
                setAnswer('');
                setShowFeedback('');
                generateQuestion();
                GameLogic.focusInput(100);
            }, feedbackDelay);
        } else {
            setLives(lives - 1);
            setStreak(0);
            setSessionStats(prev => ({ ...prev, wrong: prev.wrong + 1 }));
            setShowFeedback(FEEDBACK_TYPES.WRONG);
            
            setTimeout(() => {
                setAnswer('');
                setShowFeedback('');
                if (lives - 1 <= 0) {
                    endGame();
                } else {
                    generateQuestion();
                    GameLogic.focusInput(100);
                }
            }, feedbackDelay);
        }
    };

    const handleTimeout = () => {
        if (gameMode === GAME_MODES.TRAINING) {
            // In training mode, no time limit
            return;
        }
        
        setLives(lives - 1);
        setStreak(0);
        setSessionStats(prev => ({ ...prev, timeouts: prev.timeouts + 1 }));
        setShowFeedback(FEEDBACK_TYPES.TIMEOUT);
        
        setTimeout(() => {
            setAnswer('');
            setShowFeedback('');
            if (lives - 1 <= 0) {
                endGame();
            } else {
                generateQuestion();
                GameLogic.focusInput(100);
            }
        }, 2000);
    };

    const endGame = async () => {
        const gameTime = Math.floor((Date.now() - gameStartTime) / 1000);
        const sessionStatsWithStreak = { ...sessionStats, maxStreak };
        
        setGameState(GAME_STATES.GAME_OVER);
        
        const allPlayers = PlayerManager.getAllPlayers(localData, cloudData, isJsonBinConfigured());
        const updatedPlayerData = PlayerManager.updatePlayerData(
            allPlayers, 
            playerName, 
            score, 
            currentLevel, 
            sessionStatsWithStreak,
            gameTime,
            gameMode,
            fastestAnswerTime // Pass fastest answer time for tracking
        );

        // Provjeri achievements - FIXED: Pass correct parameters
        const playerData = updatedPlayerData[playerName];
        const achievementResult = AchievementManager.checkAchievements(
            playerData, 
            sessionStatsWithStreak, 
            gameTime, 
            maxStreak
        );
        
        // Ažuriraj achievements ako ima novih
        if (achievementResult.newUnlocked.length > 0) {
            setNewAchievements(achievementResult.newUnlocked);
            updatedPlayerData[playerName].statistics.achievements = {
                unlocked: achievementResult.unlocked,
                progress: achievementResult.progress
            };
            
            // Zvuk za postignuće
            const soundEnabled = playerData?.statistics?.preferences?.soundEnabled !== false;
            setTimeout(() => {
                ThemeManager.playSound('achievement', soundEnabled);
            }, 1000);
        }

        setLocalData(updatedPlayerData);
        LocalStorage.save(updatedPlayerData);

        if (isJsonBinConfigured()) {
            await saveToCloud(updatedPlayerData);
        }
    };

    const updatePlayerPreferences = (playerName, preferences) => {
        const allPlayers = getAllPlayers();
        const currentPlayerData = allPlayers[playerName] || {
            name: playerName,
            bestScore: 0,
            maxLevel: 1,
            gamesPlayed: 0,
            results: [],
            statistics: {
                totalTimeSpent: 0,
                totalQuestionsAnswered: 0,
                totalCorrectAnswers: 0,
                bestStreak: 0,
                averageAccuracy: 0,
                levelStats: {},
                dailyStats: {},
                achievements: { unlocked: [], progress: {} },
                preferences: {},
                fastestAnswer: null
            }
        };
        
        const updatedPlayerData = {
            ...allPlayers,
            [playerName]: {
                ...currentPlayerData,
                statistics: {
                    ...currentPlayerData.statistics,
                    preferences: {
                        ...currentPlayerData.statistics.preferences,
                        ...preferences
                    }
                }
            }
        };
        
        setLocalData(updatedPlayerData);
        LocalStorage.save(updatedPlayerData);
        
        if (isJsonBinConfigured()) {
            saveToCloud(updatedPlayerData);
        }
    };

    const getAllPlayers = () => PlayerManager.getAllPlayers(localData, cloudData, isJsonBinConfigured());
    const getTopPlayers = () => PlayerManager.getTopPlayers(localData, cloudData, isJsonBinConfigured());
    const getLevelProgress = () => GameLogic.getLevelProgress(questionsInLevel, currentLevel, gameMode);
    const exportResults = () => LocalStorage.exportData();

    const refreshCloudData = async () => {
        if (!isJsonBinConfigured()) return;
        
        setIsLoading(true);
        try {
            const freshData = await CloudStorage.loadFromCloud();
            setCloudData({
                ...freshData,
                lastRefresh: new Date().toISOString()
            });
            setIsOnline(true);
        } catch (error) {
            setIsOnline(false);
        } finally {
            setIsLoading(false);
        }
    };

    // Effects
    useEffect(() => {
        loadFromCloud();
    }, []);

    useEffect(() => {
        LocalStorage.save(localData);
    }, [localData]);

    useEffect(() => {
        if (gameState === GAME_STATES.PLAYING && timeLeft > 0 && gameMode !== GAME_MODES.TRAINING) {
            const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
            return () => clearTimeout(timer);
        } else if (timeLeft === 0 && gameState === GAME_STATES.PLAYING && gameMode !== GAME_MODES.TRAINING) {
            handleTimeout();
        }
    }, [timeLeft, gameState, gameMode]);

    useEffect(() => {
        if (gameState === GAME_STATES.PLAYING && currentQuestion && !showFeedback) {
            GameLogic.focusInput(300);
        }
    }, [currentQuestion, questionsInLevel, currentLevel, gameState]);

    // Učitaj temu na početak ili kad se promijeni igrač
    useEffect(() => {
        if (playerName) {
            const allPlayers = getAllPlayers();
            const playerData = allPlayers[playerName];
            const theme = playerData?.statistics?.preferences?.theme || 'default';
            ThemeManager.applyTheme(theme);
        }
    }, [playerName, localData]);

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
        streak,
        gameMode,
        updatePlayerPreferences,
        newAchievements,
        setNewAchievements
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
        <div className="game-container min-h-screen transition-colors duration-300" style={{
            background: 'var(--bg-primary, #ffffff)',
            color: 'var(--text-primary, #1f2937)'
        }}>
            <div className="game-card" style={{
                maxWidth: gameState === GAME_STATES.WELCOME ? '500px' : 
                          gameState === GAME_STATES.PLAYING ? '700px' : '1200px',
                margin: '0 auto',
                background: 'var(--bg-card, #ffffff)',
                borderRadius: '1rem',
                border: '1px solid var(--border-color, #d1d5db)',
                boxShadow: '0 10px 25px var(--shadow, rgba(0,0,0,0.1))',
                padding: gameState === GAME_STATES.WELCOME ? '2rem' : 
                        gameState === GAME_STATES.PLAYING ? '1rem' : '2rem',
                transition: 'all 0.3s ease'
            }}>
                {isJsonBinConfigured() && (
                    <CloudStatus 
                        isOnline={isOnline}
                        isLoading={isLoading}
                    />
                )}

                {!isJsonBinConfigured() && (
                    <div className="mb-4 p-3 border rounded-lg text-sm" style={{
                        backgroundColor: 'var(--bg-secondary, #f8fafc)',
                        borderColor: 'var(--border-color, #d1d5db)',
                        color: 'var(--text-secondary, #6b7280)'
                    }}>
                        <div className="flex items-center gap-2">
                            <Cloud size={16} />
                            <span>Lokalni način - podaci se spremaju samo na ovom uređaju</span>
                        </div>
                    </div>
                )}

                {gameState === GAME_STATES.WELCOME && <WelcomeScreen {...commonProps} />}
                {gameState === GAME_STATES.MENU && <MenuScreen {...commonProps} />}
                {gameState === GAME_STATES.GAME_MODES && <GameModesScreen {...commonProps} />}
                
                {/* ⭐ AŽURIRANO RENDERIRANJE ZA ENHANCED STORY MODE */}
                {gameState === GAME_STATES.PLAYING && gameMode === GAME_MODES.STORY && (
                    <EnhancedStoryGameScreen {...gameProps} />
                )}
                {gameState === GAME_STATES.PLAYING && gameMode !== GAME_MODES.STORY && (
                    <GameScreen {...gameProps} />
                )}
                
                {gameState === GAME_STATES.LEVEL_COMPLETE && <LevelCompleteScreen {...commonProps} />}
                {gameState === GAME_STATES.GAME_OVER && <GameOverScreen {...commonProps} />}
                {gameState === GAME_STATES.LEADERBOARD && <LeaderboardScreen {...commonProps} />}
                {gameState === GAME_STATES.STATISTICS && <StatisticsScreen {...commonProps} />}
                {gameState === GAME_STATES.ACHIEVEMENTS && <AchievementsScreen {...commonProps} />}
                {gameState === GAME_STATES.SETTINGS && <SettingsScreen {...commonProps} />}
            </div>
        </div>
    );
}

export default App;
