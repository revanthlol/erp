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
import { Badge } from "@/components/ui/badge";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import {
    Download,
    Eye,
    AlertCircle,
    Calendar,
    MapPin,
    FileText,
    CheckCircle2,
    XCircle,
    Clock
} from "lucide-react";
import { Separator } from "@/components/ui/separator";

// --- TOGGLE THIS TO TEST "NOT RELEASED" STATE ---
const IS_RELEASED = true;

const EXAM_DETAILS = {
    session: "Nov/Dec 2025 - Regular Examinations",
    center: "Loyola Academy Degree & PG College",
    code: "1117 - Block A",
    instructions: "Candidates must be seated 15 mins before schedule.",
};

export default function HallTicket() {
    const [isLoading, setIsLoading] = useState(false);

    // Mock download function
    const handleDownload = () => {
        setIsLoading(true);
        setTimeout(() => {
            setIsLoading(false);
            alert("Hall Ticket PDF downloaded successfully!");
        }, 1500);
    };

    return (
        <div className="space-y-8 animate-in fade-in-50 duration-500 max-w-4xl mx-auto">
            {/* Header */}
            <div>
                <h2 className="text-3xl font-bold tracking-tight">Examination Hall Ticket</h2>
                <p className="text-muted-foreground mt-1">Download your admit card for the upcoming semester examinations.</p>
            </div>

            {/* Status Indicator Banner */}
            <div className={`flex items-center justify-between p-4 rounded-lg border ${IS_RELEASED ? "bg-green-50 border-green-200 dark:bg-green-900/10 dark:border-green-900" : "bg-red-50 border-red-200 dark:bg-red-900/10 dark:border-red-900"}`}>
                <div className="flex items-center gap-4">
                    <div className="relative flex h-3 w-3">
                        <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${IS_RELEASED ? "bg-green-400" : "bg-red-400"}`}></span>
                        <span className={`relative inline-flex rounded-full h-3 w-3 ${IS_RELEASED ? "bg-green-500" : "bg-red-500"}`}></span>
                    </div>
                    <div>
                        <h4 className={`font-semibold ${IS_RELEASED ? "text-green-700 dark:text-green-400" : "text-red-700 dark:text-red-400"}`}>
                            {IS_RELEASED ? "Status: Released" : "Status: Not Available"}
                        </h4>
                        <p className="text-xs text-muted-foreground">
                            {IS_RELEASED 
                                ? "Your hall ticket is generated and ready for download." 
                                : "The university has not yet released the hall tickets for this session."}
                        </p>
                    </div>
                </div>
                <div className="hidden sm:block">
                     {IS_RELEASED ? (
                         <CheckCircle2 className="w-8 h-8 text-green-200 dark:text-green-800" />
                     ) : (
                         <XCircle className="w-8 h-8 text-red-200 dark:text-red-800" />
                     )}
                </div>
            </div>

            {IS_RELEASED ? (
                // --- RELEASED STATE UI ---
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* Ticket Details Card */}
                    <Card className="md:col-span-2 shadow-sm border-2 border-primary/10">
                        <CardHeader className="pb-3 bg-muted/20 border-b">
                            <CardTitle className="text-lg flex items-center gap-2">
                                <FileText className="w-5 h-5 text-primary" />
                                {EXAM_DETAILS.session}
                            </CardTitle>
                            <CardDescription>Academic Year 2025-2026</CardDescription>
                        </CardHeader>
                        <CardContent className="py-6 space-y-6">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div className="space-y-1">
                                    <p className="text-xs text-muted-foreground uppercase font-medium">Exam Center</p>
                                    <div className="flex items-start gap-2">
                                        <MapPin className="w-4 h-4 mt-0.5 text-primary" />
                                        <p className="font-semibold">{EXAM_DETAILS.center}</p>
                                    </div>
                                </div>
                                <div className="space-y-1">
                                    <p className="text-xs text-muted-foreground uppercase font-medium">Center Code</p>
                                    <p className="font-mono font-semibold bg-muted px-2 py-0.5 rounded w-fit">{EXAM_DETAILS.code}</p>
                                </div>
                                <div className="space-y-1">
                                    <p className="text-xs text-muted-foreground uppercase font-medium">Exam Dates</p>
                                    <div className="flex items-center gap-2">
                                        <Calendar className="w-4 h-4 text-primary" />
                                        <p>14 Nov 2025 - 12 Dec 2025</p>
                                    </div>
                                </div>
                                <div className="space-y-1">
                                    <p className="text-xs text-muted-foreground uppercase font-medium">Reporting Time</p>
                                    <div className="flex items-center gap-2">
                                        <Clock className="w-4 h-4 text-primary" />
                                        <p>09:30 AM (FN Session)</p>
                                    </div>
                                </div>
                            </div>
                            
                            <Separator />
                            
                            <Alert className="bg-amber-50 dark:bg-amber-900/10 border-amber-200 text-amber-800 dark:text-amber-200">
                                <AlertCircle className="h-4 w-4" />
                                <AlertTitle>Instructions</AlertTitle>
                                <AlertDescription>
                                    Electronic gadgets, including mobile phones and smartwatches, are strictly prohibited inside the examination hall.
                                </AlertDescription>
                            </Alert>
                        </CardContent>
                    </Card>

                    {/* Action Card */}
                    <Card className="flex flex-col shadow-sm">
                        <CardHeader className="pb-4">
                            <CardTitle>Actions</CardTitle>
                            <CardDescription>Preview or save your copy</CardDescription>
                        </CardHeader>
                        <CardContent className="flex-1 space-y-3">
                            <Dialog>
                                <DialogTrigger asChild>
                                    <Button variant="outline" className="w-full h-12 text-base border-primary/20 hover:bg-primary/5 hover:text-primary hover:border-primary/50">
                                        <Eye className="w-4 h-4 mr-2" />
                                        Preview Ticket
                                    </Button>
                                </DialogTrigger>
                                <DialogContent className="max-w-4xl h-[85vh]">
                                    <DialogHeader>
                                        <DialogTitle>Hall Ticket Preview</DialogTitle>
                                        <DialogDescription>
                                            {EXAM_DETAILS.session} - {EXAM_DETAILS.code}
                                        </DialogDescription>
                                    </DialogHeader>
                                    {/* Mock PDF Viewer (Iframe or Placeholder) */}
                                    <div className="flex-1 w-full h-full bg-muted/30 border rounded-lg overflow-hidden flex flex-col items-center justify-center p-8">
                                        <div className="w-full h-full bg-white dark:bg-zinc-950 shadow-2xl p-8 overflow-y-auto flex flex-col items-center">
                                             {/* Visual Mock of PDF Content */}
                                             <div className="w-[120px] h-[120px] rounded-full bg-primary/10 flex items-center justify-center mb-6">
                                                 <img src="/placeholder-logo.png" className="w-16 h-16 opacity-50" alt="Logo"/>
                                             </div>
                                             <h1 className="text-xl font-bold uppercase text-center mb-2">Loyola Academy Degree & PG College</h1>
                                             <div className="bg-primary text-primary-foreground px-4 py-1 text-sm font-bold uppercase rounded-full mb-8">Hall Ticket - Nov 2025</div>
                                             
                                             <div className="w-full grid grid-cols-2 gap-4 text-sm border p-4 rounded mb-6">
                                                <div className="border-r pr-4">
                                                    <p className="text-muted-foreground text-xs">Student Name</p>
                                                    <p className="font-bold">GUDLA REVANTH ROSHAN GOUD</p>
                                                </div>
                                                <div>
                                                    <p className="text-muted-foreground text-xs">Roll Number</p>
                                                    <p className="font-bold font-mono">111724013034</p>
                                                </div>
                                             </div>
                                             
                                             <div className="w-full border-t pt-8 mt-auto text-center">
                                                 <p className="font-bold font-serif italic text-muted-foreground/60">Controller of Examinations</p>
                                             </div>
                                        </div>
                                    </div>
                                </DialogContent>
                            </Dialog>

                            <Button 
                                className="w-full h-12 text-base shadow-md transition-all active:scale-[0.98]" 
                                onClick={handleDownload} 
                                disabled={isLoading}
                            >
                                {isLoading ? (
                                    <>
                                        <div className="h-4 w-4 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2"/>
                                        Downloading...
                                    </>
                                ) : (
                                    <>
                                        <Download className="w-4 h-4 mr-2" />
                                        Download PDF
                                    </>
                                )}
                            </Button>
                        </CardContent>
                        <CardFooter className="bg-muted/30 pt-4">
                             <p className="text-xs text-muted-foreground text-center w-full">
                                 Please check details carefully. <br/>
                                 Contact exam branch for corrections.
                             </p>
                        </CardFooter>
                    </Card>
                </div>
            ) : (
                // --- NOT RELEASED STATE UI ---
                <Card className="border-dashed border-2 py-12 flex flex-col items-center justify-center text-center space-y-4 bg-muted/20">
                    <div className="h-20 w-20 rounded-full bg-muted flex items-center justify-center mb-2">
                        <Clock className="w-10 h-10 text-muted-foreground" />
                    </div>
                    <h3 className="text-xl font-semibold">Hall Ticket Pending</h3>
                    <p className="text-muted-foreground max-w-sm">
                        Hall tickets for <strong>{EXAM_DETAILS.session}</strong> will be generated 3 days before the commencement of exams.
                    </p>
                    <Badge variant="outline" className="mt-4">
                        Estimated: 11 Nov 2025
                    </Badge>
                    <Button variant="link" className="text-primary" onClick={() => window.location.reload()}>
                        Check for Updates
                    </Button>
                </Card>
            )}
        </div>
    );
}