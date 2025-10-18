import { cn } from "@/lib/utils";

interface SectionProps {
  children: React.ReactNode;
  className?: string;
  id?: string;
  background?: 'default' | 'soft' | 'gradient';
}

export function Section({ children, className, id, background = 'default' }: SectionProps) {
  const backgroundClasses = {
    default: '',
    soft: 'bg-gradient-soft',
    gradient: 'bg-gradient-section'
  };

  return (
    <section
      id={id}
      className={cn(
        "py-16 px-4 sm:px-6 lg:px-8",
        backgroundClasses[background],
        className
      )}
    >
      <div className="max-w-7xl mx-auto">
        {children}
      </div>
    </section>
  );
}

export function SectionHeader({ 
  title, 
  subtitle, 
  centered = true,
  className 
}: {
  title: string;
  subtitle?: string;
  centered?: boolean;
  className?: string;
}) {
  return (
    <div className={cn(
      "mb-12",
      centered && "text-center",
      className
    )}>
      <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
        {title}
      </h2>
      {subtitle && (
        <p className="text-lg text-text-soft max-w-3xl mx-auto">
          {subtitle}
        </p>
      )}
    </div>
  );
}