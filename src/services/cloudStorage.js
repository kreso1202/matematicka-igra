import { JSONBIN_CONFIG } from './gameConfig.js';

export class CloudStorage {
    static isConfigured() {
        return JSONBIN_CONFIG.apiKey !== '$2a$10$Q3Z8Q3Z8Q3Z8Q3Z8Q3Z8Qu' && 
               JSONBIN_CONFIG.binId !== 'your-bin-id';
    }

    static async loadFromCloud() {
        if (!this.isConfigured()) {
            console.log('JsonBin nije konfiguriran, koristimo lokalne podatke');
            return { players: {}, lastUpdate: null };
        }

        try {
            const response = await fetch(`${JSONBIN_CONFIG.baseUrl}/b/${JSONBIN_CONFIG.binId}/latest`, {
                method: 'GET',
                headers: {
                    'X-Master-Key': JSONBIN_CONFIG.apiKey,
                    'Content-Type': 'application/json'
                }
            });

            if (response.ok) {
                const data = await response.json();
                console.log('Podaci učitani iz oblaka');
                return data.record || { players: {}, lastUpdate: null };
            } else {
                throw new Error('Greška pri dohvaćanju podataka');
            }
        } catch (error) {
            console.error('Greška pri dohvaćanju iz oblaka:', error);
            throw error;
        }
    }

    static async saveToCloud(playerData) {
        if (!this.isConfigured()) {
            console.log('JsonBin nije konfiguriran, spremamo lokalno');
            return false;
        }

        try {
            const dataToSave = {
                players: playerData,
                lastUpdate: new Date().toISOString()
            };

            const response = await fetch(`${JSONBIN_CONFIG.baseUrl}/b/${JSONBIN_CONFIG.binId}`, {
                method: 'PUT',
                headers: {
                    'X-Master-Key': JSONBIN_CONFIG.apiKey,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(dataToSave)
            });

            if (response.ok) {
                console.log('Podaci spremljeni u oblak');
                return dataToSave;
            } else {
                throw new Error('Greška pri spremanju');
            }
        } catch (error) {
            console.error('Greška pri spremanju u oblak:', error);
            throw error;
        }
    }
}

export class LocalStorage {
    static STORAGE_KEY = 'mathGamePlayers';

    static load() {
        try {
            const saved = localStorage.getItem(this.STORAGE_KEY);
            return saved ? JSON.parse(saved) : {};
        } catch (error) {
            console.error('Greška pri učitavanju lokalnih podataka:', error);
            return {};
        }
    }

    static save(data) {
        try {
            localStorage.setItem(this.STORAGE_KEY, JSON.stringify(data));
            return true;
        } catch (error) {
            console.error('Greška pri spremanju lokalnih podataka:', error);
            return false;
        }
    }

    static exportData() {
        const data = this.load();
        const jsonString = JSON.stringify(data, null, 2);
        const blob = new Blob([jsonString], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        
        const a = document.createElement('a');
        a.href = url;
        a.download = `matematicka-igrica-rezultati-${new Date().toISOString().split('T')[0]}.json`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        
        URL.revokeObjectURL(url);
    }
}
