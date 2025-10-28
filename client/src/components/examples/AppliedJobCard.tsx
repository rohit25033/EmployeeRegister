import AppliedJobCard from '../AppliedJobCard';

export default function AppliedJobCardExample() {
  const mockJobs = [
    {
      id: '1',
      restaurantName: "McDonald's India",
      role: 'Waiter',
      payRate: '₹12,000/month',
      shiftTiming: 'Morning (9am–5pm)',
      location: 'Bengaluru, Indiranagar',
      status: 'under_review' as const,
    },
    {
      id: '2',
      restaurantName: 'Café Coffee Day',
      role: 'Barista',
      payRate: '₹14,000/month',
      shiftTiming: 'Evening (2pm–10pm)',
      location: 'Mumbai, Bandra',
      status: 'rejected' as const,
    },
    {
      id: '3',
      restaurantName: "Domino's Pizza",
      role: 'Kitchen Helper',
      payRate: '₹11,500/month',
      shiftTiming: 'Morning (9am–5pm)',
      location: 'Delhi, Connaught Place',
      status: 'interview_scheduled' as const,
      interviewDate: '1st Nov',
    },
    {
      id: '4',
      restaurantName: 'Subway India',
      role: 'Cashier',
      payRate: '₹13,000/month',
      shiftTiming: 'Flexible',
      location: 'Pune, Koregaon Park',
      status: 'selected' as const,
    },
  ];

  return (
    <div className="p-8 bg-background space-y-4 max-w-3xl">
      {mockJobs.map((job) => (
        <AppliedJobCard key={job.id} job={job} />
      ))}
    </div>
  );
}
