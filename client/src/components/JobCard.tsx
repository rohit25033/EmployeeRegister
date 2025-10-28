import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { MapPin, Clock, Briefcase } from "lucide-react";

export interface Job {
  id: string;
  restaurantName: string;
  role: string;
  payRate: string;
  shiftTiming: string;
  location: string;
  logo?: string;
}

interface JobCardProps {
  job: Job;
  onApply: (jobId: string) => void;
  isApplied?: boolean;
}

export default function JobCard({ job, onApply, isApplied = false }: JobCardProps) {
  return (
    <Card className="p-6 hover-elevate" data-testid={`job-card-${job.id}`}>
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

          <Button 
            className="w-full h-11"
            onClick={() => onApply(job.id)}
            disabled={isApplied}
            variant={isApplied ? "secondary" : "default"}
            data-testid={`button-apply-${job.id}`}
          >
            {isApplied ? "Applied" : "Apply Now"}
          </Button>
        </div>
      </div>
    </Card>
  );
}
