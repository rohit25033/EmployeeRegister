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
  },
  {
    id: "2",
    name: "Sneha Rao",
    role: "Kitchen Staff",
    location: "McD Koramangala",
    appliedTime: "1 day ago",
    experience: "3 years in food preparation",
    skills: ["Food Prep", "Hygiene Standards"],
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
  },
  {
    id: "2",
    name: "Priya Sharma",
    email: "priya@example.com",
    phone: "9876543211",
    experience: "1 year in hospitality",
    skills: ["Customer Service", "Team Work"],
    location: "Bangalore",
  },
  {
    id: "3",
    name: "Amit Kumar",
    email: "amit@example.com",
    phone: "9876543212",
    experience: "3 years in food service",
    skills: ["Customer Service", "Food Safety", "POS Systems"],
    location: "Bangalore",
  },
];

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
  const [activeTab, setActiveTab] = useState<"listings" | "profile">("listings");
  const [postJobOpen, setPostJobOpen] = useState(false);
  const [viewApplicantsOpen, setViewApplicantsOpen] = useState(false);
  const [scheduleCallOpen, setScheduleCallOpen] = useState(false);
  const [selectedJob, setSelectedJob] = useState<typeof mockJobs[0] | null>(null);
  const [selectedApplicant, setSelectedApplicant] = useState<typeof mockApplicants[0] | null>(null);
  const [scheduledDate, setScheduledDate] = useState("");
  const [scheduledTime, setScheduledTime] = useState("");
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
            <Card data-testid="section-recent-updates">
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
                        <p className="font-medium" data-testid={`text-applicant-name-${applicant.id}`}>
                          {applicant.name} applied for {applicant.role} - {applicant.location}
                        </p>
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
                        <SelectItem value="Waiter">Waiter</SelectItem>
                        <SelectItem value="Cashier">Cashier</SelectItem>
                        <SelectItem value="Kitchen Staff">Kitchen Staff</SelectItem>
                        <SelectItem value="Cleaner">Cleaner</SelectItem>
                        <SelectItem value="Delivery Executive">Delivery Executive</SelectItem>
                        <SelectItem value="Manager">Manager</SelectItem>
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
                        <h4 className="font-semibold" data-testid={`text-applicant-detail-name-${applicant.id}`}>
                          {applicant.name}
                        </h4>
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
    </div>
  );
}
