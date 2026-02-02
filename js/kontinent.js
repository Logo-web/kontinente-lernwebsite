/**
 * Kontinente-Lernwebsite - Kontinent-Seite Logik
 * Lädt Inhalte dynamisch basierend auf URL-Parameter
 */

// ========================================
// DATEN-MANAGEMENT
// ========================================

let kontinenteData = null;
let currentKontinent = null;

// Emoji-Platzhalter für Bilder (da wir keine echten Bilder haben)
const emojiMap = {
    // Tiere
    'loewe': '🦁',
    'elefant': '🐘',
    'giraffe': '🦒',
    'braunbaer': '🐻',
    'wolf': '🐺',
    'panda': '🐼',
    'tiger': '🐯',
    'bison': '🦬',
    'weisskopfseeadler': '🦅',
    'grizzly': '🐻',
    'jaguar': '🐆',
    'papagei': '🦜',
    'faultier': '🦥',
    'kaenguru': '🦘',
    'koala': '🐨',
    'schnabeltier': '🦆',
    'pinguin': '🐧',
    'robbe': '🦭',
    'albatros': '🦅',

    // Landschaften
    'sahara': '🏜️',
    'savanne': '🌾',
    'alpen': '🏔️',
    'nordsee': '🌊',
    'himalaya': '🗻',
    'reisfelder': '🌾',
    'grand_canyon': '🏜️',
    'niagara': '💧',
    'amazonas': '🌳',
    'anden': '⛰️',
    'outback': '🏜️',
    'great_barrier_reef': '🐠',
    'eiswueste': '❄️',
    'eisberge': '🧊',

    // Sehenswürdigkeiten
    'pyramiden': '🏛️',
    'eiffelturm': '🗼',
    'chinesische_mauer': '🧱',
    'freiheitsstatue': '🗽',
    'machu_picchu': '🏛️',
    'opera_house': '🎭',
    'suedpol': '🧭',

    // Menschen
    'maasai': '👨‍👩‍👧‍👦',
    'europa_kulturen': '🇪🇺',
    'asien_kulturen': '🌏',
    'indigene': '👨‍👩‍👧‍👦',
    'suedamerika_kulturen': '💃',
    'aborigines': '🎨',
    'forscher': '🔬',

    // Klima
    'klima': '☀️'
};

function getEmoji(bildName) {
    if (!bildName) return '📷';
    const key = bildName.replace('.jpg', '').replace('.png', '');
    return emojiMap[key] || '📷';
}

// ========================================
// INITIALISIERUNG
// ========================================

async function initKontinentPage() {
    // Spieler-Anzeige aktualisieren
    updatePlayerDisplay();

    // Kontinent-ID aus URL holen
    const params = new URLSearchParams(window.location.search);
    const kontinentId = params.get('id');

    if (!kontinentId) {
        window.location.href = 'index.html';
        return;
    }

    // Daten aus globaler Variable laden (kein fetch nötig)
    if (typeof KONTINENTE_DATA !== 'undefined') {
        kontinenteData = KONTINENTE_DATA;
    } else {
        // Fallback für Server-Betrieb
        try {
            const response = await fetch('data/inhalte.json');
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            kontinenteData = await response.json();
        } catch (error) {
            console.error('Fehler beim Laden der Kontinent-Daten:', error);
            showDataError();
            return;
        }
    }

    // Prüfe ob Daten gültig sind
    if (!kontinenteData || !kontinenteData.kontinente) {
        console.error('Ungültige Kontinent-Daten geladen');
        showDataError();
        return;
    }

    currentKontinent = kontinenteData.kontinente[kontinentId];

    if (!currentKontinent) {
        window.location.href = 'index.html';
        return;
    }

    // Seite befüllen
    renderKontinentPage(kontinentId);
    setupTabs();
    setupCardModal();
}

function updatePlayerDisplay() {
    const savedPlayer = localStorage.getItem('kontinente_currentPlayer');
    if (savedPlayer) {
        const player = JSON.parse(savedPlayer);
        const displayEl = document.getElementById('player-display');
        if (displayEl) {
            displayEl.textContent = `${player.name}: ${player.score} ⭐`;
        }
    }
}

// ========================================
// RENDERING
// ========================================

