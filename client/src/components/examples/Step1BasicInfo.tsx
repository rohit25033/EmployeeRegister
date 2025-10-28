import Step1BasicInfo from '../Step1BasicInfo';

export default function Step1BasicInfoExample() {
  return (
    <div className="max-w-3xl mx-auto p-8 bg-background">
      <Step1BasicInfo 
        onNext={(data) => console.log('Step 1 data:', data)}
      />
    </div>
  );
}
