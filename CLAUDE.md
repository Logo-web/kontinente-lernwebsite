# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Git Workflow & Deployment

**CRITICAL: After every change, always commit and push to GitHub, then deploy.**

### Standard Workflow After Making Changes

1. **Stage and commit changes:**
   ```bash
   git add .
   git commit -m "Descriptive message about the changes"
   ```

2. **Push to GitHub:**
   ```bash
   git push origin master
   ```

3. **Deploy the changes** (if applicable - exact deployment command depends on hosting setup)

**Important**:
- Never skip the commit and push steps
- Write clear, descriptive commit messages in German
- Always include co-authorship: `Co-Authored-By: Claude Sonnet 4.5 <noreply@anthropic.com>`
- Check `git status` before and after to verify all changes are tracked

## Project Overview

This is an educational web application called "Kontinente-Lernwebsite" (Continents Learning Website) - an interactive geography learning platform for children. The app teaches about the 7 continents through:

- Interactive SVG world maps
- Educational content about animals, landscapes, cultures, and landmarks
- 5 different game types for learning reinforcement
- Player scoring and leaderboard system
- Full responsive design for desktop, tablet, and mobile

**Technology Stack**: Vanilla JavaScript (no frameworks), HTML5, CSS3, SVG manipulation, LocalStorage

**Target Users**: German-speaking children (elementary school age)

## Development Setup

**No build process required** - this is a static web application.

### Local Development

```bash
# Serve via any static web server (required for SVG CORS)
python -m http.server 8000
# or
npx serve .

# Open in browser
http://localhost:8000
```

**Important**: The interactive SVG map requires serving via HTTP(S) - opening `index.html` directly via `file://` will show a fallback message due to CORS restrictions.

## Architecture

### Core Pattern: Global Managers + Page-Specific Controllers

The app uses a simple architecture without frameworks:

1. **Global Managers** (js/main.js) - Shared across all pages
   - `PlayerManager` - Handles current player session, score tracking, localStorage persistence
   - `RankingManager` - Manages top 10 leaderboard, localStorage persistence
   - `WorldMap` - Handles SVG map interactions and navigation

2. **Page-Specific Controllers** - Each page has its own JS file
   - `js/weltkarte.js` - SVG country-to-continent mapping and colorization
   - `js/kontinent.js` - Continent detail page with tabbed navigation
   - `js/spiele.js` - All 5 game types (Quiz, Richtig/Falsch, Zuordnung, Memory, Weltkarten-Klick)

3. **Data Layer** (data/inhalte.js)
   - Single source of truth for all content
   - Exposed as global `KONTINENTE_DATA` variable
   - Contains continent info, quiz questions, game data
   - JSON structure also available in `data/inhalte.json` (not currently used)

### Critical Data Flow Patterns

#### Player Session Management
```javascript
// PlayerManager in main.js manages session state
PlayerManager.currentPlayer → localStorage 'kontinente_currentPlayer'
                           ↓
                    RankingManager updates
                           ↓
                 localStorage 'kontinente_rankings' (top 10)
```

**Key constraint**: Player data uses `localStorage`, NOT `sessionStorage`. Player persists across browser sessions until explicitly cleared.

#### Game Score Flow
```javascript
Game completes → currentScore calculated
              → addPoints(score) called
              → PlayerManager.addScore(points)
              → Updates currentPlayer.score
              → Saves to localStorage
              → RankingManager.addOrUpdatePlayer()
              → Ranks top 10, saves to localStorage
```

#### SVG Map Interaction Pattern
```javascript
// index.html inline script
mapObject.addEventListener('load')
  → Access contentDocument
  → Query all <path> elements
  → For each path.id (country code):
      → findeKontinent(landCode) // from weltkarte.js
      → Apply continent-specific colors from KONTINENT_FARBEN
      → Add hover/click handlers
      → Navigate to kontinent.html?id={kontinent}
```

**Important**: SVG manipulation happens in **inline script** in index.html, NOT in weltkarte.js. The weltkarte.js only provides data mappings.

### Continent Color System

Each continent has a consistent color scheme used across all pages:

```javascript
// Defined in js/weltkarte.js
KONTINENT_FARBEN = {
  "Afrika": { fill: "#FFB347", hover: "#FF8C00" },      // Orange
  "Europa": { fill: "#87CEEB", hover: "#4682B4" },      // Blue
  "Asien": { fill: "#90EE90", hover: "#32CD32" },       // Green
  "Nordamerika": { fill: "#DDA0DD", hover: "#BA55D3" }, // Purple
  "Südamerika": { fill: "#F0E68C", hover: "#DAA520" },  // Yellow
  "Australien": { fill: "#FFB6C1", hover: "#FF69B4" },  // Pink
  "Antarktis": { fill: "#E0E0E0", hover: "#B0B0B0" }    // Gray
}
```

