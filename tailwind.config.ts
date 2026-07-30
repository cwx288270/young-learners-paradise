/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/renderer/**/*.{js,ts,jsx,tsx,html}'],
  theme: {
    extend: {
      colors: {
        // 模块专属色
        'literacy': '#5B8DEF',
        'literacy-light': '#EBF3FF',
        'pinyin': '#4CAF50',
        'pinyin-light': '#E8F5E9',
        'math': '#FF9800',
        'math-light': '#FFF3E0',
        'reading': '#9C27B0',
        'reading-light': '#F3E5F5',
        'writing': '#E91E63',
        'writing-light': '#FCE4EC',
        // 通用色
        'primary': '#5B8DEF',
        'primary-light': '#EBF3FF',
        'primary-dark': '#3A6BD5',
        'success': '#4CAF50',
        'success-light': '#E8F5E9',
        'error': '#FF5252',
        'error-light': '#FFEBEE',
        'warning': '#FF9800',
        'warning-light': '#FFF3E0',
        // 背景色
        'app-bg': '#F5F7FA',
        'card-bg': '#FFFFFF',
        'title-bar': '#FFFFFF',
      },
      fontFamily: {
        'kai': ['KaiTi', '楷体', 'STKaiti', 'serif'],
        'sans': ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
      fontSize: {
        'char-xl': '200px',
        'char-lg': '120px',
        'char-md': '80px',
        'char-sm': '56px',
      },
      borderRadius: {
        'child': '16px',
        'child-lg': '24px',
      },
      minHeight: {
        'btn': '56px',
      },
      minWidth: {
        'btn': '56px',
      },
      animation: {
        'bounce-in': 'bounceIn 0.5s ease-out',
        'shake': 'shake 0.5s ease-in-out',
        'pop': 'pop 0.3s ease-out',
        'slide-up': 'slideUp 0.3s ease-out',
        'fade-in': 'fadeIn 0.3s ease-out',
        'star-pop': 'starPop 0.4s ease-out',
      },
      keyframes: {
        bounceIn: {
          '0%': { transform: 'scale(0.3)', opacity: '0' },
          '50%': { transform: 'scale(1.05)' },
          '70%': { transform: 'scale(0.9)' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        shake: {
          '0%, 100%': { transform: 'translateX(0)' },
          '25%': { transform: 'translateX(-5px)' },
          '75%': { transform: 'translateX(5px)' },
        },
        pop: {
          '0%': { transform: 'scale(0)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        starPop: {
          '0%': { transform: 'scale(0) rotate(-30deg)', opacity: '0' },
          '50%': { transform: 'scale(1.3) rotate(10deg)' },
          '100%': { transform: 'scale(1) rotate(0deg)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
}
