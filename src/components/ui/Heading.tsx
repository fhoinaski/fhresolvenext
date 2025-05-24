// src/components/ui/Heading.tsx
export function Heading({ title, description }: { title: string; description?: string }) { // Adicionado ? para description
    return (
      <div>
        <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-2 sm:mb-4 text-primary dark:text-text-light"> {/* Ajuste de margem e cores */}
          {title}
        </h1>
        {description && ( // Renderizar condicionalmente
          <p className="text-base md:text-lg text-primary/80 dark:text-text-light/80">
            {description}
          </p>
        )}
      </div>
    );
  }