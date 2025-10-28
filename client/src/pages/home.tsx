import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import JobFilters, { type FilterState } from "@/components/JobFilters";
import JobCard, { type Job } from "@/components/JobCard";
import ProfileView from "@/components/ProfileView";
import ApplicationModal from "@/components/ApplicationModal";
import AppliedJobCard, { type AppliedJob, type ApplicationStatus } from "@/components/AppliedJobCard";

const MOCK_JOBS: Job[] = [
  {
    id: "1",
    restaurantName: "McDonald's India",
    role: "Waiter",
    payRate: "₹12,000/month",
    shiftTiming: "Morning (9am–5pm)",
    location: "Bengaluru, Indiranagar",
  },
  {
    id: "2",
    restaurantName: "Starbucks",
    role: "Barista",
    payRate: "₹15,000/month",
    shiftTiming: "Evening (2pm–10pm)",
    location: "Mumbai, Bandra",
  },
  {
    id: "3",
    restaurantName: "Domino's Pizza",
    role: "Kitchen Staff",
    payRate: "₹10,000/month",
    shiftTiming: "Night (6pm–2am)",
    location: "Delhi, Connaught Place",
  },
  {
    id: "4",
    restaurantName: "KFC India",
    role: "Cashier",
    payRate: "₹11,500/month",
    shiftTiming: "Flexible",
    location: "Pune, Koregaon Park",
  },
  {
    id: "5",
    restaurantName: "Cafe Coffee Day",
    role: "Barista",
    payRate: "₹13,000/month",
    shiftTiming: "Morning (8am–4pm)",
    location: "Hyderabad, HITEC City",
  },
  {
    id: "6",
    restaurantName: "Subway",
    role: "Helper",
    payRate: "₹9,500/month",
    shiftTiming: "Evening (3pm–11pm)",
    location: "Chennai, T Nagar",
  },
];

const MOCK_PROFILE = {
  fullName: 'Rajesh Kumar',
  age: 24,
  gender: 'Male',
  phoneNumber: '9876543210',
  email: 'rajesh@example.com',
  region: 'Mumbai',
  languagesKnown: ['Hindi', 'English', 'Marathi'],
  skills: ['Baristas', 'Waiters'],
  pastWorkDetails: 'Worked at Cafe Coffee Day for 2 years as a Barista',
  certificationTags: ['Food Safety Certified'],
  aadhaarNumber: '1234-5678-9012',
  panNumber: 'ABCDE1234F',
  verificationStatus: 'pending' as const,
  trainingStatus: 'pending' as const,
  certificationStatus: 'pending' as const,
};

const STATUSES: ApplicationStatus[] = ["under_review", "rejected", "interview_scheduled", "selected"];

function getRandomStatus(): ApplicationStatus {
  return STATUSES[Math.floor(Math.random() * STATUSES.length)];
}

