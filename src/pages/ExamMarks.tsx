import { useState } from "react";
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
import { Award, Calculator, TrendingUp, Calendar } from "lucide-react";
import { cn } from "@/lib/utils";

// Raw Data from your request
const MARK_DATA = [
    // Semester 1
    { sem: "1", month: "NOV 2024", part: "I", code: "EN23101", name: "GENERAL ENGLISH - I", credit: 3, point: 9.00, grade: "A", result: "PASS" },
    { sem: "1", month: "NOV 2024", part: "I", code: "VE18101", name: "VALUE EDUCATION AND PERSONALITY DEV", credit: 2, point: 9.00, grade: "A", result: "PASS" },
    { sem: "1", month: "NOV 2024", part: "II", code: "BS19101", name: "MATHEMATICS - I", credit: 4, point: 8.00, grade: "B", result: "PASS" },
    { sem: "1", month: "NOV 2024", part: "II", code: "BS19123", name: "PROBLEM SOLVING AND PROGRAMMING IN C", credit: 4, point: 9.00, grade: "A", result: "PASS" },
    { sem: "1", month: "NOV 2024", part: "II", code: "BS19124", name: "C PROGRAMMING [PR]", credit: 1, point: 10.00, grade: "O", result: "PASS" },
    { sem: "1", month: "NOV 2024", part: "II", code: "CS18102", name: "ELECTRONIC DEVICES AND CIRCUITS [PR]", credit: 1, point: 9.00, grade: "A", result: "PASS" },
    { sem: "1", month: "NOV 2024", part: "II", code: "CS22102", name: "ELECTRONIC DEVICES AND CIRCUITS", credit: 4, point: 8.00, grade: "B", result: "PASS" },
    { sem: "1", month: "NOV 2024", part: "II", code: "BS19121", name: "ENGINEERING PHYSICS", credit: 4, point: 8.00, grade: "B", result: "PASS" },
    { sem: "1", month: "NOV 2024", part: "II", code: "BS19122", name: "ENGINEERING PHYSICS [PR]", credit: 1, point: 10.00, grade: "O", result: "PASS" },
    
    // Semester 2
    { sem: "2", month: "APR 2025", part: "I", code: "EN23201", name: "GENERAL ENGLISH - II", credit: 3, point: 8.00, grade: "B", result: "PASS" },
    { sem: "2", month: "APR 2025", part: "I", code: "IC23201", name: "INDIAN HERITAGE AND CULTURE", credit: 2, point: 9.00, grade: "A", result: "PASS" },
    { sem: "2", month: "APR 2025", part: "II", code: "BS18201", name: "MATHEMATICS - II", credit: 4, point: 9.00, grade: "A", result: "PASS" },
    { sem: "2", month: "APR 2025", part: "II", code: "BS19204", name: "C PLUS PLUS WITH DATA STRUCTURES [PR]", credit: 1, point: 10.00, grade: "O", result: "PASS" },
    { sem: "2", month: "APR 2025", part: "II", code: "BS22202", name: "C PLUS PLUS WITH DATA STRUCTURES", credit: 4, point: 9.00, grade: "A", result: "PASS" },
    { sem: "2", month: "APR 2025", part: "II", code: "BS22204", name: "LOGIC AND DIGITAL CIRCUITS", credit: 4, point: 9.00, grade: "A", result: "PASS" },
    { sem: "2", month: "APR 2025", part: "II", code: "BS22206", name: "LOGIC AND DIGITAL CIRCUITS [PR]", credit: 1, point: 10.00, grade: "O", result: "PASS" },
    { sem: "2", month: "APR 2025", part: "II", code: "BS18229", name: "ENGINEERING DRAWING & WORKSHOP [PR]", credit: 3, point: 8.00, grade: "B", result: "PASS" },
    { sem: "2", month: "APR 2025", part: "III", code: "PL18001", name: "PLANET", credit: 1, point: 0, grade: "-", result: "PASS" }, // Point 0 handled

    // Semester 3
    { sem: "3", month: "NOV 2025", part: "I", code: "ES23301", name: "ENV. STUDIES AND GENDER SENSITIZATION", credit: 3, point: 9.00, grade: "A", result: "PASS" },
    { sem: "3", month: "NOV 2025", part: "II", code: "BS18330", name: "OPERATING SYSTEMS", credit: 4, point: 9.00, grade: "A", result: "PASS" },
    { sem: "3", month: "NOV 2025", part: "II", code: "BS18331", name: "UNIX SHELL PROGRAMMING [PR]", credit: 1, point: 10.00, grade: "O", result: "PASS" },
    { sem: "3", month: "NOV 2025", part: "II", code: "CS20302", name: "OOP THROUGH JAVA", credit: 4, point: 10.00, grade: "O", result: "PASS" },
    { sem: "3", month: "NOV 2025", part: "II", code: "CS20303", name: "OOP THROUGH JAVA [PR]", credit: 1, point: 10.00, grade: "O", result: "PASS" },
    { sem: "3", month: "NOV 2025", part: "II", code: "CS23301", name: "ELECTRICAL CIRCUITS AND MACHINES", credit: 4, point: 8.00, grade: "B", result: "PASS" },
    { sem: "3", month: "NOV 2025", part: "II", code: "CS23349", name: "ELECTRICAL CIRCUITS AND MACHINES [PR]", credit: 1, point: 9.00, grade: "A", result: "PASS" },
    { sem: "3", month: "NOV 2025", part: "II", code: "G20CSIT1P", name: "PC HARDWARE AND SOFTWARE [PR]", credit: 1, point: 10.00, grade: "O", result: "PASS" },
    { sem: "3", month: "NOV 2025", part: "II", code: "G20CSIT1T", name: "PC HARDWARE AND SOFTWARE", credit: 2, point: 10.00, grade: "O", result: "PASS" },
    { sem: "3", month: "NOV 2025", part: "II", code: "BS18335", name: "DISCRETE MATHEMATICS", credit: 4, point: 7.00, grade: "C", result: "PASS" },
];