**Must be kept in sync** with:
- Inline CSS in spiele.html (Weltkarten-Klick game)
- Legende colors in index.html
- SVG path styling in inline scripts

### Game System Architecture

All 5 games share a common pattern in `js/spiele.js`:

```javascript
initSpiele() → loads KONTINENTE_DATA
           → checks URL param ?spiel=
           → calls specific init{GameType}()

Each game follows:
  1. init{Game}() - Setup game state, shuffle questions
  2. show{Game}Question/Item() - Render current question
  3. handle{Game}Answer() - Process answer, update score
  4. Repeat until all questions done
  5. showResult() - Display final score, call addPoints()
```

**Game Types**:
- `quiz` - Multiple choice with 3 difficulty levels (leicht, mittel, schwer)
- `richtigfalsch` - True/False statements with explanations
- `zuordnung` - Match items (animals/landmarks) to continents
- `memory` - Classic memory/pairs game with emojis
- `weltkarte` - Click the correct continent on embedded SVG map

### URL Parameter System

Navigation uses query parameters:

```javascript
kontinent.html?id={kontinentId}  // afrika, europa, asien, etc.
spiele.html?spiel={gameType}     // quiz, richtigfalsch, zuordnung, memory, weltkarte
```

**Continent ID normalization**: German umlauts are converted
- `ü` → `ue` (Südamerika → suedamerika)
- `ö` → `oe`
- `ä` → `ae`

This happens in click handlers throughout the codebase.

### Emoji-Based Image System

**Critical design decision**: Instead of image files, the app uses emoji mappings:

```javascript
// Defined in both kontinent.js and spiele.js
const emojiMap = {
  'loewe': '🦁',
  'elefant': '🐘',
  'kaenguru': '🦘',
  // ... etc
}
```

When adding new content to `data/inhalte.js`:
1. Add entry with `"bild": "newitem.jpg"`
2. Add mapping to `emojiMap` in both kontinent.js and spiele.js: `'newitem': '🆕'`

## File Organization

```
/
├── index.html          # Main page with interactive world map
├── spiele.html         # Games page (5 game types in one file)
├── kontinent.html      # Continent detail page with tabs
├── js/
│   ├── main.js         # Global managers (Player, Ranking, WorldMap)
│   ├── weltkarte.js    # Country→Continent mappings, color definitions
│   ├── spiele.js       # All 5 game implementations
│   └── kontinent.js    # Continent detail page logic
├── css/
│   ├── style.css       # Global styles, shared components
│   ├── spiele.css      # Game-specific styles
│   └── kontinent.css   # Continent page styles
├── data/
│   ├── inhalte.js      # Primary data source (global KONTINENTE_DATA)
│   ├── inhalte.json    # JSON backup (not actively used)
│   ├── mapsvg-world.svg # Interactive world map SVG
│   └── world*.svg      # Other map variants
└── .claude/            # Claude Code configurations (see .claude/README.md)
```

## Working with Continent Data

### Data Structure

```javascript
KONTINENTE_DATA = {
  kontinente: {
    [kontinentId]: {  // afrika, europa, asien, nordamerika, suedamerika, australien, antarktis
      name: string,
      farbe: string,    // Hex color
      emoji: string,
      beschreibung: string,
      tiere: [{ name, bild, text, fakt }],
      landschaften: [{ name, bild, text, fakt }],
      menschen: [{ name, bild, text, fakt }],
      sehenswuerdigkeiten: [{ name, bild, text, fakt }],
      klima: { text, fakt }
    }
  },
  quiz: {
    leicht: [{ frage, optionen[], antwort: index }],
    mittel: [{ frage, optionen[], antwort: index, info }],
    schwer: [{ frage, optionen[], antwort: index }]
  },
  zuordnung: [{ item, kontinent, bild }],
  richtigFalsch: [{ aussage, antwort: boolean, erklaerung }]
}
```

### Adding New Content

**When adding a new animal/landmark/etc**:

1. Edit `data/inhalte.js` → Add entry to appropriate continent and category
2. Add emoji mapping to `emojiMap` in `js/kontinent.js` and `js/spiele.js`
3. Test in both continent detail page AND games

**When adding a new continent** (rare):

