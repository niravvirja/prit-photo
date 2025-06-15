import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			fontFamily: {
				/* Outfit Google Font - Primary Font for Everything */
				'main': ['Outfit', 'sans-serif'],
				'outfit': ['Outfit', 'sans-serif'],
				'primary': ['Outfit', 'sans-serif'],
				'secondary': ['Outfit', 'sans-serif'],
				'luxury': ['Outfit', 'sans-serif'],
				'grafies': ['Outfit', 'sans-serif'],
				'serif': ['Outfit', 'sans-serif'],
				'crimson': ['Outfit', 'sans-serif'],
				'sans': ['Outfit', 'sans-serif'],
				'body': ['Outfit', 'sans-serif'],
				'accent': ['Outfit', 'sans-serif'],
				'poppins': ['Outfit', 'sans-serif'],
			},
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				sidebar: {
					DEFAULT: 'hsl(var(--sidebar-background))',
					foreground: 'hsl(var(--sidebar-foreground))',
					primary: 'hsl(var(--sidebar-primary))',
					'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
					accent: 'hsl(var(--sidebar-accent))',
					'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
					border: 'hsl(var(--sidebar-border))',
					ring: 'hsl(var(--sidebar-ring))'
				},
				// Custom warm color palette
				warm: {
					50: '#faf9f7',
					100: '#f5f1eb',
					200: '#e8e3dd',
					300: '#d4b896',
					400: '#c9b491',
					500: '#b8a082',
					600: '#a08968',
					700: '#8b7355',
					800: '#6b5a47',
					900: '#4a3f35',
				},
				gold: {
					50: '#fefcf9',
					100: '#fdf8f0',
					200: '#f9f0e1',
					300: '#f2e4c7',
					400: '#e8d5a3',
					500: '#d4b896',
					600: '#c19a7a',
					700: '#a67d5f',
					800: '#8b6347',
					900: '#6b4a35',
				}
			},
			borderRadius: {
				lg: '0rem',
				md: '0rem',
				sm: '0rem'
			},
			boxShadow: {
				'warm': '0 4px 20px rgba(184, 160, 130, 0.15)',
				'warm-lg': '0 10px 40px rgba(184, 160, 130, 0.2)',
				'warm-xl': '0 20px 60px rgba(184, 160, 130, 0.25)',
			},
			backgroundImage: {
				'warm-gradient': 'linear-gradient(135deg, #f9f7f4 0%, #f5f1eb 100%)',
				'gold-gradient': 'linear-gradient(135deg, #d4b896 0%, #b8a082 100%)',
				'primary-gradient': 'linear-gradient(135deg, hsl(var(--primary)) 0%, hsl(var(--primary) / 0.9) 100%)',
			},
			keyframes: {
				'accordion-down': {
					from: {
						height: '0'
					},
					to: {
						height: 'var(--radix-accordion-content-height)'
					}
				},
				'accordion-up': {
					from: {
						height: 'var(--radix-accordion-content-height)'
					},
					to: {
						height: '0'
					}
				},
				'fade-in': {
					'0%': {
						opacity: '0',
						transform: 'translateY(10px)'
					},
					'100%': {
						opacity: '1',
						transform: 'translateY(0)'
					}
				},
				'slide-in-left': {
					'0%': {
						opacity: '0',
						transform: 'translateX(-50px)'
					},
					'100%': {
						opacity: '1',
						transform: 'translateX(0)'
					}
				},
				'slide-in-right': {
					'0%': {
						opacity: '0',
						transform: 'translateX(50px)'
					},
					'100%': {
						opacity: '1',
						transform: 'translateX(0)'
					}
				},
				'scale-in': {
					'0%': {
						opacity: '0',
						transform: 'scale(0.9)'
					},
					'100%': {
						opacity: '1',
						transform: 'scale(1)'
					}
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'fade-in': 'fade-in 0.6s ease-out',
				'slide-in-left': 'slide-in-left 0.8s ease-out',
				'slide-in-right': 'slide-in-right 0.8s ease-out',
				'scale-in': 'scale-in 0.6s ease-out'
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
