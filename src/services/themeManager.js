import { THEMES, AVATARS } from './gameConfig.js';

export class ThemeManager {
    static applyTheme(themeName) {
        const root = document.documentElement;
        
        // Ukloni postojeće theme klase
        root.classList.remove('theme-dark', 'theme-ocean', 'theme-forest', 'theme-space');
        
        // Dodaj novu theme klasu
        if (themeName !== 'default') {
            root.classList.add(`theme-${themeName}`);
        }
        
        // Postavi CSS custom properties za teme
        switch (themeName) {
            case THEMES.DARK:
                root.style.setProperty('--bg-primary', '#1a1a1a');
                root.style.setProperty('--bg-secondary', '#2d2d2d');
                root.style.setProperty('--bg-card', '#374151');
                root.style.setProperty('--text-primary', '#ffffff');
                root.style.setProperty('--text-secondary', '#d1d5db');
                root.style.setProperty('--accent-color', '#6366f1');
                root.style.setProperty('--border-color', '#4b5563');
                break;
                
            case THEMES.OCEAN:
                root.style.setProperty('--bg-primary', 'linear-gradient(135deg, #e0f2fe 0%, #b3e5fc 100%)');
                root.style.setProperty('--bg-secondary', '#b3e5fc');
                root.style.setProperty('--bg-card', '#ffffff');
                root.style.setProperty('--text-primary', '#0d47a1');
                root.style.setProperty('--text-secondary', '#1565c0');
                root.style.setProperty('--accent-color', '#00acc1');
                root.style.setProperty('--border-color', '#81d4fa');
                break;
                
            case THEMES.FOREST:
                root.style.setProperty('--bg-primary', 'linear-gradient(135deg, #e8f5e8 0%, #c8e6c9 100%)');
                root.style.setProperty('--bg-secondary', '#c8e6c9');
                root.style.setProperty('--bg-card', '#ffffff');
                root.style.setProperty('--text-primary', '#1b5e20');
                root.style.setProperty('--text-secondary', '#2e7d32');
                root.style.setProperty('--accent-color', '#4caf50');
                root.style.setProperty('--border-color', '#a5d6a7');
                break;
                
            case THEMES.SPACE:
                root.style.setProperty('--bg-primary', 'linear-gradient(135deg, #0f0f23 0%, #1a1a3e 100%)');
                root.style.setProperty('--bg-secondary', '#1a1a3e');
                root.style.setProperty('--bg-card', '#2d2d5f');
                root.style.setProperty('--text-primary', '#ffffff');
                root.style.setProperty('--text-secondary', '#ccccff');
                root.style.setProperty('--accent-color', '#9c27b0');
                root.style.setProperty('--border-color', '#6a1b9a');
                break;
                
            default: // DEFAULT
                root.style.setProperty('--bg-primary', '#ffffff');
                root.style.setProperty('--bg-secondary', '#f8fafc');
                root.style.setProperty('--bg-card', '#ffffff');
                root.style.setProperty('--text-primary', '#1f2937');
                root.style.setProperty('--text-secondary', '#6b7280');
                root.style.setProperty('--accent-color', '#3b82f6');
                root.style.setProperty('--border-color', '#d1d5db');
        }
    }

    static getAvatar(avatarId) {
        return AVATARS.find(avatar => avatar.id === avatarId) || AVATARS[0];
    }

    static playSound(soundType, enabled = true) {
        if (!enabled) return;
        
        // Provjeri podršku za Web Audio API
        if (typeof window === 'undefined' || !window.AudioContext && !window.webkitAudioContext) {
            return;
        }
        
        try {
            const audioContext = new (window.AudioContext || window.webkitAudioContext)();
            
            let frequency, duration;
            switch (soundType) {
                case 'correct':
                    frequency = [800, 1000, 1200];
                    duration = 0.3;
                    break;
                case 'wrong':
                    frequency = [400, 300, 200];
                    duration = 0.5;
                    break;
                case 'levelUp':
                    frequency = [600, 800, 1000, 1200];
                    duration = 0.8;
                    break;
                case 'achievement':
                    frequency = [800, 1200, 800, 1200];
                    duration = 1.0;
                    break;
                case 'click':
                    frequency = [600];
                    duration = 0.1;
                    break;
                default:
                    return;
            }
            
            // Kreiraj složeniji zvuk s više tonova
            frequency.forEach((freq, index) => {
                const oscillator = audioContext.createOscillator();
                const gainNode = audioContext.createGain();
                
                oscillator.connect(gainNode);
                gainNode.connect(audioContext.destination);
                
                oscillator.frequency.value = freq;
                oscillator.type = 'sine';
                
                const startTime = audioContext.currentTime + (index * duration / frequency.length);
                const endTime = startTime + (duration / frequency.length);
                
                gainNode.gain.setValueAtTime(0, startTime);
                gainNode.gain.linearRampToValueAtTime(0.1, startTime + 0.01);
                gainNode.gain.exponentialRampToValueAtTime(0.01, endTime);
                
                oscillator.start(startTime);
                oscillator.stop(endTime);
            });
        } catch (error) {
            console.warn('Audio playback failed:', error);
        }
    }

    static getThemeDisplayName(themeKey) {
        const displayNames = {
            default: 'Klasična',
            dark: 'Tamna',
            ocean: 'Ocean',
            forest: 'Šuma',
            space: 'Svemir'
        };
        return displayNames[themeKey] || themeKey;
    }

    static getDifficultyDisplayName(difficultyKey) {
        const displayNames = {
            easy: 'Lako',
            medium: 'Srednje',
            hard: 'Teško'
        };
        return displayNames[difficultyKey] || difficultyKey;
    }

    static getDifficultyDescription(difficultyKey) {
        const descriptions = {
            easy: 'Manji brojevi, prikladni za početnici. Zbrajanje do 20, tablice do 3.',
            medium: 'Standardni brojevi za uzrast 1.-3. razreda. Zbrajanje do 50, tablice do 6.',
            hard: 'Veći izazov s više bodova. Zbrajanje do 100, tablice do 10.'
        };
        return descriptions[difficultyKey] || 'Standardna težina';
    }
}
