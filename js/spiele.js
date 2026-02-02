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

// Nur für Weltkarten-Spiel: Kontinente, die tatsächlich auf der SVG-Karte existieren
// Antarktis ist nicht in mapsvg-world.svg vorhanden
const weltkarteKontinente = ['afrika', 'europa', 'asien', 'nordamerika', 'suedamerika', 'australien'];

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

    // Nur Kontinente verwenden, die auf der Karte existieren (ohne Antarktis)
    wkKontinente = shuffle([...weltkarteKontinente]);
    totalQuestions = wkKontinente.length;
    currentQuestion = 0;

    // Reset Flag für neue Spielrunde
    wkMapInitialized = false;

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
        if (!svgDoc) {
            console.log('SVG contentDocument nicht verfügbar');
            return;
        }

        const paths = svgDoc.querySelectorAll('path[id]');
        if (paths.length === 0) {
            console.log('Keine SVG-Pfade gefunden');
            return;
        }

        console.log(`Weltkarte: ${paths.length} Länder-Pfade gefunden`);

        // Flag setzen - SVG ist bereit
        wkMapInitialized = true;

        // Erstelle named handler für mögliche spätere Entfernung
        wkClickHandler = wkClickHandler || ((e) => handleWkClick(e.target));

        let coloredCount = 0;

        // SVG Hintergrund setzen
        const svg = svgDoc.querySelector('svg');
        if (svg) {
            svg.style.background = 'linear-gradient(135deg, #e0f2fe 0%, #bae6fd 100%)';
        }

        paths.forEach(path => {
            const countryCode = path.id;
            const kontinent = findeKontinent(countryCode);

            if (kontinent && KONTINENT_FARBEN[kontinent]) {
                // Kontinent-Farbe zuweisen
                const farben = KONTINENT_FARBEN[kontinent];

                // WICHTIG: Verwende setAttribute statt style.fill für höhere Priorität
                // SVG-Attribute haben Vorrang vor CSS-Klassen
                path.setAttribute('fill', farben.fill);
                path.setAttribute('stroke', farben.hover);
                path.setAttribute('stroke-width', '0.5');
                path.style.transition = 'all 0.2s ease';

                // CSS-Klasse für Hover-Effekte und Feedback
                path.classList.add('wk-country');
                // Speichere die ursprüngliche Farbe für Hover-Reset
                path.setAttribute('data-original-fill', farben.fill);
                path.setAttribute('data-hover-fill', farben.hover);

                // Hover-Effekte via JavaScript (zuverlässiger als CSS für SVG in Object-Tag)
                path.addEventListener('mouseenter', function() {
                    if (!this.classList.contains('correct') && !this.classList.contains('wrong')) {
                        this.setAttribute('fill', this.getAttribute('data-hover-fill'));
                    }
                });

                path.addEventListener('mouseleave', function() {
                    if (!this.classList.contains('correct') && !this.classList.contains('wrong')) {
                        this.setAttribute('fill', this.getAttribute('data-original-fill'));
                    }
                });

                // Click-Handler nur hinzufügen wenn nicht bereits vorhanden
                path.removeEventListener('click', wkClickHandler);
                path.addEventListener('click', wkClickHandler);

                // Cursor
                path.style.cursor = 'pointer';
                coloredCount++;
            } else {
                // Unbekannte Länder in Hellgrau
                path.setAttribute('fill', '#e5e7eb');
                path.setAttribute('stroke', '#ffffff');
                path.setAttribute('stroke-width', '0.3');
            }
        });

        console.log(`Weltkarte: ${coloredCount} Länder mit Kontinent-Farben zugewiesen`);

        // Setup abgeschlossen - Callback aufrufen
        if (callback) callback();
    }

    // LÖSUNG: Load Event als primäre Methode
    // Das load-Event ist zuverlässiger als Polling
    const loadHandler = () => {
        if (!wkMapInitialized) {
            console.log('Weltkarte: load-Event ausgelöst');
            initSvgPaths();
        }
    };

    mapObject.addEventListener('load', loadHandler);

    // Fallback: Prüfe ob SVG bereits geladen ist (bei schnellem Cache)
    if (mapObject.contentDocument) {
        console.log('Weltkarte: Bereits aus Cache geladen');
        initSvgPaths();
        return;
    }

    // Zusätzlich: Robustes Polling als Backup (falls load-Event fehlt)
    let attempts = 0;
    const maxAttempts = 100; // 100 * 100ms = 10 Sekunden max

    const pollInterval = setInterval(() => {
        attempts++;

        if (wkMapInitialized) {
            clearInterval(pollInterval);
            return;
        }

        if (mapObject.contentDocument) {
            console.log('Weltkarte: Durch Polling gefunden');
            initSvgPaths();
            clearInterval(pollInterval);
        } else if (attempts >= maxAttempts) {
            console.error('Timeout beim Laden der Weltkarte');
            showMapError();
            clearInterval(pollInterval);
        }
    }, 100);
}

