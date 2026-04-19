/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./src/**/*.{js,jsx,ts,tsx}"],
    theme: {
        extend: {
            colors: {
                background: {
                    DEFAULT: '#0A0A0A', // Deep space background
                    paper: '#141414',   // Standard section background
                    elevated: '#1F1F1F' // Card and modal backgrounds
                },
                brand: {
                    red: '#E50914',     // Primary action color
                    redHover: '#B81D24' // Primary hover
                },
                text: {
                    primary: '#F0F0F0', // High contrast for headings
                    secondary: '#A3A3A3',// Muted text for descriptions/stats
                    disabled: '#525252'
                }
            },
            fontFamily: {
                sans: ['Inter', 'sans-serif'],
            },
            spacing: {
                '18': '4.5rem',
                '22': '5.5rem',
            },
            boxShadow: {
                'glow': '0 0 20px rgba(229, 9, 20, 0.4)', // Accent shadow for active states
                'card': '0 10px 20px -5px rgba(0, 0, 0, 0.8)',
            }
        },
    },
    plugins: [],
}
