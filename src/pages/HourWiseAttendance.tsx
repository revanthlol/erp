import { 
    Card, 
    CardContent, 
    CardDescription, 
    CardHeader, 
    CardTitle, 
    CardFooter 
} from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { 
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from "recharts";
import { CalendarDays, CheckCircle2, XCircle, Info, HelpCircle } from "lucide-react";
import { cn } from "@/lib/utils";

// --- Data Configuration ---
const CHART_DATA = [
    { name: 'Present', value: 61, color: '#10b981' }, // Emerald-500
    { name: 'Absent', value: 50, color: '#ef4444' }, // Red-500
];

const RAW_LOGS = [
    { date: "12-Dec-2025", hours: ["P", "", "", "", ""] },
    { date: "11-Dec-2025", hours: ["P", "", "P", "P", "P"] },
    { date: "10-Dec-2025", hours: ["A", "A", "", "A", "A"] },
    { date: "09-Dec-2025", hours: ["P", "P", "P", "A", "P"] },
    { date: "08-Dec-2025", hours: ["A", "A", "A", "A", "A"] },
    { date: "05-Dec-2025", hours: ["A", "A", "A", "A", "A"] },
    { date: "04-Dec-2025", hours: ["A", "A", "A", "A", "A"] },
    { date: "03-Dec-2025", hours: ["P", "P", "P", "A", "A"] },
    { date: "02-Dec-2025", hours: ["A", "A", "A", "A", "A"] },
    { date: "01-Dec-2025", hours: ["A", "A", "A", "A", "A"] },
    { date: "29-Nov-2025", hours: ["", "", "A", "A", "A"] },
    { date: "28-Nov-2025", hours: ["P", "P", "P", "P", "P"] },
    { date: "27-Nov-2025", hours: ["P", "P", "P", "P", "P"] },
    { date: "26-Nov-2025", hours: ["P", "P", "P", "P", "P"] },
    { date: "25-Nov-2025", hours: ["P", "P", "P", "P", "P"] },
    { date: "24-Nov-2025", hours: ["P", "P", "P", "P", "P"] },
    { date: "22-Nov-2025", hours: ["P", "P", "P", "P", "P"] },
    { date: "21-Nov-2025", hours: ["P", "P", "P", "P", "P"] },
    { date: "20-Nov-2025", hours: ["P", "P", "P", "P", "P"] },
    { date: "19-Nov-2025", hours: ["P", "P", "", "P", "P"] },
    { date: "18-Nov-2025", hours: ["P", "P", "P", "P", "P"] },
    { date: "17-Nov-2025", hours: ["A", "A", "A", "A", "A"] },
    { date: "15-Nov-2025", hours: ["A", "A", "A", "A", "A"] },
    { date: "14-Nov-2025", hours: ["A", "A", "A", "A", "A"] },
];

export default function HourWiseAttendance() {
    
    // Stats Calculations
    const totalWorkingDays = 24;
    const hoursPresent = 61;
    const hoursAbsent = 50;
    const percentage = Math.round((hoursPresent / (hoursPresent + hoursAbsent)) * 100);

    const getStatusStyle = (status: string) => {
        switch (status) {
            case "P":
                return "bg-green-100 text-green-700 border-green-200 dark:bg-green-900/40 dark:text-green-300 dark:border-green-800";
            case "A":
                return "bg-red-100 text-red-700 border-red-200 dark:bg-red-900/40 dark:text-red-300 dark:border-red-800";
            case "":
            case null:
                // Dark mode "Grayish black" feel for empty slots
                return "bg-slate-200 border-slate-300 text-slate-400 dark:bg-zinc-800 dark:border-zinc-700 dark:text-zinc-600";
            case "OD":
                return "bg-blue-100 text-blue-700 border-blue-200 dark:bg-blue-900/40 dark:text-blue-300";
            default:
                return "bg-secondary text-secondary-foreground";
        }
    };

    // Helper for legend dots
    const LegendItem = ({ label, desc, colorClass }: { label: string, desc: string, colorClass: string }) => (
        <div className="flex items-center gap-3 text-sm">
            <span className={cn("flex items-center justify-center w-8 h-8 rounded border font-bold text-xs shadow-sm", colorClass)}>
                {label}
            </span>
            <span className="text-muted-foreground">{desc}</span>
        </div>
    );

    return (
        // Main Grid Container (100% height minus header padding approx)
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-[calc(100vh-120px)] animate-in fade-in-50 duration-500 min-h-[600px]">
            
            {/* LEFT COLUMN: Hourly Logs (50% Width) */}
            <Card className="flex flex-col shadow-sm border overflow-hidden h-full relative">
                <CardHeader className="py-4 border-b bg-muted/40 flex-shrink-0 flex-row items-center justify-between">
                    <div className="flex items-center gap-2">
                        <CalendarDays className="w-5 h-5 text-primary" />
                        <div>
                            <CardTitle className="text-base font-semibold">Hourly Logs</CardTitle>
                            <CardDescription className="text-xs">Day-to-day session tracking</CardDescription>
                        </div>
                    </div>
                    
                    {/* LEGEND POPOVER */}
                    <Popover>
                        <PopoverTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-foreground">
                                <HelpCircle className="w-5 h-5" />
                                <span className="sr-only">Toggle Legend</span>
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent align="end" className="w-80 p-0 shadow-lg border-2">
                            <div className="bg-muted p-4 border-b">
                                <h4 className="font-semibold leading-none flex items-center gap-2">
                                    <Info className="w-4 h-4 text-primary"/> Legends
                                </h4>
                                <p className="text-xs text-muted-foreground mt-1">Status code guide</p>
                            </div>
                            <div className="p-4 grid grid-cols-1 gap-2">
                                <LegendItem label="P" desc="Present" colorClass="bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-300 border-green-200 dark:border-green-800" />
                                <LegendItem label="A" desc="Absent" colorClass="bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-300 border-red-200 dark:border-red-800" />
                                <LegendItem label="OD" desc="On Duty" colorClass="bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300 border-blue-200" />
                                <LegendItem label="ML" desc="Medical Leave" colorClass="bg-yellow-100 text-yellow-700 dark:bg-yellow-900/40 dark:text-yellow-300 border-yellow-200" />
                                <LegendItem label="CL" desc="Casual Leave" colorClass="bg-purple-100 text-purple-700 dark:bg-purple-900/40 dark:text-purple-300 border-purple-200" />
                                <LegendItem label="DA" desc="Disciplinary Action" colorClass="bg-orange-100 text-orange-700 dark:bg-orange-900/40 dark:text-orange-300 border-orange-200" />
                                <LegendItem label="LA" desc="Late Comer" colorClass="bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300 border-slate-200" />
                            </div>
                            <div className="bg-muted/50 p-4 border-t text-[10px] text-muted-foreground leading-relaxed text-justify">
                                <strong>Disclaimer:</strong> Attendance details published in this website is only for the immediate information to the students and does not constitute to be a legal document.
                            </div>
                        </PopoverContent>
                    </Popover>

                </CardHeader>
                
                {/* Table Header (Sticky) */}
                <div className="bg-muted/40 border-b flex font-semibold text-xs text-muted-foreground py-3 px-4 flex-shrink-0">
                     <div className="w-24 flex-shrink-0">Date</div>
                     <div className="grid grid-cols-5 gap-2 flex-1 text-center">
                        <span>1</span>
                        <span>2</span>
                        <span>3</span>
                        <span>4</span>
                        <span>5</span>
                     </div>
                </div>

                {/* Scrollable Content */}
                <ScrollArea className="flex-1 bg-card">
                    <div className="p-4 space-y-2">
                        {RAW_LOGS.map((log, i) => (
                            <div 
                                key={i} 
                                className="flex items-center p-2 rounded-lg border bg-background/50 hover:bg-muted/30 transition-all text-sm group"
                            >
                                <div className="w-24 flex-shrink-0 font-medium text-xs font-mono text-muted-foreground">
                                    {log.date.slice(0, 6)}
                                </div>
                                <div className="grid grid-cols-5 gap-2 flex-1">
                                    {log.hours.map((status, index) => (
                                        <div 
                                            key={index} 
                                            className={cn(
                                                "h-8 flex items-center justify-center rounded border font-bold text-xs shadow-sm",
                                                getStatusStyle(status)
                                            )}
                                        >
                                            {status || "•"}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </ScrollArea>
            </Card>


            {/* RIGHT COLUMN: Stacked View (50% Width) */}
            <div className="flex flex-col gap-6 h-full">
                
                {/* TOP RIGHT: Overview Stats */}
                <Card className="flex-1 shadow-sm flex flex-col justify-between max-h-[45%]">
                    <CardHeader className="pb-2">
                        <div className="flex justify-between items-start">
                            <div>
                                <CardTitle className="text-lg">Overview</CardTitle>
                                <CardDescription>Academic Period Stats</CardDescription>
                            </div>
                            <Badge variant={percentage < 75 ? "destructive" : "default"} className="ml-auto">
                                {percentage}% Average
                            </Badge>
                        </div>
                    </CardHeader>
                    <CardContent className="grid grid-cols-2 gap-x-8 gap-y-4 text-sm pb-2">
                         <div className="flex flex-col">
                             <span className="text-muted-foreground text-xs uppercase font-medium">Working Days</span>
                             <span className="text-3xl font-bold tracking-tight">{totalWorkingDays}</span>
                         </div>
                         <div className="flex flex-col">
                             <span className="text-muted-foreground text-xs uppercase font-medium">Status</span>
                             <span className={`text-xl font-bold ${percentage < 75 ? "text-red-500" : "text-green-500"}`}>
                                 {percentage < 75 ? "Poor" : "Good"}
                             </span>
                         </div>
                         
                         <Separator className="col-span-2 opacity-50"/>

                         <div className="flex justify-between items-center border p-2 rounded bg-muted/20">
                             <span className="flex items-center gap-2 text-muted-foreground">
                                 <CheckCircle2 className="w-4 h-4 text-green-500" /> Present
                             </span>
                             <span className="font-mono font-bold">{hoursPresent}</span>
                         </div>
                         <div className="flex justify-between items-center border p-2 rounded bg-muted/20">
                             <span className="flex items-center gap-2 text-muted-foreground">
                                 <XCircle className="w-4 h-4 text-red-500" /> Absent
                             </span>
                             <span className="font-mono font-bold">{hoursAbsent}</span>
                         </div>
                    </CardContent>
                    <CardFooter className="bg-muted/30 py-3 text-xs text-muted-foreground justify-center">
                        <p>Includes CL, ML, OD, DA, and LA</p>
                    </CardFooter>
                </Card>

                {/* BOTTOM RIGHT: Pie Chart */}
                <Card className="flex-1 flex flex-col shadow-sm min-h-0">
                    <CardHeader className="pb-0 pt-4">
                         <CardTitle className="text-center text-sm font-medium uppercase text-muted-foreground tracking-wider">Attendance Distribution</CardTitle>
                    </CardHeader>
                    <div className="flex-1 relative w-full min-h-0 p-2">
                         <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={CHART_DATA}
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={60}
                                    outerRadius={90}
                                    paddingAngle={2}
                                    dataKey="value"
                                    startAngle={90}
                                    endAngle={-270}
                                >
                                    {CHART_DATA.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={entry.color} strokeWidth={0} />
                                    ))}
                                </Pie>
                                <Tooltip 
                                    contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.5)', backgroundColor: 'rgba(25, 25, 35, 0.9)', color: '#fff' }}
                                    itemStyle={{ color: '#fff' }} 
                                />
                                <Legend verticalAlign="bottom" height={36} iconType="circle" />
                            </PieChart>
                        </ResponsiveContainer>
                        {/* Centered Percentage */}
                        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-[60%] pointer-events-none text-center">
                            <div className="text-4xl font-extrabold text-foreground tracking-tighter">{percentage}%</div>
                        </div>
                    </div>
                </Card>

            </div>
        </div>
    );
}