function renderKontinentPage(kontinentId) {
    // Titel setzen
    document.getElementById('kontinent-titel').textContent =
        `${currentKontinent.emoji} ${currentKontinent.name}`;

    // Body-Hintergrund anpassen
    document.body.style.setProperty('--current-color', currentKontinent.farbe);

    // Seiten-Titel
    document.title = `${currentKontinent.name} entdecken`;

    // Karten rendern
    renderCards('tiere', currentKontinent.tiere, '🐾');
    renderCards('landschaften', currentKontinent.landschaften, '🌍');
    renderCards('menschen', currentKontinent.menschen, '👨‍👩‍👧‍👦');
    renderCards('sehenswuerdigkeiten', currentKontinent.sehenswuerdigkeiten, '🏛️');
    renderKlimaCard(currentKontinent.klima);
}

function renderCards(sectionId, items, defaultEmoji) {
    const container = document.getElementById(`${sectionId}-cards`);
    if (!container || !items || items.length === 0) {
        const section = document.getElementById(`${sectionId}-section`);
        if (section) section.style.display = 'none';
        return;
    }

    container.innerHTML = items.map((item, index) => `
        <div class="info-card" 
             data-section="${sectionId}" 
             data-index="${index}"
             tabindex="0"
             role="button"
             aria-label="${item.name} - Details anzeigen">
            <div class="card-image">${getEmoji(item.bild)}</div>
            <div class="card-content">
                <h3>${item.name}</h3>
                <p>${item.text}</p>
            </div>
        </div>
    `).join('');
}

function renderKlimaCard(klima) {
    const container = document.getElementById('klima-cards');
    if (!container || !klima) {
        const section = document.getElementById('klima-section');
        if (section) section.style.display = 'none';
        return;
    }

    container.innerHTML = `
        <div class="info-card klima-card" 
             data-section="klima" 
             data-index="0"
             tabindex="0"
             role="button">
            <div class="card-image">☀️🌧️❄️</div>
            <div class="card-content">
                <h3>Klima & Wetter</h3>
                <p>${klima.text}</p>
            </div>
        </div>
    `;
}

// ========================================
// TAB NAVIGATION
// ========================================

function setupTabs() {
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');

    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const targetTab = btn.dataset.tab;

            // Buttons aktualisieren
            tabBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            // Content aktualisieren
            tabContents.forEach(content => {
                content.classList.remove('active');
                if (content.id === `${targetTab}-tab`) {
                    content.classList.add('active');
                }
            });
        });
    });
}

// ========================================
// CARD MODAL
// ========================================

function setupCardModal() {
    const modal = document.getElementById('card-modal');
    const closeBtn = modal.querySelector('.close-modal-btn');

    // Klick auf Karten
    document.querySelectorAll('.info-card').forEach(card => {
        card.addEventListener('click', () => openCardModal(card));
        card.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                openCardModal(card);
            }
        });
    });

    // Schließen
    closeBtn.addEventListener('click', closeCardModal);
    modal.addEventListener('click', (e) => {
        if (e.target === modal) closeCardModal();
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') closeCardModal();
    });
}

function openCardModal(card) {
    const section = card.dataset.section;
    const index = parseInt(card.dataset.index);

    let item;
    if (section === 'klima') {
        item = {
            name: 'Klima & Wetter',
            text: currentKontinent.klima.text,
            fakt: currentKontinent.klima.fakt,
            bild: 'klima'
        };
    } else {
        item = currentKontinent[section][index];
    }

    if (!item) return;

    const modal = document.getElementById('card-modal');
    document.getElementById('modal-image').textContent = getEmoji(item.bild);
    document.getElementById('modal-title').textContent = item.name;
    document.getElementById('modal-text').textContent = item.text;

    const faktBox = document.getElementById('modal-fakt');
    if (item.fakt) {
        faktBox.textContent = item.fakt;
        faktBox.style.display = 'block';
    } else {
        faktBox.style.display = 'none';
    }

    modal.classList.remove('hidden');
}

function closeCardModal() {
    document.getElementById('card-modal').classList.add('hidden');
}

// ========================================
// INIT
// ========================================

function showDataError() {
    const main = document.querySelector('main') || document.body;
    main.innerHTML = `
        <div style="text-align: center; padding: 2rem; color: #ef4444;">
            <p style="font-size: 3rem; margin-bottom: 1rem;">😕</p>
            <h2>Oops! Etwas ist schiefgelaufen.</h2>
            <p>Die Kontinent-Daten konnten nicht geladen werden.</p>
            <p>Bitte lade die Seite neu oder versuche es später noch einmal.</p>
            <a href="index.html" class="btn-primary" style="margin-top: 1rem; display: inline-block; text-decoration: none;">
                Zurück zur Startseite 🏠
            </a>
        </div>
    `;
}

document.addEventListener('DOMContentLoaded', initKontinentPage);
