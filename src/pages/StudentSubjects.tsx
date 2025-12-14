import { useState } from "react";
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
import { BookOpen, GraduationCap, Microscope, Calculator } from "lucide-react";

// Full data parsed from your input
const allSubjects = [
    // Semester 1
    { sem: "1", type: "N/A", code: "CLUB011", name: "FINANCE CLUB", credit: 1 },
    { sem: "1", type: "AECC", code: "EN23101", name: "GENERAL ENGLISH - I", credit: 3 },
    { sem: "1", type: "AECC", code: "VE18101", name: "VALUE EDUCATION AND PERSONALITY DEVELOPMENT", credit: 2 },
    { sem: "1", type: "Core", code: "BS19101", name: "MATHEMATICS - I", credit: 4 },
    { sem: "1", type: "Core", code: "BS19123", name: "PROBLEM SOLVING AND PROGRAMMING IN C", credit: 4 },
    { sem: "1", type: "Core", code: "BS19124", name: "C PROGRAMMING [PR]", credit: 1 },
    { sem: "1", type: "Core", code: "CS18102", name: "ELECTRONIC DEVICES AND CIRCUITS [PR]", credit: 1 },
    { sem: "1", type: "Core", code: "CS22102", name: "ELECTRONIC DEVICES AND CIRCUITS", credit: 4 },
    { sem: "1", type: "GE", code: "BS19121", name: "ENGINEERING PHYSICS", credit: 4 },
    { sem: "1", type: "GE", code: "BS19122", name: "ENGINEERING PHYSICS [PR]", credit: 1 },

    // Semester 2
    { sem: "2", type: "N/A", code: "SS001", name: "SOFT SKILLS", credit: 2 },
    { sem: "2", type: "AECC", code: "EN23201", name: "GENERAL ENGLISH - II", credit: 3 },
    { sem: "2", type: "AECC", code: "IC23201", name: "INDIAN HERITAGE AND CULTURE", credit: 2 },
    { sem: "2", type: "Core", code: "BS18201", name: "MATHEMATICS - II", credit: 4 },
    { sem: "2", type: "Core", code: "BS19204", name: "C PLUS PLUS WITH DATA STRUCTURES [PR]", credit: 1 },
    { sem: "2", type: "Core", code: "BS22202", name: "C PLUS PLUS WITH DATA STRUCTURES", credit: 4 },
    { sem: "2", type: "Core", code: "BS22204", name: "LOGIC AND DIGITAL CIRCUITS", credit: 4 },
    { sem: "2", type: "Core", code: "BS22206", name: "LOGIC AND DIGITAL CIRCUITS [PR]", credit: 1 },
    { sem: "2", type: "SEC", code: "BS18229", name: "ENGINEERING DRAWING & ENGG., WORKSHOP [PR]", credit: 3 },
    { sem: "2", type: "PL", code: "PL18001", name: "PLANET", credit: 1 },

    // Semester 3 (Current)
    { sem: "3", type: "AECC", code: "ES23301", name: "ENVIRONMENTAL STUDIES AND GENDER SENSITIZATION", credit: 3 },
    { sem: "3", type: "Core", code: "BS18330", name: "OPERATING SYSTEMS", credit: 4 },
    { sem: "3", type: "Core", code: "BS18331", name: "UNIX SHELL PROGRAMMING [PR]", credit: 1 },
    { sem: "3", type: "Core", code: "CS20302", name: "OBJECT ORIENTED PROGRAMMING THROUGH JAVA", credit: 4 },
    { sem: "3", type: "Core", code: "CS20303", name: "OBJECT ORIENTED PROGRAMMING THROUGH JAVA [PR]", credit: 1 },
    { sem: "3", type: "Core", code: "CS23301", name: "ELECTRICAL CIRCUITS AND MACHINES", credit: 4 },
    { sem: "3", type: "Core", code: "CS23349", name: "ELECTRICAL CIRCUITS AND MACHINES [PR]", credit: 1 },
    { sem: "3", type: "GE", code: "G20CSIT1P", name: "PC HARDWARE AND SOFTWARE INSTALLATION [PR]", credit: 1 },
    { sem: "3", type: "GE", code: "G20CSIT1T", name: "PC HARDWARE AND SOFTWARE INSTALLATION", credit: 2 },
    { sem: "3", type: "SEC", code: "BS18335", name: "DISCRETE MATHEMATICS", credit: 4 },

    // Semester 4
    { sem: "4", type: "Core", code: "BS20404", name: "MICROPROCESSORS AND MICROCONTROLLERS", credit: 3 },
    { sem: "4", type: "Core", code: "BS23406", name: "DATABASE MANAGEMENT SYSTEM", credit: 4 },
    { sem: "4", type: "Core", code: "BS23409", name: "DATABASE MANAGEMENT SYSTEMS [PR]", credit: 1 },
    { sem: "4", type: "Core", code: "CS18407", name: "MICROPROCESSORS SYSTEMS AND APPLICATIONS [PR]", credit: 1 },
    { sem: "4", type: "Core", code: "CS18408", name: "OBJECT ORIENTED SYSTEMS DEVELOPMENT [PR]", credit: 1 },
    { sem: "4", type: "Core", code: "CS20405", name: "OBJECT ORIENTED SYSTEMS DEVELOPMENT", credit: 4 },
    { sem: "4", type: "Core", code: "CS23402", name: "COMPUTER ORGANIZATION", credit: 3 },
    { sem: "4", type: "Core", code: "CS23403", name: "WEB TECHNOLOGIES", credit: 3 },
    { sem: "4", type: "Core", code: "CS23410", name: "WEB TECHNOLOGIES [PR]", credit: 1 },
    { sem: "4", type: "GE", code: "BS23401", name: "PROBABILITY AND STATISTICS", credit: 4 },
];

export default function StudentSubjects() {
    const [selectedSem, setSelectedSem] = useState("3");

    // Filter Logic
    const currentSubjects = allSubjects.filter(sub => sub.sem === selectedSem);

    // Stats Logic
    const totalCredits = currentSubjects.reduce((acc, curr) => acc + curr.credit, 0);
    const labCount = currentSubjects.filter(sub => sub.name.includes("[PR]")).length;
    const theoryCount = currentSubjects.length - labCount;

    // Helper for Badge Colors
    const getBadgeStyle = (type: string, name: string) => {
        if (name.includes("[PR]")) return "bg-purple-50 text-purple-700 border-purple-200 dark:bg-purple-900/20 dark:text-purple-300 dark:border-purple-800";
        if (type === "Core") return "bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-900/20 dark:text-blue-300 dark:border-blue-800";
        if (type === "AECC") return "bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-900/20 dark:text-amber-300 dark:border-amber-800";
        return "bg-slate-50 text-slate-700 border-slate-200 dark:bg-slate-800 dark:text-slate-300";
    };

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
                        <SelectItem value="1">Semester I</SelectItem>
                        <SelectItem value="2">Semester II</SelectItem>
                        <SelectItem value="3">Semester III</SelectItem>
                        <SelectItem value="4">Semester IV</SelectItem>
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
                        {currentSubjects.map((sub) => (
                            <TableRow key={sub.code}>
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
                        ))}
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