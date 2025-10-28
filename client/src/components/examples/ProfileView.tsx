import ProfileView from '../ProfileView';

export default function ProfileViewExample() {
  const mockProfile = {
    fullName: 'Rajesh Kumar',
    age: 24,
    gender: 'Male',
    phoneNumber: '9876543210',
    email: 'rajesh@example.com',
    region: 'Mumbai',
    languagesKnown: ['Hindi', 'English', 'Marathi'],
    skills: ['Baristas', 'Waiters'],
    pastWorkDetails: 'Worked at Cafe Coffee Day for 2 years as a Barista',
    certificationTags: ['Food Safety Certified', 'Customer Service Pro'],
    aadhaarNumber: '1234-5678-9012',
    panNumber: 'ABCDE1234F',
    verificationStatus: 'pending' as const,
    trainingStatus: 'pending' as const,
    certificationStatus: 'pending' as const,
  };

  return (
    <div className="p-8 bg-background max-w-3xl mx-auto">
      <ProfileView profile={mockProfile} />
    </div>
  );
}
