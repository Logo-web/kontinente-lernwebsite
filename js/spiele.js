/**
 * Kontinente-Lernwebsite - Spiele Logik
 * Alle 5 Spieltypen: Quiz, Richtig/Falsch, Zuordnung, Memory, Weltkarten-Klick
 */

// ========================================
// GLOBALE VARIABLEN
// ========================================

let gameData = null;
let currentGame = null;
let currentScore = 0;
let currentQuestion = 0;
let totalQuestions = 0;

// Emoji-Map für Bilder
const emojiMap = {
    // Tiere
    'loewe': '🦁', 'elefant': '🐘', 'giraffe': '🦒', 'braunbaer': '🐻',
    'wolf': '🐺', 'panda': '🐼', 'tiger': '🐯', 'bison': '🦬',
    'weisskopfseeadler': '🦅', 'grizzly': '🐻', 'jaguar': '🐆',
    'papagei': '🦜', 'faultier': '🦥', 'kaenguru': '🦘', 'koala': '🐨',
    'schnabeltier': '🦆', 'pinguin': '🐧', 'robbe': '🦭', 'albatros': '🦅',
    'asien_elefant': '🐘',

    // Landschaften
    'sahara': '🏜️', 'savanne': '🌾', 'alpen': '🏔️', 'nordsee': '🌊',
    'himalaya': '🗻', 'reisfelder': '🌾', 'grand_canyon': '🏜️', 'niagara': '💧',
    'amazonas': '🌳', 'anden': '⛰️', 'outback': '🏜️', 'great_barrier_reef': '🐠',
    'eiswueste': '❄️', 'eisberge': '🧊',

    // Sehenswürdigkeiten
    'pyramiden': '🏛️', 'eiffelturm': '🗼', 'freiheitsstatue': '🗽',
    'chinesische_mauer': '🧱', 'machu_picchu': '🏛️', 'opera_house': '🎭', 'suedpol': '🧭',

    // Menschen & Kulturen
    'maasai': '👨‍👩‍👧‍👦', 'europa_kulturen': '🇪🇺', 'asien_kulturen': '🌏',
    'indigene': '👨‍👩‍👧‍👦', 'suedamerika_kulturen': '💃', 'aborigines': '🎨', 'forscher': '🔬',

    // Klima
    'klima': '☀️'
};

const kontinentEmojis = {
    'afrika': '🌍', 'europa': '🏰', 'asien': '🐼',
    'nordamerika': '🗽', 'suedamerika': '🦜',
    'australien': '🦘', 'antarktis': '🐧'
};

const kontinentNamen = {
    'afrika': 'Afrika', 'europa': 'Europa', 'asien': 'Asien',
    'nordamerika': 'Nordamerika', 'suedamerika': 'Südamerika',
    'australien': 'Australien', 'antarktis': 'Antarktis'
};

// ========================================
// INITIALISIERUNG
// ========================================

async function initSpiele() {
    updatePlayerDisplay();

    // Daten aus globaler Variable laden (kein fetch nötig)
    if (typeof KONTINENTE_DATA !== 'undefined') {
        gameData = KONTINENTE_DATA;
    } else {
        // Fallback für Server-Betrieb
        try {
            const response = await fetch('data/inhalte.json');
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            gameData = await response.json();
        } catch (error) {
            console.error('Fehler beim Laden der Spieldaten:', error);
            showDataError();
            return;
        }
    }

    // Prüfe ob Daten gültig sind
    if (!gameData || !gameData.quiz || !gameData.kontinente) {
        console.error('Ungültige Spieldaten geladen');
        showDataError();
        return;
    }

    // URL-Parameter prüfen
    const params = new URLSearchParams(window.location.search);
    const spiel = params.get('spiel');

    if (spiel) {
        startGame(spiel);
    } else {
        showGameSelection();
    }

    setupEventListeners();
}

function updatePlayerDisplay() {
    const saved = localStorage.getItem('kontinente_currentPlayer');
    if (saved) {
        const player = JSON.parse(saved);
        const displayEl = document.getElementById('player-display');
        const scoreEl = document.getElementById('score-display');
        if (displayEl) displayEl.textContent = player.name;
        if (scoreEl) scoreEl.textContent = `${player.score} ⭐`;
    }
}

