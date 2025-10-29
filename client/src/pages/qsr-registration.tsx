import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import { 
  Store, 
  FileText, 
  Upload, 
  CheckCircle2, 
  Building2, 
  User, 
  Mail, 
  Phone, 
  MapPin,
  Shield,
  ArrowLeft
} from "lucide-react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";

// QSR Registration Schema - Simplified
const qsrFormSchema = z.object({
  phoneNumber: z.string().min(10, "Phone number is required"),
  restaurantBrandName: z.string().min(1, "Restaurant/Brand name is required"),
  pocFullName: z.string().min(1, "POC name is required"),
  pocEmail: z.string().email("Valid email is required"),
  contactNumber: z.string().min(10, "Contact number is required"),
  restaurantAddress: z.string().min(1, "Address is required"),
  city: z.string().min(1, "City is required"),
  state: z.string().min(1, "State is required"),
  pincode: z.string().min(6, "Valid pincode is required"),
  fssaiLicense: z.string().min(14, "Valid FSSAI license is required"),
  gstNumber: z.string().min(15, "Valid GST number is required"),
  panNumber: z.string().min(10, "Valid PAN is required"),
  detailsAccuracyConfirmed: z.literal(1, { errorMap: () => ({ message: "Please confirm accuracy" }) }),
  verificationConsent: z.literal(1, { errorMap: () => ({ message: "Please provide consent" }) }),
});

// Franchisee Registration Schema
const franchiseeFormSchema = z.object({
  phoneNumber: z.string().min(10, "Phone number is required"),
  franchiseeBusinessName: z.string().min(1, "Business name is required"),
  registeredCompanyName: z.string().min(1, "Registered company name is required"),
  pocFullName: z.string().min(1, "POC name is required"),
  pocEmail: z.string().email("Valid email is required"),
  contactNumber: z.string().min(10, "Contact number is required"),
  businessAddress: z.string().min(1, "Address is required"),
  city: z.string().min(1, "City is required"),
  state: z.string().min(1, "State is required"),
  pincode: z.string().min(6, "Valid pincode is required"),
});

type QSRFormData = z.infer<typeof qsrFormSchema>;
type FranchiseeFormData = z.infer<typeof franchiseeFormSchema>;

