import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Phone } from "lucide-react";

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
  type: "training" | "certification";
}

export default function ContactModal({ isOpen, onClose, type }: ContactModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md" data-testid="modal-contact">
        <DialogHeader>
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
              <Phone className="w-8 h-8 text-primary" />
            </div>
          </div>
          <DialogTitle className="text-center text-2xl">We'll Get in Touch!</DialogTitle>
          <DialogDescription className="text-center text-base pt-2">
            Our representative will contact you shortly to help you with your{" "}
            <span className="font-semibold text-foreground">
              {type === "training" ? "training" : "certification"}
            </span>{" "}
            process.
            <br />
            <br />
            Verification is optional, but completing it helps you get higher-paying and priority job matches.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="sm:justify-center">
          <Button 
            onClick={onClose} 
            className="w-full h-12"
            data-testid="button-close-modal"
          >
            Okay, Got it
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
