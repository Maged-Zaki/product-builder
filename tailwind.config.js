/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/**/*.{html,js,ts,jsx,tsx}'], // Specify where Tailwind should scan for class names
	theme: {

		extend: {
			colors: {
				primary: '#1DA1F2',
				secondary: '#14171A',
			},
		},
	},
	plugins: [],
};
