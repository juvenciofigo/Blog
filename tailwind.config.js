/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./views/**/*.ejs", "./public/**/*.{html,js", "./src/**/*.{html,js}"],
    theme: {
        extend: {},
    },
    plugins: [require("@tailwindcss/forms")({ strategy: "class" })],
};
