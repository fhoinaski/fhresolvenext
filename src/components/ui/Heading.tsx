export function Heading({ title, description }: { title: string; description: string }) {
    return (
      <div>
        <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4 text-[var(--color-text)]">
          {title}
        </h1>
        <p className="text-base md:text-lg text-[var(--color-text)] opacity-80">
          {description}
        </p>
      </div>
    );
  }