import { Card, CardContent, CardDescription } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface ExplanationItemProps {
  number: number;
  content: string;
  display: "left" | "right";
}

function ExplanationItem({ number, content, display }: ExplanationItemProps) {
  return (
    <Card
      className={`bg-secondary-foreground text-black flex items-center gap-4 p-4 w-64 ${
        display === "right" ? "flex-row-reverse" : "flex-row"
      }`}
    >
      <CardDescription
        className={cn(
          "rounded-full w-10 h-10",
          "text-black bg-white text-lg font-bold",
          "flex items-center justify-center flex-shrink-0"
        )}
      >
        {number}
      </CardDescription>
      <CardContent className="p-0">{content}</CardContent>
    </Card>
  );
}

export default ExplanationItem;
