import ProgressIndicator from '../ProgressIndicator';

export default function ProgressIndicatorExample() {
  return (
    <div className="p-8 bg-background">
      <ProgressIndicator 
        currentStep={2} 
        totalSteps={3} 
        stepLabels={['Basic Info', 'Work Details', 'Verification']} 
      />
    </div>
  );
}
