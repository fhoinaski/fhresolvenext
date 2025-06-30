/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class', // Habilita o modo escuro baseado em classe (next-themes usa 'class')
  content: [
    './src/app/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}',
  ],
  safelist: [
    // Manter safelist existente se necessário, mas idealmente reduzir
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-inter)', 'Inter', 'system-ui', 'sans-serif'],
        display: ['var(--font-plus-jakarta)', 'Plus Jakarta Sans', 'system-ui', 'sans-serif'],
        jakarta: ['Plus Jakarta Sans', 'sans-serif'],
        inter: ['Inter', 'sans-serif'],
        dm: ['DM Sans', 'sans-serif'],
      },
      colors: {
        // Cores baseadas no seu globals.css
        'primary': 'var(--color-primary)', // #1B3A5C
        'accent': 'var(--color-accent)',   // #2E94D4
        'accent-dark': 'var(--color-accent-dark)', // #2680B8
        'accent-light': 'var(--color-accent-light)', // #4BA8E0
        'secondary': 'var(--color-secondary)', // #B8C5D1
        'neutral': 'var(--color-neutral)',   // #F0F3F6
        'text-light': 'var(--color-text-light)', // #FFFFFF
        'dark-bg': 'var(--color-dark)', // #1B3A5C (para fundos escuros, nome pode ser melhor)
        'light-bg': 'var(--color-light)', // #FFFFFF (para fundos claros)
        'gray-custom': 'var(--color-gray)', // #F0F3F6 (para backgrounds secundários)
        'card-bg': 'var(--color-card-bg)', // #FFFFFF
        'card-text': 'var(--color-card-text)', // #1B3A5C
        'paralel': 'var(--color-paralel)', // #F8FAFB

        // Cores de ação
        'success': 'var(--color-success)', // #22c55e
        'warning': 'var(--color-warning)', // #f59e0b
        'error': 'var(--color-error)',   // #ef4444
        'info': 'var(--color-info)',     // #2E94D4 (mesmo que accent)

        // Mantendo as cores padrão do Tailwind para compatibilidade e utilidade
        // Se houver conflito de nomes, prefixe as customizadas, ex: 'custom-primary'
        // ou use os nomes do seu CSS diretamente como string.
        // Exemplo:
        // 'fh-primary': '#1B3A5C',
        // 'fh-accent': '#2E94D4',
      },
      spacing: { // Seus espaçamentos customizados
        'space-xs': 'var(--space-xs)',
        'space-sm': 'var(--space-sm)',
        'space-md': 'var(--space-md)',
        'space-lg': 'var(--space-lg)',
        'space-xl': 'var(--space-xl)',
        'space-2xl': 'var(--space-2xl)',
        'space-3xl': 'var(--space-3xl)',
      },
      boxShadow: {
        'custom-sm': 'var(--shadow-sm)',
        'custom-md': 'var(--shadow-md)',
        'custom-lg': 'var(--shadow-lg)',
        'custom-xl': 'var(--shadow-xl)',
        // Manter outras sombras do Tailwind se desejar
      },
      borderRadius: {
        'custom-sm': 'var(--radius-sm)',
        'custom-md': 'var(--radius-md)',
        'custom-lg': 'var(--radius-lg)',
        'custom-xl': 'var(--radius-xl)',
        'custom-2xl': 'var(--radius-2xl)',
        'custom-full': 'var(--radius-full)',
        // Manter outros borderRadius do Tailwind
      },
      // Manter outras extensões como fontFamily, keyframes, etc.
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        float: 'float 4s ease-in-out infinite',
      },
      transitionProperty: {
        width: 'width',
        height: 'height',
        spacing: 'margin, padding',
      },
      backdropBlur: {
        xs: '2px',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-6px)' },
        },
      },
    },
  },
  plugins: [],
};