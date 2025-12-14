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
    TrendingUp 
} from "lucide-react";
import { cn } from "@/lib/utils";

// --- Data ---
const subjectData = [
    { code: "BS20404", name: "MICROPROCESSORS AND MICROCONTROLLERS", total: 15, present: 9, absent: 6, pct: 60.00 },
    { code: "BS23401", name: "PROBABILITY AND STATISTICS", total: 19, present: 10, absent: 9, pct: 52.63 },
    { code: "BS23406", name: "DATABASE MANAGEMENT SYSTEM", total: 12, present: 7, absent: 5, pct: 58.33 },
    { code: "BS23409", name: "DATABASE MANAGEMENT SYSTEMS [PR]", total: 8, present: 2, absent: 6, pct: 25.00 },
    { code: "CS18407", name: "MICROPROCESSORS SYSTEMS AND APPS [PR]", total: 4, present: 2, absent: 2, pct: 50.00 },
    { code: "CS18408", name: "OBJECT ORIENTED SYSTEMS DEV [PR]", total: 8, present: 4, absent: 4, pct: 50.00 },
    { code: "CS20405", name: "OBJECT ORIENTED SYSTEMS DEVELOPMENT", total: 16, present: 10, absent: 6, pct: 62.50 },
    { code: "CS23402", name: "COMPUTER ORGANIZATION", total: 11, present: 6, absent: 5, pct: 54.55 },
    { code: "CS23403", name: "WEB TECHNOLOGIES", total: 10, present: 5, absent: 5, pct: 50.00 },
    { code: "CS23410", name: "WEB TECHNOLOGIES [PR]", total: 8, present: 6, absent: 2, pct: 75.00 },
];

const cumulativeData = [
    { month: "Nov-2025", present: 49, absent: 18, odP: 0, odA: 0, med: 0, cas: 0 },
    { month: "Dec-2025", present: 12, absent: 32, odP: 0, odA: 0, med: 0, cas: 0 },
];

// --- Calculations ---
const calculateStatus = (pct: number) => {
    if (pct >= 75) return { color: "bg-green-600", text: "text-green-600", bg: "bg-green-50 dark:bg-green-900/10", label: "Safe" };
    if (pct >= 65) return { color: "bg-yellow-500", text: "text-yellow-600", bg: "bg-yellow-50 dark:bg-yellow-900/10", label: "Warning" };
    return { color: "bg-destructive", text: "text-destructive", bg: "bg-red-50 dark:bg-red-900/10", label: "Critical" };
};

const getClassesToRecover = (total: number, present: number) => {
    const needed = Math.ceil((0.75 * total - present) / 0.25);
    return needed > 0 ? needed : 0;
};

export default function Attendance() {
    const grandTotal = 111;
    const grandPresent = 61;
    const grandAbsent = 50;
    const grandPct = 54.95;

    return (
        <div className="space-y-8 animate-in fade-in-50 duration-500">
            {/* Page Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h2 className="text-3xl font-bold tracking-tight">Attendance Details</h2>
                    <p className="text-muted-foreground mt-1">
                        Tracking period: <span className="font-semibold text-foreground">14/Nov/2025</span> to <span className="font-semibold text-foreground">12/Dec/2025</span>
                    </p>
                </div>
                
                {grandPct < 75 && (
                    <Alert variant="destructive" className="max-w-lg bg-red-50 dark:bg-red-900/10 border-red-200 dark:border-red-900">
                        <AlertTriangle className="h-4 w-4" />
                        <AlertTitle>Attendance Shortage Warning</AlertTitle>
                        <AlertDescription>
                            Your overall attendance is <strong>{grandPct}%</strong>. You need to attend upcoming classes to avoid detainment (75% Required).
                        </AlertDescription>
                    </Alert>
                )}
            </div>

            {/* Metric Cards */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                 <Card className="bg-primary text-primary-foreground shadow-lg border-none col-span-2 md:col-span-1">
                    <CardHeader className="pb-2">
                        <CardDescription className="text-primary-foreground/80 font-medium">Overall Percentage</CardDescription>
                        <CardTitle className="text-4xl font-bold">{grandPct}%</CardTitle>
                    </CardHeader>
                    <CardFooter className="text-xs text-primary-foreground/60">
                        Status: {grandPct < 65 ? "Detained List" : grandPct < 75 ? "Condonation Required" : "Promoted"}
                    </CardFooter>
                 </Card>

                 <Card>
                    <CardHeader className="pb-2">
                        <CardDescription>Classes Conducted</CardDescription>
                        <CardTitle className="flex items-center gap-2 text-2xl">
                            <Clock className="w-5 h-5 text-muted-foreground" /> 
                            {grandTotal}
                        </CardTitle>
                    </CardHeader>
                    <CardFooter className="text-xs text-muted-foreground">Academic hours total</CardFooter>
                 </Card>

                 <Card>
                    <CardHeader className="pb-2">
                        <CardDescription>Classes Present</CardDescription>
                        <CardTitle className="flex items-center gap-2 text-2xl text-green-600 dark:text-green-500">
                            <CheckCircle2 className="w-5 h-5" /> 
                            {grandPresent}
                        </CardTitle>
                    </CardHeader>
                    <CardFooter className="text-xs text-muted-foreground">Total hours attended</CardFooter>
                 </Card>

                 <Card>
                    <CardHeader className="pb-2">
                        <CardDescription>Classes Absent</CardDescription>
                        <CardTitle className="flex items-center gap-2 text-2xl text-destructive">
                            <XCircle className="w-5 h-5" /> 
                            {grandAbsent}
                        </CardTitle>
                    </CardHeader>
                    <CardFooter className="text-xs text-muted-foreground">~{Math.round(grandAbsent / 7)} days lost</CardFooter>
                 </Card>
            </div>

            {/* Subject Table */}
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
                            {subjectData.map((sub) => {
                                const status = calculateStatus(sub.pct);
                                const recover = getClassesToRecover(sub.total, sub.present);

                                return (
                                    <TableRow key={sub.code}>
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
                                                <Badge variant="destructive" className="whitespace-nowrap font-normal text-xs">
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
                            {cumulativeData.map((row) => (
                                <TableRow key={row.month}>
                                    <TableCell className="font-medium">{row.month}</TableCell>
                                    <TableCell className="text-center font-bold">{row.present}</TableCell>
                                    <TableCell className="text-center font-bold text-muted-foreground">{row.absent}</TableCell>
                                </TableRow>
                            ))}
                             <TableRow className="bg-muted/50 font-bold border-t-2">
                                <TableCell>Total</TableCell>
                                <TableCell className="text-center text-green-700">{61}</TableCell>
                                <TableCell className="text-center text-red-700">{50}</TableCell>
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