import tailwindcss from '@tailwindcss/postcss';

/** @type {import('tailwindcss').Config} */
export default tailwindcss({
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
});