export default function ExamMarks() {
    const [selectedSem, setSelectedSem] = useState("3");

    // Filter logic
    const filteredData = MARK_DATA.filter(sub => sub.sem === selectedSem);
    const sessionName = filteredData.length > 0 ? filteredData[0].month : "";

    // Stats Logic
    const totalCredits = filteredData.reduce((acc, curr) => acc + curr.credit, 0);
    // Note: Some subjects might pass but have 0 points (like PL18001), assume they don't count towards SGPA if Point is 0 but Credit exists
    const validGradedData = filteredData.filter(d => d.point > 0);
    const totalPoints = validGradedData.reduce((acc, curr) => acc + (curr.point * curr.credit), 0);
    const gradedCredits = validGradedData.reduce((acc, curr) => acc + curr.credit, 0);
    
    const sgpa = gradedCredits > 0 ? (totalPoints / gradedCredits).toFixed(2) : "0.00";
    
    const hasBacklog = filteredData.some(d => d.result !== "PASS");

    // Badge styling
    const getGradeStyle = (grade: string) => {
        switch(grade) {
            case 'O': return "bg-emerald-100 text-emerald-700 border-emerald-200 dark:bg-emerald-900/30 dark:text-emerald-400";
            case 'A': return "bg-blue-100 text-blue-700 border-blue-200 dark:bg-blue-900/30 dark:text-blue-400";
            case 'B': return "bg-cyan-100 text-cyan-700 border-cyan-200 dark:bg-cyan-900/30 dark:text-cyan-400";
            case 'C': return "bg-yellow-100 text-yellow-700 border-yellow-200 dark:bg-yellow-900/30 dark:text-yellow-400";
            case 'F': return "bg-red-100 text-red-700 border-red-200 dark:bg-red-900/30 dark:text-red-400";
            default: return "bg-muted text-muted-foreground";
        }
    };

    return (
        <div className="space-y-6 animate-in fade-in-50 duration-500">
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
                        <SelectItem value="1">Semester I</SelectItem>
                        <SelectItem value="2">Semester II</SelectItem>
                        <SelectItem value="3">Semester III</SelectItem>
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
                        <span className="text-xl font-bold">{sessionName || "N/A"}</span>
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
                         <p className="text-[10px] text-muted-foreground">Registered for this sem</p>
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
                                 {hasBacklog ? "FAIL" : "PROMOTED"}
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
                            <TableHead className="w-[100px]">Part</TableHead>
                            <TableHead className="w-[120px]">Code</TableHead>
                            <TableHead className="min-w-[250px]">Description</TableHead>
                            <TableHead className="text-center w-[100px]">Credits</TableHead>
                            <TableHead className="text-center w-[100px]">Points</TableHead>
                            <TableHead className="text-center w-[100px]">Grade</TableHead>
                            <TableHead className="text-right w-[120px]">Result</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {filteredData.map((row) => (
                            <TableRow key={row.code}>
                                <TableCell className="font-medium text-xs text-muted-foreground">
                                    {row.part}
                                </TableCell>
                                <TableCell className="font-mono text-sm font-semibold">
                                    {row.code}
                                </TableCell>
                                <TableCell className="text-sm font-medium">
                                    {row.name}
                                    {row.name.includes("[PR]") && (
                                        <Badge variant="outline" className="ml-2 text-[10px] py-0 h-4">Lab</Badge>
                                    )}
                                </TableCell>
                                <TableCell className="text-center text-muted-foreground font-mono">
                                    {row.credit}
                                </TableCell>
                                <TableCell className="text-center font-bold font-mono">
                                    {row.point > 0 ? row.point.toFixed(2) : "-"}
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
                                            ? "text-green-600 border-green-200 bg-green-50 dark:bg-green-900/10" 
                                            : "text-red-600 border-red-200 bg-red-50"
                                        }
                                    >
                                        {row.result}
                                    </Badge>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
                
                {filteredData.length === 0 && (
                    <div className="h-40 flex flex-col items-center justify-center text-muted-foreground">
                         <p>No records found for the selected semester.</p>
                    </div>
                )}
            </div>

            <div className="text-xs text-center text-muted-foreground pt-4">
                <p>Disclaimer: The Grade Points shown here are derived from the web portal and are for informational purposes only.</p>
            </div>
        </div>
    );
}