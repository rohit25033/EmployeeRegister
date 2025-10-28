import Step3Verification from '../Step3Verification';

export default function Step3VerificationExample() {
  return (
    <div className="max-w-3xl mx-auto p-8 bg-background">
      <Step3Verification 
        onSubmit={(data) => console.log('Step 3 data:', data)}
        onBack={() => console.log('Back clicked')}
      />
    </div>
  );
}