function setupEventListeners() {
    // Spiel-Auswahl
    document.querySelectorAll('.game-select-btn').forEach(btn => {
        btn.addEventListener('click', () => startGame(btn.dataset.spiel));
    });

    // Richtig/Falsch Buttons
    document.getElementById('rf-richtig')?.addEventListener('click', () => handleRFAnswer(true));
    document.getElementById('rf-falsch')?.addEventListener('click', () => handleRFAnswer(false));

    // Ergebnis Buttons
    document.getElementById('nochmal-btn')?.addEventListener('click', () => startGame(currentGame));
    document.getElementById('zurueck-btn')?.addEventListener('click', showGameSelection);
}

// ========================================
// SPIEL-STEUERUNG
// ========================================

function showGameSelection() {
    hideAllContainers();
    document.getElementById('spiel-auswahl').classList.remove('hidden');
    document.getElementById('spiel-titel').textContent = '🎮 Spiele';
}

function hideAllContainers() {
    document.querySelectorAll('.spiel-container').forEach(c => c.classList.add('hidden'));
}

function startGame(gameType) {
    currentGame = gameType;
    currentScore = 0;
    currentQuestion = 0;

    hideAllContainers();

    switch (gameType) {
        case 'quiz':
            initQuiz();
            break;
        case 'richtigfalsch':
            initRichtigFalsch();
            break;
        case 'zuordnung':
            initZuordnung();
            break;
        case 'memory':
            initMemory();
            break;
        case 'weltkarte':
            initWeltkarte();
            break;
    }
}

function showResult() {
    hideAllContainers();

    const ergebnis = document.getElementById('ergebnis');
    ergebnis.classList.remove('hidden');

    let emoji, titel;
    if (currentScore >= 80) {
        emoji = '🎉';
        titel = 'Fantastisch!';
    } else if (currentScore >= 50) {
        emoji = '👍';
        titel = 'Gut gemacht!';
    } else {
        emoji = '💪';
        titel = 'Weiter üben!';
    }

    document.getElementById('ergebnis-emoji').textContent = emoji;
    document.getElementById('ergebnis-titel').textContent = titel;
    document.getElementById('ergebnis-text').textContent =
        `Du hast ${currentScore} Punkte gesammelt.`;
    document.getElementById('ergebnis-score').textContent = `+${currentScore}`;

    // Punkte zum Spieler hinzufügen
    if (typeof addPoints === 'function') {
        addPoints(currentScore);
        updatePlayerDisplay();
    }
}

function showFeedback(correct, message) {
    const feedbackId = `${currentGame === 'richtigfalsch' ? 'rf' :
        currentGame === 'weltkarte' ? 'wk' :
            currentGame}-feedback`;
    let feedback = document.getElementById(feedbackId);

    if (!feedback) {
        feedback = document.querySelector('.feedback');
    }

    if (!feedback) return;

    feedback.textContent = message || (correct ? '✅ Richtig!' : '❌ Falsch!');
    feedback.className = `feedback ${correct ? 'correct' : 'wrong'}`;

    setTimeout(() => {
        feedback.classList.add('hidden');
    }, 1500);
}

// ========================================
// QUIZ
// ========================================

let quizQuestions = [];

function initQuiz() {
    document.getElementById('quiz-spiel').classList.remove('hidden');
    document.getElementById('spiel-titel').textContent = '❓ Quiz';

    // Fragen zusammenstellen (Mix aus allen Schwierigkeiten)
    const leicht = [...gameData.quiz.leicht];
    const mittel = [...gameData.quiz.mittel];
    const schwer = [...gameData.quiz.schwer];

    // Shuffle und auswählen
    quizQuestions = [
        ...shuffle(leicht).slice(0, 3),          // 60% leicht
        ...shuffle(mittel).slice(0, 2),          // 30% mittel
        ...shuffle(schwer).slice(0, 1)           // 10% schwer
    ];

    shuffle(quizQuestions);
    totalQuestions = quizQuestions.length;
    currentQuestion = 0;

    showQuizQuestion();
}

function showQuizQuestion() {
    if (currentQuestion >= quizQuestions.length) {
        showResult();
        return;
    }

    const q = quizQuestions[currentQuestion];
    const progress = (currentQuestion / totalQuestions) * 100;
    document.getElementById('quiz-progress').style.width = `${progress}%`;

    // Info-Karte für mittlere Schwierigkeit
    const infoCard = document.getElementById('quiz-info-card');
    if (q.info) {
        document.getElementById('quiz-info-text').textContent = q.info;
        infoCard.classList.remove('hidden');
    } else {
        infoCard.classList.add('hidden');
    }

    document.getElementById('quiz-frage').textContent = q.frage;

    const optionsContainer = document.getElementById('quiz-options');
    optionsContainer.innerHTML = q.optionen.map((opt, idx) => `
        <button class="option-btn" data-index="${idx}">${opt}</button>
    `).join('');

    optionsContainer.querySelectorAll('.option-btn').forEach(btn => {
        btn.addEventListener('click', () => handleQuizAnswer(btn, q.antwort));
    });
}

