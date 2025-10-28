import { useState } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Phone, Shield, ArrowLeft } from "lucide-react";

export default function QSROTPVerificationPage() {
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const [step, setStep] = useState<"phone" | "otp">("phone");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [otp, setOtp] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSendOTP = async () => {
    if (!phoneNumber || phoneNumber.length !== 10) {
      toast({
        title: "Invalid Phone Number",
        description: "Please enter a valid 10-digit phone number",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    
    // Simulate OTP sending (will be replaced with actual Twilio integration)
    setTimeout(() => {
      setIsLoading(false);
      setStep("otp");
      toast({
        title: "OTP Sent!",
        description: `A 6-digit OTP has been sent to +91 ${phoneNumber}`,
      });
    }, 1500);
  };

  const handleVerifyOTP = async () => {
    if (!otp || otp.length !== 6) {
      toast({
        title: "Invalid OTP",
        description: "Please enter the 6-digit OTP",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    
    // Simulate OTP verification (will be replaced with actual backend verification)
    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: "Verification Successful!",
        description: "Redirecting to registration...",
      });
      // Pass phone number to registration page
      setLocation(`/qsr-registration?phone=${phoneNumber}`);
    }, 1500);
  };

  const handleResendOTP = () => {
    toast({
      title: "OTP Resent",
      description: `A new OTP has been sent to +91 ${phoneNumber}`,
    });
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-background to-muted/20 p-4">
      <div className="w-full max-w-md">
        {/* Back Button */}
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setLocation("/")}
          className="mb-4 gap-2"
          data-testid="button-back-to-landing"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Home
        </Button>

        <Card>
          <CardHeader className="text-center">
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                <Shield className="w-8 h-8 text-primary" />
              </div>
            </div>
            <CardTitle className="text-2xl" data-testid="text-page-title">
              {step === "phone" ? "QSR Account Signup" : "Verify OTP"}
            </CardTitle>
            <CardDescription data-testid="text-page-description">
              {step === "phone" 
                ? "Enter your phone number to receive an OTP" 
                : `We've sent a 6-digit code to +91 ${phoneNumber}`}
            </CardDescription>
          </CardHeader>
          
          <CardContent className="space-y-6">
            {step === "phone" ? (
              <>
                {/* Phone Number Input */}
                <div className="space-y-2">
                  <Label htmlFor="phone" data-testid="label-phone">
                    Phone Number <span className="text-destructive">*</span>
                  </Label>
                  <div className="flex gap-2">
                    <div className="flex items-center justify-center px-3 py-2 border rounded-md bg-muted text-muted-foreground">
                      <Phone className="w-4 h-4 mr-2" />
                      +91
                    </div>
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="10-digit mobile number"
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value.replace(/\D/g, '').slice(0, 10))}
                      maxLength={10}
                      data-testid="input-phone"
                    />
                  </div>
                  <p className="text-sm text-muted-foreground">
                    You will receive a 6-digit OTP for verification
                  </p>
                </div>

                {/* Send OTP Button */}
                <Button
                  onClick={handleSendOTP}
                  disabled={isLoading || phoneNumber.length !== 10}
                  className="w-full"
                  size="lg"
                  data-testid="button-send-otp"
                >
                  {isLoading ? "Sending..." : "Send OTP"}
                </Button>
              </>
            ) : (
              <>
                {/* OTP Input */}
                <div className="space-y-2">
                  <Label htmlFor="otp" data-testid="label-otp">
                    Enter 6-Digit OTP <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="otp"
                    type="text"
                    placeholder="000000"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
                    maxLength={6}
                    className="text-center text-2xl tracking-widest"
                    data-testid="input-otp"
                  />
                  <div className="flex items-center justify-between text-sm">
                    <p className="text-muted-foreground">
                      Didn't receive OTP?
                    </p>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={handleResendOTP}
                      className="p-0 h-auto"
                      data-testid="button-resend-otp"
                    >
                      Resend OTP
                    </Button>
                  </div>
                </div>

                {/* Verify Button */}
                <Button
                  onClick={handleVerifyOTP}
                  disabled={isLoading || otp.length !== 6}
                  className="w-full"
                  size="lg"
                  data-testid="button-verify-otp"
                >
                  {isLoading ? "Verifying..." : "Verify & Continue"}
                </Button>

                {/* Change Number */}
                <Button
                  variant="ghost"
                  onClick={() => {
                    setStep("phone");
                    setOtp("");
                  }}
                  className="w-full"
                  data-testid="button-change-number"
                >
                  Change Phone Number
                </Button>
              </>
            )}
          </CardContent>
        </Card>

        {/* Security Note */}
        <div className="mt-6 text-center text-sm text-muted-foreground">
          <Shield className="w-4 h-4 inline mr-1" />
          Your information is secure and will only be used for verification purposes
        </div>
      </div>
    </div>
  );
}
