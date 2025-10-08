// import tailwindcss from "@tailwindcss/postcss";
// import tailwindcss from "./tailwind.config.js"
// import autoprefixer from "autoprefixer";

export default {
  plugins: {
    '@tailwindcss/postcss': {}, // <-- updated plugin
    autoprefixer: {},
  },
};
// {
//   plugins: {
//     tailwindcss: {},  // <-- tells PostCSS to use Tailwind during build
//     autoprefixer: {},
//   },
// };