function handleQuizAnswer(btn, correctIndex) {
    const selectedIndex = parseInt(btn.dataset.index);
    const correct = selectedIndex === correctIndex;

    // Alle Buttons deaktivieren
    document.querySelectorAll('.option-btn').forEach(b => {
        b.classList.add('disabled');
        if (parseInt(b.dataset.index) === correctIndex) {
            b.classList.add('correct');
        }
    });

    if (correct) {
        btn.classList.add('correct');
        currentScore += 10;
        showFeedback(true, '✅ Richtig! +10 Punkte');
    } else {
        btn.classList.add('wrong');
        showFeedback(false, '❌ Leider falsch!');
    }

    setTimeout(() => {
        currentQuestion++;
        showQuizQuestion();
    }, 1500);
}

// ========================================
// RICHTIG/FALSCH
// ========================================

let rfStatements = [];

function initRichtigFalsch() {
    document.getElementById('richtigfalsch-spiel').classList.remove('hidden');
    document.getElementById('spiel-titel').textContent = '✅ Richtig oder Falsch?';

    rfStatements = shuffle([...gameData.richtigFalsch]).slice(0, 6);
    totalQuestions = rfStatements.length;
    currentQuestion = 0;

    showRFStatement();
}

function showRFStatement() {
    if (currentQuestion >= rfStatements.length) {
        showResult();
        return;
    }

    const s = rfStatements[currentQuestion];
    const progress = (currentQuestion / totalQuestions) * 100;
    document.getElementById('rf-progress').style.width = `${progress}%`;
    document.getElementById('rf-aussage').textContent = s.aussage;
}

function handleRFAnswer(answer) {
    const s = rfStatements[currentQuestion];
    const correct = answer === s.antwort;

    if (correct) {
        currentScore += 10;
        showFeedback(true, `✅ Richtig! ${s.erklaerung}`);
    } else {
        showFeedback(false, `❌ Falsch! ${s.erklaerung}`);
    }

    setTimeout(() => {
        currentQuestion++;
        showRFStatement();
    }, 2000);
}

// ========================================
// ZUORDNUNG
// ========================================

let zuordnungItems = [];

function initZuordnung() {
    document.getElementById('zuordnung-spiel').classList.remove('hidden');
    document.getElementById('spiel-titel').textContent = '🎯 Zuordnung';

    zuordnungItems = shuffle([...gameData.zuordnung]).slice(0, 6);
    totalQuestions = zuordnungItems.length;
    currentQuestion = 0;

    showZuordnungItem();
}

function showZuordnungItem() {
    if (currentQuestion >= zuordnungItems.length) {
        showResult();
        return;
    }

    const item = zuordnungItems[currentQuestion];
    const bildKey = item.bild.replace('.jpg', '');

    document.getElementById('zuordnung-emoji').textContent = emojiMap[bildKey] || '❓';
    document.getElementById('zuordnung-name').textContent = item.item;

    // Kontinente als Optionen (inkl. richtige Antwort)
    const allKontinente = Object.keys(kontinentNamen);
    const wrongOptions = shuffle(allKontinente.filter(k => k !== item.kontinent)).slice(0, 3);
    const options = shuffle([item.kontinent, ...wrongOptions]);

    const container = document.getElementById('zuordnung-options');
    container.innerHTML = options.map(k => `
        <button class="zuordnung-btn" data-kontinent="${k}">
            ${kontinentEmojis[k]} ${kontinentNamen[k]}
        </button>
    `).join('');

    container.querySelectorAll('.zuordnung-btn').forEach(btn => {
        btn.addEventListener('click', () => handleZuordnungAnswer(btn, item.kontinent));
    });
}

function handleZuordnungAnswer(btn, correctKontinent) {
    const selected = btn.dataset.kontinent;
    const correct = selected === correctKontinent;

    document.querySelectorAll('.zuordnung-btn').forEach(b => {
        b.disabled = true;
        if (b.dataset.kontinent === correctKontinent) {
            b.style.background = 'var(--color-success)';
            b.style.color = 'white';
        }
    });

    if (correct) {
        currentScore += 10;
        showFeedback(true);
    } else {
        btn.style.background = 'var(--color-error)';
        btn.style.color = 'white';
        showFeedback(false);
    }

    setTimeout(() => {
        currentQuestion++;
        showZuordnungItem();
    }, 1500);
}

