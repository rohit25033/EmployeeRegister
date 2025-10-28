import Step2WorkDetails from '../Step2WorkDetails';

export default function Step2WorkDetailsExample() {
  return (
    <div className="max-w-3xl mx-auto p-8 bg-background">
      <Step2WorkDetails 
        onNext={(data) => console.log('Step 2 data:', data)}
        onBack={() => console.log('Back clicked')}
      />
    </div>
  );
}