1. Update `data/inhalte.js` → Add full continent object
2. Update `js/weltkarte.js` → Add to `KONTINENT_LAENDER` (country mappings) and `KONTINENT_FARBEN`
3. Update `js/spiele.js` → Add to `kontinentEmojis` and `kontinentNamen`
4. Update `index.html` → Add legende-item with new colors
5. Update `spiele.html` → Add new SVG path to Weltkarten-Klick map with matching ID

## Responsive Design

The app has **three breakpoints**:

```css
/* Mobile phones */
@media (max-width: 600px) { }

/* Small phones */
@media (max-width: 400px) { }

/* Touch devices (tablets/phones) */
@media (hover: none) and (pointer: coarse) {
  /* Minimum 44x44px touch targets */
}
```

**Critical touch optimizations**:
- All buttons have `min-height: 44px` for touch
- SVG paths have increased `stroke-width` on touch devices
- Legende (legend) scrolls horizontally on mobile
- No `:hover` effects on touch devices, use `:active` instead

## Testing

### Manual Testing Checklist

**Core flows to test**:

1. **First-time user flow**
   - Open index.html → Name modal appears
   - Enter name → Modal closes, name displays in header
   - Check localStorage has 'kontinente_currentPlayer'

2. **Map navigation**
   - Click any country → Navigate to correct continent page
   - Click legende item → Navigate to continent page
   - Back button → Returns to index.html

3. **Game completion flow**
   - Play any game → Complete all questions
   - Verify score adds to player total
   - Check ranking modal shows updated score
   - Verify localStorage 'kontinente_rankings' updated

4. **Mobile responsive**
   - Test on actual mobile device or DevTools device mode
   - Verify legende scrolls horizontally
   - Check all buttons are easily tappable
   - Test SVG map interactions on touch

### LocalStorage Testing

```javascript
// Inspect player data
JSON.parse(localStorage.getItem('kontinente_currentPlayer'))

// Inspect rankings
JSON.parse(localStorage.getItem('kontinente_rankings'))

// Reset for fresh test
localStorage.removeItem('kontinente_currentPlayer')
localStorage.removeItem('kontinente_rankings')
```

## Common Modifications

### Changing Point Values

All games award **10 points per correct answer**. To change:

```javascript
// In js/spiele.js, find in each game's answer handler:
currentScore += 10;  // Change this value

// Examples:
handleQuizAnswer() line ~264
handleRFAnswer() line ~311
handleZuordnungAnswer() line ~382
handleMemoryClick() line ~477 (per match)
handleWkClick() line ~548
```

### Adjusting Game Difficulty

**Quiz difficulty distribution** (in `initQuiz()`):
```javascript
quizQuestions = [
  ...shuffle(leicht).slice(0, 3),   // 60% easy - Change slice(0, 3)
  ...shuffle(mittel).slice(0, 2),   // 30% medium - Change slice(0, 2)
  ...shuffle(schwer).slice(0, 1)    // 10% hard - Change slice(0, 1)
];
```

**Memory pairs count** (in `initMemory()`):
```javascript
const pairs = [ /* 8 pairs */ ];  // Add/remove pairs
matchedPairs === 8  // Update this condition
```

### Adding a New Game Type

1. Add game selection button in `spiele.html`:
   ```html
   <button class="game-select-btn" data-spiel="newgame">
   ```

2. Add game container in `spiele.html`:
   ```html
   <div id="newgame-spiel" class="spiel-container hidden">
   ```

3. In `js/spiele.js`, add to `startGame()` switch:
   ```javascript
   case 'newgame':
     initNewGame();
     break;
   ```

4. Implement game pattern:
   ```javascript
   function initNewGame() {
     document.getElementById('newgame-spiel').classList.remove('hidden');
     currentQuestion = 0;
     currentScore = 0;
     // Setup game logic
   }
   ```

5. Use `/new-game` skill in `.claude/skills/new-game/SKILL.md` for guided creation

## Internationalization (Future)

Currently German-only. To add English:

1. Extract all UI strings to a `translations.js` object
2. Create `de` and `en` objects
3. Add language selector (localStorage for persistence)
4. Duplicate `KONTINENTE_DATA` for English content

**Caution**: URL parameter system (`kontinent.html?id=suedamerika`) is German-centric. May need mapping layer.

## Browser Compatibility

**Minimum requirements**:
- ES6 JavaScript support
- LocalStorage API
- SVG with contentDocument access
- CSS Grid and Flexbox

**Tested on**: Chrome 90+, Firefox 88+, Safari 14+, Edge 90+

**Known issues**:
- SVG CORS restrictions on `file://` protocol (expected, requires server)
- iOS Safari < 13 may have LocalStorage issues in Private Browsing
