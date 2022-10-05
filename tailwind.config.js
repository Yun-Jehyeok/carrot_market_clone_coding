/** @type {import('tailwindcss').Config} */
module.exports = {
  // 어디에서 tailwind를 사용할지
  // pages/components의 모든 폴더의 모든 파일
  content: [
    "./pages/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
