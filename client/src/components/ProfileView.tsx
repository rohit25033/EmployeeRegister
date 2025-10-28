import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, Clock, Lock } from "lucide-react";

interface ProfileData {
  fullName: string;
  age: number;
  gender: string;
  phoneNumber: string;
  email?: string;
  region: string;
  languagesKnown: string[];
  skills: string[];
  pastWorkDetails?: string;
  certificationTags?: string[];
  aadhaarNumber: string;
  panNumber?: string;
  verificationStatus: "pending" | "approved" | "rejected";
  trainingStatus: "pending" | "completed";
  certificationStatus: "pending" | "completed";
}

interface ProfileViewProps {
  profile: ProfileData;
}

export default function ProfileView({ profile }: ProfileViewProps) {
  return (
    <div className="space-y-6" data-testid="profile-view">
      <div className="text-center mb-8">
        <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
          <span className="text-4xl font-bold text-primary">
            {profile.fullName.charAt(0).toUpperCase()}
          </span>
        </div>
        <h2 className="text-2xl font-bold">{profile.fullName}</h2>
        <p className="text-muted-foreground">{profile.skills.join(", ")}</p>
      </div>

      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">Basic Information</h3>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <p className="text-muted-foreground">Full Name</p>
            <p className="font-medium">{profile.fullName}</p>
          </div>
          <div>
            <p className="text-muted-foreground">Age</p>
            <p className="font-medium">{profile.age} years</p>
          </div>
          <div>
            <p className="text-muted-foreground">Gender</p>
            <p className="font-medium">{profile.gender}</p>
          </div>
          <div>
            <p className="text-muted-foreground">Phone Number</p>
            <p className="font-medium">{profile.phoneNumber}</p>
          </div>
          {profile.email && (
            <div className="col-span-2">
              <p className="text-muted-foreground">Email Address</p>
              <p className="font-medium">{profile.email}</p>
            </div>
          )}
          <div>
            <p className="text-muted-foreground">Region / City</p>
            <p className="font-medium">{profile.region}</p>
          </div>
          <div>
            <p className="text-muted-foreground">Languages Known</p>
            <div className="flex flex-wrap gap-1 mt-1">
              {profile.languagesKnown.map((lang) => (
                <Badge key={lang} variant="secondary">{lang}</Badge>
              ))}
            </div>
          </div>
        </div>
      </Card>

      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">Work & Skill Details</h3>
        <div className="space-y-4 text-sm">
          <div>
            <p className="text-muted-foreground mb-2">Skills</p>
            <div className="flex flex-wrap gap-2">
              {profile.skills.map((skill) => (
                <Badge key={skill} variant="default">{skill}</Badge>
              ))}
            </div>
          </div>
          {profile.pastWorkDetails && (
            <div>
              <p className="text-muted-foreground mb-2">Past Work Details</p>
              <p className="font-medium">{profile.pastWorkDetails}</p>
            </div>
          )}
          {profile.certificationTags && profile.certificationTags.length > 0 && (
            <div>
              <p className="text-muted-foreground mb-2">Certifications</p>
              <div className="flex flex-wrap gap-2">
                {profile.certificationTags.map((cert) => (
                  <Badge key={cert} variant="outline">{cert}</Badge>
                ))}
              </div>
            </div>
          )}
        </div>
      </Card>

      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">Verification Status</h3>
        <div className="space-y-3 text-sm">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-primary" />
              <span>Aadhaar</span>
            </div>
            <Badge variant="secondary">Submitted</Badge>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              {profile.panNumber ? (
                <CheckCircle2 className="w-4 h-4 text-primary" />
              ) : (
                <Clock className="w-4 h-4 text-muted-foreground" />
              )}
              <span>PAN</span>
            </div>
            <Badge variant={profile.panNumber ? "secondary" : "outline"}>
              {profile.panNumber ? "Submitted" : "Optional"}
            </Badge>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-primary" />
              <span>ID Proof</span>
            </div>
            <Badge variant="secondary">Uploaded</Badge>
          </div>
          <div className="mt-4 p-3 bg-muted/50 rounded-lg">
            <div className="flex items-center gap-2">
              <Clock className="w-5 h-5 text-orange-500" />
              <span className="font-medium">
                Status: 
                <span className="ml-2 text-orange-500">
                  {profile.verificationStatus === "pending" ? "Verification Pending" : 
                   profile.verificationStatus === "approved" ? "Verified" : "Needs Attention"}
                </span>
              </span>
            </div>
          </div>
        </div>
      </Card>

      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">Training & Certification Progress</h3>
        <div className="space-y-3">
          <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
            <div className="flex items-center gap-2">
              <Lock className="w-5 h-5 text-muted-foreground" />
              <span>Training</span>
            </div>
            <Badge variant="outline">Pending</Badge>
          </div>
          <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
            <div className="flex items-center gap-2">
              <Lock className="w-5 h-5 text-muted-foreground" />
              <span>Certification</span>
            </div>
            <Badge variant="outline">Pending</Badge>
          </div>
        </div>
      </Card>

      <div className="p-4 bg-muted/30 rounded-lg border text-center">
        <p className="text-sm text-muted-foreground">
          💡 Complete your verification, training, and certification to unlock better job matches.
        </p>
      </div>
    </div>
  );
}
