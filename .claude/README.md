# Claude Code Setup for Kontinente Learning Platform

This directory contains Claude Code automations configured specifically for this educational web project.

## Setup Complete ✓

### 📁 Files Created

- **settings.json** - Project-specific hooks and configurations
- **skills/new-game/** - Custom skill for creating new educational games
- **agents/ui-reviewer.md** - Subagent for accessibility and UX review
- **.mcp.json** (root) - Playwright MCP server configuration

### 🎯 Skills Available

#### `/new-game` (Custom Skill)
Create new educational games following project patterns.

**Usage:**
```
/new-game hauptstaedte-quiz "Quiz about capital cities"
```

#### `/frontend-design` (Plugin)
Create distinctive, production-grade UI components.

**Usage:**
```
/frontend-design
```

### ⚡ Hooks Configured

- **Pre-commit protection**: Blocks accidental commits of `antigravity-awesome-skills-main/`
- **HTML/JS feedback**: Provides reminders after editing files

### 🔌 MCP Servers

#### Playwright
Browser automation for testing interactive games.

**First-time setup:**
The Playwright MCP will auto-install when first used. No manual setup needed!

**Restart Claude Code** to activate the MCP server.

### 🤖 Subagents

#### ui-reviewer
Reviews code for accessibility, responsiveness, and educational UX.

**Usage:**
```
Ask Claude to review files using the ui-reviewer agent
```

## How to Use

### Creating a New Game
1. Run: `/new-game [game-name] "[description]"`
2. Follow the checklist provided
3. Test on mobile, tablet, and desktop

### Testing with Playwright
After restarting Claude Code:
```
Ask Claude: "Use Playwright to test the continent clicking functionality"
```

### UI Review
```
Ask Claude: "Review weltkarte.js using the ui-reviewer agent"
```

### Editing Files
The hooks will automatically remind you to test after HTML/JS changes.

## Project Structure

```
.claude/
├── settings.json          # Hooks and project config
├── skills/
│   └── new-game/
│       └── SKILL.md       # New game creation skill
├── agents/
│   └── ui-reviewer.md     # UI review subagent
└── README.md              # This file

../.mcp.json               # MCP servers config (root level)
```

## Notes

- All configurations are **project-specific** (not global)
- Hooks run automatically when you use Edit/Write tools
- Skills are invoked with `/skill-name`
- MCP servers require Claude Code restart to activate
- The `antigravity-awesome-skills-main/` folder is protected from commits

## Next Steps

1. **Restart Claude Code** to activate the Playwright MCP server
2. Try creating a new game with `/new-game`
3. Ask Claude to review existing games for accessibility
4. Use `/frontend-design` when building new UI components

Enjoy your enhanced development workflow! 🚀
