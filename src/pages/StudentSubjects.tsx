import { useState, useEffect } from "react";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { BookOpen, GraduationCap, Microscope, Calculator, Loader2 } from "lucide-react";
import api from "@/lib/api"; // Ensure api instance is exported as default from src/lib/api.ts

interface Subject {
    sem: string;
    type: string;
    code: string;
    name: string;
    credit: number;
}

export default function StudentSubjects() {
    const [allSubjects, setAllSubjects] = useState<Subject[]>([]);
    const [selectedSem, setSelectedSem] = useState("3");
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        fetchSubjects();
    }, []);

    const fetchSubjects = async () => {
        setIsLoading(true);
        try {
            const token = localStorage.getItem("auth_token");
            if (!token) throw new Error("No Auth Token");
            
            // Backend call
            const { data } = await api.get('/student/subjects', {
                 headers: { Authorization: `Bearer ${token}` }
            });
            
            setAllSubjects(data);
            
            // Smart select: defaulting to most recent semester found in data
            if (data.length > 0) {
                 const semesters = [...new Set(data.map((s: Subject) => s.sem))].sort();
                 const maxSem = semesters[semesters.length - 1];
                 setSelectedSem(maxSem as string);
            }
        } catch (err) {
            console.error(err);
            setError("Failed to load subject data.");
        } finally {
            setIsLoading(false);
        }
    };

    // Filter Logic
    const currentSubjects = allSubjects.filter(sub => sub.sem == selectedSem);

    // Stats Logic
    const totalCredits = currentSubjects.reduce((acc, curr) => acc + curr.credit, 0);
    const labCount = currentSubjects.filter(sub => sub.name.includes("[PR]") || sub.type === 'Lab').length;
    const theoryCount = currentSubjects.length - labCount;

    // Helper for Badge Colors
    const getBadgeStyle = (type: string, name: string) => {
        if (name.includes("[PR]") || type === "Lab") return "bg-purple-50 text-purple-700 border-purple-200 dark:bg-purple-900/20 dark:text-purple-300 dark:border-purple-800";
        if (type === "Core") return "bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-900/20 dark:text-blue-300 dark:border-blue-800";
        if (type === "AECC") return "bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-900/20 dark:text-amber-300 dark:border-amber-800";
        return "bg-slate-50 text-slate-700 border-slate-200 dark:bg-slate-800 dark:text-slate-300";
    };

    if (isLoading) {
        return (
             <div className="flex h-[50vh] w-full items-center justify-center gap-2 text-muted-foreground animate-pulse">
                <Loader2 className="h-6 w-6 animate-spin" /> Fetching academic records...
             </div>
        );
    }

    if (error && allSubjects.length === 0) {
        return (
             <div className="flex h-[50vh] w-full items-center justify-center flex-col gap-4 text-destructive">
                <p>{error}</p>
                <button className="underline text-primary" onClick={fetchSubjects}>Retry</button>
             </div>
        );
    }

    return (
        <div className="space-y-6 animate-in fade-in-50 duration-500">
            {/* Control & Header */}
            <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
                <div>
                    <h2 className="text-2xl font-bold tracking-tight">Registered Subjects</h2>
                    <p className="text-muted-foreground text-sm">Select a semester to view curriculum details</p>
                </div>
                <Select value={selectedSem} onValueChange={setSelectedSem}>
                    <SelectTrigger className="w-[180px] bg-card">
                        <SelectValue placeholder="Select Semester" />
                    </SelectTrigger>
                    <SelectContent>
                        {/* Generate Semesters Dynamically */}
                        {[...new Set(allSubjects.map(s => s.sem))].sort().map((sem) => (
                             <SelectItem key={sem} value={sem}>Semester {sem}</SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>

            {/* Statistics Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <Card className="shadow-none border-l-4 border-l-primary bg-card/50">
                    <CardContent className="p-4 flex items-center gap-4">
                        <div className="p-3 bg-primary/10 rounded-full text-primary">
                             <GraduationCap className="w-5 h-5" />
                        </div>
                        <div>
                            <p className="text-xs text-muted-foreground font-medium uppercase">Total Credits</p>
                            <p className="text-2xl font-bold">{totalCredits}</p>
                        </div>
                    </CardContent>
                </Card>
                <Card className="shadow-none border-l-4 border-l-blue-500 bg-card/50">
                     <CardContent className="p-4 flex items-center gap-4">
                        <div className="p-3 bg-blue-100 text-blue-600 rounded-full dark:bg-blue-900 dark:text-blue-300">
                             <BookOpen className="w-5 h-5" />
                        </div>
                        <div>
                            <p className="text-xs text-muted-foreground font-medium uppercase">Theory Subjects</p>
                            <p className="text-2xl font-bold">{theoryCount}</p>
                        </div>
                    </CardContent>
                </Card>
                <Card className="shadow-none border-l-4 border-l-purple-500 bg-card/50">
                    <CardContent className="p-4 flex items-center gap-4">
                        <div className="p-3 bg-purple-100 text-purple-600 rounded-full dark:bg-purple-900 dark:text-purple-300">
                             <Microscope className="w-5 h-5" />
                        </div>
                        <div>
                            <p className="text-xs text-muted-foreground font-medium uppercase">Labs / Practicals</p>
                            <p className="text-2xl font-bold">{labCount}</p>
                        </div>
                    </CardContent>
                </Card>
                <Card className="shadow-none border-l-4 border-l-green-500 bg-card/50">
                    <CardContent className="p-4 flex items-center gap-4">
                        <div className="p-3 bg-green-100 text-green-600 rounded-full dark:bg-green-900 dark:text-green-300">
                             <Calculator className="w-5 h-5" />
                        </div>
                        <div>
                            <p className="text-xs text-muted-foreground font-medium uppercase">Total Subjects</p>
                            <p className="text-2xl font-bold">{currentSubjects.length}</p>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Subject Table */}
            <Card className="border shadow-sm overflow-hidden">
                <Table>
                    <TableHeader>
                        <TableRow className="bg-muted/40 hover:bg-muted/40">
                            <TableHead className="w-[80px]">Type</TableHead>
                            <TableHead className="w-[120px]">Code</TableHead>
                            <TableHead>Subject Title</TableHead>
                            <TableHead className="text-right">Credits</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {currentSubjects.length > 0 ? currentSubjects.map((sub, index) => (
                            <TableRow key={index}>
                                <TableCell>
                                    <Badge variant="outline" className={getBadgeStyle(sub.type, sub.name)}>
                                        {sub.type}
                                    </Badge>
                                </TableCell>
                                <TableCell className="font-mono text-muted-foreground font-medium">
                                    {sub.code}
                                </TableCell>
                                <TableCell className="font-medium">
                                    <div className="flex items-center gap-2">
                                        {sub.name}
                                        {sub.name.includes("[PR]") && (
                                            <span className="text-[10px] uppercase bg-secondary px-1.5 py-0.5 rounded text-secondary-foreground">Lab</span>
                                        )}
                                    </div>
                                </TableCell>
                                <TableCell className="text-right font-bold text-foreground/80">
                                    {sub.credit}
                                </TableCell>
                            </TableRow>
                        )) : (
                            <TableRow>
                                <TableCell colSpan={4} className="h-24 text-center text-muted-foreground">
                                    No subjects found for Semester {selectedSem}
                                </TableCell>
                            </TableRow>
                        )}
                         <TableRow className="bg-muted/20 hover:bg-muted/20">
                            <TableCell colSpan={3} className="text-right font-medium text-sm text-muted-foreground pr-8">
                                Semester {selectedSem} Total Credits
                            </TableCell>
                            <TableCell className="text-right font-extrabold text-primary text-base border-l">
                                {totalCredits}
                            </TableCell>
                         </TableRow>
                    </TableBody>
                </Table>
            </Card>
        </div>
    );
}