import { cn } from "../../lib/utils";

interface TypographyH2Props {
  children: React.ReactNode;
  className?: string;
}

export function TypographyH2({ children, className }: TypographyH2Props) {
  return (
    <h2 className={cn(
      "scroll-m-20 pb-2 text-3xl font-semibold tracking-tight first:mt-0 font-urbanist", 
      className
    )}>
      {children}
    </h2>
  );
}