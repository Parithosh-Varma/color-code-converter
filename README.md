<p align="center">
  <img src="https://avatars.githubusercontent.com/u/277201506?v=4&size=64" width="80" style="border-radius: 50%;" alt="Logo" />
</p>

<h1 align="center">Color Code Converter</h1>

<p align="center">
  Convert colors between HEX, RGB, HSL and CSS names. Type a color, get every format instantly.
</p>

<p align="center">
  <a href="https://github.com/parithosh-varma/color-code-converter">
    <img src="https://img.shields.io/badge/📂_Source-GitHub-181717?style=flat-square&logo=github&logoColor=white" alt="GitHub Repo" />
  </a>
  <a href="https://color-code-converter-769.netlify.app">
    <img src="https://img.shields.io/badge/🌐_Demo-Netlify-00C7B7?style=flat-square&logo=netlify&logoColor=white" alt="Netlify Deploy" />
  </a>
  <img src="https://img.shields.io/badge/⚡_Stack-React/TypeScript-61DAFB?style=flat-square&logo=react&logoColor=black" alt="Tech Stack" />
  <img src="https://img.shields.io/badge/🎨_Design-Modern_Minimal-6366F1?style=flat-square" alt="Design System" />
</p>

---

**This is the live demo of the tool:** https://color-code-converter-769.netlify.app

---

## Core Features

- **Auto-Detect** — Paste any format and it's recognized automatically
- **HEX, RGB & HSL** — All representations computed and one-click copyable
- **CSS Color Names** — Shows the closest of all 140+ named colors
- **Color Picker** — Native picker for visual input
- **Shades & Tints** — Derived palette preview for light and dark variants
- **Random Color** — Explore with random generator
- **Dark Mode** — Toggle between light and dark themes
- **100% Client-Side** — No servers, no tracking, works offline

---

## Supported Formats

```text
#6366f1            hex (3 or 6 digit)
rgb(99 102 241)    rgb/rgba with spaces or commas, optional %
hsl(239 84% 67%)   hsl/hsla with deg or unitless hue
indigo             any CSS color name
```

---

## Tech Stack

| Category | Technology |
|----------|------------|
| Framework | React 19 |
| Language | TypeScript |
| Build Tool | Vite |
| Styling | Tailwind CSS |
| Design System | Modern Minimal (Indigo/Zinc) |
| Fonts | Inter |

---

## Quickstart

### Prerequisites

- Node.js 18+
- npm or yarn

### Clone & Run

```bash
# Clone the repository
git clone https://github.com/parithosh-varma/color-code-converter.git

# Navigate to the project
cd color-code-converter

# Install dependencies
npm install

# Start dev server
npm run dev
```

### Build for Production

```bash
npm run build
```

---

## Project Structure

```
color-code-converter/
├── public/
│   └── logo.png            # Favicon & header logo
├── src/
│   ├── App.tsx             # Main application component
│   ├── main.tsx            # Entry point
│   └── index.css           # Tailwind + design tokens
├── index.html              # HTML template
├── vite.config.ts          # Vite + Tailwind config
├── package.json            # Dependencies & scripts
├── README.md               # This file
└── LICENSE                 # MIT License
```

---

## Design System

This tool follows the **Modern Minimal** design system:

- **Primary:** Indigo 500 (`#6366f1`)
- **Background:** Pure White / Zinc 950 (dark mode)
- **Typography:** Inter with tight tracking on headings
- **Components:** Flat buttons, clean borders, subtle shadows
- **Focus States:** Visible ring contrast for accessibility

---

## Contributing

Contributions are welcome! If you find a bug or want to add a feature:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## License

This project is licensed under the **MIT License** — see the [LICENSE](LICENSE) file for details.

---

<p align="center">
  Built with care by <a href="https://github.com/parithosh-varma">Parithosh Varma</a>
</p>