export default function QSRRegistrationPage() {
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState<"qsr" | "franchisee">("qsr");
  const [phoneNumber, setPhoneNumber] = useState("");

  // Get phone number from URL params
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const phone = params.get("phone");
    if (phone) {
      setPhoneNumber(phone);
    }
  }, []);

  // QSR Form
  const qsrForm = useForm<QSRFormData>({
    resolver: zodResolver(qsrFormSchema),
    defaultValues: {
      phoneNumber: phoneNumber,
      restaurantBrandName: "",
      pocFullName: "",
      pocEmail: "",
      contactNumber: phoneNumber,
      restaurantAddress: "",
      city: "",
      state: "",
      pincode: "",
      fssaiLicense: "",
      gstNumber: "",
      panNumber: "",
    },
  });

  // Franchisee Form
  const franchiseeForm = useForm<FranchiseeFormData>({
    resolver: zodResolver(franchiseeFormSchema),
    defaultValues: {
      phoneNumber: phoneNumber,
      franchiseeBusinessName: "",
      registeredCompanyName: "",
      pocFullName: "",
      pocEmail: "",
      contactNumber: phoneNumber,
      businessAddress: "",
      city: "",
      state: "",
      pincode: "",
    },
  });

  // Update phone numbers when they change
  useEffect(() => {
    if (phoneNumber) {
      qsrForm.setValue("phoneNumber", phoneNumber);
      qsrForm.setValue("contactNumber", phoneNumber);
      franchiseeForm.setValue("phoneNumber", phoneNumber);
      franchiseeForm.setValue("contactNumber", phoneNumber);
    }
  }, [phoneNumber, qsrForm, franchiseeForm]);

  const onQSRSubmit = async (data: QSRFormData) => {
    console.log("QSR Registration Data:", data);
    
    // Store business info for dashboard
    localStorage.setItem("qsrBusinessInfo", JSON.stringify({
      businessName: data.restaurantBrandName,
      registeredName: data.restaurantBrandName,
      pocName: data.pocFullName,
      pocEmail: data.pocEmail,
      contactNumber: data.contactNumber,
      address: data.restaurantAddress,
      city: data.city,
      state: data.state,
      pincode: data.pincode,
      fssaiLicense: data.fssaiLicense,
      gstNumber: data.gstNumber,
      panNumber: data.panNumber,
      accountType: "QSR Unit"
    }));
    
    toast({
      title: "Registration Successful!",
      description: "Taking you to your dashboard...",
    });
    // TODO: Send to backend
    setTimeout(() => {
      setLocation("/qsr-dashboard");
    }, 1500);
  };

  const onFranchiseeSubmit = async (data: FranchiseeFormData) => {
    console.log("Franchisee Registration Data:", data);
    
    // Store business info for dashboard
    localStorage.setItem("qsrBusinessInfo", JSON.stringify({
      businessName: data.franchiseeBusinessName,
      registeredName: data.registeredCompanyName,
      pocName: data.pocFullName,
      pocEmail: data.pocEmail,
      contactNumber: data.contactNumber,
      address: data.businessAddress,
      city: data.city,
      state: data.state,
      pincode: data.pincode,
      accountType: "Franchisee Owner"
    }));
    
    toast({
      title: "Registration Successful!",
      description: "Taking you to your dashboard...",
    });
    // TODO: Send to backend
    setTimeout(() => {
      setLocation("/qsr-dashboard");
    }, 1500);
  };

  const handleFileUpload = (fieldName: keyof QSRFormData, files: FileList | null) => {
    if (!files || files.length === 0) return;
    
    const file = files[0];
    // Simulate file upload (will be replaced with actual upload logic)
    const mockUrl = `uploaded/${file.name}`;
    qsrForm.setValue(fieldName, mockUrl);
    
    toast({
      title: "File Uploaded",
      description: `${file.name} has been uploaded successfully`,
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20 py-8 px-4">
      <div className="container mx-auto max-w-4xl">
        {/* Back Button */}
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setLocation("/qsr-register")}
          className="mb-4 gap-2"
          data-testid="button-back"
        >
          <ArrowLeft className="w-4 h-4" />
          Back
        </Button>

        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
              <Building2 className="w-8 h-8 text-primary" />
            </div>
          </div>
          <h1 className="text-3xl font-bold mb-2" data-testid="text-page-heading">
            Business Account Registration
          </h1>
          <p className="text-muted-foreground" data-testid="text-page-description">
            Complete your registration to join the QSRConnect platform
          </p>
        </div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as "qsr" | "franchisee")} data-testid="tabs-registration-type">
          <TabsList className="grid w-full grid-cols-2 mb-8">
            <TabsTrigger value="qsr" data-testid="tab-qsr">
              <Store className="w-4 h-4 mr-2" />
              QSR Registration
            </TabsTrigger>
            <TabsTrigger value="franchisee" data-testid="tab-franchisee">
              <Building2 className="w-4 h-4 mr-2" />
              Franchisee Owner
            </TabsTrigger>
          </TabsList>

          {/* QSR Registration Tab */}
          <TabsContent value="qsr" className="space-y-6">
            <Form {...qsrForm}>
              <form onSubmit={qsrForm.handleSubmit(onQSRSubmit)} className="space-y-8">
                {/* Section 1: Basic Information */}
                <Card data-testid="section-basic-info">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <User className="w-5 h-5" />
                      Section 1: Basic Information
                    </CardTitle>
                    <CardDescription>
                      Provide your restaurant's primary details
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormField
                        control={qsrForm.control}
                        name="restaurantBrandName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Restaurant / Brand Name *</FormLabel>
                            <FormControl>
                              <Input placeholder="e.g., McDonald's India" {...field} data-testid="input-restaurant-brand-name" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormField
                        control={qsrForm.control}
                        name="pocFullName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>POC (Point of Contact) Full Name *</FormLabel>
                            <FormControl>
                              <Input placeholder="Full name" {...field} data-testid="input-poc-full-name" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={qsrForm.control}
                        name="pocEmail"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>POC Email ID *</FormLabel>
                            <FormControl>
                              <Input type="email" placeholder="email@example.com" {...field} data-testid="input-poc-email" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <FormField
                      control={qsrForm.control}
                      name="contactNumber"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Contact Number *</FormLabel>
                          <FormControl>
                            <Input 
                              type="tel" 
                              placeholder="10-digit number" 
                              {...field} 
                              readOnly
                              className="bg-muted"
                              data-testid="input-contact-number"
                            />
                          </FormControl>
                          <FormDescription>Auto-filled from OTP verification</FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={qsrForm.control}
                      name="restaurantAddress"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Restaurant Address *</FormLabel>
                          <FormControl>
                            <Input placeholder="Full address" {...field} data-testid="input-restaurant-address" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <FormField
                        control={qsrForm.control}
                        name="city"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>City *</FormLabel>
                            <FormControl>
                              <Input placeholder="City" {...field} data-testid="input-city" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={qsrForm.control}
                        name="state"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>State *</FormLabel>
                            <FormControl>
                              <Input placeholder="State" {...field} data-testid="input-state" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={qsrForm.control}
                        name="pincode"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Pincode *</FormLabel>
                            <FormControl>
                              <Input placeholder="6-digit pincode" {...field} data-testid="input-pincode" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </CardContent>
                </Card>

                {/* Section 2: Business Details */}
                <Card data-testid="section-business-details">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <FileText className="w-5 h-5" />
                      Section 2: Business Details
                    </CardTitle>
                    <CardDescription>
                      Enter your business registration and compliance details
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormField
                        control={qsrForm.control}
                        name="fssaiLicense"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>FSSAI License Number *</FormLabel>
                            <FormControl>
                              <Input placeholder="14-digit FSSAI number" {...field} data-testid="input-fssai-license" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={qsrForm.control}
                        name="gstNumber"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>GST Number *</FormLabel>
                            <FormControl>
                              <Input placeholder="15-character GST number" {...field} data-testid="input-gst-number" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormField
                        control={qsrForm.control}
                        name="panNumber"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>PAN (Business/Owner) *</FormLabel>
                            <FormControl>
                              <Input placeholder="10-character PAN" {...field} data-testid="input-pan-number" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </CardContent>
                </Card>

                {/* Section 3: Agreement & Consent */}
                <Card data-testid="section-agreement-consent">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Shield className="w-5 h-5" />
                      Section 3: Agreement & Consent
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <FormField
                      control={qsrForm.control}
                      name="detailsAccuracyConfirmed"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                          <FormControl>
                            <Checkbox
                              checked={field.value === 1}
                              onCheckedChange={(checked) => field.onChange(checked ? 1 : 0)}
                              data-testid="checkbox-details-accuracy"
                            />
                          </FormControl>
                          <div className="space-y-1 leading-none">
                            <FormLabel>
                              I confirm that all provided details are accurate and verifiable. *
                            </FormLabel>
                          </div>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={qsrForm.control}
                      name="verificationConsent"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                          <FormControl>
                            <Checkbox
                              checked={field.value === 1}
                              onCheckedChange={(checked) => field.onChange(checked ? 1 : 0)}
                              data-testid="checkbox-verification-consent"
                            />
                          </FormControl>
                          <div className="space-y-1 leading-none">
                            <FormLabel>
                              I authorize Rozagaar Hub to verify the provided information. *
                            </FormLabel>
                          </div>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <Button
                      type="submit"
                      className="w-full mt-6"
                      size="lg"
                      data-testid="button-submit-registration"
                    >
                      <CheckCircle2 className="w-4 h-4 mr-2" />
                      Complete Registration
                    </Button>
                  </CardContent>
                </Card>
              </form>
            </Form>
          </TabsContent>

          {/* Franchisee Registration Tab */}
          <TabsContent value="franchisee" className="space-y-6">
            <Form {...franchiseeForm}>
              <form onSubmit={franchiseeForm.handleSubmit(onFranchiseeSubmit)} className="space-y-8">
                <Card data-testid="section-franchisee-basic-info">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Building2 className="w-5 h-5" />
                      Franchisee Owner Information
                    </CardTitle>
                    <CardDescription>
                      Provide your franchisee business details
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormField
                        control={franchiseeForm.control}
                        name="franchiseeBusinessName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Franchisee Business Name *</FormLabel>
                            <FormControl>
                              <Input placeholder="Business name" {...field} data-testid="input-franchisee-business-name" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={franchiseeForm.control}
                        name="registeredCompanyName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Registered Company Name *</FormLabel>
                            <FormControl>
                              <Input placeholder="Legal company name" {...field} data-testid="input-registered-company-name" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormField
                        control={franchiseeForm.control}
                        name="pocFullName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>POC Full Name *</FormLabel>
                            <FormControl>
                              <Input placeholder="Full name" {...field} data-testid="input-franchisee-poc-full-name" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={franchiseeForm.control}
                        name="pocEmail"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>POC Email ID *</FormLabel>
                            <FormControl>
                              <Input type="email" placeholder="email@example.com" {...field} data-testid="input-franchisee-poc-email" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <FormField
                      control={franchiseeForm.control}
                      name="contactNumber"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Contact Number *</FormLabel>
                          <FormControl>
                            <Input 
                              type="tel" 
                              placeholder="10-digit number" 
                              {...field} 
                              readOnly
                              className="bg-muted"
                              data-testid="input-franchisee-contact-number"
                            />
                          </FormControl>
                          <FormDescription>Auto-filled from OTP verification</FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={franchiseeForm.control}
                      name="businessAddress"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Business Address *</FormLabel>
                          <FormControl>
                            <Input placeholder="Full address" {...field} data-testid="input-franchisee-business-address" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <FormField
                        control={franchiseeForm.control}
                        name="city"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>City *</FormLabel>
                            <FormControl>
                              <Input placeholder="City" {...field} data-testid="input-franchisee-city" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={franchiseeForm.control}
                        name="state"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>State *</FormLabel>
                            <FormControl>
                              <Input placeholder="State" {...field} data-testid="input-franchisee-state" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={franchiseeForm.control}
                        name="pincode"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Pincode *</FormLabel>
                            <FormControl>
                              <Input placeholder="6-digit pincode" {...field} data-testid="input-franchisee-pincode" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <div className="pt-6 border-t">
                      <p className="text-sm text-muted-foreground mb-4">
                        <span className="font-medium">Note:</span> Additional business details and document verification will be requested after initial registration.
                      </p>
                    </div>
                  </CardContent>
                </Card>

                {/* Submit Button */}
                <div className="flex justify-end">
                  <Button 
                    type="submit" 
                    size="lg" 
                    className="gap-2"
                    data-testid="button-submit-franchisee"
                  >
                    <CheckCircle2 className="w-5 h-5" />
                    Submit Registration
                  </Button>
                </div>
              </form>
            </Form>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
