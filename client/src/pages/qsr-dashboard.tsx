import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useToast } from "@/hooks/use-toast";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  FileText,
  User,
  Plus,
  Calendar,
  Clock,
  MapPin,
  DollarSign,
  Users,
  CheckCircle2,
  AlertCircle,
  Phone,
  Mail,
  Building2,
  Shield,
  FileCheck,
  MessageCircle,
  Download,
  X as XIcon,
  Star,
  ThumbsUp,
} from "lucide-react";
import { format } from "date-fns";

// Post Job Form Schema
const postJobSchema = z.object({
  role: z.string().min(1, "Role is required"),
  location: z.string().min(1, "Location is required"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  salaryMin: z.coerce.number().min(1, "Minimum salary is required"),
  salaryMax: z.coerce.number().min(1, "Maximum salary is required"),
  urgency: z.enum(["high", "low"]),
  shiftType: z.string().min(1, "Shift type is required"),
  numberOfOpenings: z.coerce.number().min(1, "Number of openings is required"),
});

type PostJobFormData = z.infer<typeof postJobSchema>;

// Mock data
const mockJobs = [
  {
    id: "1",
    role: "Waiter",
    location: "McD Indiranagar",
    salaryMin: 15000,
    salaryMax: 20000,
    urgency: "high",
    applicationsCount: 12,
    postedOn: "2025-10-20",
    shiftType: "Morning",
    numberOfOpenings: 3,
    description: "Looking for experienced waiters for our Indiranagar outlet",
  },
  {
    id: "2",
    role: "Kitchen Staff",
    location: "McD Koramangala",
    salaryMin: 18000,
    salaryMax: 25000,
    urgency: "low",
    applicationsCount: 8,
    postedOn: "2025-10-22",
    shiftType: "Evening",
    numberOfOpenings: 2,
    description: "Need skilled kitchen staff for evening shift",
  },
];

const mockRecentApplicants = [
  {
    id: "1",
    name: "Rahul Verma",
    role: "Waiter",
    location: "McD Indiranagar",
    appliedTime: "2 hours ago",
    experience: "2 years in QSR",
    skills: ["Customer Service", "POS Systems"],
    isVerified: true,
    trainingCompleted: true,
    certificateObtained: true,
  },
  {
    id: "2",
    name: "Sneha Rao",
    role: "Kitchen Staff",
    location: "McD Koramangala",
    appliedTime: "1 day ago",
    experience: "3 years in food preparation",
    skills: ["Food Prep", "Hygiene Standards"],
    isVerified: false,
    trainingCompleted: false,
    certificateObtained: false,
  },
];

const mockApplicants = [
  {
    id: "1",
    name: "Rahul Verma",
    email: "rahul@example.com",
    phone: "9876543210",
    experience: "2 years in QSR",
    skills: ["Customer Service", "POS Systems", "Cash Handling"],
    location: "Bangalore",
    isVerified: true,
    trainingCompleted: true,
    certificateObtained: true,
  },
  {
    id: "2",
    name: "Priya Sharma",
    email: "priya@example.com",
    phone: "9876543211",
    experience: "1 year in hospitality",
    skills: ["Customer Service", "Team Work"],
    location: "Bangalore",
    isVerified: false,
    trainingCompleted: true,
    certificateObtained: false,
  },
  {
    id: "3",
    name: "Amit Kumar",
    email: "amit@example.com",
    phone: "9876543212",
    experience: "3 years in food service",
    skills: ["Customer Service", "Food Safety", "POS Systems"],
    location: "Bangalore",
    isVerified: true,
    trainingCompleted: true,
    certificateObtained: true,
  },
];

const mockEmployees = [
  {
    id: "1",
    name: "Rohan Singh",
    role: "Waiter",
    location: "McD Indiranagar",
    email: "rohan@example.com",
    phone: "9876543201",
    joiningDate: "2025-05-15",
    status: "active",
    avatar: "RS",
    daysWorked: 24,
    daysAbsent: 2,
    attendanceRate: 92.3,
    isVerified: true,
    trainingCompleted: true,
    certificateObtained: true,
  },
  {
    id: "2",
    name: "Neha Patel",
    role: "Barista",
    location: "McD Koramangala",
    email: "neha@example.com",
    phone: "9876543202",
    joiningDate: "2025-06-01",
    status: "active",
    avatar: "NP",
    daysWorked: 20,
    daysAbsent: 1,
    attendanceRate: 95.2,
    isVerified: true,
    trainingCompleted: true,
    certificateObtained: true,
  },
  {
    id: "3",
    name: "Vikram Reddy",
    role: "Kitchen Staff",
    location: "McD Whitefield",
    email: "vikram@example.com",
    phone: "9876543203",
    joiningDate: "2025-07-10",
    status: "active",
    avatar: "VR",
    daysWorked: 18,
    daysAbsent: 0,
    attendanceRate: 100,
    isVerified: true,
    trainingCompleted: true,
    certificateObtained: true,
  },
  {
    id: "4",
    name: "Ananya Iyer",
    role: "Cleaner",
    location: "McD HSR Layout",
    email: "ananya@example.com",
    phone: "9876543204",
    joiningDate: "2025-08-20",
    status: "on_leave",
    avatar: "AI",
    daysWorked: 12,
    daysAbsent: 3,
    attendanceRate: 80,
    isVerified: true,
    trainingCompleted: true,
    certificateObtained: true,
  },
];

const mockFeedback: Record<string, Array<{
  id: string;
  rating: number;
  comment: string;
  date: string;
  submittedBy: string;
}>> = {
  "1": [
    {
      id: "f1",
      rating: 5,
      comment: "Excellent service! Very polite and attentive to customers. Always maintains a positive attitude.",
      date: "2025-10-15",
      submittedBy: "McDonald's Indiranagar Manager",
    },
    {
      id: "f2",
      rating: 4,
      comment: "Good work ethic. Handles rush hours well. Could improve on speed during peak times.",
      date: "2025-09-20",
      submittedBy: "McDonald's Indiranagar Manager",
    },
  ],
  "2": [
    {
      id: "f3",
      rating: 5,
      comment: "Outstanding barista skills. Customers love her coffee and friendly demeanor.",
      date: "2025-10-10",
      submittedBy: "McDonald's Koramangala Manager",
    },
  ],
  "3": [
    {
      id: "f4",
      rating: 5,
      comment: "Perfect attendance and excellent kitchen hygiene standards. A model employee!",
      date: "2025-10-05",
      submittedBy: "McDonald's Whitefield Manager",
    },
  ],
  "4": [],
};

interface BusinessInfo {
  businessName: string;
  registeredName: string;
  pocName: string;
  pocEmail: string;
  contactNumber: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
  fssaiLicense?: string;
  gstNumber?: string;
  panNumber?: string;
  registrationNumber?: string;
  accountType: string;
}

export default function QSRDashboardPage() {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState<"listings" | "profile" | "employees">("listings");
  const [postJobOpen, setPostJobOpen] = useState(false);
  const [viewApplicantsOpen, setViewApplicantsOpen] = useState(false);
  const [scheduleCallOpen, setScheduleCallOpen] = useState(false);
  const [employeeDashboardOpen, setEmployeeDashboardOpen] = useState(false);
  const [supportOpen, setSupportOpen] = useState(false);
  const [selectedJob, setSelectedJob] = useState<typeof mockJobs[0] | null>(null);
  const [selectedApplicant, setSelectedApplicant] = useState<typeof mockApplicants[0] | null>(null);
  const [selectedEmployee, setSelectedEmployee] = useState<any | null>(null);
  const [scheduledDate, setScheduledDate] = useState("");
  const [scheduledTime, setScheduledTime] = useState("");
  const [supportQuery, setSupportQuery] = useState("");
  const [feedbackRating, setFeedbackRating] = useState(0);
  const [feedbackComment, setFeedbackComment] = useState("");
  const [employeeFeedback, setEmployeeFeedback] = useState(mockFeedback);
  const [jobs, setJobs] = useState(mockJobs);
  const [businessInfo, setBusinessInfo] = useState<BusinessInfo | null>(null);

  // Load business info from localStorage
  useEffect(() => {
    const storedInfo = localStorage.getItem("qsrBusinessInfo");
    if (storedInfo) {
      setBusinessInfo(JSON.parse(storedInfo));
    }
  }, []);

  const postJobForm = useForm<PostJobFormData>({
    resolver: zodResolver(postJobSchema),
    defaultValues: {
      role: "",
      location: "",
      description: "",
      salaryMin: 0,
      salaryMax: 0,
      urgency: "low",
      shiftType: "",
      numberOfOpenings: 1,
    },
  });

  const handlePostJob = (data: PostJobFormData) => {
    console.log("Posting job:", data);
    
    const newJob = {
      id: String(jobs.length + 1),
      role: data.role,
      location: data.location,
      salaryMin: data.salaryMin,
      salaryMax: data.salaryMax,
      urgency: data.urgency,
      applicationsCount: 0,
      postedOn: new Date().toISOString().split('T')[0],
      shiftType: data.shiftType,
      numberOfOpenings: data.numberOfOpenings,
      description: data.description,
    };
    
    setJobs([newJob, ...jobs]);
    setPostJobOpen(false);
    postJobForm.reset();
    
    toast({
      title: "Job Posted Successfully!",
      description: "Your job listing is now live and accepting applications.",
    });
  };

  const handleViewApplicants = (job: typeof mockJobs[0]) => {
    setSelectedJob(job);
    setViewApplicantsOpen(true);
  };

  const handleScheduleCall = (applicant: typeof mockApplicants[0]) => {
    setSelectedApplicant(applicant);
    setScheduleCallOpen(true);
  };

  const handleConfirmSchedule = () => {
    if (!scheduledDate || !scheduledTime) {
      toast({
        title: "Missing Information",
        description: "Please select both date and time for the call.",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Call Scheduled Successfully!",
      description: `Call scheduled with ${selectedApplicant?.name} on ${format(new Date(scheduledDate), "PPP")} at ${scheduledTime}. You'll be notified via email.`,
    });
    
    setScheduleCallOpen(false);
    setScheduledDate("");
    setScheduledTime("");
  };

  const handleSubmitFeedback = () => {
    if (!selectedEmployee) return;
    
    if (feedbackRating === 0) {
      toast({
        title: "Rating Required",
        description: "Please select a rating before submitting.",
        variant: "destructive",
      });
      return;
    }

    if (!feedbackComment.trim()) {
      toast({
        title: "Comment Required",
        description: "Please provide feedback comments.",
        variant: "destructive",
      });
      return;
    }

    const newFeedback = {
      id: `f${Date.now()}`,
      rating: feedbackRating,
      comment: feedbackComment,
      date: new Date().toISOString().split('T')[0],
      submittedBy: businessInfo?.businessName || "QSR Manager",
    };

    setEmployeeFeedback(prev => ({
      ...prev,
      [selectedEmployee.id]: [newFeedback, ...(prev[selectedEmployee.id] || [])],
    }));

    toast({
      title: "Feedback Submitted!",
      description: `Your feedback for ${selectedEmployee.name} has been recorded.`,
    });

    setFeedbackRating(0);
    setFeedbackComment("");
  };

  const totalApplications = jobs.reduce((acc, job) => acc + job.applicationsCount, 0);

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
      {/* Header */}
      <div className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            {/* Greeting */}
            <div>
              <h1 className="text-2xl font-bold" data-testid="text-greeting">
                Hi, {businessInfo?.businessName || "QSR Owner"}!
              </h1>
              <p className="text-sm text-muted-foreground" data-testid="text-subtitle">
                Welcome to your dashboard
              </p>
            </div>

            {/* Tab Icons */}
            <div className="flex gap-2">
              <Button
                variant={activeTab === "listings" ? "default" : "ghost"}
                onClick={() => setActiveTab("listings")}
                className="gap-2"
                data-testid="button-tab-listings"
              >
                <FileText className="w-4 h-4" />
                Listings
              </Button>
              <Button
                variant={activeTab === "employees" ? "default" : "ghost"}
                onClick={() => setActiveTab("employees")}
                className="gap-2"
                data-testid="button-tab-employees"
              >
                <Users className="w-4 h-4" />
                Employees
              </Button>
              <Button
                variant={activeTab === "profile" ? "default" : "ghost"}
                onClick={() => setActiveTab("profile")}
                className="gap-2"
                data-testid="button-tab-profile"
              >
                <User className="w-4 h-4" />
                Profile
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        {activeTab === "listings" ? (
          <div className="space-y-6">
            {/* Top Bar - Post Job + Applications Counter */}
            <div className="flex items-center justify-between">
              <Button
                onClick={() => setPostJobOpen(true)}
                className="gap-2"
                size="lg"
                data-testid="button-post-job"
              >
                <Plus className="w-5 h-5" />
                Post Job
              </Button>
              
              <Badge variant="secondary" className="text-base px-4 py-2" data-testid="badge-applications-count">
                <Users className="w-4 h-4 mr-2" />
                {totalApplications} Applications Received
              </Badge>
            </div>

            {/* Recent Updates Section */}
            <Card className="bg-gradient-to-br from-accent/5 to-transparent" data-testid="section-recent-updates">
              <CardHeader>
                <CardTitle>Recent Job Applications</CardTitle>
                <CardDescription>Latest candidates who applied to your positions</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {mockRecentApplicants.map((applicant) => (
                  <div
                    key={applicant.id}
                    className="flex items-start justify-between p-4 border rounded-lg hover-elevate"
                    data-testid={`card-recent-applicant-${applicant.id}`}
                  >
                    <div className="flex gap-4">
                      <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                        <User className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <p className="font-medium" data-testid={`text-applicant-name-${applicant.id}`}>
                            {applicant.name} applied for {applicant.role} - {applicant.location}
                          </p>
                          {applicant.isVerified && (
                            <Badge variant="default" className="text-xs gap-1" data-testid={`badge-verified-${applicant.id}`}>
                              <Shield className="w-3 h-3" />
                              Verified
                            </Badge>
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground">{applicant.appliedTime}</p>
                        <div className="flex gap-2 mt-2">
                          {applicant.skills.map((skill, idx) => (
                            <Badge key={idx} variant="outline" className="text-xs">
                              {skill}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                    <Button variant="outline" size="sm" data-testid={`button-view-profile-${applicant.id}`}>
                      View Profile
                    </Button>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Job Listings Grid */}
            <div className="space-y-4">
              <h2 className="text-xl font-semibold">All Job Listings</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {jobs.map((job) => (
                  <Card key={job.id} data-testid={`card-job-${job.id}`}>
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div>
                          <CardTitle className="text-lg" data-testid={`text-job-role-${job.id}`}>
                            {job.role}
                          </CardTitle>
                          <CardDescription className="flex items-center gap-2 mt-1">
                            <MapPin className="w-3 h-3" />
                            {job.location}
                          </CardDescription>
                        </div>
                        <Badge
                          variant={job.urgency === "high" ? "destructive" : "secondary"}
                          data-testid={`badge-urgency-${job.id}`}
                        >
                          {job.urgency === "high" ? "High" : "Low"} Urgency
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div className="flex items-center gap-2">
                          <DollarSign className="w-4 h-4 text-muted-foreground" />
                          <span>₹{job.salaryMin.toLocaleString()} - ₹{job.salaryMax.toLocaleString()}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock className="w-4 h-4 text-muted-foreground" />
                          <span>{job.shiftType}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Users className="w-4 h-4 text-muted-foreground" />
                          <span>{job.numberOfOpenings} Openings</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4 text-muted-foreground" />
                          <span>{new Date(job.postedOn).toLocaleDateString()}</span>
                        </div>
                      </div>
                      
                      <div className="pt-4 border-t flex items-center justify-between">
                        <Badge variant="outline" data-testid={`badge-applications-${job.id}`}>
                          {job.applicationsCount} Applications
                        </Badge>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleViewApplicants(job)}
                          data-testid={`button-view-applicants-${job.id}`}
                        >
                          View Applicants
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        ) : activeTab === "employees" ? (
          // Employees Tab
          <div className="space-y-6" data-testid="section-employees">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold" data-testid="text-employees-heading">
                  Employee Management
                </h2>
                <p className="text-muted-foreground" data-testid="text-employees-description">
                  Manage your hired employees and view their performance
                </p>
              </div>
              <Badge variant="outline" className="text-lg px-4 py-2" data-testid="badge-total-employees">
                {mockEmployees.length} Active Employees
              </Badge>
            </div>

            {/* Employee Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {mockEmployees.map((employee) => (
                <Card key={employee.id} className="hover-elevate" data-testid={`card-employee-${employee.id}`}>
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                          <span className="text-sm font-semibold">{employee.avatar}</span>
                        </div>
                        <div>
                          <CardTitle className="text-lg" data-testid={`text-employee-name-${employee.id}`}>
                            {employee.name}
                          </CardTitle>
                          <p className="text-sm text-muted-foreground">{employee.role}</p>
                        </div>
                      </div>
                      <Badge variant={employee.status === "active" ? "default" : "outline"} data-testid={`badge-employee-status-${employee.id}`}>
                        {employee.status === "active" ? "Active" : "On Leave"}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex items-center gap-2 text-sm">
                      <MapPin className="w-4 h-4 text-muted-foreground" />
                      <span>{employee.location}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Calendar className="w-4 h-4 text-muted-foreground" />
                      <span>Joined: {new Date(employee.joiningDate).toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Mail className="w-4 h-4 text-muted-foreground" />
                      <span className="truncate">{employee.email}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Phone className="w-4 h-4 text-muted-foreground" />
                      <span>{employee.phone}</span>
                    </div>
                    
                    <div className="pt-3 border-t space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Attendance</span>
                        <span className="font-semibold">{employee.attendanceRate}%</span>
                      </div>
                      <Button
                        className="w-full gap-2"
                        variant="outline"
                        onClick={() => {
                          setSelectedEmployee(employee);
                          setEmployeeDashboardOpen(true);
                        }}
                        data-testid={`button-view-employee-dashboard-${employee.id}`}
                      >
                        <User className="w-4 h-4" />
                        View Dashboard
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        ) : (
          // Profile Tab
          <div className="max-w-3xl mx-auto space-y-6" data-testid="section-profile">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <Building2 className="w-5 h-5" />
                    Business Information
                  </CardTitle>
                  <Badge className="gap-1" data-testid="badge-verification-status">
                    <CheckCircle2 className="w-3 h-3" />
                    Verification Complete
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="text-muted-foreground">Restaurant Brand Name</Label>
                    <p className="font-medium mt-1" data-testid="text-brand-name">{businessInfo?.businessName || "N/A"}</p>
                  </div>
                  <div>
                    <Label className="text-muted-foreground">Business Type</Label>
                    <p className="font-medium mt-1">{businessInfo?.accountType || "N/A"}</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="text-muted-foreground">POC Name</Label>
                    <p className="font-medium mt-1" data-testid="text-poc-name">{businessInfo?.pocName || "N/A"}</p>
                  </div>
                  <div>
                    <Label className="text-muted-foreground">POC Email</Label>
                    <p className="font-medium mt-1 flex items-center gap-2">
                      <Mail className="w-4 h-4 text-muted-foreground" />
                      {businessInfo?.pocEmail || "N/A"}
                    </p>
                  </div>
                </div>

                <div>
                  <Label className="text-muted-foreground">Contact Number</Label>
                  <p className="font-medium mt-1 flex items-center gap-2">
                    <Phone className="w-4 h-4 text-muted-foreground" />
                    {businessInfo?.contactNumber || "N/A"}
                  </p>
                </div>

                <div>
                  <Label className="text-muted-foreground">Address</Label>
                  <p className="font-medium mt-1 flex items-start gap-2">
                    <MapPin className="w-4 h-4 text-muted-foreground mt-0.5" />
                    {businessInfo ? `${businessInfo.address}, ${businessInfo.city}, ${businessInfo.state} - ${businessInfo.pincode}` : "N/A"}
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="w-5 h-5" />
                  Business Registration Details
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {businessInfo?.accountType === "QSR Unit" ? (
                  <>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label className="text-muted-foreground">FSSAI License</Label>
                        <p className="font-medium mt-1" data-testid="text-fssai">{businessInfo?.fssaiLicense || "N/A"}</p>
                      </div>
                      <div>
                        <Label className="text-muted-foreground">GST Number</Label>
                        <p className="font-medium mt-1" data-testid="text-gst">{businessInfo?.gstNumber || "N/A"}</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label className="text-muted-foreground">PAN Number</Label>
                        <p className="font-medium mt-1" data-testid="text-pan">{businessInfo?.panNumber || "N/A"}</p>
                      </div>
                      <div>
                        <Label className="text-muted-foreground">Registration Number</Label>
                        <p className="font-medium mt-1">{businessInfo?.registrationNumber || "N/A"}</p>
                      </div>
                    </div>
                  </>
                ) : (
                  <p className="text-sm text-muted-foreground">
                    Additional registration details will be requested during verification process.
                  </p>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileCheck className="w-5 h-5" />
                  Uploaded Documents
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {["GST Certificate", "FSSAI Certificate", "Business Registration Proof", "PAN Card", "Bank Account Proof"].map((doc) => (
                  <div key={doc} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center gap-2">
                      <FileText className="w-4 h-4 text-muted-foreground" />
                      <span>{doc}</span>
                    </div>
                    <Button variant="ghost" size="sm">
                      View
                    </Button>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        )}
      </div>

      {/* Post Job Modal */}
      <Dialog open={postJobOpen} onOpenChange={setPostJobOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto" data-testid="modal-post-job">
          <DialogHeader>
            <DialogTitle>Post a New Job</DialogTitle>
            <DialogDescription>
              Fill in the details to create a new job listing
            </DialogDescription>
          </DialogHeader>
          
          <Form {...postJobForm}>
            <form onSubmit={postJobForm.handleSubmit(handlePostJob)} className="space-y-4">
              <FormField
                control={postJobForm.control}
                name="role"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Role *</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger data-testid="select-role">
                          <SelectValue placeholder="Select role" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="Barista">Barista</SelectItem>
                        <SelectItem value="Waiter">Waiter</SelectItem>
                        <SelectItem value="Helper">Helper</SelectItem>
                        <SelectItem value="Cleaner">Cleaner</SelectItem>
                        <SelectItem value="Cashier">Cashier</SelectItem>
                        <SelectItem value="Cook">Cook</SelectItem>
                        <SelectItem value="Delivery Executive">Delivery Executive</SelectItem>
                        <SelectItem value="Supervisor">Supervisor</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={postJobForm.control}
                name="location"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Location *</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., McD Indiranagar" {...field} data-testid="input-location" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={postJobForm.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Job Description *</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Describe the job requirements and responsibilities"
                        {...field}
                        rows={4}
                        data-testid="textarea-description"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={postJobForm.control}
                  name="salaryMin"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Minimum Salary (₹) *</FormLabel>
                      <FormControl>
                        <Input type="number" placeholder="15000" {...field} data-testid="input-salary-min" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={postJobForm.control}
                  name="salaryMax"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Maximum Salary (₹) *</FormLabel>
                      <FormControl>
                        <Input type="number" placeholder="20000" {...field} data-testid="input-salary-max" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={postJobForm.control}
                name="urgency"
                render={({ field }) => (
                  <FormItem className="space-y-3">
                    <FormLabel>Urgency *</FormLabel>
                    <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        className="flex gap-4"
                      >
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="high" id="high" data-testid="radio-urgency-high" />
                          <Label htmlFor="high" className="font-normal cursor-pointer">
                            High
                          </Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="low" id="low" data-testid="radio-urgency-low" />
                          <Label htmlFor="low" className="font-normal cursor-pointer">
                            Low
                          </Label>
                        </div>
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={postJobForm.control}
                name="shiftType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Shift Type *</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger data-testid="select-shift-type">
                          <SelectValue placeholder="Select shift type" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="Morning">Morning</SelectItem>
                        <SelectItem value="Evening">Evening</SelectItem>
                        <SelectItem value="Night">Night</SelectItem>
                        <SelectItem value="Flexible">Flexible</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={postJobForm.control}
                name="numberOfOpenings"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Number of Openings *</FormLabel>
                    <FormControl>
                      <Input type="number" min="1" placeholder="1" {...field} data-testid="input-openings" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex justify-end gap-2 pt-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setPostJobOpen(false)}
                  data-testid="button-cancel-post-job"
                >
                  Cancel
                </Button>
                <Button type="submit" data-testid="button-submit-post-job">
                  Post Job
                </Button>
              </div>
            </form>
          </Form>
        </DialogContent>
      </Dialog>

      {/* View Applicants Modal */}
      <Dialog open={viewApplicantsOpen} onOpenChange={setViewApplicantsOpen}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto" data-testid="modal-view-applicants">
          <DialogHeader>
            <DialogTitle>Applicants for {selectedJob?.role}</DialogTitle>
            <DialogDescription>
              {selectedJob?.location} • {mockApplicants.length} applicants
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4">
            {mockApplicants.map((applicant) => (
              <Card key={applicant.id} data-testid={`card-applicant-${applicant.id}`}>
                <CardContent className="pt-6">
                  <div className="flex items-start justify-between">
                    <div className="flex gap-4 flex-1">
                      <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <User className="w-6 h-6 text-primary" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <h4 className="font-semibold" data-testid={`text-applicant-detail-name-${applicant.id}`}>
                            {applicant.name}
                          </h4>
                          {applicant.isVerified && (
                            <Badge variant="default" className="text-xs gap-1" data-testid={`badge-verified-applicant-${applicant.id}`}>
                              <Shield className="w-3 h-3" />
                              Verified
                            </Badge>
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground">{applicant.experience}</p>
                        
                        <div className="flex items-center gap-4 mt-2 text-sm">
                          <span className="flex items-center gap-1">
                            <Mail className="w-3 h-3" />
                            {applicant.email}
                          </span>
                          <span className="flex items-center gap-1">
                            <Phone className="w-3 h-3" />
                            {applicant.phone}
                          </span>
                          <span className="flex items-center gap-1">
                            <MapPin className="w-3 h-3" />
                            {applicant.location}
                          </span>
                        </div>
                        
                        <div className="flex gap-2 mt-3">
                          {applicant.skills.map((skill, idx) => (
                            <Badge key={idx} variant="outline" className="text-xs">
                              {skill}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" data-testid={`button-view-applicant-profile-${applicant.id}`}>
                        View Profile
                      </Button>
                      <Button
                        size="sm"
                        onClick={() => handleScheduleCall(applicant)}
                        className="gap-1"
                        data-testid={`button-schedule-call-${applicant.id}`}
                      >
                        <Calendar className="w-3 h-3" />
                        Schedule Call
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </DialogContent>
      </Dialog>

      {/* Schedule Call Modal */}
      <Dialog open={scheduleCallOpen} onOpenChange={setScheduleCallOpen}>
        <DialogContent data-testid="modal-schedule-call">
          <DialogHeader>
            <DialogTitle>Schedule a Call with {selectedApplicant?.name}</DialogTitle>
            <DialogDescription>
              Select a date and time for the interview call
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <div>
              <Label htmlFor="call-date">Date *</Label>
              <Input
                id="call-date"
                type="date"
                value={scheduledDate}
                onChange={(e) => setScheduledDate(e.target.value)}
                min={new Date().toISOString().split('T')[0]}
                className="mt-2"
                data-testid="input-call-date"
              />
            </div>
            
            <div>
              <Label htmlFor="call-time">Time *</Label>
              <Input
                id="call-time"
                type="time"
                value={scheduledTime}
                onChange={(e) => setScheduledTime(e.target.value)}
                className="mt-2"
                data-testid="input-call-time"
              />
            </div>
          </div>
          
          <div className="flex justify-end gap-2">
            <Button
              variant="outline"
              onClick={() => setScheduleCallOpen(false)}
              data-testid="button-cancel-schedule"
            >
              Cancel
            </Button>
            <Button onClick={handleConfirmSchedule} data-testid="button-confirm-schedule">
              Confirm Call
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Employee Dashboard Modal */}
      <Dialog open={employeeDashboardOpen} onOpenChange={setEmployeeDashboardOpen}>
        <DialogContent className="max-w-5xl max-h-[90vh] overflow-hidden" data-testid="modal-employee-dashboard">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                <span className="text-sm font-semibold">{selectedEmployee?.avatar}</span>
              </div>
              {selectedEmployee?.name} - Employee Dashboard
            </DialogTitle>
            <DialogDescription>
              {selectedEmployee?.role} at {selectedEmployee?.location}
            </DialogDescription>
          </DialogHeader>
          
          <Tabs defaultValue="calendar" className="w-full">
            <TabsList className="grid w-full grid-cols-5">
              <TabsTrigger value="calendar" data-testid="tab-calendar">Calendar</TabsTrigger>
              <TabsTrigger value="attendance" data-testid="tab-attendance">Attendance</TabsTrigger>
              <TabsTrigger value="documents" data-testid="tab-documents">Documents</TabsTrigger>
              <TabsTrigger value="payslips" data-testid="tab-payslips">Payslips</TabsTrigger>
              <TabsTrigger value="feedback" data-testid="tab-feedback">Feedback</TabsTrigger>
            </TabsList>
            
            <div className="overflow-y-auto max-h-[60vh] mt-4">
              <TabsContent value="calendar" className="space-y-4" data-testid="content-calendar">
                <Card>
                  <CardHeader>
                    <CardTitle>Work Calendar</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <Card>
                        <CardContent className="pt-6">
                          <div className="text-center">
                            <p className="text-3xl font-bold">{selectedEmployee?.daysWorked || 0}</p>
                            <p className="text-sm text-muted-foreground">Days Worked</p>
                          </div>
                        </CardContent>
                      </Card>
                      <Card>
                        <CardContent className="pt-6">
                          <div className="text-center">
                            <p className="text-3xl font-bold text-primary">{selectedEmployee?.attendanceRate || 0}%</p>
                            <p className="text-sm text-muted-foreground">Attendance Rate</p>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                    
                    <div className="p-4 bg-muted/50 rounded-lg">
                      <p className="text-sm font-medium mb-3">Last 7 Days</p>
                      <div className="grid grid-cols-7 gap-2">
                        {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day, idx) => (
                          <div key={day} className="text-center">
                            <p className="text-xs text-muted-foreground mb-1">{day}</p>
                            <div className={`w-8 h-8 rounded-full mx-auto flex items-center justify-center ${idx < 5 ? 'bg-green-100 dark:bg-green-900' : 'bg-red-100 dark:bg-red-900'}`}>
                              <span className="text-xs">{idx < 5 ? '✓' : '✗'}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div className="p-4 bg-primary/5 rounded-lg border">
                      <p className="text-sm font-medium">Keep up the great work! 🎉</p>
                      <p className="text-xs text-muted-foreground mt-1">Excellent attendance this week.</p>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="attendance" className="space-y-4" data-testid="content-attendance">
                <div className="grid grid-cols-3 gap-4">
                  <Card>
                    <CardContent className="pt-6">
                      <div className="text-center">
                        <p className="text-2xl font-bold">{selectedEmployee?.daysWorked || 0}</p>
                        <p className="text-sm text-muted-foreground">Days Worked</p>
                      </div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="pt-6">
                      <div className="text-center">
                        <p className="text-2xl font-bold text-destructive">{selectedEmployee?.daysAbsent || 0}</p>
                        <p className="text-sm text-muted-foreground">Days Absent</p>
                      </div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="pt-6">
                      <div className="text-center">
                        <p className="text-2xl font-bold text-primary">{selectedEmployee?.attendanceRate || 0}%</p>
                        <p className="text-sm text-muted-foreground">Attendance Rate</p>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
              
              <TabsContent value="documents" className="space-y-3" data-testid="content-documents">
                {/* Verification and Certificate Status */}
                <Card className="bg-gradient-to-br from-primary/5 to-transparent">
                  <CardHeader>
                    <CardTitle className="text-base flex items-center gap-2">
                      <Shield className="w-5 h-5 text-primary" />
                      Verification & Training Status
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex items-center justify-between p-3 bg-background rounded-lg border">
                      <div className="flex items-center gap-3">
                        <Shield className={`w-5 h-5 ${selectedEmployee?.isVerified ? 'text-green-600' : 'text-muted-foreground'}`} />
                        <div>
                          <p className="font-medium text-sm">Profile Verified</p>
                          <p className="text-xs text-muted-foreground">Background check completed</p>
                        </div>
                      </div>
                      {selectedEmployee?.isVerified ? (
                        <Badge variant="default" className="gap-1" data-testid="badge-verified-status">
                          <CheckCircle2 className="w-3 h-3" />
                          Verified
                        </Badge>
                      ) : (
                        <Badge variant="outline" className="gap-1">
                          <AlertCircle className="w-3 h-3" />
                          Pending
                        </Badge>
                      )}
                    </div>
                    
                    <div className="flex items-center justify-between p-3 bg-background rounded-lg border">
                      <div className="flex items-center gap-3">
                        <FileCheck className={`w-5 h-5 ${selectedEmployee?.trainingCompleted ? 'text-green-600' : 'text-muted-foreground'}`} />
                        <div>
                          <p className="font-medium text-sm">Training Completed</p>
                          <p className="text-xs text-muted-foreground">QSR service training program</p>
                        </div>
                      </div>
                      {selectedEmployee?.trainingCompleted ? (
                        <Badge variant="default" className="gap-1" data-testid="badge-training-status">
                          <CheckCircle2 className="w-3 h-3" />
                          Completed
                        </Badge>
                      ) : (
                        <Badge variant="outline" className="gap-1">
                          <AlertCircle className="w-3 h-3" />
                          Not Started
                        </Badge>
                      )}
                    </div>
                    
                    <div className="flex items-center justify-between p-3 bg-background rounded-lg border">
                      <div className="flex items-center gap-3">
                        <FileCheck className={`w-5 h-5 ${selectedEmployee?.certificateObtained ? 'text-green-600' : 'text-muted-foreground'}`} />
                        <div>
                          <p className="font-medium text-sm">Certificate Obtained</p>
                          <p className="text-xs text-muted-foreground">Official QSR certification</p>
                        </div>
                      </div>
                      {selectedEmployee?.certificateObtained ? (
                        <Badge variant="default" className="gap-1" data-testid="badge-certificate-status">
                          <CheckCircle2 className="w-3 h-3" />
                          Obtained
                        </Badge>
                      ) : (
                        <Badge variant="outline" className="gap-1">
                          <AlertCircle className="w-3 h-3" />
                          Not Obtained
                        </Badge>
                      )}
                    </div>
                  </CardContent>
                </Card>
                
                {/* Employee Documents */}
                {["Aadhaar Card", "PAN Card", "ID Proof", "Offer Letter", "Employment Contract"].map((doc) => (
                  <Card key={doc}>
                    <CardContent className="py-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <FileText className="w-5 h-5 text-muted-foreground" />
                          <span className="font-medium">{doc}</span>
                        </div>
                        <Button variant="outline" size="sm" className="gap-2">
                          <Download className="w-4 h-4" />
                          Download
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </TabsContent>
              
              <TabsContent value="payslips" className="space-y-3" data-testid="content-payslips">
                {["October 2025", "September 2025", "August 2025", "July 2025"].map((month) => (
                  <Card key={month}>
                    <CardContent className="py-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">{month}</p>
                          <p className="text-sm text-muted-foreground">Salary: ₹18,500</p>
                        </div>
                        <Button variant="outline" size="sm" className="gap-2">
                          <Download className="w-4 h-4" />
                          Download
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </TabsContent>
              
              <TabsContent value="feedback" className="space-y-4" data-testid="content-feedback">
                {/* Feedback Submission Form */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <ThumbsUp className="w-5 h-5" />
                      Submit New Feedback
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label className="mb-2 block">Rating *</Label>
                      <div className="flex gap-2">
                        {[1, 2, 3, 4, 5].map((rating) => (
                          <button
                            key={rating}
                            type="button"
                            onClick={() => setFeedbackRating(rating)}
                            className="transition-all"
                            data-testid={`button-rating-${rating}`}
                          >
                            <Star
                              className={`w-8 h-8 ${
                                rating <= feedbackRating
                                  ? 'fill-yellow-400 text-yellow-400'
                                  : 'text-muted-foreground'
                              }`}
                            />
                          </button>
                        ))}
                        {feedbackRating > 0 && (
                          <span className="ml-2 text-sm text-muted-foreground self-center">
                            {feedbackRating} out of 5 stars
                          </span>
                        )}
                      </div>
                    </div>
                    
                    <div>
                      <Label htmlFor="feedback-comment">Comments *</Label>
                      <Textarea
                        id="feedback-comment"
                        placeholder="Share your feedback about this employee's performance..."
                        value={feedbackComment}
                        onChange={(e) => setFeedbackComment(e.target.value)}
                        className="mt-2 min-h-[100px]"
                        data-testid="textarea-feedback-comment"
                      />
                    </div>
                    
                    <Button
                      onClick={handleSubmitFeedback}
                      className="w-full gap-2"
                      data-testid="button-submit-feedback"
                    >
                      <CheckCircle2 className="w-4 h-4" />
                      Submit Feedback
                    </Button>
                  </CardContent>
                </Card>

                {/* Feedback History */}
                <Card>
                  <CardHeader>
                    <CardTitle>Feedback History</CardTitle>
                    <CardDescription>
                      Previous feedback submitted for this employee
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {selectedEmployee && employeeFeedback[selectedEmployee.id]?.length > 0 ? (
                      employeeFeedback[selectedEmployee.id].map((feedback) => (
                        <Card key={feedback.id} data-testid={`card-feedback-${feedback.id}`}>
                          <CardContent className="pt-4 space-y-2">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-2">
                                {[1, 2, 3, 4, 5].map((star) => (
                                  <Star
                                    key={star}
                                    className={`w-4 h-4 ${
                                      star <= feedback.rating
                                        ? 'fill-yellow-400 text-yellow-400'
                                        : 'text-muted-foreground'
                                    }`}
                                  />
                                ))}
                              </div>
                              <Badge variant="outline" data-testid={`badge-feedback-date-${feedback.id}`}>
                                {new Date(feedback.date).toLocaleDateString()}
                              </Badge>
                            </div>
                            
                            <p className="text-sm" data-testid={`text-feedback-comment-${feedback.id}`}>
                              {feedback.comment}
                            </p>
                            
                            <p className="text-xs text-muted-foreground">
                              By: {feedback.submittedBy}
                            </p>
                          </CardContent>
                        </Card>
                      ))
                    ) : (
                      <div className="text-center py-8 text-muted-foreground" data-testid="text-no-feedback">
                        <ThumbsUp className="w-12 h-12 mx-auto mb-3 opacity-50" />
                        <p>No feedback submitted yet</p>
                        <p className="text-sm">Be the first to share feedback about this employee!</p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>
            </div>
          </Tabs>
        </DialogContent>
      </Dialog>

      {/* Reach Out to Us Support Modal */}
      <Dialog open={supportOpen} onOpenChange={setSupportOpen}>
        <DialogContent data-testid="modal-support">
          <DialogHeader>
            <DialogTitle>Reach Out to Us</DialogTitle>
            <DialogDescription>
              Have questions or need help? Send us your query and we'll get back to you.
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <div>
              <Label htmlFor="support-query">Your Query *</Label>
              <Textarea
                id="support-query"
                placeholder="Describe your issue or question..."
                value={supportQuery}
                onChange={(e) => setSupportQuery(e.target.value)}
                className="mt-2 min-h-[120px]"
                data-testid="textarea-support-query"
              />
            </div>
            
            <div className="p-3 bg-muted/50 rounded-lg">
              <p className="text-xs text-muted-foreground">
                📧 Email: support@qsrconnect.com<br />
                📞 Phone: 1800-123-4567<br />
                ⏰ Support Hours: Mon-Sat, 9 AM - 6 PM
              </p>
            </div>
          </div>
          
          <div className="flex justify-end gap-2">
            <Button
              variant="outline"
              onClick={() => {
                setSupportOpen(false);
                setSupportQuery("");
              }}
              data-testid="button-cancel-support"
            >
              Cancel
            </Button>
            <Button 
              onClick={() => {
                if (!supportQuery.trim()) {
                  toast({
                    title: "Query Required",
                    description: "Please enter your query before submitting.",
                    variant: "destructive",
                  });
                  return;
                }
                
                toast({
                  title: "Query Submitted!",
                  description: "We've received your query and will get back to you within 24 hours.",
                });
                setSupportOpen(false);
                setSupportQuery("");
              }}
              data-testid="button-submit-support"
            >
              Submit Query
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Floating Support Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <Button
          size="lg"
          className="rounded-full shadow-lg gap-2 h-14 px-6"
          onClick={() => setSupportOpen(true)}
          data-testid="button-floating-support"
        >
          <MessageCircle className="w-5 h-5" />
          Reach Out to Us
        </Button>
      </div>
    </div>
  );
}