export default function HomePage() {
  const [filteredJobs, setFilteredJobs] = useState<Job[]>(MOCK_JOBS);
  const [applicationModalOpen, setApplicationModalOpen] = useState(false);
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [appliedJobs, setAppliedJobs] = useState<AppliedJob[]>([]);

  const handleApplyFilters = (filters: FilterState) => {
    console.log("Applying filters:", filters);
    let filtered = [...MOCK_JOBS];

    if (filters.roles.length > 0) {
      filtered = filtered.filter(job => filters.roles.includes(job.role));
    }

    if (filters.shifts.length > 0) {
      filtered = filtered.filter(job => {
        const shiftLower = job.shiftTiming.toLowerCase();
        return filters.shifts.some(shift => shiftLower.includes(shift.toLowerCase()));
      });
    }

    setFilteredJobs(filtered);
  };

  const handleClearFilters = () => {
    console.log("Clearing filters");
    setFilteredJobs(MOCK_JOBS);
  };

  const handleApplyJob = (jobId: string) => {
    const job = MOCK_JOBS.find(j => j.id === jobId);
    if (!job) return;

    const alreadyApplied = appliedJobs.some(aj => aj.id === jobId);
    if (alreadyApplied) return;

    setSelectedJob(job);
    setApplicationModalOpen(true);
    console.log("Applying for job:", jobId);
  };

  const handleModalClose = () => {
    if (selectedJob) {
      const status = getRandomStatus();
      const appliedJob: AppliedJob = {
        ...selectedJob,
        status,
        interviewDate: status === "interview_scheduled" ? "1st Nov" : undefined,
      };
      
      setAppliedJobs(prev => [appliedJob, ...prev]);
    }
    
    setApplicationModalOpen(false);
    setSelectedJob(null);
  };

  const isJobApplied = (jobId: string) => {
    return appliedJobs.some(aj => aj.id === jobId);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="border-b sticky top-0 bg-background z-10">
        <div className="max-w-7xl mx-auto px-4">
          <Tabs defaultValue="home" className="w-full">
            <TabsList className="w-full h-14 grid grid-cols-3 max-w-2xl mx-auto" data-testid="tabs-navigation">
              <TabsTrigger 
                value="home" 
                className="h-12 text-base"
                data-testid="tab-home"
              >
                Home
              </TabsTrigger>
              <TabsTrigger 
                value="profile" 
                className="h-12 text-base"
                data-testid="tab-profile"
              >
                Profile
              </TabsTrigger>
              <TabsTrigger 
                value="applied" 
                className="h-12 text-base"
                data-testid="tab-applied-jobs"
              >
                Applied Jobs
              </TabsTrigger>
            </TabsList>

            <TabsContent value="home" className="mt-0">
              <div className="py-8">
                <div className="grid grid-cols-12 gap-8">
                  <div className="col-span-3">
                    <JobFilters
                      onApplyFilters={handleApplyFilters}
                      onClearFilters={handleClearFilters}
                    />
                  </div>

                  <div className="col-span-9">
                    <div className="mb-6">
                      <h2 className="text-2xl font-bold">Available Jobs</h2>
                      <p className="text-muted-foreground">
                        {filteredJobs.length} job{filteredJobs.length !== 1 ? 's' : ''} found
                      </p>
                    </div>

                    <div className="space-y-4" data-testid="job-listings">
                      {filteredJobs.length > 0 ? (
                        filteredJobs.map((job) => (
                          <JobCard 
                            key={job.id} 
                            job={job} 
                            onApply={handleApplyJob}
                            isApplied={isJobApplied(job.id)}
                          />
                        ))
                      ) : (
                        <div className="text-center py-12">
                          <p className="text-muted-foreground">No jobs match your filters. Try adjusting them.</p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="profile" className="mt-0">
              <div className="py-8">
                <div className="max-w-3xl mx-auto">
                  <h1 className="text-3xl font-bold mb-8">My Profile</h1>
                  <ProfileView profile={MOCK_PROFILE} />
                </div>
              </div>
            </TabsContent>

            <TabsContent value="applied" className="mt-0">
              <div className="py-8">
                <div className="max-w-4xl mx-auto">
                  <div className="mb-8">
                    <h1 className="text-3xl font-bold mb-2">My Applied Jobs</h1>
                    <p className="text-muted-foreground">
                      Track the status of your job applications
                    </p>
                  </div>

                  {appliedJobs.length > 0 ? (
                    <div className="space-y-4" data-testid="applied-jobs-list">
                      {appliedJobs.map((job) => (
                        <AppliedJobCard key={job.id} job={job} />
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-16">
                      <div className="w-20 h-20 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                        <span className="text-4xl">📋</span>
                      </div>
                      <h3 className="text-xl font-semibold mb-2">No Applications Yet</h3>
                      <p className="text-muted-foreground mb-6">
                        Start applying to jobs from the Home tab to see them here
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>

      <ApplicationModal
        isOpen={applicationModalOpen}
        onClose={handleModalClose}
        jobTitle={selectedJob ? `${selectedJob.role} at ${selectedJob.restaurantName}` : undefined}
      />
    </div>
  );
}
