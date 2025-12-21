import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RefreshCw, Settings, Save, Lock, Mail, Phone, MapPin, Loader2 } from "lucide-react";
import { authApi } from "@/lib/api";

export default function StudentProfile() {
  const [student, setStudent] = useState<any>(null); // Initialize null
  const [isLoading, setIsLoading] = useState(true);  // Initial Fetch Loading
  const [error, setError] = useState("");

  const [editForm, setEditForm] = useState<any>({});
  const [saving, setSaving] = useState(false);

    // Helper to build the secure proxy URL
  const getSecurePhotoUrl = (originalUrl: string) => {
      if (!originalUrl) return "../public/logo.png"; // Fallback
      
      const token = localStorage.getItem("auth_token");
      if (!token) return originalUrl; // Fallback to raw (unlikely to work but defensive)

      // Point to our Backend Proxy
      return `http://localhost:3000/api/proxy/image?token=${token}&url=${encodeURIComponent(originalUrl)}`;
  };
  // Fetch Data on Mount
  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
      setIsLoading(true);
      setError("");
      try {
          const data = await authApi.getProfile();
          setStudent(data);
          setEditForm(data); // Pre-fill edit form
      } catch (err) {
          setError("Failed to load profile. Please relogin.");
      } finally {
          setIsLoading(false);
      }
  };

  const handleSave = () => {
      setSaving(true);
      setTimeout(() => {
          setStudent(editForm);
          setSaving(false);
          // Normally close sheet here
      }, 1000);
  };

  if (isLoading) {
      return (
          <div className="flex h-[50vh] w-full items-center justify-center gap-2 text-muted-foreground">
              <Loader2 className="h-6 w-6 animate-spin" /> Loading Student Profile...
          </div>
      );
  }

  if (error || !student) {
      return (
          <div className="flex h-[50vh] w-full items-center justify-center flex-col gap-4 text-destructive">
             <p>{error}</p>
             <Button variant="outline" onClick={() => window.location.href = '/login'}>Go to Login</Button>
          </div>
      );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-in fade-in-50 duration-500">
      
      {/* Main Details Card */}
      <Card className="md:col-span-2 shadow-sm relative">
        <CardHeader className="bg-muted/30 pb-4 flex flex-row items-start justify-between">
          <div>
              <CardTitle className="text-xl font-bold tracking-tight text-primary">General Information</CardTitle>
              <CardDescription>View your basic academic and personal records.</CardDescription>
          </div>
          
          {/* Settings Trigger */}
          <Sheet>
            <SheetTrigger asChild>
                <Button variant="outline" size="sm" className="hidden sm:flex gap-2">
                    <Settings className="w-4 h-4" /> Edit Profile
                </Button>
            </SheetTrigger>
            <SheetContent className="w-[400px] sm:w-[540px]">
                <SheetHeader>
                    <SheetTitle>Profile Settings</SheetTitle>
                    <SheetDescription>
                        Make changes to your contact information or account security here.
                    </SheetDescription>
                </SheetHeader>
                
                <Tabs defaultValue="profile" className="w-full mt-6">
                    <TabsList className="grid w-full grid-cols-2">
                        <TabsTrigger value="profile">Profile Details</TabsTrigger>
                        <TabsTrigger value="security">Security</TabsTrigger>
                    </TabsList>
                    
                    {/* Tab: Edit Details */}
                    <TabsContent value="profile" className="space-y-4 py-4">
                        <div className="space-y-2">
                            <Label htmlFor="contact">Mobile Number</Label>
                            <div className="relative">
                                <Phone className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                                <Input 
                                    id="contact" 
                                    className="pl-9"
                                    value={editForm.contact || ''}
                                    onChange={(e) => setEditForm({...editForm, contact: e.target.value})} 
                                />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="email">Email Address</Label>
                            <div className="relative">
                                <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                                <Input 
                                    id="email" 
                                    className="pl-9"
                                    value={editForm.email || ''}
                                    onChange={(e) => setEditForm({...editForm, email: e.target.value})}
                                />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="address">Residential Address</Label>
                             <div className="relative">
                                <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                                <textarea 
                                    className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 pl-9"
                                    id="address"
                                    value={editForm.address || ''}
                                    onChange={(e) => setEditForm({...editForm, address: e.target.value})}
                                />
                             </div>
                        </div>
                    </TabsContent>
                    
                    {/* Tab: Change Password */}
                    <TabsContent value="security" className="space-y-4 py-4">
                        <div className="space-y-2">
                            <Label>Current Password</Label>
                            <Input type="password" placeholder="••••••••" />
                        </div>
                        <Separator />
                        <div className="space-y-2">
                            <Label>New Password</Label>
                            <div className="relative">
                                <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                                <Input type="password" className="pl-9" />
                            </div>
                        </div>
                         <div className="space-y-2">
                            <Label>Confirm New Password</Label>
                            <div className="relative">
                                <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                                <Input type="password" className="pl-9" />
                            </div>
                        </div>
                    </TabsContent>
                </Tabs>

                <SheetFooter className="mt-4 sm:justify-end">
                    <Button type="submit" onClick={handleSave} disabled={saving}>
                        {saving ? "Saving..." : <><Save className="mr-2 h-4 w-4"/> Save Changes</>}
                    </Button>
                </SheetFooter>
            </SheetContent>
          </Sheet>

        </CardHeader>
        <CardContent className="pt-6 grid gap-6">
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <DetailItem label="Full Name" value={student.name} full />
            <DetailItem label="Register No." value={student.regNo} />
            <DetailItem label="Course" value={student.course} />
            <DetailItem label="Academic Year" value={student.sem} />
            <DetailItem label="Institution" value={student.institution} full />
          </div>

          <Separator />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
             <DetailItem label="Date of Birth / Gender" value={`${student.dob} / ${student.gender}`} />
             <DetailItem label="Aadhaar Number" value={student.aadhaar} />
             <DetailItem label="Father/Mother Name" value={student.father} full />
             <DetailItem label="Residential Address" value={student.address} full />
             <DetailItem label="Student Contact" value={`${student.contact} / ${student.email}`} full />
             <DetailItem label="Parent Contact" value={student.parentContact} full />
          </div>

          <Separator />

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            <DetailItem label="Admitted Date" value={student.admitted} />
            <DetailItem label="Community" value={student.community} />
            <DetailItem label="Religion/Nat." value={student.nationality} />
            <DetailItem label="Hosteller" value={student.hosteller} />
            <DetailItem label="Income" value={`Rs. ${student.income}`} />
            <DetailItem label="Region" value={student.state} />
          </div>

        </CardContent>
      </Card>

      {/* Profile Photo & Status Card */}
      <div className="space-y-6">
        <Card className="shadow-sm overflow-hidden border-2 border-primary/5">
            <div className="bg-gradient-to-br from-primary/10 to-primary/5 p-8 flex justify-center items-center relative">
                 <Avatar className="w-48 h-48 border-4 border-white shadow-xl">
                {/* Dynamically construct Proxy URL */}
                <AvatarImage 
                    src={student && student.photoUrl ? getSecurePhotoUrl(student.photoUrl) : ""} 
                /> 
                <AvatarFallback className="text-4xl">
                    {student ? student.name.charAt(0) : "ST"}
                </AvatarFallback>
                </Avatar>
                <div className="absolute top-4 right-4 sm:hidden">
                    <Sheet>
                        <SheetTrigger asChild>
                           <Button size="icon" variant="ghost"><Settings className="w-5 h-5"/></Button>
                        </SheetTrigger>
                    </Sheet>
                </div>
            </div>
            <CardContent className="text-center pt-6 pb-6">
                <Badge variant="outline" className="text-green-600 border-green-200 bg-green-50 px-4 py-1 text-sm dark:bg-green-900/20 dark:border-green-800 dark:text-green-400">
                    Current Status: Active
                </Badge>
                
                <div className="mt-6 flex flex-col gap-3 justify-center items-center">
                   <p className="text-xs text-muted-foreground">Synced just now</p>
                   <Button variant="ghost" size="sm" className="w-full text-xs text-blue-600 hover:text-blue-700 hover:bg-blue-50" onClick={fetchProfile}>
                      <RefreshCw className={`w-3.5 h-3.5 mr-2 ${isLoading ? 'animate-spin' : ''}`} /> Refresh Data
                      </Button>
                </div>
            </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-br from-blue-900 to-blue-950 text-white p-6 text-center shadow-lg relative overflow-hidden">
             <div className="absolute -top-10 -right-10 w-32 h-32 bg-blue-500/20 rounded-full blur-2xl"></div>
             
             <h3 className="font-semibold text-lg relative z-10">Wisdom & Truth</h3>
             <p className="text-blue-200 text-xs mt-1 relative z-10">Light of the world</p>
        </Card>
      </div>
    </div>
  );
}

const DetailItem = ({ label, value, full }: { label: string, value: string, full?: boolean }) => (
  <div className={full ? "col-span-1 sm:col-span-2" : "col-span-1"}>
    <h4 className="text-[10px] uppercase tracking-wider text-muted-foreground/70 font-bold mb-1">{label}</h4>
    <p className="text-sm font-medium text-foreground leading-relaxed break-words">{value}</p>
  </div>
);