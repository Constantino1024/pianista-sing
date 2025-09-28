# Pianista Sing

A React interface for the Pianista planning engine. Submit PDDL domains/problems, get interactive Gantt charts, validate PDDL, convert between formats, and solve MiniZinc models.

## Features

- 🎯 **PDDL Planning**: Submit domains/problems and visualize plans
- 📊 **Interactive Gantt Charts**: Zoom, filter, and explore plan timelines
- ✅ **PDDL Validation**: Validate domains, problems, and plans
- 🔄 **Format Conversion**: PDDL ↔ Mermaid, Natural Language → PDDL
- ⚡ **MiniZinc Solving**: Submit constraint models and get solutions
- 🌙 **Dark Mode**: Full dark/light theme support
- 📱 **Mobile Friendly**: Responsive design with touch-optimized interface

## Quick Start

1. **Clone and install:**
```bash
git clone https://github.com/Constantino1024/pianista-sing
cd pianista-sing
npm install
```

2. **Environment setup:**
Create `.env.development`:
```env
VITE_API_BASE_URL=https://planner-apim.azure-api.net
VITE_API_KEY=your-api-subscription-key
```

3. **Run:**
```bash
npm run dev    # Development server
npm run build  # Production build
```

## Tech Stack

- React 19 + Vite 7
- Tailwind CSS 4.1
- Google Charts (Gantt)
- React Hook Form + Zod
- Axios + Custom API Layer

Built for the VisionSpace **Make Pianista Sing** challenge.
