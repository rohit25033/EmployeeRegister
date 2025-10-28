import { Lock } from "lucide-react";

interface ChecklistItemProps {
  title: string;
  description: string;
  isComplete?: boolean;
  icon: React.ReactNode;
}

export default function ChecklistItem({ title, description, isComplete = false, icon }: ChecklistItemProps) {
  return (
    <div 
      className={`flex items-start gap-4 p-6 rounded-lg border ${
        isComplete 
          ? "bg-card border-card-border" 
          : "bg-muted/30 border-muted-border opacity-60"
      }`}
      data-testid={`checklist-item-${title.toLowerCase().replace(/\s+/g, '-')}`}
    >
      <div className={`flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center ${
        isComplete ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
      }`}>
        {isComplete ? icon : <Lock className="w-6 h-6" />}
      </div>
      <div className="flex-1">
        <h3 className={`text-lg font-semibold mb-1 ${isComplete ? "text-foreground" : "text-muted-foreground"}`}>
          {title}
        </h3>
        <p className={`text-sm ${isComplete ? "text-muted-foreground" : "text-muted-foreground/80"}`}>
          {description}
        </p>
      </div>
    </div>
  );
}
