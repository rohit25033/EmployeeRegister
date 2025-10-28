import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, FormDescription } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { User, Phone, Mail, Lock, Globe, MapPin } from "lucide-react";
import { useState } from "react";

const step1Schema = z.object({
  fullName: z.string().min(2, "Full name is required"),
  age: z.number().min(18, "Must be at least 18 years old").max(65, "Must be 65 or younger"),
  gender: z.string().min(1, "Please select your gender"),
  phoneNumber: z.string().regex(/^[6-9]\d{9}$/, "Enter a valid 10-digit phone number"),
  email: z.string().email("Enter a valid email").optional().or(z.literal("")),
  password: z.string().min(6, "Password must be at least 6 characters"),
  confirmPassword: z.string(),
  languagesKnown: z.array(z.string()).min(1, "Select at least one language"),
  region: z.string().min(1, "Region is required"),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
});

type Step1FormData = z.infer<typeof step1Schema>;

interface Step1BasicInfoProps {
  onNext: (data: any) => void;
  initialData?: any;
}

const LANGUAGES = ["English", "Hindi", "Tamil", "Telugu", "Kannada", "Malayalam", "Bengali", "Marathi"];
const REGIONS = ["Mumbai", "Delhi", "Bangalore", "Hyderabad", "Chennai", "Kolkata", "Pune", "Ahmedabad"];

export default function Step1BasicInfo({ onNext, initialData }: Step1BasicInfoProps) {
  const [selectedLanguages, setSelectedLanguages] = useState<string[]>(initialData?.languagesKnown || []);
  const [showOtpDialog, setShowOtpDialog] = useState(false);

  const form = useForm<Step1FormData>({
    resolver: zodResolver(step1Schema),
    defaultValues: {
      fullName: initialData?.fullName || "",
      age: initialData?.age || undefined,
      gender: initialData?.gender || "",
      phoneNumber: initialData?.phoneNumber || "",
      email: initialData?.email || "",
      password: initialData?.password || "",
      confirmPassword: initialData?.password || "",
      languagesKnown: initialData?.languagesKnown || [],
      region: initialData?.region || "",
    },
  });

  const handleLanguageToggle = (language: string) => {
    const newLanguages = selectedLanguages.includes(language)
      ? selectedLanguages.filter((l) => l !== language)
      : [...selectedLanguages, language];
    setSelectedLanguages(newLanguages);
    form.setValue("languagesKnown", newLanguages);
  };

  const handleVerifyPhone = () => {
    const phone = form.getValues("phoneNumber");
    if (phone && /^[6-9]\d{9}$/.test(phone)) {
      setShowOtpDialog(true);
      console.log("Send OTP to:", phone);
    }
  };

  const onSubmit = (data: Step1FormData) => {
    onNext(data);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6" data-testid="form-step1">
        <div className="grid grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="fullName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Full Name</FormLabel>
                <FormControl>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                    <Input 
                      placeholder="Enter your full name" 
                      className="pl-10 h-12" 
                      data-testid="input-fullname"
                      {...field} 
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="age"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Age</FormLabel>
                <FormControl>
                  <Input 
                    type="number" 
                    placeholder="Enter your age" 
                    className="h-12"
                    data-testid="input-age"
                    {...field} 
                    onChange={(e) => field.onChange(e.target.value ? parseInt(e.target.value) : undefined)}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="gender"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Gender</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger className="h-12" data-testid="select-gender">
                    <SelectValue placeholder="Select your gender" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="Male">Male</SelectItem>
                  <SelectItem value="Female">Female</SelectItem>
                  <SelectItem value="Other">Other</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="phoneNumber"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Phone Number</FormLabel>
              <FormControl>
                <div className="flex gap-3">
                  <div className="relative flex-1">
                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                    <Input 
                      placeholder="Enter 10-digit phone number" 
                      className="pl-10 h-12"
                      data-testid="input-phone"
                      {...field} 
                    />
                  </div>
                  <Button 
                    type="button" 
                    variant="outline" 
                    className="h-12"
                    onClick={handleVerifyPhone}
                    data-testid="button-verify-phone"
                  >
                    Verify OTP
                  </Button>
                </div>
              </FormControl>
              <FormDescription>We'll send you a verification code</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        {showOtpDialog && (
          <div className="p-4 bg-muted rounded-lg border" data-testid="otp-placeholder">
            <p className="text-sm text-muted-foreground">OTP verification placeholder - Enter code sent to your phone</p>
            <Input placeholder="Enter 6-digit OTP" className="mt-2 h-12" data-testid="input-otp" />
          </div>
        )}

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email Address (Optional)</FormLabel>
              <FormControl>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <Input 
                    type="email" 
                    placeholder="your.email@example.com" 
                    className="pl-10 h-12"
                    data-testid="input-email"
                    {...field} 
                  />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                    <Input 
                      type="password" 
                      placeholder="Create a password" 
                      className="pl-10 h-12"
                      data-testid="input-password"
                      {...field} 
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Confirm Password</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                    <Input 
                      type="password" 
                      placeholder="Re-enter password" 
                      className="pl-10 h-12"
                      data-testid="input-confirm-password"
                      {...field} 
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="languagesKnown"
          render={() => (
            <FormItem>
              <FormLabel>Languages Known</FormLabel>
              <FormControl>
                <div className="flex flex-wrap gap-2">
                  {LANGUAGES.map((language) => (
                    <Button
                      key={language}
                      type="button"
                      variant={selectedLanguages.includes(language) ? "default" : "outline"}
                      className="h-10"
                      onClick={() => handleLanguageToggle(language)}
                      data-testid={`button-language-${language.toLowerCase()}`}
                    >
                      <Globe className="w-4 h-4 mr-2" />
                      {language}
                    </Button>
                  ))}
                </div>
              </FormControl>
              <FormDescription>Select all languages you can speak</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="region"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Region / City</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger className="h-12" data-testid="select-region">
                    <SelectValue placeholder="Select your city" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {REGIONS.map((region) => (
                    <SelectItem key={region} value={region}>{region}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex justify-end pt-6">
          <Button type="submit" className="h-12 px-8" data-testid="button-next-step1">
            Next
          </Button>
        </div>
      </form>
    </Form>
  );
}
