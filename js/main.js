/**
 * Kontinente-Lernwebsite - Hauptlogik
 * Verwaltet Navigation, Spieler-Session und Rangliste
 */

// ========================================
// SPIELER-VERWALTUNG
// ========================================

const PlayerManager = {
    currentPlayer: null,

    init() {
        // Prüfe ob bereits ein Spieler in dieser Session existiert
        const savedPlayer = localStorage.getItem('kontinente_currentPlayer');
        if (savedPlayer) {
            this.currentPlayer = JSON.parse(savedPlayer);
            this.updateDisplay();
            this.hideNameModal();
        } else {
            this.showNameModal();
        }
    },

    setPlayer(name) {
        this.currentPlayer = {
            name: name.trim(),
            score: 0,
            gamesPlayed: 0
        };
        localStorage.setItem('kontinente_currentPlayer', JSON.stringify(this.currentPlayer));
        this.updateDisplay();
        RankingManager.addOrUpdatePlayer(this.currentPlayer);
    },

    addScore(points) {
        if (this.currentPlayer) {
            this.currentPlayer.score += points;
            localStorage.setItem('kontinente_currentPlayer', JSON.stringify(this.currentPlayer));
            this.updateDisplay();
            RankingManager.addOrUpdatePlayer(this.currentPlayer);
        }
    },

    updateDisplay() {
        const displayEl = document.getElementById('player-display');
        if (displayEl && this.currentPlayer) {
            displayEl.textContent = `${this.currentPlayer.name}: ${this.currentPlayer.score} ⭐`;
        }
    },

    showNameModal() {
        const modal = document.getElementById('name-modal');
        if (modal) modal.classList.remove('hidden');
    },

    hideNameModal() {
        const modal = document.getElementById('name-modal');
        if (modal) modal.classList.add('hidden');
    }
};

// ========================================
// RANGLISTEN-VERWALTUNG
// ========================================

const RankingManager = {
    rankings: [],

    init() {
        const saved = localStorage.getItem('kontinente_rankings');
        if (saved) {
            this.rankings = JSON.parse(saved);
        }
    },

    addOrUpdatePlayer(player) {
        const existingIndex = this.rankings.findIndex(p => p.name === player.name);

        if (existingIndex >= 0) {
            // Aktualisiere wenn besserer Score
            if (player.score > this.rankings[existingIndex].score) {
                this.rankings[existingIndex].score = player.score;
            }
        } else {
            this.rankings.push({ name: player.name, score: player.score });
        }

        // Sortiere nach Punkten (absteigend)
        this.rankings.sort((a, b) => b.score - a.score);

        // Behalte nur Top 10
        this.rankings = this.rankings.slice(0, 10);

        localStorage.setItem('kontinente_rankings', JSON.stringify(this.rankings));
    },

    display() {
        const listEl = document.getElementById('ranking-list');
        if (!listEl) return;

        if (this.rankings.length === 0) {
            listEl.innerHTML = '<p class="no-scores">Noch keine Punkte gesammelt!</p>';
            return;
        }

        const medals = ['🥇', '🥈', '🥉'];
        const classes = ['gold', 'silver', 'bronze'];

        listEl.innerHTML = this.rankings.map((player, index) => {
            const medal = index < 3 ? medals[index] : `${index + 1}.`;
            const rankClass = index < 3 ? classes[index] : '';

            return `
                <div class="ranking-item ${rankClass}">
                    <span class="ranking-position">${medal}</span>
                    <span class="ranking-name">${this.escapeHtml(player.name)}</span>
                    <span class="ranking-score">${player.score} ⭐</span>
                </div>
            `;
        }).join('');
    },

    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    },

    showModal() {
        this.display();
        const modal = document.getElementById('ranking-modal');
        if (modal) modal.classList.remove('hidden');
    },

    hideModal() {
        const modal = document.getElementById('ranking-modal');
        if (modal) modal.classList.add('hidden');
    }
};

// ========================================
// WELTKARTE NAVIGATION
// ========================================

const WorldMap = {
    init() {
        const continents = document.querySelectorAll('.continent');

        continents.forEach(continent => {
            continent.addEventListener('click', (e) => this.handleContinentClick(e));
            continent.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    this.handleContinentClick(e);
                }
            });

            // Accessibility
            continent.setAttribute('tabindex', '0');
            continent.setAttribute('role', 'button');
            continent.setAttribute('aria-label', `${continent.dataset.name} entdecken`);
        });
    },

    handleContinentClick(e) {
        const continentId = e.target.id;
        const continentName = e.target.dataset.name;

        // Animiere den Klick
        e.target.style.transform = 'scale(0.95)';
        setTimeout(() => {
            e.target.style.transform = '';
        }, 150);

        // Navigiere zur Kontinent-Seite
        setTimeout(() => {
            window.location.href = `kontinent.html?id=${continentId}`;
        }, 200);
    }
};

// ========================================
// EVENT LISTENERS
// ========================================

document.addEventListener('DOMContentLoaded', () => {
    // Initialisiere Manager
    RankingManager.init();
    PlayerManager.init();
    WorldMap.init();

    // Namenseingabe
    const startBtn = document.getElementById('start-btn');
    const nameInput = document.getElementById('player-name');

    if (startBtn && nameInput) {
        startBtn.addEventListener('click', () => {
            const name = nameInput.value.trim();
            if (name.length >= 1) {
                PlayerManager.setPlayer(name);
                PlayerManager.hideNameModal();
            } else {
                nameInput.classList.add('error');
                nameInput.placeholder = 'Bitte gib deinen Namen ein!';
            }
        });

        nameInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                startBtn.click();
            }
        });

        nameInput.addEventListener('input', () => {
            nameInput.classList.remove('error');
        });
    }

    // Rangliste öffnen
    const rankingBtn = document.getElementById('ranking-btn');
    if (rankingBtn) {
        rankingBtn.addEventListener('click', () => {
            RankingManager.showModal();
        });
    }

    // Rangliste schließen
    const closeRankingBtn = document.getElementById('close-ranking');
    if (closeRankingBtn) {
        closeRankingBtn.addEventListener('click', () => {
            RankingManager.hideModal();
        });
    }

    // Modal schließen bei Klick außerhalb
    const rankingModal = document.getElementById('ranking-modal');
    if (rankingModal) {
        rankingModal.addEventListener('click', (e) => {
            if (e.target === rankingModal) {
                RankingManager.hideModal();
            }
        });
    }
});

// ========================================
// GLOBALE HILFSFUNKTIONEN
// ========================================

// Punkte hinzufügen (für Spiele)
function addPoints(points) {
    PlayerManager.addScore(points);
}

// Aktuellen Spieler abrufen
function getCurrentPlayer() {
    return PlayerManager.currentPlayer;
}
