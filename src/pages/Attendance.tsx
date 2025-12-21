import { useState, useEffect } from "react";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { 
    AlertTriangle, 
    CheckCircle2, 
    XCircle, 
    CalendarDays, 
    Clock, 
    AlertCircle, 
    TrendingUp,
    Loader2 // Only adding this for the initial loading state
} from "lucide-react";
import { cn } from "@/lib/utils";
import { authApi } from "@/lib/api";

// Matching your backend interfaces
interface AttendanceRecord {
    code: string;
    name: string;
    total: number;
    present: number;
    absent: number;
    pct: number;
}

interface AttendanceHistory {
    month: string;
    present: number;
    absent: number;
}

export default function Attendance() {
    // State management
    const [subjects, setSubjects] = useState<AttendanceRecord[]>([]);
    const [history, setHistory] = useState<AttendanceHistory[]>([]);
    const [meta, setMeta] = useState({ total: 0, present: 0, absent: 0, pct: 0 });
    const [isLoading, setIsLoading] = useState(true);

    // Initial Fetch
    useEffect(() => {
        const loadData = async () => {
            setIsLoading(true);
            try {
                const data: any = await authApi.getAttendance();
                
                // Safety checks to prevent crashes
                setSubjects(data.subjects || []);
                setHistory(data.history || []);
                setMeta(data.meta || { total: 0, present: 0, absent: 0, pct: 0 });
            } catch (err) {
                console.error("Failed to load attendance", err);
            } finally {
                setIsLoading(false);
            }
        };
        loadData();
    }, []);

    // --- Calculations from your original file ---
    const calculateStatus = (pct: number) => {
        if (pct >= 75) return { color: "bg-green-600", text: "text-green-600", bg: "bg-green-50 dark:bg-green-900/10", label: "Safe" };
        if (pct >= 65) return { color: "bg-yellow-500", text: "text-yellow-600", bg: "bg-yellow-50 dark:bg-yellow-900/10", label: "Warning" };
        return { color: "bg-destructive", text: "text-destructive", bg: "bg-red-50 dark:bg-red-900/10", label: "Critical" };
    };

    const getClassesToRecover = (total: number, present: number) => {
        const needed = Math.ceil((0.75 * total - present) / 0.25);
        return needed > 0 ? needed : 0;
    };

    // --- Determine Dates for Header (Logic adapted for scraped data) ---
    const startDate = history.length > 0 ? history[0].month : "Term Start";
    const endDate = "Present";

    if (isLoading) {
         return (
             <div className="flex h-[50vh] w-full items-center justify-center gap-2 text-muted-foreground animate-pulse">
                <Loader2 className="h-6 w-6 animate-spin" /> Retrieving attendance records...
             </div>
         );
    }

    return (
        <div className="space-y-8 animate-in fade-in-50 duration-500">
            {/* Page Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h2 className="text-3xl font-bold tracking-tight">Attendance Details</h2>
                    <p className="text-muted-foreground mt-1">
                        Tracking period: <span className="font-semibold text-foreground">{startDate}</span> to <span className="font-semibold text-foreground">{endDate}</span>
                    </p>
                </div>
                
                {meta.pct < 75 && meta.pct > 0 && (
                    <Alert variant="destructive" className="max-w-lg bg-red-50 dark:bg-red-900/10 border-red-200 dark:border-red-900">
                        <AlertTriangle className="h-4 w-4" />
                        <AlertTitle>Attendance Shortage Warning</AlertTitle>
                        <AlertDescription>
                            Your overall attendance is <strong>{meta.pct}%</strong>. You need to attend upcoming classes to avoid detainment (75% Required).
                        </AlertDescription>
                    </Alert>
                )}
            </div>

            {/* Metric Cards - RESTORED ORIGINAL LAYOUT */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                 <Card className="bg-primary text-primary-foreground shadow-lg border-none col-span-2 md:col-span-1">
                    <CardHeader className="pb-2">
                        <CardDescription className="text-primary-foreground/80 font-medium">Overall Percentage</CardDescription>
                        <CardTitle className="text-4xl font-bold">{meta.pct.toFixed(2)}%</CardTitle>
                    </CardHeader>
                    <CardFooter className="text-xs text-primary-foreground/60">
                        Status: {meta.pct < 65 ? "Detained List" : meta.pct < 75 ? "Condonation Required" : "Promoted"}
                    </CardFooter>
                 </Card>

                 <Card>
                    <CardHeader className="pb-2">
                        <CardDescription>Classes Conducted</CardDescription>
                        <CardTitle className="flex items-center gap-2 text-2xl">
                            <Clock className="w-5 h-5 text-muted-foreground" /> 
                            {meta.total}
                        </CardTitle>
                    </CardHeader>
                    <CardFooter className="text-xs text-muted-foreground">Academic hours total</CardFooter>
                 </Card>

                 <Card>
                    <CardHeader className="pb-2">
                        <CardDescription>Classes Present</CardDescription>
                        <CardTitle className="flex items-center gap-2 text-2xl text-green-600 dark:text-green-500">
                            <CheckCircle2 className="w-5 h-5" /> 
                            {meta.present}
                        </CardTitle>
                    </CardHeader>
                    <CardFooter className="text-xs text-muted-foreground">Total hours attended</CardFooter>
                 </Card>

                 <Card>
                    <CardHeader className="pb-2">
                        <CardDescription>Classes Absent</CardDescription>
                        <CardTitle className="flex items-center gap-2 text-2xl text-destructive">
                            <XCircle className="w-5 h-5" /> 
                            {meta.absent}
                        </CardTitle>
                    </CardHeader>
                    <CardFooter className="text-xs text-muted-foreground">~{Math.round(meta.absent / 7)} days lost</CardFooter>
                 </Card>
            </div>

            {/* Subject Table - RESTORED ORIGINAL COLUMNS */}
            <Card className="shadow-sm border">
                <CardHeader>
                    <CardTitle>Subject-wise Breakdown</CardTitle>
                    <CardDescription>Analysis per subject based on 75% requirement</CardDescription>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow className="bg-muted/50 hover:bg-muted/50">
                                <TableHead className="w-[80px]">Code</TableHead>
                                <TableHead className="min-w-[200px]">Subject Name</TableHead>
                                <TableHead className="text-center hidden sm:table-cell">Hours (P/T)</TableHead>
                                <TableHead className="w-[180px]">Status</TableHead>
                                <TableHead className="text-right">Action Plan</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {subjects.map((sub, idx) => {
                                const status = calculateStatus(sub.pct);
                                const recover = getClassesToRecover(sub.total, sub.present);

                                return (
                                    <TableRow key={idx}>
                                        <TableCell className="font-mono font-medium text-xs text-muted-foreground">
                                            {sub.code}
                                        </TableCell>
                                        <TableCell className="font-medium text-sm">
                                            <div className="flex flex-col">
                                                <span>{sub.name}</span>
                                                <span className="sm:hidden text-xs text-muted-foreground mt-1">
                                                    {sub.present} / {sub.total} classes
                                                </span>
                                            </div>
                                        </TableCell>
                                        <TableCell className="text-center text-sm hidden sm:table-cell">
                                            <span className="font-bold">{sub.present}</span>
                                            <span className="text-muted-foreground"> / {sub.total}</span>
                                        </TableCell>
                                        <TableCell>
                                            <div className="space-y-1.5">
                                                <div className="flex justify-between text-xs">
                                                    <span className={status.text + " font-bold"}>{sub.pct.toFixed(1)}%</span>
                                                </div>
                                                <Progress 
                                                    value={sub.pct} 
                                                    className={cn("h-2", status.bg)} 
                                                    indicatorClassName={status.color} 
                                                />
                                            </div>
                                        </TableCell>
                                        <TableCell className="text-right">
                                            {recover > 0 ? (
                                                <Badge variant="destructive" className="whitespace-nowrap font-normal text-xs animate-pulse">
                                                    Attend next {recover}
                                                </Badge>
                                            ) : (
                                                <Badge variant="outline" className="text-green-600 border-green-200 bg-green-50 dark:bg-green-900/20 font-normal text-xs">
                                                    On Track
                                                </Badge>
                                            )}
                                        </TableCell>
                                    </TableRow>
                                )
                            })}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>

            {/* Monthly History */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="border">
                    <CardHeader className="pb-3 border-b bg-muted/20">
                         <div className="flex items-center gap-2">
                             <CalendarDays className="w-5 h-5 text-muted-foreground" />
                             <CardTitle className="text-base">Attendance History</CardTitle>
                         </div>
                    </CardHeader>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Month</TableHead>
                                <TableHead className="text-center text-green-600">Present</TableHead>
                                <TableHead className="text-center text-red-500">Absent</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {history.filter(row => !row.month.includes("Total")).map((row) => (
                                <TableRow key={row.month}>
                                    <TableCell className="font-medium">{row.month}</TableCell>
                                    <TableCell className="text-center font-bold">{row.present}</TableCell>
                                    <TableCell className="text-center font-bold text-muted-foreground">{row.absent}</TableCell>
                                </TableRow>
                            ))}
                             <TableRow className="bg-muted/50 font-bold border-t-2">
                                <TableCell>Total</TableCell>
                                <TableCell className="text-center text-green-700">{meta.present}</TableCell>
                                <TableCell className="text-center text-red-700">{meta.absent}</TableCell>
                             </TableRow>
                        </TableBody>
                    </Table>
                </Card>

                <Card className="border">
                     <CardHeader className="pb-3 border-b bg-muted/20">
                         <div className="flex items-center gap-2">
                             <TrendingUp className="w-5 h-5 text-muted-foreground" />
                             <CardTitle className="text-base">Co-Curricular / Medical</CardTitle>
                         </div>
                    </CardHeader>
                    <div className="h-[200px] flex flex-col items-center justify-center text-center p-4 gap-2">
                        <div className="h-12 w-12 rounded-full bg-muted flex items-center justify-center">
                            <AlertCircle className="w-6 h-6 text-muted-foreground" />
                        </div>
                        <h4 className="font-semibold text-sm">No Events Recorded</h4>
                        <p className="text-xs text-muted-foreground max-w-[250px]">
                            Attendance credit for Medical leave, On-Duty (OD), Sports, or NCC/NSS activities will be displayed here.
                        </p>
                    </div>
                </Card>
            </div>
        </div>
    );
}