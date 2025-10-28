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

// QSR Registration Schema
const qsrFormSchema = z.object({
  phoneNumber: z.string().min(10, "Phone number is required"),
  restaurantBrandName: z.string().min(1, "Restaurant/Brand name is required"),
  registeredBusinessName: z.string().optional(),
  pocFullName: z.string().min(1, "POC name is required"),
  pocEmail: z.string().email("Valid email is required"),
  contactNumber: z.string().min(10, "Contact number is required"),
  restaurantAddress: z.string().min(1, "Address is required"),
  city: z.string().min(1, "City is required"),
  state: z.string().min(1, "State is required"),
  pincode: z.string().min(6, "Valid pincode is required"),
  registrationNumber: z.string().min(1, "Registration number is required"),
  fssaiLicense: z.string().min(14, "Valid FSSAI license is required"),
  gstNumber: z.string().min(15, "Valid GST number is required"),
  panNumber: z.string().min(10, "Valid PAN is required"),
  gstCertificateUrl: z.string().min(1, "GST certificate is required"),
  fssaiCertificateUrl: z.string().min(1, "FSSAI certificate is required"),
  businessRegistrationProofUrl: z.string().min(1, "Business registration proof is required"),
  panCardUrl: z.string().min(1, "PAN card is required"),
  bankAccountProofUrl: z.string().min(1, "Bank account proof is required"),
  fireSafetyCertificateUrl: z.string().optional(),
  municipalNocUrl: z.string().optional(),
  shopExteriorPhotoUrl: z.string().optional(),
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
      registeredBusinessName: "",
      pocFullName: "",
      pocEmail: "",
      contactNumber: phoneNumber,
      restaurantAddress: "",
      city: "",
      state: "",
      pincode: "",
      registrationNumber: "",
      fssaiLicense: "",
      gstNumber: "",
      panNumber: "",
      gstCertificateUrl: "",
      fssaiCertificateUrl: "",
      businessRegistrationProofUrl: "",
      panCardUrl: "",
      bankAccountProofUrl: "",
      fireSafetyCertificateUrl: "",
      municipalNocUrl: "",
      shopExteriorPhotoUrl: "",
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
    toast({
      title: "Registration Submitted!",
      description: "Your QSR registration has been submitted for verification. We'll contact you within 24-48 hours.",
    });
    // TODO: Send to backend
    setTimeout(() => {
      setLocation("/");
    }, 2000);
  };

  const onFranchiseeSubmit = async (data: FranchiseeFormData) => {
    console.log("Franchisee Registration Data:", data);
    toast({
      title: "Registration Submitted!",
      description: "Your franchisee registration has been submitted for verification. We'll contact you within 24-48 hours.",
    });
    // TODO: Send to backend
    setTimeout(() => {
      setLocation("/");
    }, 2000);
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
                      
                      <FormField
                        control={qsrForm.control}
                        name="registeredBusinessName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Registered Business Name</FormLabel>
                            <FormControl>
                              <Input placeholder="If different from brand name" {...field} data-testid="input-registered-business-name" />
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
                        name="registrationNumber"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Restaurant Registration Number *</FormLabel>
                            <FormControl>
                              <Input placeholder="Registration number" {...field} data-testid="input-registration-number" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
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
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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

                {/* Section 3: Document Uploads */}
                <Card data-testid="section-document-uploads">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Upload className="w-5 h-5" />
                      Section 3: Document Uploads
                    </CardTitle>
                    <CardDescription>
                      Upload required business verification documents (PDF, PNG, or JPG)
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {/* Required Documents */}
                    <div className="space-y-4">
                      <h4 className="font-medium text-sm">Required Documents</h4>
                      
                      <FormField
                        control={qsrForm.control}
                        name="gstCertificateUrl"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>GST Certificate *</FormLabel>
                            <FormControl>
                              <Input 
                                type="file" 
                                accept=".pdf,.png,.jpg,.jpeg"
                                onChange={(e) => handleFileUpload("gstCertificateUrl", e.target.files)}
                                data-testid="input-gst-certificate"
                              />
                            </FormControl>
                            {field.value && <p className="text-sm text-green-600">✓ File uploaded</p>}
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={qsrForm.control}
                        name="fssaiCertificateUrl"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>FSSAI Certificate *</FormLabel>
                            <FormControl>
                              <Input 
                                type="file" 
                                accept=".pdf,.png,.jpg,.jpeg"
                                onChange={(e) => handleFileUpload("fssaiCertificateUrl", e.target.files)}
                                data-testid="input-fssai-certificate"
                              />
                            </FormControl>
                            {field.value && <p className="text-sm text-green-600">✓ File uploaded</p>}
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={qsrForm.control}
                        name="businessRegistrationProofUrl"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Business Registration Proof *</FormLabel>
                            <FormDescription>Shop Act / Trade License / Udyam Registration</FormDescription>
                            <FormControl>
                              <Input 
                                type="file" 
                                accept=".pdf,.png,.jpg,.jpeg"
                                onChange={(e) => handleFileUpload("businessRegistrationProofUrl", e.target.files)}
                                data-testid="input-business-registration-proof"
                              />
                            </FormControl>
                            {field.value && <p className="text-sm text-green-600">✓ File uploaded</p>}
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={qsrForm.control}
                        name="panCardUrl"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>PAN Card (Business/Owner) *</FormLabel>
                            <FormControl>
                              <Input 
                                type="file" 
                                accept=".pdf,.png,.jpg,.jpeg"
                                onChange={(e) => handleFileUpload("panCardUrl", e.target.files)}
                                data-testid="input-pan-card"
                              />
                            </FormControl>
                            {field.value && <p className="text-sm text-green-600">✓ File uploaded</p>}
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={qsrForm.control}
                        name="bankAccountProofUrl"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Bank Account Proof *</FormLabel>
                            <FormDescription>Cancelled Cheque or Bank Statement</FormDescription>
                            <FormControl>
                              <Input 
                                type="file" 
                                accept=".pdf,.png,.jpg,.jpeg"
                                onChange={(e) => handleFileUpload("bankAccountProofUrl", e.target.files)}
                                data-testid="input-bank-account-proof"
                              />
                            </FormControl>
                            {field.value && <p className="text-sm text-green-600">✓ File uploaded</p>}
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    {/* Optional Documents */}
                    <div className="space-y-4 pt-4 border-t">
                      <h4 className="font-medium text-sm text-muted-foreground">Optional but Recommended</h4>
                      
                      <FormField
                        control={qsrForm.control}
                        name="fireSafetyCertificateUrl"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Fire Safety Certificate</FormLabel>
                            <FormControl>
                              <Input 
                                type="file" 
                                accept=".pdf,.png,.jpg,.jpeg"
                                onChange={(e) => handleFileUpload("fireSafetyCertificateUrl", e.target.files)}
                                data-testid="input-fire-safety-certificate"
                              />
                            </FormControl>
                            {field.value && <p className="text-sm text-green-600">✓ File uploaded</p>}
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={qsrForm.control}
                        name="municipalNocUrl"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Municipal / Food Department NOC</FormLabel>
                            <FormControl>
                              <Input 
                                type="file" 
                                accept=".pdf,.png,.jpg,.jpeg"
                                onChange={(e) => handleFileUpload("municipalNocUrl", e.target.files)}
                                data-testid="input-municipal-noc"
                              />
                            </FormControl>
                            {field.value && <p className="text-sm text-green-600">✓ File uploaded</p>}
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={qsrForm.control}
                        name="shopExteriorPhotoUrl"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Shop Exterior Photo</FormLabel>
                            <FormDescription>For physical verification</FormDescription>
                            <FormControl>
                              <Input 
                                type="file" 
                                accept=".png,.jpg,.jpeg"
                                onChange={(e) => handleFileUpload("shopExteriorPhotoUrl", e.target.files)}
                                data-testid="input-shop-exterior-photo"
                              />
                            </FormControl>
                            {field.value && <p className="text-sm text-green-600">✓ File uploaded</p>}
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </CardContent>
                </Card>

                {/* Section 4: Agreement & Consent */}
                <Card data-testid="section-agreement-consent">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Shield className="w-5 h-5" />
                      Section 4: Agreement & Consent
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
                              I consent to business verification as per platform guidelines. *
                            </FormLabel>
                          </div>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </CardContent>
                </Card>

                {/* Submit Button */}
                <div className="flex justify-end">
                  <Button 
                    type="submit" 
                    size="lg" 
                    className="gap-2"
                    data-testid="button-submit-qsr"
                  >
                    <CheckCircle2 className="w-5 h-5" />
                    Submit for Verification
                  </Button>
                </div>
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