// Zeigt Fehlermeldung wenn die Karte nicht geladen werden kann
function showMapError() {
    const wkFeedback = document.getElementById('wk-feedback');
    if (wkFeedback) {
        wkFeedback.textContent = '❌ Karte konnte nicht geladen werden. Bitte Seite neu laden.';
        wkFeedback.className = 'feedback wrong';
        wkFeedback.classList.remove('hidden');
    }
}

function showWkQuestion() {
    if (currentQuestion >= wkKontinente.length) {
        showResult();
        return;
    }

    // Reset - alle Länder-Pfade zurücksetzen und Farben wiederherstellen
    const mapObject = document.getElementById('wk-map-object');
    if (mapObject && mapObject.contentDocument) {
        const paths = mapObject.contentDocument.querySelectorAll('path.wk-country');
        paths.forEach(path => {
            path.classList.remove('correct', 'wrong');
            // Farbe zurücksetzen zur ursprünglichen Kontinent-Farbe
            const originalFill = path.getAttribute('data-original-fill');
            if (originalFill) {
                path.setAttribute('fill', originalFill);
            }
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

    // Feedback-Element für Text-Anzeige
    const wkFeedback = document.getElementById('wk-feedback');

    if (clickedNormalized === correctNormalized) {
        element.classList.add('correct');
        // Setze Farbe direkt für sofortiges Feedback
        element.setAttribute('fill', '#22c55e');
        element.setAttribute('stroke', '#16a34a');
        currentScore += 10;

        // Deutliches Text-Feedback
        if (wkFeedback) {
            wkFeedback.textContent = `✅ Richtig! Das ist ${kontinentNamen[correctKontinent]}! +10 Punkte`;
            wkFeedback.className = 'feedback correct';
            wkFeedback.classList.remove('hidden');
        }

        // Zeige kurz eine Erfolgsnachricht über dem Land
        showClickFeedback(element, '🎉', '#22c55e');

        setTimeout(() => {
            currentQuestion++;
            showWkQuestion();
        }, 1200);
    } else {
        element.classList.add('wrong');
        // Setze Farbe direkt für sofortiges Feedback
        element.setAttribute('fill', '#ef4444');
        element.setAttribute('stroke', '#dc2626');

        // Deutliches Text-Feedback mit Hinweis
        if (wkFeedback) {
            wkFeedback.textContent = `❌ Das ist ${kontinentNamen[clickedNormalized] || 'unbekannt'}, nicht ${kontinentNamen[correctKontinent]}!`;
            wkFeedback.className = 'feedback wrong';
            wkFeedback.classList.remove('hidden');
        }

        // Zeige kurz eine Fehlernachricht über dem Land
        showClickFeedback(element, '❌', '#ef4444');

        setTimeout(() => {
            element.classList.remove('wrong');
            // Farbe zurücksetzen
            const originalFill = element.getAttribute('data-original-fill');
            const originalStroke = element.getAttribute('data-hover-fill');
            if (originalFill) {
                element.setAttribute('fill', originalFill);
                element.setAttribute('stroke', originalStroke);
            }
            // Feedback verstecken
            if (wkFeedback) {
                wkFeedback.classList.add('hidden');
            }
        }, 1500);
    }

    document.getElementById('score-display').textContent = `${PlayerManager.currentPlayer.score + currentScore} ⭐`;
}

// Hilfsfunktion für visuelles Feedback über dem geklickten Land
function showClickFeedback(element, emoji, color) {
    const svg = element.ownerSVGElement;
    if (!svg) return;

    // Erstelle ein Text-Element für das Feedback
    const feedbackText = document.createElementNS('http://www.w3.org/2000/svg', 'text');

    // Berechne die Position des Landes
    const bbox = element.getBBox();
    const centerX = bbox.x + bbox.width / 2;
    const centerY = bbox.y - 10;

    feedbackText.setAttribute('x', centerX);
    feedbackText.setAttribute('y', centerY);
    feedbackText.setAttribute('text-anchor', 'middle');
    feedbackText.setAttribute('font-size', '24');
    feedbackText.setAttribute('fill', color);
    feedbackText.setAttribute('font-weight', 'bold');
    feedbackText.textContent = emoji;

    // Füge Animation hinzu
    feedbackText.style.animation = 'feedback-popup 0.8s ease-out forwards';

    svg.appendChild(feedbackText);

    // Entferne nach der Animation
    setTimeout(() => {
        if (feedbackText.parentNode) {
            feedbackText.parentNode.removeChild(feedbackText);
        }
    }, 800);
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
