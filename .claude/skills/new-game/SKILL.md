---
name: new-game
description: Create a new educational game following project patterns
user-invocable: true
disable-model-invocation: true
---

# New Game Creator

Create a new educational game for the Kontinente learning platform.

## Arguments

The user should provide:
- **game_name**: Name of the new game (e.g., "hauptstaedte-quiz", "flaggen-spiel")
- **description**: Brief description of game mechanics

Example: `/new-game hauptstaedte-quiz "Quiz about capital cities of each continent"`

## Process

Follow these steps to create a new game:

1. **Analyze existing patterns**
   - Read existing game files (js/weltkarte.js, js/spiele.js, js/kontinent.js)
   - Understand the PlayerManager integration pattern
   - Review responsive design patterns from css/

2. **Create game files**
   - Create new HTML page in root directory: `{game_name}.html`
   - Create corresponding JavaScript file: `js/{game_name}.js`
   - Create CSS file if needed: `css/{game_name}.css`

3. **Implement core features**
   - Set up HTML structure matching index.html patterns
   - Integrate with PlayerManager for scoring:
     ```javascript
     PlayerManager.addScore(points);
     PlayerManager.incrementGamesPlayed();
     ```
   - Use continent data from `data/inhalte.json` or `data/inhalte.js`
   - Ensure responsive design (mobile, tablet, desktop)

4. **Add navigation**
   - Update index.html to add link to new game
   - Update spiele.html if it's a game type

5. **Testing checklist**
   - [ ] Game loads without errors
   - [ ] Responsive on mobile (< 768px)
   - [ ] Responsive on tablet (768px - 1024px)
   - [ ] Integrates with PlayerManager scoring
   - [ ] Uses continent data correctly
   - [ ] Follows existing visual design patterns
   - [ ] Back navigation works

## Design Guidelines

- Use the Nunito font family (already loaded)
- Follow the gradient background patterns from existing pages
- Ensure touch targets are at least 44x44px for mobile
- Use the existing color scheme (blues, gradients)
- Add loading states for SVG/data
- Include error handling for localStorage

## Example Structure

```html
<!DOCTYPE html>
<html lang="de">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=no">
    <title>[Game Name] - Kontinente</title>
    <link href="https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700;800&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="css/style.css">
    <link rel="stylesheet" href="css/[game-name].css">
</head>
<body>
    <div class="container">
        <h1>[Game Title]</h1>
        <!-- Game content -->
    </div>
    <script src="js/main.js"></script>
    <script src="data/inhalte.js"></script>
    <script src="js/[game-name].js"></script>
</body>
</html>
```