// ========================================
// MEMORY
// ========================================

let memoryCards = [];
let flippedCards = [];
let matchedPairs = 0;
let moves = 0;

function initMemory() {
    document.getElementById('memory-spiel').classList.remove('hidden');
    document.getElementById('spiel-titel').textContent = '🃏 Memory';

    const pairs = [
        { emoji: '🦁', name: 'Löwe' },
        { emoji: '🐘', name: 'Elefant' },
        { emoji: '🐼', name: 'Panda' },
        { emoji: '🦘', name: 'Känguru' },
        { emoji: '🐧', name: 'Pinguin' },
        { emoji: '🗼', name: 'Eiffelturm' },
        { emoji: '🏛️', name: 'Pyramiden' },
        { emoji: '🗽', name: 'Freiheitsstatue' }
    ];

    memoryCards = shuffle([...pairs, ...pairs].map((p, i) => ({
        id: i,
        ...p,
        matched: false
    })));

    flippedCards = [];
    matchedPairs = 0;
    moves = 0;

    renderMemoryGrid();
    updateMemoryInfo();
}

function renderMemoryGrid() {
    const grid = document.getElementById('memory-grid');
    grid.innerHTML = memoryCards.map((card, idx) => `
        <div class="memory-card" data-index="${idx}">
            <span class="front">${card.emoji}</span>
            <span class="back">❓</span>
        </div>
    `).join('');

    grid.querySelectorAll('.memory-card').forEach(card => {
        card.addEventListener('click', () => handleMemoryClick(card));
    });
}

function updateMemoryInfo() {
    document.getElementById('memory-moves').textContent = `Züge: ${moves}`;
    document.getElementById('memory-pairs').textContent = `Paare: ${matchedPairs}/8`;
}

function handleMemoryClick(cardEl) {
    const index = parseInt(cardEl.dataset.index);
    const card = memoryCards[index];

    if (card.matched || flippedCards.includes(index) || flippedCards.length >= 2) {
        return;
    }

    cardEl.classList.add('flipped');
    flippedCards.push(index);

    if (flippedCards.length === 2) {
        moves++;
        updateMemoryInfo();

        const [first, second] = flippedCards;
        const card1 = memoryCards[first];
        const card2 = memoryCards[second];

        if (card1.emoji === card2.emoji) {
            // Match!
            card1.matched = true;
            card2.matched = true;
            matchedPairs++;
            currentScore += 10;

            document.querySelectorAll('.memory-card')[first].classList.add('matched');
            document.querySelectorAll('.memory-card')[second].classList.add('matched');

            updateMemoryInfo();
            flippedCards = [];

            if (matchedPairs === 8) {
                setTimeout(showResult, 500);
            }
        } else {
            // Kein Match
            setTimeout(() => {
                document.querySelectorAll('.memory-card')[first].classList.remove('flipped');
                document.querySelectorAll('.memory-card')[second].classList.remove('flipped');
                flippedCards = [];
            }, 1000);
        }
    }
}

// ========================================
// WELTKARTEN-KLICK
// ========================================

let wkKontinente = [];
let wkMapInitialized = false;
let wkClickHandler = null;

function initWeltkarte() {
    document.getElementById('weltkarte-spiel').classList.remove('hidden');
    document.getElementById('spiel-titel').textContent = '🗺️ Weltkarten-Klick';

    wkKontinente = shuffle(Object.keys(kontinentNamen)).slice(0, 6);
    totalQuestions = wkKontinente.length;
    currentQuestion = 0;

    // Setup Karte und zeige erste Frage erst danach
    setupWkMap(() => {
        showWkQuestion();
    });
}

