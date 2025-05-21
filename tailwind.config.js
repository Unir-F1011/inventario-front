import { default as withFlowbiteReact } from "flowbite-react/plugin/nextjs";

// tailwind.config.js
module.exports = {
    content: [
        "./index.html",
        "./src/**/*.{js,jsx}"
    ],
    theme: {
        extend: {},
    },
    plugins: [
        withFlowbiteReact(),
    ],
};
  