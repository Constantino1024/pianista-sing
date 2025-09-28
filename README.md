# Pianista Sing

A React interface for the Pianista planning engine. Submit PDDL domains/problems, get interactive Gantt charts, validate PDDL, convert between formats, and solve MiniZinc models.

## Features

- 🎯 **PDDL Planning**: Submit domains/problems and visualize plans
- 📊 **Interactive Gantt Charts**: Zoom, filter, and explore plan timelines
- ✅ **PDDL Validation**: Validate domains, problems, and plans
- 🔄 **Format Conversion**: PDDL ↔ Mermaid, Natural Language → PDDL
- ⚡ **MiniZinc Solving**: Submit constraint models and get solutions
- 🌙 **Dark Mode**: Full dark/light theme support
- 📱 **Mobile Friendly**: Responsive design with small devices adaptation

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

## Project Structure

- `src/components/` - React components organized by purpose (ui, features, layout)
- `src/api/` - API integration layer with endpoint handlers
- `src/hooks/` - Custom React hooks for state management
- `src/pages/` - Route components for each main feature
- `src/utils/` - Helper functions for parsing, formatting, error handling
- `src/styles/` - Tailwind CSS configuration and custom styles

The app uses a clean architecture with reusable UI components, centralized API handling, and feature-based organization.

## Tech Stack

- React 19 + Vite 7
- Tailwind CSS 4.1
- Google Charts (Gantt)
- React Hook Form + Zod
- Axios + Custom API Layer

Built for the VisionSpace **Make Pianista Sing** challenge.
