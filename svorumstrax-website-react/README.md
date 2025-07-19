# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.


# Svörum strax - React/Tailwind Website
// test
A modern, professional website for Svörum strax built with React and Tailwind CSS.

## Features

- **Modern Design**: Clean, professional design inspired by leading tech companies
- **Responsive**: Mobile-first design that works on all devices
- **Bilingual**: Supports both Icelandic and English
- **Component-Based**: Modular architecture for easy maintenance
- **Performance**: Optimized for speed and SEO

## Tech Stack

- **React 18+**: Latest React with hooks
- **Tailwind CSS**: Utility-first CSS framework
- **Vite**: Fast build tool and dev server
- **Heroicons**: Beautiful SVG icons
- **Headless UI**: Unstyled, accessible UI components

## Color Palette

- **Primary**: #041753 (Navy)
- **Secondary**: #FF9A3C (Orange)
- **Accent**: #66D893 (Bright Green)
- **Success**: #10b981 (Emerald)
- **Background**: #FFFFFF (White)
- **Gray**: #f8fafc (Very Light Gray)

## Getting Started

### Prerequisites

- Node.js 18+ and npm

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open your browser to `http://localhost:5173`

## Project Structure

```
src/
├── components/          # Reusable components
│   ├── Navigation.jsx   # Main navigation
│   ├── Hero.jsx        # Hero section
│   ├── Services.jsx    # Services section
│   └── ...
├── hooks/              # Custom React hooks
├── utils/              # Utility functions
├── assets/             # Images and static assets
├── App.jsx             # Main app component
├── main.jsx            # Entry point
└── index.css           # Global styles
```

## Development

### Building for Production

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

## Deployment

The site is ready to deploy to any static hosting service like Vercel, Netlify, or GitHub Pages.

## Contributing

1. Create a feature branch
2. Make your changes
3. Test thoroughly
4. Submit a pull request

## License

© 2025 Svörum strax. All rights reserved.
