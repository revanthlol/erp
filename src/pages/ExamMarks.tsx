import { useState, useEffect } from "react";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Award, Calculator, TrendingUp, Calendar, Loader2, AlertTriangle } from "lucide-react";
import { cn } from "@/lib/utils";
import { authApi } from "@/lib/api";

// Matches backend interface
interface ExamResult {
    sem: string;
    month: string;
    part: string;
    subPart: string;
    code: string;
    name: string;
    credit: number;
    point: number;
    grade: string;
    result: string;
}

export default function ExamMarks() {
    const [allData, setAllData] = useState<ExamResult[]>([]);
    const [selectedSem, setSelectedSem] = useState<string>("3"); // Default usually calculated
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    // Load Data
    useEffect(() => {
        const fetch = async () => {
            setLoading(true);
            try {
                const data = await authApi.getExams();
                if (Array.isArray(data)) {
                    setAllData(data);
                    // Auto-select most recent semester
                    const sems = [...new Set(data.map((d: any) => d.sem))].sort();
                    if(sems.length) setSelectedSem(sems[sems.length - 1]);
                }
            } catch (err) {
                console.error(err);
                setError("Failed to load examination records.");
            } finally {
                setLoading(false);
            }
        };
        fetch();
    }, []);

    // Filter logic
    const filteredData = allData.filter(sub => sub.sem === selectedSem);
    const sessionName = filteredData.length > 0 ? filteredData[0].month : "N/A";

    // Stats Logic
    const totalCredits = filteredData.reduce((acc, curr) => acc + curr.credit, 0);
    // Ignore subjects with 0 credit or special codes if points are 0
    const validGradedData = filteredData.filter(d => d.point >= 0 && d.grade !== '-' && d.grade !== ''); 
    
    // Weighted Average for SGPA: sum(credit * point) / sum(credit)
    const weightedPoints = validGradedData.reduce((acc, curr) => acc + (curr.point * curr.credit), 0);
    const gradedCredits = validGradedData.reduce((acc, curr) => acc + curr.credit, 0);
    
    const sgpa = gradedCredits > 0 ? (weightedPoints / gradedCredits).toFixed(2) : "0.00";
    
    const hasBacklog = filteredData.some(d => d.result !== "PASS" && d.result !== "Promoted");

    // Badge styling
    const getGradeStyle = (grade: string) => {
        switch(grade.trim().toUpperCase()) {
            case 'O': return "bg-emerald-100 text-emerald-700 border-emerald-200 dark:bg-emerald-900/30 dark:text-emerald-400";
            case 'A': return "bg-blue-100 text-blue-700 border-blue-200 dark:bg-blue-900/30 dark:text-blue-400";
            case 'B': return "bg-cyan-100 text-cyan-700 border-cyan-200 dark:bg-cyan-900/30 dark:text-cyan-400";
            case 'C': return "bg-yellow-100 text-yellow-700 border-yellow-200 dark:bg-yellow-900/30 dark:text-yellow-400";
            case 'D': return "bg-orange-100 text-orange-700 border-orange-200";
            case 'F': return "bg-red-100 text-red-700 border-red-200 dark:bg-red-900/30 dark:text-red-400";
            default: return "bg-muted text-muted-foreground";
        }
    };

    if (loading) return (
        <div className="flex h-[50vh] w-full items-center justify-center gap-2 text-muted-foreground animate-pulse">
            <Loader2 className="h-6 w-6 animate-spin" /> Loading exam results...
        </div>
    );

    if (error && allData.length === 0) return (
        <div className="flex h-[50vh] w-full flex-col items-center justify-center gap-4 text-destructive">
            <AlertTriangle className="h-8 w-8" /> {error}
        </div>
    );

    return (
        <div className="space-y-6 animate-in fade-in-50 duration-500 pb-10">
            {/* Header with Control */}
            <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
                <div>
                    <h2 className="text-3xl font-bold tracking-tight">Exam Mark Details</h2>
                    <p className="text-muted-foreground mt-1">Semester End Examinations (SEE) Reports</p>
                </div>
                <Select value={selectedSem} onValueChange={setSelectedSem}>
                    <SelectTrigger className="w-[180px] h-10 border-primary/20">
                        <SelectValue placeholder="Select Semester" />
                    </SelectTrigger>
                    <SelectContent>
                        {/* Dynamic Semesters */}
                        {[...new Set(allData.map(d => d.sem))].sort((a,b)=>Number(a)-Number(b)).map(sem => (
                            <SelectItem key={sem} value={sem}>Semester {sem}</SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>

            {/* Performance Dashboard */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                 {/* SGPA Card */}
                 <Card className="col-span-2 md:col-span-1 shadow-md bg-gradient-to-br from-primary/10 to-transparent border-primary/20">
                     <CardContent className="flex flex-col items-center justify-center p-6 text-center h-full">
                        <div className="mb-2 p-2 bg-primary/20 rounded-full text-primary">
                             <Calculator className="w-6 h-6" />
                        </div>
                        <span className="text-4xl font-extrabold tracking-tighter text-foreground">{sgpa}</span>
                        <span className="text-xs uppercase tracking-widest text-muted-foreground font-semibold mt-1">SGPA Score</span>
                     </CardContent>
                 </Card>

                 {/* Session Info */}
                 <Card className="col-span-2 md:col-span-1 shadow-sm">
                     <CardContent className="flex flex-col justify-center p-6 h-full gap-1">
                        <div className="flex items-center gap-2 text-muted-foreground mb-2">
                             <Calendar className="w-4 h-4" />
                             <span className="text-xs uppercase font-semibold">Session</span>
                        </div>
                        <span className="text-xl font-bold">{sessionName}</span>
                        <span className="text-xs text-muted-foreground">Regular & Supply</span>
                     </CardContent>
                 </Card>

                 {/* Credits Info */}
                 <Card className="shadow-sm">
                     <CardContent className="p-6 flex flex-col justify-center h-full">
                         <div className="flex items-center gap-2 text-muted-foreground mb-1">
                             <Award className="w-4 h-4" />
                             <span className="text-xs uppercase font-semibold">Total Credits</span>
                         </div>
                         <div className="flex items-baseline gap-1">
                            <span className="text-2xl font-bold">{totalCredits}</span>
                         </div>
                         <p className="text-[10px] text-muted-foreground">Registered for Semester {selectedSem}</p>
                     </CardContent>
                 </Card>

                 {/* Result Status */}
                 <Card className={`shadow-sm border-l-4 ${hasBacklog ? "border-l-red-500" : "border-l-green-500"}`}>
                     <CardContent className="p-6 flex flex-col justify-center h-full">
                         <div className="flex items-center gap-2 text-muted-foreground mb-1">
                             <TrendingUp className="w-4 h-4" />
                             <span className="text-xs uppercase font-semibold">Overall Result</span>
                         </div>
                         <div className="flex items-center gap-2">
                             <span className={`text-xl font-bold ${hasBacklog ? "text-red-600" : "text-green-600"}`}>
                                 {hasBacklog ? "FAIL / ARREAR" : "PROMOTED"}
                             </span>
                         </div>
                     </CardContent>
                 </Card>
            </div>

            {/* Main Data Table */}
            <div className="rounded-md border bg-card shadow-sm overflow-hidden">
                <Table>
                    <TableHeader className="bg-muted/40">
                        <TableRow>
                            <TableHead className="w-[80px]">Part</TableHead>
                            <TableHead className="w-[100px] hidden sm:table-cell">Code</TableHead>
                            <TableHead className="min-w-[200px]">Description</TableHead>
                            <TableHead className="text-center w-[80px]">Credits</TableHead>
                            <TableHead className="text-center w-[80px]">Points</TableHead>
                            <TableHead className="text-center w-[80px]">Grade</TableHead>
                            <TableHead className="text-right w-[100px]">Result</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {filteredData.length > 0 ? filteredData.map((row, idx) => (
                            <TableRow key={idx}>
                                <TableCell className="font-medium text-xs text-muted-foreground">
                                    {row.part}
                                    <span className="block text-[9px] text-muted-foreground/60">{row.subPart}</span>
                                </TableCell>
                                <TableCell className="font-mono text-xs font-semibold hidden sm:table-cell">
                                    {row.code}
                                </TableCell>
                                <TableCell className="text-sm font-medium">
                                    <div className="flex flex-col sm:flex-row sm:items-center gap-1.5">
                                        {row.name}
                                        {row.name.toUpperCase().includes("[PR]") && (
                                            <Badge variant="outline" className="text-[9px] py-0 h-4 border-purple-200 text-purple-700 bg-purple-50">Lab</Badge>
                                        )}
                                    </div>
                                    <span className="sm:hidden text-[10px] text-muted-foreground font-mono mt-1 block">{row.code}</span>
                                </TableCell>
                                <TableCell className="text-center text-muted-foreground font-mono text-sm">
                                    {row.credit}
                                </TableCell>
                                <TableCell className="text-center font-bold font-mono text-sm">
                                    {row.point.toFixed(2)}
                                </TableCell>
                                <TableCell className="text-center">
                                    <div className={cn("inline-flex items-center justify-center rounded-md text-xs font-bold w-8 h-6", getGradeStyle(row.grade))}>
                                        {row.grade}
                                    </div>
                                </TableCell>
                                <TableCell className="text-right">
                                    <Badge 
                                        variant="outline" 
                                        className={row.result === 'PASS' 
                                            ? "text-green-600 border-green-200 bg-green-50 dark:bg-green-900/10 text-[10px]" 
                                            : "text-red-600 border-red-200 bg-red-50 text-[10px]"
                                        }
                                    >
                                        {row.result}
                                    </Badge>
                                </TableCell>
                            </TableRow>
                        )) : (
                            <TableRow>
                                <TableCell colSpan={7} className="h-40 text-center text-muted-foreground">
                                    Select a semester to view results
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>

            <div className="text-[10px] text-center text-muted-foreground pt-4 pb-4 border-t border-border/40 max-w-2xl mx-auto leading-relaxed">
                <p>Disclaimer: The Grade Points shown here are derived from the web portal and are for informational purposes only. The official memorandum of marks issued by the institution is the final document.</p>
            </div>
        </div>
    );
}