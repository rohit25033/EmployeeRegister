import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { CheckCircle2 } from "lucide-react";

interface ApplicationModalProps {
  isOpen: boolean;
  onClose: () => void;
  jobTitle?: string;
}

export default function ApplicationModal({ isOpen, onClose, jobTitle }: ApplicationModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md" data-testid="modal-application">
        <DialogHeader>
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
              <CheckCircle2 className="w-8 h-8 text-primary" />
            </div>
          </div>
          <DialogTitle className="text-center text-2xl">Application Received!</DialogTitle>
          <DialogDescription className="text-center text-base pt-2">
            {jobTitle && (
              <>
                Thank you for applying for <span className="font-semibold text-foreground">{jobTitle}</span>.
                <br />
                <br />
              </>
            )}
            Our team will get back to you soon with next steps for this job.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="sm:justify-center">
          <Button 
            onClick={onClose} 
            className="w-full h-12"
            data-testid="button-close-application-modal"
          >
            Okay, Got It
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
