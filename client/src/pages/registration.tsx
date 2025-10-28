import { useState } from "react";
import { Card } from "@/components/ui/card";
import ProgressIndicator from "@/components/ProgressIndicator";
import Step1BasicInfo from "@/components/Step1BasicInfo";
import Step2WorkDetails from "@/components/Step2WorkDetails";
import Step3Verification from "@/components/Step3Verification";
import SuccessConfirmation from "@/components/SuccessConfirmation";

export default function RegistrationPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [formData, setFormData] = useState<any>({});

  const stepLabels = ["Basic Info", "Work Details", "Verification"];

  const handleStep1Next = (data: any) => {
    setFormData((prev: any) => ({ ...prev, ...data }));
    setCurrentStep(2);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleStep2Next = (data: any) => {
    setFormData((prev: any) => ({ ...prev, ...data }));
    setCurrentStep(3);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleStep3Submit = async (data: any) => {
    const finalData = { ...formData, ...data };
    console.log("Final registration data:", finalData);
    
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsComplete(true);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }, 2000);
  };

  const handleBack = () => {
    setCurrentStep((prev) => Math.max(1, prev - 1));
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (isComplete) {
    return (
      <div className="min-h-screen bg-background py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <Card className="p-12">
            <SuccessConfirmation />
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="mb-12 text-center">
          <h1 className="text-4xl font-bold mb-3">Employee Registration</h1>
          <p className="text-muted-foreground text-lg">
            Join our platform to connect with verified QSR jobs
          </p>
        </div>

        <div className="mb-12">
          <ProgressIndicator
            currentStep={currentStep}
            totalSteps={3}
            stepLabels={stepLabels}
          />
        </div>

        <Card className="p-12">
          <div className="mb-8">
            <h2 className="text-2xl font-semibold mb-2">
              {stepLabels[currentStep - 1]}
            </h2>
            <p className="text-muted-foreground">
              {currentStep === 1 && "Let's start with your basic information"}
              {currentStep === 2 && "Tell us about your skills and experience"}
              {currentStep === 3 && "Complete verification to finish registration"}
            </p>
          </div>

          {currentStep === 1 && (
            <Step1BasicInfo
              onNext={handleStep1Next}
              initialData={formData}
            />
          )}

          {currentStep === 2 && (
            <Step2WorkDetails
              onNext={handleStep2Next}
              onBack={handleBack}
              initialData={formData}
            />
          )}

          {currentStep === 3 && (
            <Step3Verification
              onSubmit={handleStep3Submit}
              onBack={handleBack}
              initialData={formData}
              isSubmitting={isSubmitting}
            />
          )}
        </Card>
      </div>
    </div>
  );
}
