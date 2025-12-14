import { useState } from "react";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea"; // Ensure this is installed, else use Input
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { 
    CheckCircle2, 
    Send,
    FileSignature,
    PenTool
} from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

const SERVICE_TYPES = {
    exam_app: { label: "Exam Application Registration", desc: "Register for Regular/Supply semester end examinations." },
    revaluation: { label: "Revaluation Application", desc: "Request re-counting or re-verification of answer scripts." },
    bonafide: { label: "Bonafide Certificate", desc: "Request a study certificate for passport, bus pass, or scholarships." },
    custodian: { label: "Custodian Certificate", desc: "Certificate for retention of original documents." },
    moi: { label: "Medium of Instruction", desc: "Certificate stating English as the medium of study." },
    duplicate_id: { label: "Duplicate ID Card", desc: "Request a replacement for lost or damaged ID card." },
    club: { label: "Club Registration", desc: "Enroll in cultural or technical student clubs." },
    feedback: { label: "Student Feedback", desc: "Submit course or faculty feedback." },
    grievance: { label: "Grievance / Complaints", desc: "Raise a ticket regarding campus facilities or academics." },
};

export default function Services() {
    const [selectedService, setSelectedService] = useState<keyof typeof SERVICE_TYPES>("exam_app");
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitted(true);
        setTimeout(() => setIsSubmitted(false), 3000); // Reset after 3 seconds
    };

    return (
        <div className="space-y-6 max-w-3xl mx-auto animate-in fade-in-50 duration-500">
            {/* Header */}
            <div>
                <h2 className="text-3xl font-bold tracking-tight">Student Services</h2>
                <p className="text-muted-foreground mt-1">Unified portal for academic requests and registrations.</p>
            </div>

            {/* Selection Area */}
            <Card className="border-l-4 border-l-primary shadow-sm">
                <CardHeader>
                    <CardTitle className="text-lg">Select Service Type</CardTitle>
                    <CardDescription>Choose the type of application you wish to submit.</CardDescription>
                </CardHeader>
                <CardContent>
                    <Select 
                        value={selectedService} 
                        onValueChange={(val) => setSelectedService(val as keyof typeof SERVICE_TYPES)}
                    >
                        <SelectTrigger className="w-full h-12 text-base">
                            <div className="flex items-center gap-2">
                                <PenTool className="w-4 h-4 text-muted-foreground" />
                                <SelectValue placeholder="Select Service" />
                            </div>
                        </SelectTrigger>
                        <SelectContent>
                            {Object.entries(SERVICE_TYPES).map(([key, info]) => (
                                <SelectItem key={key} value={key} className="py-3">
                                    <span className="font-semibold">{info.label}</span>
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </CardContent>
            </Card>

            {/* Dynamic Form Area */}
            <Card className="shadow-lg">
                <form onSubmit={handleSubmit}>
                    <CardHeader className="border-b bg-muted/20">
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-primary/10 rounded text-primary">
                                <FileSignature className="w-6 h-6" />
                            </div>
                            <div>
                                <CardTitle>{SERVICE_TYPES[selectedService].label}</CardTitle>
                                <CardDescription>{SERVICE_TYPES[selectedService].desc}</CardDescription>
                            </div>
                        </div>
                    </CardHeader>
                    
                    <CardContent className="space-y-6 pt-6">
                         {/* Static Student Details */}
                         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <Label htmlFor="uid">Register / Roll Number</Label>
                                <Input id="uid" value="111724013034" disabled className="bg-muted text-muted-foreground" />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="name">Student Name</Label>
                                <Input id="name" value="GUDLA REVANTH ROSHAN GOUD" disabled className="bg-muted text-muted-foreground" />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="email">Email Address</Label>
                                <Input id="email" type="email" placeholder="personallyrevanth@gmail.com" />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="phone">Phone Number</Label>
                                <Input id="phone" type="tel" placeholder="+91 8686866463" />
                            </div>
                         </div>

                         {/* Context Aware Dynamic Fields */}
                         <div className="space-y-2">
                             {selectedService.includes('exam') && (
                                 <>
                                    <Label>Exam Session</Label>
                                    <Select>
                                        <SelectTrigger><SelectValue placeholder="Select Semester" /></SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="sem3">Semester III (Regular)</SelectItem>
                                            <SelectItem value="sem1">Semester I (Backlog)</SelectItem>
                                        </SelectContent>
                                    </Select>
                                 </>
                             )}
                             
                             {(selectedService === 'club') && (
                                 <>
                                    <Label>Select Club</Label>
                                    <Select>
                                        <SelectTrigger><SelectValue placeholder="Choose a Club" /></SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="dance">Dance Club</SelectItem>
                                            <SelectItem value="music">Music Club</SelectItem>
                                            <SelectItem value="tech">Tech Club (CSI)</SelectItem>
                                            <SelectItem value="literary">Literary Club</SelectItem>
                                        </SelectContent>
                                    </Select>
                                 </>
                             )}

                             {(selectedService === 'grievance' || selectedService === 'feedback' || selectedService === 'bonafide') && (
                                <div className="space-y-2">
                                    <Label>
                                        {selectedService === 'bonafide' ? "Purpose of Certificate" : "Description / Remarks"}
                                    </Label>
                                    <textarea 
                                        className="flex min-h-[100px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                                        placeholder={selectedService === 'bonafide' ? "Reason for request..." : "Enter your details here..."}
                                    />
                                </div>
                             )}
                         </div>

                         {isSubmitted && (
                             <Alert className="bg-green-50 text-green-800 border-green-200 dark:bg-green-900/20 dark:text-green-300 dark:border-green-800 animate-in zoom-in-95">
                                 <CheckCircle2 className="h-4 w-4" />
                                 <AlertTitle>Success</AlertTitle>
                                 <AlertDescription>Your request for <strong>{SERVICE_TYPES[selectedService].label}</strong> has been submitted successfully.</AlertDescription>
                             </Alert>
                         )}
                    </CardContent>
                    
                    <CardFooter className="bg-muted/10 flex justify-end">
                        <Button type="submit" size="lg" className="w-full sm:w-auto">
                            <Send className="w-4 h-4 mr-2" />
                            Submit Request
                        </Button>
                    </CardFooter>
                </form>
            </Card>
        </div>
    );
}