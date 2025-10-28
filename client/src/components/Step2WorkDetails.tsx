import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, FormDescription } from "@/components/ui/form";
import { Briefcase, Upload, Video, Award, X } from "lucide-react";
import { useState } from "react";

const step2Schema = z.object({
  skills: z.array(z.string()).min(1, "Select at least one skill"),
  pastWorkDetails: z.string().optional(),
  workProofUrl: z.string().optional(),
  videoIntroUrl: z.string().optional(),
  certificationTags: z.array(z.string()).optional(),
});

type Step2FormData = z.infer<typeof step2Schema>;

interface Step2WorkDetailsProps {
  onNext: (data: any) => void;
  onBack: () => void;
  initialData?: any;
}

const SKILLS = ["Baristas", "Helpers", "Cleaners", "Waiters"];

export default function Step2WorkDetails({ onNext, onBack, initialData }: Step2WorkDetailsProps) {
  const [selectedSkills, setSelectedSkills] = useState<string[]>(initialData?.skills || []);
  const [certifications, setCertifications] = useState<string[]>(initialData?.certificationTags || []);
  const [newCertification, setNewCertification] = useState("");
  const [workProofFile, setWorkProofFile] = useState<File | null>(null);
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);

  const form = useForm<Step2FormData>({
    resolver: zodResolver(step2Schema),
    defaultValues: {
      skills: initialData?.skills || [],
      pastWorkDetails: initialData?.pastWorkDetails || "",
      workProofUrl: initialData?.workProofUrl || "",
      videoIntroUrl: initialData?.videoIntroUrl || "",
      certificationTags: initialData?.certificationTags || [],
    },
  });

  const handleSkillToggle = (skill: string) => {
    const newSkills = selectedSkills.includes(skill)
      ? selectedSkills.filter((s) => s !== skill)
      : [...selectedSkills, skill];
    setSelectedSkills(newSkills);
    form.setValue("skills", newSkills);
  };

  const handleAddCertification = () => {
    if (newCertification.trim() && !certifications.includes(newCertification.trim())) {
      const updated = [...certifications, newCertification.trim()];
      setCertifications(updated);
      form.setValue("certificationTags", updated);
      setNewCertification("");
    }
  };

  const handleRemoveCertification = (cert: string) => {
    const updated = certifications.filter((c) => c !== cert);
    setCertifications(updated);
    form.setValue("certificationTags", updated);
  };

  const handleWorkProofUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setWorkProofFile(file);
      setUploading(true);
      setTimeout(() => {
        form.setValue("workProofUrl", `uploaded/${file.name}`);
        setUploading(false);
        console.log("Work proof uploaded:", file.name);
      }, 1000);
    }
  };

  const handleVideoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setVideoFile(file);
      setUploading(true);
      setTimeout(() => {
        form.setValue("videoIntroUrl", `uploaded/${file.name}`);
        setUploading(false);
        console.log("Video uploaded:", file.name);
      }, 1500);
    }
  };

  const onSubmit = (data: Step2FormData) => {
    onNext(data);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6" data-testid="form-step2">
        <FormField
          control={form.control}
          name="skills"
          render={() => (
            <FormItem>
              <FormLabel>Skills</FormLabel>
              <FormControl>
                <div className="grid grid-cols-2 gap-4">
                  {SKILLS.map((skill) => (
                    <Button
                      key={skill}
                      type="button"
                      variant={selectedSkills.includes(skill) ? "default" : "outline"}
                      className="h-20 text-lg"
                      onClick={() => handleSkillToggle(skill)}
                      data-testid={`button-skill-${skill.toLowerCase()}`}
                    >
                      <Briefcase className="w-6 h-6 mr-3" />
                      {skill}
                    </Button>
                  ))}
                </div>
              </FormControl>
              <FormDescription>Select all roles you can perform</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="pastWorkDetails"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Past Work Details (Optional)</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Tell us about your previous work experience&#10;Example: Worked at ABC Restaurant as a waiter for 2 years"
                  className="min-h-32 resize-none"
                  data-testid="textarea-past-work"
                  {...field}
                />
              </FormControl>
              <FormDescription>Include restaurant name, role, and duration</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="workProofUrl"
          render={() => (
            <FormItem>
              <FormLabel>Upload Proof of Previous Work (Optional)</FormLabel>
              <FormControl>
                <div className="border-2 border-dashed border-border rounded-lg p-8 text-center hover-elevate cursor-pointer">
                  <input
                    type="file"
                    accept=".jpg,.jpeg,.png,.pdf"
                    onChange={handleWorkProofUpload}
                    className="hidden"
                    id="work-proof-upload"
                    data-testid="input-work-proof"
                  />
                  <label htmlFor="work-proof-upload" className="cursor-pointer">
                    <Upload className="w-12 h-12 mx-auto text-muted-foreground mb-3" />
                    <p className="text-sm font-medium">
                      {workProofFile ? workProofFile.name : "Click to upload or drag and drop"}
                    </p>
                    <p className="text-xs text-muted-foreground mt-2">
                      Payslips, experience letters (JPEG, PNG, PDF)
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
          name="videoIntroUrl"
          render={() => (
            <FormItem>
              <FormLabel>Upload Video Introduction (Optional)</FormLabel>
              <FormControl>
                <div className="border-2 border-dashed border-border rounded-lg p-8 text-center hover-elevate cursor-pointer">
                  <input
                    type="file"
                    accept=".mp4,.mov,.avi"
                    onChange={handleVideoUpload}
                    className="hidden"
                    id="video-upload"
                    data-testid="input-video"
                  />
                  <label htmlFor="video-upload" className="cursor-pointer">
                    <Video className="w-12 h-12 mx-auto text-muted-foreground mb-3" />
                    <p className="text-sm font-medium">
                      {videoFile ? videoFile.name : "Click to upload video"}
                    </p>
                    <p className="text-xs text-muted-foreground mt-2">
                      Introduce yourself in 30 seconds (MP4, MOV, AVI)
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
          name="certificationTags"
          render={() => (
            <FormItem>
              <FormLabel>Add Certification Tags (Optional)</FormLabel>
              <FormControl>
                <div>
                  <div className="flex gap-2">
                    <div className="relative flex-1">
                      <Award className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                      <Input
                        placeholder="e.g., Belgian Waffle Certified"
                        className="pl-10 h-12"
                        value={newCertification}
                        onChange={(e) => setNewCertification(e.target.value)}
                        onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), handleAddCertification())}
                        data-testid="input-certification"
                      />
                    </div>
                    <Button
                      type="button"
                      variant="outline"
                      className="h-12"
                      onClick={handleAddCertification}
                      data-testid="button-add-certification"
                    >
                      Add
                    </Button>
                  </div>
                  {certifications.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-3">
                      {certifications.map((cert) => (
                        <div
                          key={cert}
                          className="bg-primary text-primary-foreground px-3 py-1.5 rounded-full text-sm font-medium flex items-center gap-2"
                          data-testid={`badge-certification-${cert}`}
                        >
                          {cert}
                          <button
                            type="button"
                            onClick={() => handleRemoveCertification(cert)}
                            className="hover-elevate rounded-full"
                            data-testid={`button-remove-${cert}`}
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex justify-between pt-6">
          <Button type="button" variant="outline" className="h-12 px-8" onClick={onBack} data-testid="button-back-step2">
            Back
          </Button>
          <Button type="submit" className="h-12 px-8" data-testid="button-next-step2">
            Next
          </Button>
        </div>
      </form>
    </Form>
  );
}
