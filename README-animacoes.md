# Documentação de Animações e Microinterações - FH Resolve

Este documento descreve as melhorias implementadas nas animações e microinterações da interface do FH Resolve, visando criar uma experiência de usuário mais consistente, fluida e profissional.

## Índice

1. [Sistema de Variantes de Animação](#sistema-de-variantes-de-animação)
2. [Melhoria na Navegação (Header)](#melhoria-na-navegação-header)
3. [Refinamento de Microinterações](#refinamento-de-microinterações)
4. [Suporte a Prefers-Reduced-Motion](#suporte-a-prefers-reduced-motion)
5. [Como Usar](#como-usar)
6. [Boas Práticas](#boas-práticas)

---

## Sistema de Variantes de Animação

Foi criado um sistema centralizado de animações no arquivo `src/lib/motion-variants.ts`, contendo variantes padronizadas para todos os componentes interativos da aplicação. Isso garante:

- **Consistência**: Todas as animações seguem o mesmo padrão visual
- **Reutilização**: Redução de código duplicado
- **Manutenção**: Facilidade para ajustar animações globalmente

As principais categorias de variantes incluem:

- **Botões**: `buttonVariants`, `iconButtonVariants`, `fabVariants`
- **Cartões/Cards**: `cardVariants`
- **Entrada/Saída**: `entranceVariants`
- **Contêineres/Listas**: `containerVariants`
- **Navegação**: `navVariants`
- **Modais**: `modalVariants`
- **Carrosséis**: `carouselItemVariants`
- **Loading**: `loadingVariants`
- **Scroll**: `scrollAnimationVariants`
- **Formulários**: `formControlVariants`
- **Tooltips**: `tooltipVariants`

Além de transições e curvas de easing padronizadas:

```typescript
// Transições spring
export const spring = {
  soft: { type: "spring", stiffness: 300, damping: 30 },
  medium: { type: "spring", stiffness: 400, damping: 35 },
  stiff: { type: "spring", stiffness: 500, damping: 40 }
};

// Curvas de easing personalizadas
export const ease = {
  smooth: [0.43, 0.13, 0.23, 0.96],
  default: [0.25, 0.1, 0.25, 1],
  // etc.
};
```

## Melhoria na Navegação (Header)

### 1. Animação de Menu Mobile

- Substituição da animação simples por uma transição spring mais natural
- Adição de efeito staggered para itens do menu (entram/saem em sequência)
- Transição suave do ícone do menu (hambúrguer ↔ X)
- Prevenção de "pulos" de layout durante transições

```typescript
// Exemplo das variantes do menu mobile
const mobileMenuVariants = {
  closed: { 
    x: "-100%",
    opacity: 0,
    transition: { 
      type: "spring", 
      staggerChildren: 0.05,
      staggerDirection: -1
      // ...
    }
  },
  open: { 
    x: 0, 
    opacity: 1,
    transition: { 
      type: "spring", 
      staggerChildren: 0.07,
      // ...
    }
  }
};
```

### 2. Indicador de Seção Ativa

- Indicador de navegação ativa com transição mais suave e natural
- Melhoria da detecção de seção ativa para maior precisão
- Transição baseada em spring para movimento mais orgânico
- Prevenção de falsos positivos durante rolagem

```jsx
{isActive && (
  <motion.div
    className="absolute -bottom-1 left-0 w-full h-0.5 bg-[var(--color-accent)] rounded-full"
    layoutId="activeNavIndicator"
    transition={{ 
      type: "spring", 
      stiffness: 500, 
      damping: 30 
    }}
  />
)}
```

### 3. Experiência de Rolagem Suave

- Aprimoramento da rolagem suave utilizando `requestAnimationFrame` para eliminar irregularidades
- Cálculo mais preciso das posições de rolagem com compensação de altura do cabeçalho
- Offset adicional para evitar que o conteúdo comece exatamente sob o cabeçalho
- Bloqueio inteligente da rolagem durante abertura/fechamento do menu

```javascript
// Rolagem suave aprimorada
const handleLinkClick = (href: string) => {
  // ...
  requestAnimationFrame(() => {
    const elementPosition = element.getBoundingClientRect().top + window.scrollY;
    const offsetPosition = elementPosition - headerHeight - 20; // 20px de margem extra
    
    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth',
    });
  });
  // ...
};
```

## Refinamento de Microinterações

### Hero e Componentes Principais

Padronização das microinterações em todos os componentes interativos:

1. **Botões CTAs**
   - Hover: Elevação suave (y: -2px) + escala (1.04)
   - Clique: Compressão natural (scale: 0.97)
   - Efeito de brilho em botões de destaque

2. **Cartões de Serviço**
   - Hover: Elevação (y: -8px) + sombra suave
   - Clique: Compressão leve (scale: 0.98)
   - Animações estáticas das partículas/ícones para dar vida sem distrair

3. **Animações de Entrada**
   - Sequenciamento consistente de elementos principais
   - Staggering (atraso sequencial) em listas e grids
   - Animações de fade/slide direcionais consistentes

4. **Botões de Ação Secundária**
   - Sutil mas perceptível feedback visual nos estados hover/active
   - Transições de cor respeitando o design system
   - Hover/tap consistente com outros elementos para familiaridade

## Suporte a Prefers-Reduced-Motion

O sistema inclui suporte integrado para a preferência do usuário `prefers-reduced-motion`, seguindo as melhores práticas de acessibilidade:

### Hook Personalizado

```typescript
// Hook para verificar se o usuário prefere movimento reduzido
export const usePrefersReducedMotion = () => {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  
  useEffect(() => {
    // Verificar a preferência do usuário
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);
    
    // Listener para atualizar se a preferência mudar
    const handleChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
    };
    
    // Adiciona e remove listeners adequadamente
    if (typeof mediaQuery.addEventListener === 'function') {
      mediaQuery.addEventListener('change', handleChange);
      return () => mediaQuery.removeEventListener('change', handleChange);
    } else {
      // Fallback para navegadores mais antigos
      mediaQuery.addListener(handleChange);
      return () => mediaQuery.removeListener(handleChange);
    }
  }, []);
  
  return prefersReducedMotion;
};
```

### Utilitários para Aplicar Corretamente

```typescript
// Utilitário para desativar animações complexas
export const getReducedMotionVariants = (prefersReducedMotion: boolean) => {
  if (prefersReducedMotion) {
    return {
      hidden: { opacity: 0 },
      visible: { opacity: 1, transition: { duration: 0.2 } },
      exit: { opacity: 0, transition: { duration: 0.2 } }
    };
  }
  return null;
};

// Aplicar variante com segurança
export const applyVariant = (prefersReducedMotion: boolean, variant: any) => {
  return prefersReducedMotion
    ? { transition: { duration: 0.2 } }
    : variant;
};
```

### Exemplo de Uso

```jsx
import { usePrefersReducedMotion, applyVariant, buttonVariants } from '@/lib/motion-variants';

const MyComponent = () => {
  const prefersReducedMotion = usePrefersReducedMotion();
  
  return (
    <motion.button
      whileHover={applyVariant(prefersReducedMotion, buttonVariants.hover)}
      whileTap={applyVariant(prefersReducedMotion, buttonVariants.tap)}
    >
      Clique-me
    </motion.button>
  );
};
```

Isso garante que usuários que preferem movimento reduzido ainda recebam feedback visual adequado, mas sem animações que podem causar desconforto.

## Como Usar

Para implementar estas animações e microinterações em novos componentes:

1. **Importe as variantes necessárias**:

```jsx
import { 
  buttonVariants, 
  cardVariants, 
  entranceVariants,
  usePrefersReducedMotion,
  applyVariant 
} from '@/lib/motion-variants';
```

2. **Verifique a preferência do usuário**:

```jsx
const prefersReducedMotion = usePrefersReducedMotion();
```

3. **Aplique as variantes aos elementos com segurança**:

```jsx
<motion.button
  whileHover={applyVariant(prefersReducedMotion, buttonVariants.hover)}
  whileTap={applyVariant(prefersReducedMotion, buttonVariants.tap)}
  className="..."
>
  Conteúdo do botão
</motion.button>
```

4. **Para animações de entrada/saída**:

```jsx
<motion.div
  variants={prefersReducedMotion 
    ? getReducedMotionVariants(prefersReducedMotion) 
    : entranceVariants.slideUp}
  initial="hidden"
  animate="visible"
  exit="hidden"
>
  Conteúdo
</motion.div>
```

5. **Para listas com staggering**:

```jsx
<motion.ul
  variants={prefersReducedMotion 
    ? getReducedMotionVariants(prefersReducedMotion) 
    : containerVariants}
  initial="hidden"
  animate="visible"
>
  {items.map(item => (
    <motion.li 
      key={item.id} 
      variants={prefersReducedMotion 
        ? undefined 
        : entranceVariants.slideUp}
    >
      {item.content}
    </motion.li>
  ))}
</motion.ul>
```

## Boas Práticas

1. **Performance Primeiro**
   - Anime apenas propriedades performáticas: `transform`, `opacity`
   - Evite animar `width`, `height`, `top`, `left`, etc.
   - Use `will-change` com moderação

2. **Acessibilidade**
   - **SEMPRE** respeite `prefers-reduced-motion` para usuários sensíveis a movimento
   - Mantenha animações sutis (não excessivas)
   - Nunca dependa apenas de animação para transmitir informações importantes

3. **Consistência**
   - Use as variantes padronizadas em vez de criar novas
   - Mantenha a "personalidade" das animações consistente em toda a aplicação
   - Para casos especiais, crie variantes estendendo as existentes

4. **Simplificação Progressiva**
   - As animações devem degradar graciosamente em dispositivos com menos recursos
   - Usuários que preferem movimento reduzido ainda devem receber feedback visual adequado

---

*Este sistema de animações foi projetado para evoluir com o projeto. Sinta-se à vontade para adicionar novas variantes conforme necessário, mas mantenha a consistência com o sistema existente.* 