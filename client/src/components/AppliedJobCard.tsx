import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, Clock, Briefcase } from "lucide-react";

export type ApplicationStatus = "under_review" | "rejected" | "interview_scheduled" | "selected";

export interface AppliedJob {
  id: string;
  restaurantName: string;
  role: string;
  payRate: string;
  shiftTiming: string;
  location: string;
  status: ApplicationStatus;
  interviewDate?: string;
  logo?: string;
}

interface AppliedJobCardProps {
  job: AppliedJob;
}

const STATUS_CONFIG = {
  under_review: {
    label: "Under Review",
    variant: "default" as const,
    className: "bg-yellow-500/10 text-yellow-700 dark:text-yellow-400 border-yellow-500/20",
    icon: "🕓",
  },
  rejected: {
    label: "Rejected",
    variant: "destructive" as const,
    className: "bg-red-500/10 text-red-700 dark:text-red-400 border-red-500/20",
    icon: "❌",
  },
  interview_scheduled: {
    label: "Interview Scheduled",
    variant: "default" as const,
    className: "bg-blue-500/10 text-blue-700 dark:text-blue-400 border-blue-500/20",
    icon: "📅",
  },
  selected: {
    label: "Selected",
    variant: "default" as const,
    className: "bg-green-500/10 text-green-700 dark:text-green-400 border-green-500/20",
    icon: "✅",
  },
};

export default function AppliedJobCard({ job }: AppliedJobCardProps) {
  const statusConfig = STATUS_CONFIG[job.status];
  
  return (
    <Card 
      className="p-6 border-l-4" 
      style={{
        borderLeftColor: job.status === "under_review" ? "#eab308" :
                         job.status === "rejected" ? "#ef4444" :
                         job.status === "interview_scheduled" ? "#3b82f6" :
                         "#22c55e"
      }}
      data-testid={`applied-job-card-${job.id}`}
    >
      <div className="flex items-start gap-4">
        <div className="w-14 h-14 bg-muted rounded-lg flex items-center justify-center flex-shrink-0">
          {job.logo ? (
            <img src={job.logo} alt={job.restaurantName} className="w-full h-full object-cover rounded-lg" />
          ) : (
            <span className="text-2xl font-bold text-muted-foreground">
              {job.restaurantName.charAt(0)}
            </span>
          )}
        </div>

        <div className="flex-1">
          <h3 className="text-lg font-semibold mb-1">{job.restaurantName}</h3>
          <div className="space-y-2 text-sm text-muted-foreground mb-4">
            <div className="flex items-center gap-2">
              <Briefcase className="w-4 h-4" />
              <span className="font-medium text-foreground">Role: {job.role}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-lg font-semibold text-primary">{job.payRate}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              <span>Shift: {job.shiftTiming}</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4" />
              <span>{job.location}</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-muted-foreground">Status:</span>
            <Badge 
              className={statusConfig.className}
              data-testid={`badge-status-${job.id}`}
            >
              <span className="mr-1">{statusConfig.icon}</span>
              {job.status === "interview_scheduled" && job.interviewDate
                ? `${statusConfig.label} - ${job.interviewDate}`
                : statusConfig.label}
            </Badge>
          </div>
        </div>
      </div>
    </Card>
  );
}
