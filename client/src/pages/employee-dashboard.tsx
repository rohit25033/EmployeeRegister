import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
  Calendar as CalendarIcon,
  Clock,
  FileText,
  Receipt,
  Briefcase,
  MapPin,
  IndianRupee,
  TrendingUp,
  CheckCircle2,
  Gift,
} from "lucide-react";
import type { AppliedJob } from "@/components/AppliedJobCard";

interface EmployeeDashboardProps {
  selectedJob: AppliedJob;
}

export default function EmployeeDashboard({ selectedJob }: EmployeeDashboardProps) {
  const [activeTab, setActiveTab] = useState("calendar");

  const attendanceData = {
    daysWorked: 24,
    daysAbsent: 2,
    totalDays: 26,
    percentage: 92.3,
  };

  const milestones = [
    {
      id: 1,
      title: "Onboarding",
      date: "Completed",
      status: "completed",
      icon: <CheckCircle2 className="w-6 h-6" />,
    },
    {
      id: 2,
      title: "6 Months",
      date: "Target: May 2026",
      status: "upcoming",
      icon: <Gift className="w-6 h-6" />,
      reward: "₹1,000 Amazon voucher",
    },
    {
      id: 3,
      title: "1 Year",
      date: "Target: Nov 2026",
      status: "future",
      icon: <TrendingUp className="w-6 h-6" />,
    },
    {
      id: 4,
      title: "2 Years",
      date: "Target: Nov 2027",
      status: "future",
      icon: <TrendingUp className="w-6 h-6" />,
    },
  ];

  const attendanceDays = [
    { day: 1, status: "present" },
    { day: 2, status: "present" },
    { day: 3, status: "present" },
    { day: 4, status: "present" },
    { day: 5, status: "absent" },
    { day: 6, status: "present" },
    { day: 7, status: "present" },
    { day: 8, status: "present" },
    { day: 9, status: "present" },
    { day: 10, status: "present" },
    { day: 11, status: "present" },
    { day: 12, status: "absent" },
    { day: 13, status: "present" },
    { day: 14, status: "present" },
    { day: 15, status: "present" },
    { day: 16, status: "present" },
    { day: 17, status: "present" },
    { day: 18, status: "present" },
    { day: 19, status: "present" },
    { day: 20, status: "present" },
    { day: 21, status: "present" },
    { day: 22, status: "present" },
    { day: 23, status: "present" },
    { day: 24, status: "present" },
    { day: 25, status: "present" },
    { day: 26, status: "present" },
  ];

  return (
    <div className="min-h-screen bg-background py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Employee Dashboard</h1>
          <p className="text-muted-foreground">
            Welcome back! Manage your work schedule, attendance, and documents.
          </p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="w-full grid grid-cols-4 max-w-2xl mb-8" data-testid="dashboard-tabs">
            <TabsTrigger value="calendar" data-testid="tab-calendar">
              <CalendarIcon className="w-4 h-4 mr-2" />
              Calendar
            </TabsTrigger>
            <TabsTrigger value="attendance" data-testid="tab-attendance">
              <Clock className="w-4 h-4 mr-2" />
              Attendance
            </TabsTrigger>
            <TabsTrigger value="documents" data-testid="tab-documents">
              <FileText className="w-4 h-4 mr-2" />
              Documents
            </TabsTrigger>
            <TabsTrigger value="payslips" data-testid="tab-payslips">
              <Receipt className="w-4 h-4 mr-2" />
              Payslips
            </TabsTrigger>
          </TabsList>

          <div className="grid grid-cols-12 gap-6">
            <div className="col-span-8">
              <TabsContent value="calendar" className="mt-0">
                <Card className="p-6 mb-6">
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <h3 className="text-2xl font-bold">{attendanceData.daysWorked} Days Worked</h3>
                      <p className="text-muted-foreground mt-1">
                        Keep up the good work! Consistent attendance leads to bonuses.
                      </p>
                    </div>
                    <div className="text-right">
                      <div className="text-3xl font-bold text-primary">{attendanceData.percentage}%</div>
                      <p className="text-sm text-muted-foreground">Attendance</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-7 gap-2">
                    {attendanceDays.map((day) => (
                      <div
                        key={day.day}
                        className={`aspect-square rounded-lg flex items-center justify-center text-sm font-medium ${
                          day.status === "present"
                            ? "bg-green-500/10 text-green-700 dark:text-green-400 border border-green-500/20"
                            : "bg-red-500/10 text-red-700 dark:text-red-400 border border-red-500/20"
                        }`}
                        data-testid={`day-${day.day}`}
                      >
                        {day.status === "present" ? "✅" : "❌"}
                      </div>
                    ))}
                  </div>
                </Card>

                <Card className="p-6">
                  <h3 className="text-xl font-semibold mb-6">Your Milestones</h3>
                  <div className="space-y-4">
                    {milestones.map((milestone, index) => (
                      <div key={milestone.id} className="relative">
                        <div
                          className={`flex items-start gap-4 p-4 rounded-lg border-2 ${
                            milestone.status === "completed"
                              ? "bg-green-500/5 border-green-500/20"
                              : milestone.status === "upcoming"
                              ? "bg-blue-500/5 border-blue-500/20"
                              : "bg-muted/30 border-muted"
                          }`}
                          data-testid={`milestone-${milestone.title.toLowerCase().replace(" ", "-")}`}
                        >
                          <div
                            className={`w-12 h-12 rounded-full flex items-center justify-center ${
                              milestone.status === "completed"
                                ? "bg-green-500/10 text-green-700 dark:text-green-400"
                                : milestone.status === "upcoming"
                                ? "bg-blue-500/10 text-blue-700 dark:text-blue-400"
                                : "bg-muted text-muted-foreground"
                            }`}
                          >
                            {milestone.icon}
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center justify-between">
                              <h4 className="font-semibold text-lg">{milestone.title}</h4>
                              {milestone.status === "completed" && (
                                <Badge className="bg-green-500/10 text-green-700 dark:text-green-400 border-green-500/20">
                                  Completed
                                </Badge>
                              )}
                            </div>
                            <p className="text-sm text-muted-foreground mt-1">{milestone.date}</p>
                            {milestone.reward && (
                              <div className="mt-3 p-3 bg-primary/5 border border-primary/20 rounded-lg">
                                <div className="flex items-center gap-2 text-primary font-medium">
                                  <Gift className="w-4 h-4" />
                                  <span className="text-sm">Milestone Reward</span>
                                </div>
                                <p className="text-sm mt-1">
                                  You'll receive a <span className="font-semibold">{milestone.reward}</span> when you
                                  complete 6 months!
                                </p>
                              </div>
                            )}
                          </div>
                        </div>
                        {index < milestones.length - 1 && (
                          <div className="absolute left-6 top-full w-0.5 h-4 bg-muted-foreground/20" />
                        )}
                      </div>
                    ))}
                  </div>
                </Card>
              </TabsContent>

              <TabsContent value="attendance" className="mt-0">
                <Card className="p-6">
                  <h3 className="text-xl font-semibold mb-6">Attendance Summary</h3>
                  <div className="grid grid-cols-3 gap-6 mb-8">
                    <div className="text-center p-6 bg-green-500/5 border border-green-500/20 rounded-lg">
                      <div className="text-4xl font-bold text-green-700 dark:text-green-400">
                        {attendanceData.daysWorked}
                      </div>
                      <p className="text-sm text-muted-foreground mt-2">Days Worked</p>
                    </div>
                    <div className="text-center p-6 bg-red-500/5 border border-red-500/20 rounded-lg">
                      <div className="text-4xl font-bold text-red-700 dark:text-red-400">
                        {attendanceData.daysAbsent}
                      </div>
                      <p className="text-sm text-muted-foreground mt-2">Days Absent</p>
                    </div>
                    <div className="text-center p-6 bg-primary/5 border border-primary/20 rounded-lg">
                      <div className="text-4xl font-bold text-primary">{attendanceData.percentage}%</div>
                      <p className="text-sm text-muted-foreground mt-2">Attendance Rate</p>
                    </div>
                  </div>

                  <div className="mb-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium">Overall Progress</span>
                      <span className="text-sm text-muted-foreground">
                        {attendanceData.daysWorked}/{attendanceData.totalDays} days
                      </span>
                    </div>
                    <Progress value={attendanceData.percentage} className="h-3" />
                  </div>

                  <div className="p-4 bg-muted/30 rounded-lg border">
                    <p className="text-sm text-muted-foreground">
                      💡 <span className="font-medium">Tip:</span> Maintain 95%+ attendance to qualify for bonus
                      rewards and priority job opportunities!
                    </p>
                  </div>
                </Card>
              </TabsContent>

              <TabsContent value="documents" className="mt-0">
                <Card className="p-6">
                  <h3 className="text-xl font-semibold mb-6">My Documents</h3>
                  <div className="space-y-4">
                    {[
                      { name: "Aadhaar Card", status: "Verified", uploaded: true },
                      { name: "PAN Card", status: "Optional", uploaded: false },
                      { name: "ID Proof", status: "Verified", uploaded: true },
                      { name: "Offer Letter", status: "Available", uploaded: true },
                      { name: "Employment Contract", status: "Signed", uploaded: true },
                    ].map((doc, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between p-4 border rounded-lg hover-elevate"
                        data-testid={`document-${doc.name.toLowerCase().replace(" ", "-")}`}
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                            <FileText className="w-5 h-5 text-primary" />
                          </div>
                          <div>
                            <p className="font-medium">{doc.name}</p>
                            <p className="text-sm text-muted-foreground">{doc.status}</p>
                          </div>
                        </div>
                        <Button
                          variant={doc.uploaded ? "outline" : "default"}
                          size="sm"
                          data-testid={`button-${doc.uploaded ? "view" : "upload"}-${doc.name.toLowerCase().replace(" ", "-")}`}
                        >
                          {doc.uploaded ? "View" : "Upload"}
                        </Button>
                      </div>
                    ))}
                  </div>
                </Card>
              </TabsContent>

              <TabsContent value="payslips" className="mt-0">
                <Card className="p-6">
                  <h3 className="text-xl font-semibold mb-6">Monthly Payslips</h3>
                  <div className="space-y-3">
                    {[
                      { month: "October 2025", amount: "₹12,000", status: "Paid" },
                      { month: "September 2025", amount: "₹12,000", status: "Paid" },
                      { month: "August 2025", amount: "₹12,000", status: "Paid" },
                      { month: "July 2025", amount: "₹12,000", status: "Paid" },
                    ].map((payslip, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between p-4 border rounded-lg hover-elevate"
                        data-testid={`payslip-${payslip.month.toLowerCase().replace(" ", "-")}`}
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-lg bg-green-500/10 flex items-center justify-center">
                            <Receipt className="w-5 h-5 text-green-700 dark:text-green-400" />
                          </div>
                          <div>
                            <p className="font-medium">{payslip.month}</p>
                            <p className="text-sm text-muted-foreground">
                              {payslip.amount} · {payslip.status}
                            </p>
                          </div>
                        </div>
                        <Button variant="outline" size="sm" data-testid={`button-download-${payslip.month.toLowerCase().replace(" ", "-")}`}>
                          Download
                        </Button>
                      </div>
                    ))}
                  </div>
                </Card>
              </TabsContent>
            </div>

            <div className="col-span-4">
              <Card className="p-6 sticky top-4">
                <h3 className="text-lg font-semibold mb-4">Job Summary</h3>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Briefcase className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Current Role</p>
                      <p className="font-semibold">{selectedJob.role}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <MapPin className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Employer</p>
                      <p className="font-semibold">{selectedJob.restaurantName}</p>
                      <p className="text-sm text-muted-foreground mt-1">{selectedJob.location}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <IndianRupee className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Pay Rate</p>
                      <p className="font-semibold">{selectedJob.payRate}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Clock className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Shift Timing</p>
                      <p className="font-semibold">{selectedJob.shiftTiming}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <CalendarIcon className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Joining Date</p>
                      <p className="font-semibold">28 Oct 2025</p>
                    </div>
                  </div>
                </div>

                <div className="mt-6 p-4 bg-green-500/5 border border-green-500/20 rounded-lg">
                  <Badge className="bg-green-500/10 text-green-700 dark:text-green-400 border-green-500/20 mb-2">
                    ✅ Selected
                  </Badge>
                  <p className="text-sm text-muted-foreground">
                    Congratulations! You've been selected for this position. Keep up the great work!
                  </p>
                </div>
              </Card>
            </div>
          </div>
        </Tabs>
      </div>
    </div>
  );
}