function setupWkMap(callback) {
    const mapObject = document.getElementById('wk-map-object');

    if (!mapObject) {
        console.error('Karten-Objekt nicht gefunden');
        return;
    }

    function initSvgPaths() {
        const svgDoc = mapObject.contentDocument;
        if (!svgDoc) return;

        const paths = svgDoc.querySelectorAll('path[id]');
        if (paths.length === 0) return;

        // Flag setzen - SVG ist bereit
        wkMapInitialized = true;

        // Erstelle named handler für mögliche spätere Entfernung
        wkClickHandler = wkClickHandler || ((e) => handleWkClick(e.target));

        paths.forEach(path => {
            const countryCode = path.id;
            const kontinent = findeKontinent(countryCode);

            if (kontinent && KONTINENT_FARBEN[kontinent]) {
                // Kontinent-Farbe zuweisen
                const farben = KONTINENT_FARBEN[kontinent];
                path.style.fill = farben.fill;
                path.style.stroke = farben.hover;

                // CSS-Klasse für Hover-Effekte
                path.classList.add('wk-country');

                // Click-Handler nur hinzufügen wenn nicht bereits vorhanden
                path.removeEventListener('click', wkClickHandler);
                path.addEventListener('click', wkClickHandler);

                // Cursor
                path.style.cursor = 'pointer';
            }
        });

        // Setup abgeschlossen - Callback aufrufen
        if (callback) callback();
    }

    // Robustes Polling mit Interval und Timeout
    let attempts = 0;
    const maxAttempts = 100; // 100 * 100ms = 10 Sekunden max

    const pollInterval = setInterval(() => {
        attempts++;

        if (initialized) {
            clearInterval(pollInterval);
            return;
        }

        if (mapObject.contentDocument) {
            initSvgPaths();
            clearInterval(pollInterval);
        } else if (attempts >= maxAttempts) {
            console.error('Timeout beim Laden der Weltkarte');
            clearInterval(pollInterval);
        }
    }, 100);

    // Zusätzlich: Load Event als Backup
    mapObject.addEventListener('load', () => {
        if (!initialized) {
            initSvgPaths();
            clearInterval(pollInterval);
        }
    });
}

function showWkQuestion() {
    if (currentQuestion >= wkKontinente.length) {
        showResult();
        return;
    }

    // Reset - alle Länder-Pfade zurücksetzen
    const mapObject = document.getElementById('wk-map-object');
    if (mapObject && mapObject.contentDocument) {
        const paths = mapObject.contentDocument.querySelectorAll('path.wk-country');
        paths.forEach(path => {
            path.classList.remove('correct', 'wrong');
        });
    }

    const kontinent = wkKontinente[currentQuestion];
    document.getElementById('wk-kontinent').textContent =
        `${kontinentEmojis[kontinent]} ${kontinentNamen[kontinent]}`;

    const progress = (currentQuestion / totalQuestions) * 100;
    document.getElementById('wk-progress').style.width = `${progress}%`;
}

function handleWkClick(element) {
    const countryCode = element.id;
    const clickedKontinent = findeKontinent(countryCode);
    const correctKontinent = wkKontinente[currentQuestion];

    // Kontinentname normalisieren (für Vergleich)
    const normalizeKontinent = (name) => {
        return name.toLowerCase()
            .replace('ü', 'ue')
            .replace('ö', 'oe')
            .replace('ä', 'ae');
    };

    const clickedNormalized = normalizeKontinent(clickedKontinent || '');
    const correctNormalized = normalizeKontinent(correctKontinent || '');

    if (clickedNormalized === correctNormalized) {
        element.classList.add('correct');
        currentScore += 10;

        setTimeout(() => {
            currentQuestion++;
            showWkQuestion();
        }, 800);
    } else {
        element.classList.add('wrong');

        setTimeout(() => {
            element.classList.remove('wrong');
        }, 500);
    }

    document.getElementById('score-display').textContent = `${PlayerManager.currentPlayer.score + currentScore} ⭐`;
}

// ========================================
// HILFSFUNKTIONEN
// ========================================

function shuffle(array) {
    const arr = [...array];
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
}

// Zeigt Fehlermeldung wenn Daten nicht geladen werden können
function showDataError() {
    const spielAuswahl = document.getElementById('spiel-auswahl');
    if (spielAuswahl) {
        spielAuswahl.innerHTML = `
            <div style="text-align: center; padding: 2rem; color: #ef4444;">
                <p style="font-size: 3rem; margin-bottom: 1rem;">😕</p>
                <h2>Oops! Etwas ist schiefgelaufen.</h2>
                <p>Die Spieldaten konnten nicht geladen werden.</p>
                <p>Bitte lade die Seite neu oder versuche es später noch einmal.</p>
                <button onclick="location.reload()" class="btn-primary" style="margin-top: 1rem;">
                    Seite neu laden 🔄
                </button>
            </div>
        `;
    }
}

// ========================================
// INIT
// ========================================

document.addEventListener('DOMContentLoaded', initSpiele);
