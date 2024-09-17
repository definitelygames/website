import type { Config } from "tailwindcss"

const config: Config = {
	content: [
		"./pages/**/*.{js,ts,jsx,tsx,mdx}",
		"./components/**/*.{js,ts,jsx,tsx,mdx}",
		"./app/**/*.{js,ts,jsx,tsx,mdx}",
	],
	theme: {
		extend: {
			fontFamily: {
				sans: ['"itc-avant-garde-gothic-pro"', '"Helvetica Neue"', "Helvetica", "Arial", "sans-serif"],
				// 'serif': ['ui-serif', 'Georgia', 'Cambria', 'Times New Roman', 'Times', 'serif'],
				// 'mono': ['ui-monospace', 'SFMono-Regular', 'Menlo', 'Monaco', 'Consolas', 'Liberation Mono', 'Courier New', 'monospace'],
			},
			colors: {
				primary: "var(--primary)",
				"primary-alt": "var(--primary-alt)",
				secondary: "var(--secondary)",
				background: "var(--background)",
				foreground: "var(--foreground)",
			},
			aspectRatio: {
				def: "587 / 307",
				"def-portrait": "307 / 587",
			},
			padding: {
				center: "calc(50vw - 50vh)",
			},
		},
	},
	plugins: [],
}
export default config
