import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, FormDescription } from "@/components/ui/form";
import { CreditCard, Upload } from "lucide-react";
import { useState } from "react";

const step3Schema = z.object({
  aadhaarNumber: z.string().regex(/^\d{4}-\d{4}-\d{4}$/, "Enter Aadhaar in format ####-####-####"),
  panNumber: z.string().optional(),
  idProofUrl: z.string().min(1, "ID proof upload is required"),
  termsAccepted: z.boolean().refine((val) => val === true, "You must accept the terms and conditions"),
});

type Step3FormData = z.infer<typeof step3Schema>;

interface Step3VerificationProps {
  onSubmit: (data: any) => void;
  onBack: () => void;
  initialData?: any;
  isSubmitting?: boolean;
}

export default function Step3Verification({ onSubmit, onBack, initialData, isSubmitting }: Step3VerificationProps) {
  const [idProofFile, setIdProofFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);

  const form = useForm<Step3FormData>({
    resolver: zodResolver(step3Schema),
    defaultValues: {
      aadhaarNumber: initialData?.aadhaarNumber || "",
      panNumber: initialData?.panNumber || "",
      idProofUrl: initialData?.idProofUrl || "",
      termsAccepted: initialData?.termsAccepted || false,
    },
  });

  const formatAadhaar = (value: string) => {
    const numbers = value.replace(/\D/g, "");
    const parts = [];
    for (let i = 0; i < numbers.length && i < 12; i += 4) {
      parts.push(numbers.slice(i, i + 4));
    }
    return parts.join("-");
  };

  const handleAadhaarChange = (e: React.ChangeEvent<HTMLInputElement>, field: any) => {
    const formatted = formatAadhaar(e.target.value);
    field.onChange(formatted);
  };

  const handleIdProofUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setIdProofFile(file);
      setUploading(true);
      setTimeout(() => {
        form.setValue("idProofUrl", `uploaded/${file.name}`);
        setUploading(false);
        console.log("ID proof uploaded:", file.name);
      }, 1000);
    }
  };

  const handleSubmit = (data: Step3FormData) => {
    onSubmit(data);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6" data-testid="form-step3">
        <FormField
          control={form.control}
          name="aadhaarNumber"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Aadhaar Card Number</FormLabel>
              <FormControl>
                <div className="relative">
                  <CreditCard className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <Input
                    placeholder="####-####-####"
                    className="pl-10 h-12 font-mono text-lg tracking-wider"
                    maxLength={14}
                    data-testid="input-aadhaar"
                    {...field}
                    onChange={(e) => handleAadhaarChange(e, field)}
                  />
                </div>
              </FormControl>
              <FormDescription>Enter your 12-digit Aadhaar number</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="panNumber"
          render={({ field }) => (
            <FormItem>
              <FormLabel>PAN Card Number (Optional)</FormLabel>
              <FormControl>
                <div className="relative">
                  <CreditCard className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <Input
                    placeholder="ABCDE1234F"
                    className="pl-10 h-12 uppercase font-mono"
                    maxLength={10}
                    data-testid="input-pan"
                    {...field}
                    onChange={(e) => field.onChange(e.target.value.toUpperCase())}
                  />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="idProofUrl"
          render={() => (
            <FormItem>
              <FormLabel>Upload ID Proof</FormLabel>
              <FormControl>
                <div className="border-2 border-dashed border-border rounded-lg p-8 text-center hover-elevate cursor-pointer">
                  <input
                    type="file"
                    accept=".jpg,.jpeg,.png,.pdf"
                    onChange={handleIdProofUpload}
                    className="hidden"
                    id="id-proof-upload"
                    data-testid="input-id-proof"
                  />
                  <label htmlFor="id-proof-upload" className="cursor-pointer">
                    <Upload className="w-12 h-12 mx-auto text-muted-foreground mb-3" />
                    <p className="text-sm font-medium">
                      {idProofFile ? idProofFile.name : "Click to upload or drag and drop"}
                    </p>
                    <p className="text-xs text-muted-foreground mt-2">
                      Aadhaar card, PAN card, or other government ID (JPEG, PNG, PDF)
                    </p>
                    {uploading && <p className="text-xs text-primary mt-2">Uploading...</p>}
                  </label>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="termsAccepted"
          render={({ field }) => (
            <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-lg border p-6 bg-muted/30">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                  className="mt-1"
                  data-testid="checkbox-terms"
                />
              </FormControl>
              <div className="space-y-1 leading-none">
                <FormLabel className="text-base font-normal cursor-pointer">
                  I agree to the{" "}
                  <a href="#" className="text-primary underline hover-elevate">
                    Terms & Conditions
                  </a>{" "}
                  and consent to data verification
                </FormLabel>
                <FormDescription>
                  Your information will be verified for security purposes
                </FormDescription>
                <FormMessage />
              </div>
            </FormItem>
          )}
        />

        <div className="flex justify-between pt-6">
          <Button 
            type="button" 
            variant="outline" 
            className="h-12 px-8" 
            onClick={onBack}
            disabled={isSubmitting}
            data-testid="button-back-step3"
          >
            Back
          </Button>
          <Button 
            type="submit" 
            className="h-12 px-8" 
            disabled={isSubmitting}
            data-testid="button-submit-registration"
          >
            {isSubmitting ? "Creating Profile..." : "Create My Profile"}
          </Button>
        </div>
      </form>
    </Form>
  );
}
