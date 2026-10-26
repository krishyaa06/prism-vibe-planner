<!-- ═════════════ HEADER ═════════════ -->
<p align="center">
  <img src="https://capsule-render.vercel.app/api?type=waving&color=0:07060f,50:3EE69A,100:B388FF&height=200&section=header&text=Prism%20Vibe%20Planner&fontSize=48&fontColor=ffffff&animation=fadeIn&fontAlignY=36&desc=Idea%20%E2%86%92%20PRD%20%E2%86%92%20tasks%20%E2%86%92%20agent%20prompt&descAlignY=58&descSize=16" width="100%" alt="Prism Vibe Planner" />
</p>

<p align="center">
  <img src="https://readme-typing-svg.demolab.com?font=JetBrains+Mono&weight=600&size=19&duration=2600&pause=800&color=3EE69A&center=true&vCenter=true&width=680&lines=Idea+%E2%86%92+PRD+in+seconds;MVP+vs+later%2C+decided;T01%E2%80%A6T20+with+estimates;One+prompt+for+your+AI+agent" alt="Typing SVG" />
</p>

<p align="center">
  <a href="https://github.com/krishyaa06/prism-vibe-planner/actions/workflows/ci.yml"><img src="https://img.shields.io/github/actions/workflow/status/krishyaa06/prism-vibe-planner/ci.yml?branch=main&style=for-the-badge&label=CI&logo=githubactions&logoColor=white" alt="CI" /></a>
  <a href="https://krishyaa06.github.io/prism-vibe-planner/"><img src="https://img.shields.io/badge/Live_Demo-Open-3EE69A?style=for-the-badge&logo=githubpages&logoColor=black" alt="Live demo" /></a>
  <img src="https://img.shields.io/badge/Vanilla-HTML%20%7C%20CSS%20%7C%20JS-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black" alt="Vanilla JS" />
  <img src="https://img.shields.io/badge/dependencies-0-3EE69A?style=for-the-badge" alt="Zero dependencies" />
  <a href="LICENSE"><img src="https://img.shields.io/github/license/krishyaa06/prism-vibe-planner?style=for-the-badge&color=B388FF" alt="License" /></a>
</p>

<p align="center">
  <img src="assets/screenshots/desktop.png" width="90%" alt="Prism Vibe Planner screenshot" />
</p>

<img src="https://raw.githubusercontent.com/andreasbm/readme/master/assets/lines/aqua.png" width="100%" />

## ⚡ Overview

**Prism Vibe Planner** gives vibe coders a plan before the first prompt. Write the name, pitch, problem, users and a list of features in priority order. The planner splits MVP from later work, writes a clean PRD, builds a phased task list (setup → MVP → launch → next) with time estimates, and creates an agent prompt that walks Cursor, Claude Code or Copilot through the tasks one at a time. A generated `gh` script turns the tasks into GitHub issues.

## ✨ Features

- **PRD** with problem, users, goals, MVP scope, out-of-scope, tech and risks
- **Automatic scoping** — top ~60% of features become MVP, the rest go to later
- **Phased tasks** with estimates and a check-off list saved locally
- **Agent prompt** that works through tasks one at a time
- **GitHub issues script** using `gh issue create` with phase labels
- Platform-aware setup tasks: web, mobile, CLI, Discord bot, API

## 📸 Screenshots

<table>
  <tr>
    <td width="68%"><img src="assets/screenshots/desktop.png" width="100%" alt="Prism Vibe Planner on desktop" /></td>
    <td width="32%"><img src="assets/screenshots/mobile.png" width="100%" alt="Prism Vibe Planner on mobile" /></td>
  </tr>
</table>

## 🚀 Quick Start

**Use it online:** [https://krishyaa06.github.io/prism-vibe-planner/](https://krishyaa06.github.io/prism-vibe-planner/)

**Run locally:**

```bash
git clone https://github.com/krishyaa06/prism-vibe-planner.git
cd prism-vibe-planner
# open index.html in your browser, or serve it:
npx serve .
```

## 🛠️ Usage

1. Fill in your idea (or click **Example**). List features most-important-first.
2. Switch between **PRD / Tasks / Agent prompt / GitHub issues**.
3. Copy or download, then paste the agent prompt into your AI tool and ship task by task.

## 📁 Project Structure

```
prism-vibe-planner/
├── assets/
│   ├── logo.png
│   └── logo.svg
├── css/
│   ├── app.css
│   └── prism.css
├── js/
│   ├── app.js   # form + tabs
│   ├── core.js   # planner, exporters, markdown renderer — tested in Node
│   └── prism.js
├── test/
│   └── core.test.js
├── .gitignore
├── LICENSE
├── index.html
└── package.json
```

## 🧪 Tests

```bash
npm test
```

Tests use the built-in `node:test` runner, so there is nothing to install. CI runs them on Node 20 and 22.

## 🤝 Contributing

1. Fork the repo and create a branch: `git checkout -b feature/my-idea`
2. Make your change and add a test in `test/`
3. Run `npm test` and open a Pull Request

## 🔷 Part of Prism Protocol

Prism Vibe Planner is one of the open-source tools built by [Prism Protocol](https://dc.gg/prismprotocol), a tech community where young builders learn, ship and compete together.

## 👤 Author

<table>
  <tr>
    <td align="center">
      <a href="https://github.com/krishyaa06"><img src="https://github.com/krishyaa06.png" width="90" style="border-radius:50%" /><br><b>Soumya Bhandare</b></a><br>
      <sub>Founder @ Prism Protocol</sub>
    </td>
    <td>
      <a href="https://dc.gg/prismprotocol"><img src="https://img.shields.io/badge/Discord-Prism%20Protocol-5865F2?style=for-the-badge&logo=discord&logoColor=white" /></a><br>
      <a href="https://instagram.com/prism_protocol_"><img src="https://img.shields.io/badge/Instagram-@prism__protocol__-E4405F?style=for-the-badge&logo=instagram&logoColor=white" /></a><br>
      <a href="https://x.com/krishyaa06"><img src="https://img.shields.io/badge/X-@krishyaa06-000000?style=for-the-badge&logo=x&logoColor=white" /></a>
    </td>
  </tr>
</table>

## 📄 License

Released under the [MIT License](LICENSE).

<p align="center">
  <b>If you like this project, consider giving it a ⭐</b><br>
  <sub>"Build. Create. Compete." · Made with ⚡ by Prism Protocol</sub>
</p>

<img src="https://capsule-render.vercel.app/api?type=waving&color=0:B388FF,50:3EE69A,100:07060f&height=110&section=footer" width="100%" />
