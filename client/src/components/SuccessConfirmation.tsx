import { Button } from "@/components/ui/button";
import { CheckCircle2 } from "lucide-react";
import { useLocation } from "wouter";

interface SuccessConfirmationProps {
  onGoToDashboard?: () => void;
}

export default function SuccessConfirmation({ onGoToDashboard }: SuccessConfirmationProps) {
  const [, setLocation] = useLocation();

  const handleGoToDashboard = () => {
    if (onGoToDashboard) {
      onGoToDashboard();
    } else {
      setLocation("/dashboard");
    }
  };

  return (
    <div className="text-center max-w-md mx-auto py-12" data-testid="success-confirmation">
      <div className="mb-8">
        <CheckCircle2 className="w-24 h-24 text-primary mx-auto mb-6" data-testid="icon-success" />
        <h2 className="text-3xl font-bold mb-4">Registration Complete!</h2>
        <p className="text-muted-foreground text-lg">
          Your registration has been submitted successfully. Verification may take up to 24 hours. You'll be notified once approved.
        </p>
      </div>

      <div className="space-y-4">
        <div className="bg-muted/50 rounded-lg p-6 border">
          <h3 className="font-semibold mb-2">What's Next?</h3>
          <ul className="text-sm text-muted-foreground space-y-2 text-left">
            <li className="flex items-start">
              <span className="text-primary mr-2">•</span>
              <span>Our team will verify your details within 24 hours</span>
            </li>
            <li className="flex items-start">
              <span className="text-primary mr-2">•</span>
              <span>You'll receive a notification via SMS and email</span>
            </li>
            <li className="flex items-start">
              <span className="text-primary mr-2">•</span>
              <span>Once approved, you can start applying for jobs</span>
            </li>
          </ul>
        </div>

        <Button 
          className="h-12 px-8 w-full" 
          onClick={handleGoToDashboard}
          data-testid="button-dashboard"
        >
          Go to Dashboard
        </Button>
      </div>
    </div>
  );
}
