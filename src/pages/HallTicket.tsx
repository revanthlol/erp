import { useState, useEffect, useRef } from "react";
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
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogFooter,
    DialogTrigger
} from "@/components/ui/dialog";
import { Progress } from "@/components/ui/progress";
import {
    Download,
    MapPin,
    CheckCircle2,
    XCircle,
    ShieldAlert,
    AlertTriangle,
    Info,
    QrCode,
    Zap,
    History,
    ShieldCheck, 
    Cpu, 
    Layers, 
    Verified, 
    Terminal, 
    MonitorPlay, 
    Ghost,
    X,
    Printer,
    Fingerprint,
    Loader2,
    Eye,
    ArrowRight
} from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { authApi } from "@/lib/api";

const EXAM_DETAILS = {
    session: "Semester End Examinations",
    center: "Loyola Academy Degree & PG College",
    code: "Exam Hall - Main Block",
    validity: "Session 2025-2026"
};

// --- Rickroll Modal Component ---
function RickRollModal({ isOpen, onOpenChange }: { isOpen: boolean; onOpenChange: (open: boolean) => void }) {
    const [step, setStep] = useState(0);
    const [showFunnyMessage, setShowFunnyMessage] = useState(false);
    const videoRef = useRef<HTMLVideoElement>(null);
    const messages = [
        "Initializing secure COE handshake...",
        "Authenticating P2P digital signature...",
        "Bypassing internal firewall encryption...",
        "Decrypting examination seal...",
        "Establishing encrypted Document stream...",
    ];

    useEffect(() => {
        if (isOpen) {
            setStep(0);
            setShowFunnyMessage(false);
            const interval = setInterval(() => {
                setStep(prev => prev + 1);
            }, 800);
            return () => clearInterval(interval);
        }
    }, [isOpen]);

    const isDone = step >= messages.length;

    useEffect(() => {
        if (isDone) {
            const timer = setTimeout(() => setShowFunnyMessage(true), 1500);
            return () => clearTimeout(timer);
        }
    }, [isDone]);

    return (
        <Dialog open={isOpen} onOpenChange={onOpenChange}>
            <DialogContent 
                className={cn(
                    "max-w-2xl p-0 overflow-y-auto transition-all duration-1000 border-none shadow-2xl scrollbar-hide max-h-[90vh]",
                    isDone ? "bg-black" : "bg-card"
                )}
            >
                {/* --- Accessibility Headers --- */}
                <DialogTitle className="sr-only">Security Verification Prank</DialogTitle>
                <DialogDescription className="sr-only">
                    A humorous cinematic sequence that starts with a fake decryption loading screen and transitions into the Rickroll video reveal.
                </DialogDescription>

                <div className="flex flex-col w-full">
                    <AnimatePresence mode="wait">
                        {!isDone ? (
                            /* --- Act 1: Fake Loading Layer --- */
                            <motion.div 
                                key="loading"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="w-full p-12 space-y-8 flex flex-col items-center justify-center bg-card min-h-[400px]"
                            >
                                <div className="relative">
                                    <div className="absolute inset-0 animate-ping bg-primary/20 rounded-full" />
                                    <div className="relative h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center border border-primary/20">
                                        <ShieldAlert className="h-8 w-8 text-primary animate-pulse" />
                                    </div>
                                </div>
                                
                                <div className="space-y-4 w-full max-w-sm text-center">
                                    <p className="text-xl font-bold tracking-tight animate-bounce">Secure Channel Protocol</p>
                                    <Progress value={(step / messages.length) * 100} className="h-2" />
                                    <AnimatePresence mode="wait">
                                        <motion.p 
                                            key={step}
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            className="text-sm font-mono text-muted-foreground"
                                        >
                                            {messages[step] || "Finalizing secure link..."}
                                        </motion.p>
                                    </AnimatePresence>
                                </div>
                            </motion.div>
                        ) : (
                            /* --- Act 2: Video Reveal & Act 3: Post-Reveal Message --- */
                            <motion.div
                                key="reveal"
                                initial={{ opacity: 0, scale: 0.98 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.8, ease: "easeOut" }}
                                className="flex flex-col w-full"
                            >
                                {/* Video Section - Cinematic Aspect */}
                                <div className="relative aspect-video w-full bg-black shrink-0 border-b border-primary/10">
                                    <video 
                                        ref={videoRef}
                                        src="https://rick.nerial.uk/video.mp4"
                                        className="w-full h-full object-contain"
                                        autoPlay
                                        playsInline
                                        loop
                                    />
                                    
                                    {/* Video HUD elements */}
                                    <div className="absolute top-4 right-4 z-20">
                                        <Badge className="bg-red-600 text-white hover:bg-red-700 animate-pulse border-none px-3 py-1">
                                            <MonitorPlay className="w-3 h-3 mr-2" />
                                            LIVE SECURE FEED
                                        </Badge>
                                    </div>
                                </div>

                                {/* Humorous Follow-up Message */}
                                <AnimatePresence>
                                    {showFunnyMessage && (
                                        <motion.div 
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ duration: 0.5, delay: 0.2 }}
                                            className="w-full flex flex-col items-center justify-center p-8 text-center space-y-6 bg-black z-50 min-h-[300px]"
                                        >
                                            <div className="flex flex-col items-center gap-4">
                                                <div className="h-14 w-14 rounded-2xl bg-primary/10 flex items-center justify-center border border-primary/20 animate-pulse">
                                                    <Ghost className="w-8 h-8 text-primary" />
                                                </div>
                                                <div className="space-y-1">
                                                    <p className="text-[10px] uppercase font-black text-primary tracking-[0.4em]">System De-Crypted</p>
                                                    <p className="text-xl font-bold text-white leading-tight underline decoration-primary/30 underline-offset-8">
                                                        Rickrolled!
                                                    </p>
                                                </div>
                                                <p className="text-sm font-medium text-muted-foreground/80 max-w-sm mx-auto italic">
                                                    "Visit the official website for legal hall ticket issuance. This digital preview is for synchronization testing only."
                                                </p>
                                            </div>

                                            <div className="flex items-center justify-center gap-3 pt-4 border-t border-white/5">
                                                <Badge variant="outline" className="bg-primary/10 border-primary/20 text-[10px] font-black text-primary py-1 px-3 uppercase tracking-widest">
                                                    Never Gonna Give You Up
                                                </Badge>
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </DialogContent>
        </Dialog>
    );
}

export default function HallTicket() {
    const [isLoading, setIsLoading] = useState(true);
    const [disclaimerOpen, setDisclaimerOpen] = useState(false);
    const [isRickRolling, setIsRickRolling] = useState(false);
    const [user, setUser] = useState({ name: "Student Name", regNo: "XXXXXXXX", photoUrl: "" });
    const [subjects, setSubjects] = useState<any[]>([]);

    useEffect(() => {
        const fetchAllData = async () => {
            setIsLoading(true);
            try {
                const [profile, allSubjects] = await Promise.all([
                    authApi.getProfile(),
                    authApi.getSubjects()
                ]);
                
                setUser({
                    name: profile.name || "Student Name",
                    regNo: profile.regNo || "XXXXXXXX",
                    photoUrl: authApi.getProxyImageUrl(profile.photoUrl) || "/student.png"
                });

                if (allSubjects && allSubjects.length > 0) {
                     const sems = [...new Set(allSubjects.map((s: any) => s.sem))].sort();
                     const maxSem = sems[sems.length - 1];
                     const currentSubjects = allSubjects.filter((s: any) => s.sem === maxSem);
                     setSubjects(currentSubjects);
                }

                if (!sessionStorage.getItem("erp_hall_ticket_disclaimer")) {
                    setDisclaimerOpen(true);
                    sessionStorage.setItem("erp_hall_ticket_disclaimer", "true");
                }
            } catch (err) {
                console.error("Failed to load official data", err);
            } finally {
                setIsLoading(false);
            }
        };

        fetchAllData();
    }, []);

    const handleAction = () => {
        setIsRickRolling(true);
    };

    if (isLoading) {
        return (
            <div className="flex flex-col h-[60vh] w-full items-center justify-center gap-6 text-muted-foreground">
                <div className="relative">
                    <div className="h-24 w-24 border-4 border-primary/20 border-t-primary rounded-full animate-spin" />
                    <div className="absolute inset-0 flex items-center justify-center">
                        <Fingerprint className="h-8 w-8 text-primary/40" />
                    </div>
                </div>
                <div className="space-y-2 text-center">
                    <h3 className="text-xl font-bold text-foreground">Synchronizing Records</h3>
                    <p className="text-xs uppercase tracking-widest font-black opacity-50">Handshaking with Examination Controller...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-8 max-w-6xl mx-auto pb-12">
            
            {/* Header Section */}
            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-2 text-center md:text-left px-1"
            >
                <h2 className="text-3xl md:text-5xl font-black tracking-tighter bg-gradient-to-r from-foreground via-primary to-foreground/40 bg-clip-text text-transparent">
                    Hall Ticket
                </h2>
                <div className="flex flex-col md:flex-row items-center gap-4 text-muted-foreground font-semibold">
                    <p className="flex items-center gap-2">
                        Session 2025-2026 Academic Quarter
                    </p>
                    <Separator orientation="vertical" className="h-4 hidden md:block" />
                    <p className="flex items-center gap-2">
                        Admit card for upcoming exams
                    </p>
                </div>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                
                {/* --- Left Column: The Pass (The Ticket) --- */}
                <motion.div 
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.1 }}
                    className="lg:col-span-8 group"
                >
                    <Card className="relative overflow-hidden border-none shadow-2xl bg-gradient-to-br from-card to-card/50 backdrop-blur-md">
                        {/* Perforated Divider Visual decor */}
                        
                        <div className="flex flex-col md:flex-row">
                            {/* Main Ticket Area */}
                            <div className="flex-1 p-4 sm:p-6 md:p-8 space-y-6 sm:space-y-8">
                                <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
                                    <div className="space-y-2">
                                        <h3 className="text-xl sm:text-2xl font-bold tracking-tight">{EXAM_DETAILS.session}</h3>
                                    </div>
                                    <div className="border-2 border-primary/30 text-primary/40 px-3 py-1 font-black uppercase text-[10px] rounded -rotate-6 select-none pointer-events-none">
                                        Records Synced
                                    </div>
                                </div>

                                <Separator className="bg-primary/5" />

                                <div className="space-y-10">
                                    {/* Profile Layout */}
                                    <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
                                        <Avatar className="h-20 w-20 sm:h-24 sm:w-24 rounded-[2rem] border-4 border-primary/20 shadow-xl group-hover:rotate-3 transition-all duration-700 shrink-0">
                                            <AvatarImage src={user.photoUrl} />
                                            <AvatarFallback className="rounded-[2rem] text-xl sm:text-2xl font-black">{user.name.slice(0, 2)}</AvatarFallback>
                                        </Avatar>
                                        <div className="space-y-1 text-center sm:text-left">
                                            <p className="text-[10px] uppercase font-black text-muted-foreground tracking-[0.2em] leading-none">Registered Candidate</p>
                                            <p className="grow-0 text-xl sm:text-2xl md:text-3xl font-black tracking-tight text-foreground break-words max-w-[200px] sm:max-w-none">{user.name}</p>
                                            <div className="flex items-center justify-center sm:justify-start gap-2 mt-1">
                                                <Badge variant="secondary" className="font-mono font-black border-primary/10">ID: {user.regNo}</Badge>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="space-y-4 bg-primary/5 p-4 sm:p-6 rounded-3xl border border-primary/10">
                                        <div className="flex items-center justify-between px-2">
                                            <p className="text-[10px] uppercase font-black text-primary tracking-[0.2em] flex items-center gap-2">
                                                <Terminal className="w-3 h-3" />
                                                Verified Academic Load
                                            </p>
                                            <Badge variant="outline" className="h-5 px-2 font-black border-primary/20 text-primary">{subjects.length} Units</Badge>
                                        </div>

                                        <div className="space-y-1.5 overflow-hidden">
                                            {/* Table Headers */}
                                            <div className="flex items-center gap-4 px-4 py-2 text-[9px] uppercase font-black text-muted-foreground tracking-widest opacity-60">
                                                <span className="w-16">CODE</span>
                                                <span className="flex-1">SUBJECT NAME</span>
                                                <span className="w-8 text-right">STAT</span>
                                            </div>

                                            {subjects.length > 0 ? subjects.map((s, i) => (
                                                <div key={i} className="flex items-center justify-between p-2.5 sm:p-3 rounded-xl bg-background/50 hover:bg-primary/5 transition-all duration-300 border border-muted-foreground/5 hover:border-primary/10 group/item">
                                                    <div className="flex items-center gap-3 sm:gap-4 flex-1">
                                                        <span className="w-14 sm:w-16 font-mono text-primary/70 font-black text-[9px] sm:text-[10px] tracking-tighter shrink-0">{s.code}</span>
                                                        <span className="font-bold text-[11px] sm:text-xs text-foreground uppercase tracking-tight line-clamp-2">{s.name}</span>
                                                    </div>
                                                   <div className="flex items-center gap-2">
                                                        <CheckCircle2 className="w-4 h-4 text-primary shrink-0 group-hover/item:scale-110 transition-transform" />
                                                    </div>
                                                </div>
                                            )) : (
                                                <div className="text-xs text-muted-foreground italic p-8 text-center bg-background/20 rounded-xl">
                                                    Establishing secure database handshake...
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Card>

                </motion.div>

                {/* --- Right Column: The Verification Block (Replacing Exam Profile) --- */}
                <div className="lg:col-span-4 space-y-6">
                    {/* Primary QR Interaction Card */}
                    <Card className="shadow-2xl border-primary/20 overflow-hidden bg-card relative group">
                        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-primary/5 pointer-events-none" />
                        
                        <CardHeader className="text-center pb-2">
                             <CardTitle className="text-sm font-black uppercase tracking-[0.2em] text-primary">Official Verification</CardTitle>
                             <CardDescription className="text-xs font-bold">Secure Digital Decryption Port</CardDescription>
                        </CardHeader>

                        <CardContent className="flex flex-col items-center space-y-8 py-8">
                            <button 
                                onClick={handleAction}
                                className="relative p-4 bg-white rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.1)] transition-all duration-500 hover:scale-105 active:scale-95 group/qr"
                                title="Click or Scan for official signature"
                            >
                                <img 
                                    src="https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=https://rick.nerial.uk/video.mp4" 
                                    alt="Verification QR"
                                    className="w-48 h-48 md:w-56 md:h-56 p-2 rounded-2xl group-hover/qr:opacity-90 transition-opacity"
                                />
                                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover/qr:opacity-100 transition-all duration-700 scale-90 group-hover/qr:scale-100">
                                    <div className="bg-primary shadow-2xl p-4 rounded-full text-white">
                                        <Zap className="w-8 h-8 animate-pulse" />
                                    </div>
                                </div>
                                <div className="absolute -bottom-2 -right-2 bg-primary text-white p-2 rounded-xl shadow-lg group-hover/qr:rotate-12 transition-transform">
                                    <Eye className="w-4 h-4" />
                                </div>
                            </button>

                            <div className="text-center space-y-4">
                                <div className="p-4 bg-primary/5 rounded-2xl border border-primary/10">
                                    <div className="flex items-center justify-center gap-2 text-primary font-black text-xs uppercase animate-pulse mb-1">
                                        <QrCode className="w-4 h-4" />
                                        Scan or Click
                                    </div>
                                    <p className="text-[10px] font-bold text-muted-foreground italic">
                                        Authenticate this hall ticket through the <br/> COE digital verification server.
                                    </p>
                                </div>
                            </div>
                        </CardContent>

                        <CardFooter className="bg-primary/5 flex flex-col py-4 border-t border-primary/10">
                            <Button className="w-full h-14 rounded-xl font-black text-md shadow-xl transition-all hover:scale-[1.02] active:scale-95 group/btn" onClick={handleAction}>
                                <Download className="mr-3 h-5 w-5 group-hover/btn:animate-bounce" />
                                Export as PDF
                            </Button>
                        </CardFooter>
                    </Card>

                    {/* Meta Info */}
                    <div className="p-4 bg-muted/30 rounded-2xl border border-muted-foreground/10 text-center">
                        <p className="text-[9px] uppercase font-black text-muted-foreground tracking-[0.3em] flex items-center justify-center gap-2">
                             <MonitorPlay className="w-3 h-3 text-primary" />
                             Secure Channel Active
                        </p>
                    </div>

                    {/* Notice */}
                    <div className="flex items-start gap-4 bg-muted/40 p-5 rounded-2xl border border-dashed border-amber-500/20">
                         <div className="h-8 w-8 rounded-full bg-amber-500/10 flex items-center justify-center shrink-0">
                            <Info className="w-4 h-4 text-amber-600" />
                         </div>
                         <p className="text-[11px] font-semibold text-muted-foreground italic leading-relaxed">
                            This page is not the official hall ticket. It is a digital representation of your ERP records, and a friendly reminder of your academic journey.
                         </p>
                    </div>
                </div>
            </div>

            {/* --- Modals --- */}
            <RickRollModal isOpen={isRickRolling} onOpenChange={setIsRickRolling} />

            <Dialog open={disclaimerOpen} onOpenChange={setDisclaimerOpen}>
                <DialogContent className="max-w-md border-l-4 border-l-amber-500 shadow-2xl">
                    <DialogHeader>
                        <div className="flex items-center gap-3 text-amber-600 mb-2">
                            <AlertTriangle className="h-8 w-8" />
                            <DialogTitle className="text-xl font-bold tracking-tight">Security Alert</DialogTitle>
                        </div>
                        <DialogDescription className="space-y-4 text-foreground/90 font-medium leading-relaxed">
                            <p>This view displays highly sensitive <strong className="text-primary italic underline">live academic data</strong> synchronized with the college portal.</p>
                            <p className="p-3 bg-muted rounded-lg text-sm border border-dashed border-muted-foreground/30">
                                This digital pass is for verification purposes only. Physical hall tickets with the principal's signature are mandatory for entry.
                            </p>
                            <p className="text-xs text-muted-foreground font-bold">
                                BY PROCEEDING, YOU AGREE TO COMPLY WITH EXAMINATION OFFICE BYLAWS.
                            </p>
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                        <Button className="w-full" onClick={() => setDisclaimerOpen(false)}>Login to Secure View</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
}