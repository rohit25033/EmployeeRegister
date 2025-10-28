import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import ChecklistItem from "@/components/ChecklistItem";
import ContactModal from "@/components/ContactModal";
import { GraduationCap, Award } from "lucide-react";
import { useLocation } from "wouter";

export default function DashboardPage() {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalType, setModalType] = useState<"training" | "certification">("training");
  const [, setLocation] = useLocation();

  const handleOpenModal = (type: "training" | "certification") => {
    setModalType(type);
    setModalOpen(true);
  };

  const handleModalClose = () => {
    setModalOpen(false);
    setLocation("/home");
  };

  return (
    <div className="min-h-screen bg-background py-12 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="mb-12 text-center">
          <h1 className="text-4xl font-bold mb-3">Next Steps to Boost Your Profile</h1>
          <p className="text-muted-foreground text-lg">
            Complete the following to unlock better job opportunities
          </p>
        </div>

        <Card className="p-8 mb-8">
          <h2 className="text-xl font-semibold mb-6">Your Progress</h2>
          <div className="space-y-4">
            <ChecklistItem
              title="Complete Training"
              description="Get trained and verified to become job-ready."
              icon={<GraduationCap className="w-6 h-6" />}
              isComplete={false}
            />
            <ChecklistItem
              title="Complete Certification"
              description="Earn official badges to access top-paying QSR roles."
              icon={<Award className="w-6 h-6" />}
              isComplete={false}
            />
          </div>
        </Card>

        <div className="space-y-4">
          <Button
            className="w-full h-14 text-lg"
            onClick={() => handleOpenModal("training")}
            data-testid="button-get-training"
          >
            <GraduationCap className="w-5 h-5 mr-2" />
            Get Training
          </Button>
          <Button
            className="w-full h-14 text-lg"
            variant="outline"
            onClick={() => handleOpenModal("certification")}
            data-testid="button-get-certificate"
          >
            <Award className="w-5 h-5 mr-2" />
            Get Certificate
          </Button>
        </div>

        <div className="mt-8 p-6 bg-muted/30 rounded-lg border">
          <p className="text-sm text-muted-foreground text-center">
            💡 <span className="font-medium">Pro Tip:</span> Workers with verified training and certifications
            earn up to 30% more and get priority access to premium job postings.
          </p>
        </div>
      </div>

      <ContactModal
        isOpen={modalOpen}
        onClose={handleModalClose}
        type={modalType}
      />
    </div>
  );
}
