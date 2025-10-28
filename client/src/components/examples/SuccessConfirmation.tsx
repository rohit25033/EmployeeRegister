import SuccessConfirmation from '../SuccessConfirmation';

export default function SuccessConfirmationExample() {
  return (
    <div className="p-8 bg-background">
      <SuccessConfirmation onGoToDashboard={() => console.log('Dashboard navigation')} />
    </div>
  );
}
