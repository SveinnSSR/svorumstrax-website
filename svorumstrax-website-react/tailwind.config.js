/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#041753',
          50: '#f0f7ff',
          100: '#e0efff',
          200: '#b9dfff',
          300: '#7cc7ff',
          400: '#36acff',
          500: '#0d92ff',
          600: '#0073ff',
          700: '#005cff',
          800: '#0049cc',
          900: '#041753',
        },
        secondary: {
          DEFAULT: '#FF9A3C',
          light: '#FFB84D',
          dark: '#FF9A3C',
        },
        accent: {
          DEFAULT: '#66D893',
          50: '#f0fdf4',
          100: '#dcfce7',
          200: '#bbf7d0',
          300: '#86efac',
          400: '#66D893',
          500: '#22d3ee',
          600: '#06b6d4',
          700: '#0891b2',
          800: '#0e7490',
          900: '#164e63',
        },
        // Your exact blue gradient colors
        blueGradient: {
          start: '#3b82f6',
          middle: '#2563eb', 
          end: '#1d4ed8'
        },
        // Your exact orange gradient colors
        orangeGradient: {
          start: '#FF9A3C',
          middle: '#FFA947',
          end: '#FFB84D'
        },
        // Chat widget colors
        chatGreen: '#66D893',
        chatPurple: {
          start: '#667eea',
          end: '#764ba2'
        }
      },
      fontFamily: {
        'sans': ['-apple-system', 'BlinkMacSystemFont', '"Segoe UI"', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', '"Fira Sans"', '"Droid Sans"', '"Helvetica Neue"', 'sans-serif'],
      },
      backgroundImage: {
        'gradient-orange': 'linear-gradient(135deg, #FF9A3C 0%, #FFA947 50%, #FFB84D 100%)',
        'gradient-blue': 'linear-gradient(135deg, #3b82f6 0%, #2563eb 50%, #1d4ed8 100%)',
        'gradient-purple': 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        'gradient-ai-purple': 'linear-gradient(135deg, #8b5cf6 0%, #6366f1 100%)',
      },
      boxShadow: {
        'professional': '0 10px 40px rgba(0, 0, 0, 0.1)',
        'hero': '0 20px 60px rgba(0, 0, 0, 0.15)',
        'card': '0 4px 20px rgba(0, 0, 0, 0.08)',
        'card-hover': '0 8px 30px rgba(0, 0, 0, 0.12)',
      },
      borderRadius: {
        '3xl': '2rem',
      },
      backgroundAttachment: {
        'fixed': 'fixed',
        'local': 'local',
        'scroll': 'scroll'
      }
    },
  },
  plugins: [],
}