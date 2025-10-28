import ChecklistItem from '../ChecklistItem';
import { GraduationCap, Award } from 'lucide-react';

export default function ChecklistItemExample() {
  return (
    <div className="p-8 bg-background space-y-4 max-w-2xl">
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
  );
}
