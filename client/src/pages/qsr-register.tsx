import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft, Store, Construction } from "lucide-react";

export default function QSRRegisterPage() {
  const [, setLocation] = useLocation();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-background to-muted/20 p-4">
      <Card className="w-full max-w-2xl p-8 sm:p-12 text-center space-y-8">
        {/* Icon */}
        <div className="flex justify-center">
          <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center" data-testid="icon-construction">
            <Construction className="w-10 h-10 text-primary" />
          </div>
        </div>

        {/* Content */}
        <div className="space-y-4">
          <div className="flex items-center justify-center gap-2">
            <Store className="w-8 h-8 text-primary" data-testid="icon-store" />
            <h1 className="text-3xl sm:text-4xl font-bold text-foreground" data-testid="text-page-heading">
              Employer Registration
            </h1>
          </div>
          
          <p className="text-lg text-muted-foreground max-w-md mx-auto" data-testid="text-description">
            The employer registration workflow is coming soon! This section will allow restaurants and franchisees to register and hire verified staff.
          </p>

          <div className="pt-4">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-accent/50 text-sm text-muted-foreground" data-testid="badge-status">
              <Construction className="w-4 h-4" />
              Under Construction
            </div>
          </div>
        </div>

        {/* Back Button */}
        <div className="pt-4">
          <Button
            size="lg"
            variant="outline"
            onClick={() => setLocation("/")}
            className="gap-2"
            data-testid="button-back-to-home"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Home
          </Button>
        </div>
      </Card>
    </div>
  );
}
