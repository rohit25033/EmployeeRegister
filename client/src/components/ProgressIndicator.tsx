import { Check } from "lucide-react";

interface ProgressIndicatorProps {
  currentStep: number;
  totalSteps: number;
  stepLabels: string[];
}

export default function ProgressIndicator({ currentStep, totalSteps, stepLabels }: ProgressIndicatorProps) {
  return (
    <div className="w-full" data-testid="progress-indicator">
      <div className="flex items-center justify-between max-w-2xl mx-auto">
        {Array.from({ length: totalSteps }, (_, i) => i + 1).map((step, index) => (
          <div key={step} className="flex items-center flex-1">
            <div className="flex flex-col items-center flex-1">
              <div
                className={`w-12 h-12 rounded-full flex items-center justify-center font-semibold text-lg transition-all ${
                  step < currentStep
                    ? "bg-primary text-primary-foreground"
                    : step === currentStep
                    ? "bg-primary text-primary-foreground ring-4 ring-primary/20"
                    : "bg-muted text-muted-foreground border-2 border-border"
                }`}
                data-testid={`step-indicator-${step}`}
              >
                {step < currentStep ? (
                  <Check className="w-6 h-6" data-testid={`step-check-${step}`} />
                ) : (
                  step
                )}
              </div>
              <div className={`mt-3 text-sm font-medium ${step === currentStep ? "text-foreground" : "text-muted-foreground"}`}>
                {stepLabels[index]}
              </div>
            </div>
            {index < totalSteps - 1 && (
              <div
                className={`h-1 flex-1 mx-4 mb-8 transition-all ${
                  step < currentStep ? "bg-primary" : "bg-border"
                }`}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
