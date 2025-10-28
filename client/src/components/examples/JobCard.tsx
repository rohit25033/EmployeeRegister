import JobCard from '../JobCard';

export default function JobCardExample() {
  const mockJob = {
    id: '1',
    restaurantName: "McDonald's India",
    role: 'Waiter',
    payRate: '₹12,000/month',
    shiftTiming: 'Morning (9am–5pm)',
    location: 'Bengaluru, Indiranagar',
  };

  return (
    <div className="p-8 bg-background max-w-2xl">
      <JobCard job={mockJob} onApply={(id) => console.log('Apply clicked:', id)} />
    </div>
  );
}
