import * as React from "react"
import { useState, useEffect } from "react";
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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { CalendarDays, HelpCircle, AlertCircle, Info, RefreshCw } from "lucide-react";
import { cn } from "@/lib/utils";
import { authApi } from "@/lib/api";

// --- Chart Imports ---
import { Label, Pie, PieChart } from "recharts"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart"

// Types
interface HourlyLog {
    date: string;
    dayType?: string;
    hours: string[];
}
interface HourlyStats {
    workingDays: number;
    presentHours: number;
    absentHours: number;
    percentage: number;
    od: number;
    ml: number;
    cl: number;
}

export default function HourWiseAttendance() {
    const [logs, setLogs] = useState<HourlyLog[]>([]);
    const [stats, setStats] = useState<HourlyStats | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const fetchData = async () => {
        setLoading(true);
        setError("");
        try {
            const data: any = await authApi.getHourWiseAttendance();
            setLogs(data.logs || []);
            setStats(data.stats || null);
        } catch (err) {
            console.error(err);
            setError("Failed to sync hourly records.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    // Logic Vars
    const present = stats?.presentHours || 0;
    const absent = stats?.absentHours || 0;
    const pct = stats?.percentage ? parseFloat(stats.percentage.toFixed(2)) : 0;
    
    // -- CHART CONFIG --
    const chartData = [
        { status: "present", hours: present, fill: "var(--color-present)" },
        { status: "absent", hours: absent, fill: "var(--color-absent)" },
    ];

    const chartConfig = {
      hours: { label: "Hours" },
      present: {
        label: "Present",
        color: "hsl(142, 76%, 36%)", 
      },
      absent: {
        label: "Absent",
        color: "hsl(0, 84%, 60%)",
      },
    } satisfies ChartConfig;

    // -- Extended Style Helper --
    const getStatusStyle = (status: string) => {
        switch (status?.trim()) {
            case "P": return "bg-green-100 text-green-700 border-green-200 dark:bg-green-900/40 dark:text-green-400 dark:border-green-800";
            case "A": return "bg-red-100 text-red-700 border-red-200 dark:bg-red-900/40 dark:text-red-400 dark:border-red-800";
            case "OD": return "bg-blue-100 text-blue-700 border-blue-200 dark:bg-blue-900/40 dark:text-blue-300 dark:border-blue-800";
            case "ML": return "bg-amber-100 text-amber-700 border-amber-200 dark:bg-amber-900/40 dark:text-amber-400 dark:border-amber-800";
            case "CL": return "bg-purple-100 text-purple-700 border-purple-200 dark:bg-purple-900/40 dark:text-purple-400 dark:border-purple-800";
            case "DA": return "bg-orange-100 text-orange-700 border-orange-200 dark:bg-orange-900/40 dark:text-orange-400 dark:border-orange-800";
            case "LA": return "bg-indigo-100 text-indigo-700 border-indigo-200 dark:bg-indigo-900/40 dark:text-indigo-400 dark:border-indigo-800";
            case "-":
            case "": return "bg-slate-100 border-slate-200 text-slate-400 dark:bg-zinc-800 dark:border-zinc-700";
            default: return "bg-secondary text-secondary-foreground";
        }
    };

    if (loading) {
        return <HourWiseSkeleton />;
    }

    if (error && !stats) {
        return (
            <div className="h-[50vh] flex flex-col items-center justify-center gap-4">
                <AlertCircle className="w-10 h-10 text-destructive/50" />
                <p className="text-muted-foreground">{error}</p>
                <Button variant="outline" onClick={fetchData}>Retry</Button>
            </div>
        );
    }

    return (
        <div className="flex flex-col gap-6 h-auto lg:h-[calc(100vh-120px)] animate-in fade-in-50 duration-500 min-h-0 lg:min-h-[600px] pb-10 lg:pb-0">
            
            {/* Disclaimer & Legend Header Group */}
            <div className="flex justify-between items-center px-1">
               <h2 className="text-xl font-bold tracking-tight hidden sm:block">Hour-Wise Attendance Details</h2>
               <div className="flex gap-2 w-full sm:w-auto justify-end">
                    
                    {/* Disclaimer Dialog */}
                    <Dialog>
                        <DialogTrigger asChild>
                            <Button variant="outline" size="sm" className="h-8 gap-2 text-muted-foreground hover:text-foreground">
                                <Info className="w-4 h-4" /> 
                                <span className="text-xs">Disclaimer</span>
                            </Button>
                        </DialogTrigger>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>Official Disclaimer</DialogTitle>
                                <DialogDescription className="pt-4 text-justify leading-relaxed">
                                    Attendance details published in this website is only for the immediate information to the students and does not constitute to be a legal document.
                                </DialogDescription>
                            </DialogHeader>
                        </DialogContent>
                    </Dialog>

                    {/* Full Legend Popover */}
                    <Popover>
                        <PopoverTrigger asChild>
                            <Button variant="outline" size="sm" className="h-8 gap-2">
                                <HelpCircle className="w-4 h-4" />
                                <span className="text-xs">Legend</span>
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent align="end" className="w-64 p-4 shadow-xl border">
                            <div className="space-y-3">
                                <h4 className="font-semibold text-sm mb-3">Status Codes</h4>
                                <div className="space-y-2">
                                    <LegendItem label="P" desc="Present" colorClass="bg-green-100 text-green-700 border-green-200" />
                                    <LegendItem label="A" desc="Absent" colorClass="bg-red-100 text-red-700 border-red-200" />
                                    <LegendItem label="OD" desc="On Duty" colorClass="bg-blue-100 text-blue-700 border-blue-200" />
                                    <LegendItem label="ML" desc="Medical Leave" colorClass="bg-amber-100 text-amber-700 border-amber-200" />
                                    <LegendItem label="CL" desc="Casual Leave" colorClass="bg-purple-100 text-purple-700 border-purple-200" />
                                    <LegendItem label="DA" desc="Disciplinary Action" colorClass="bg-orange-100 text-orange-700 border-orange-200" />
                                    <LegendItem label="LA" desc="Late Comer" colorClass="bg-indigo-100 text-indigo-700 border-indigo-200" />
                                    <LegendItem label="-" desc="No Class / Free" colorClass="bg-slate-100 text-slate-500 border-slate-200" />
                                </div>
                            </div>
                        </PopoverContent>
                    </Popover>
               </div>
            </div>

            <div className="flex flex-col lg:grid lg:grid-cols-2 gap-6 flex-1 min-h-0">
                
                {/* LEFT COLUMN: Scrollable Table */}
                <Card className="flex flex-col shadow-sm border overflow-hidden h-[500px] lg:h-full relative order-2 lg:order-1">
                    <CardHeader className="py-4 border-b bg-muted/30 flex-shrink-0 flex-row items-center gap-3">
                        <CalendarDays className="w-5 h-5 text-primary" />
                        <div>
                            <CardTitle className="text-base font-semibold">Daily Logs</CardTitle>
                            <CardDescription className="text-xs">Period-wise Attendance</CardDescription>
                        </div>
                    </CardHeader>
                    
                    <div className="bg-muted/10 border-b flex font-semibold text-[10px] sm:text-xs text-muted-foreground py-2 px-3 flex-shrink-0 uppercase tracking-wide">
                         <div className="w-20 sm:w-24 flex-shrink-0">Date</div>
                         <div className="grid grid-cols-5 gap-2 flex-1 text-center">
                            {[1,2,3,4,5].map(h => <span key={h}>{h}</span>)}
                         </div>
                    </div>

                    <ScrollArea className="flex-1 bg-card">
                        <div className="p-3 space-y-1.5">
                            {logs.map((log, i) => (
                                <div 
                                    key={i} 
                                    className="flex items-center p-2 rounded-md border bg-background/50 hover:bg-muted/30 transition-all text-xs sm:text-sm group"
                                >
                                    <div className="w-20 sm:w-24 flex-shrink-0 flex flex-col justify-center">
                                        <span className="font-semibold tabular-nums text-foreground/90">{log.date.split('-')[0]} {log.date.split('-')[1]}</span>
                                        <span className="text-[10px] text-muted-foreground hidden sm:block">{log.dayType}</span>
                                    </div>
                                    <div className="grid grid-cols-5 gap-1.5 flex-1">
                                        {log.hours.map((status, index) => (
                                            <div 
                                                key={index} 
                                                className={cn(
                                                    "h-8 flex items-center justify-center rounded-[4px] border font-bold text-xs shadow-sm transition-colors cursor-default",
                                                    getStatusStyle(status)
                                                )}
                                                title={`Hour ${index+1}: ${status}`}
                                            >
                                                {status}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ))}
                            {logs.length === 0 && (
                                <div className="h-full flex items-center justify-center text-muted-foreground text-sm pt-20">
                                    No logs recorded yet
                                </div>
                            )}
                        </div>
                    </ScrollArea>
                </Card>


                {/* RIGHT COLUMN: Stacked View */}
                <div className="flex flex-col gap-4 sm:gap-6 h-auto lg:h-full order-1 lg:order-2">
                    
                    {/* Stats Summary */}
                    <Card className="flex-none shadow-sm relative overflow-hidden bg-card/50">
                        <CardHeader className="pb-3 pt-4">
                            <div className="flex justify-between items-center">
                                <div>
                                    <CardTitle className="text-base">Term Overview</CardTitle>
                                    <CardDescription className="text-xs">Based on {stats?.workingDays || 0} Working Days</CardDescription>
                                </div>
                                <Badge variant={pct < 75 ? "destructive" : "secondary"} className={cn(pct >= 75 && "bg-green-100 text-green-700 border-green-200")}>
                                    {pct < 75 ? "Action Required" : "Safe"}
                                </Badge>
                            </div>
                        </CardHeader>
                        <Separator className="bg-border/50"/>
                        <CardContent className="grid grid-cols-2 gap-x-8 gap-y-4 text-sm pt-4">
                             <div>
                                 <span className="text-muted-foreground text-[10px] uppercase font-bold tracking-wider">Hrs Attendance</span>
                                 <div className="text-2xl font-bold tracking-tight text-green-600 dark:text-green-500">
                                     {present}
                                 </div>
                             </div>
                             <div className="text-right lg:text-left">
                                 <span className="text-muted-foreground text-[10px] uppercase font-bold tracking-wider">Hrs Missed</span>
                                 <div className="text-2xl font-bold tracking-tight text-red-500">
                                     {absent}
                                 </div>
                             </div>
                             
                             {/* Secondary Stats */}
                             <div className="col-span-2 pt-1 border-t mt-1 flex flex-wrap gap-2">
                                <div className="text-[10px] text-muted-foreground w-full mb-1">OTHER CATEGORIES:</div>
                                {[
                                    { k: 'OD', v: stats?.od, c: 'text-blue-600 bg-blue-50 border-blue-200' },
                                    { k: 'ML', v: stats?.ml, c: 'text-amber-600 bg-amber-50 border-amber-200' },
                                    { k: 'CL', v: stats?.cl, c: 'text-purple-600 bg-purple-50 border-purple-200' }
                                ].map((item) => (
                                    item.v ? (
                                        <div key={item.k} className={cn("px-2 py-1 rounded text-xs border font-medium flex items-center gap-1", item.c)}>
                                            <span>{item.k}:</span>
                                            <span>{item.v}</span>
                                        </div>
                                    ) : null
                                ))}
                                {(!stats?.od && !stats?.ml && !stats?.cl) && <span className="text-xs text-muted-foreground italic">None recorded</span>}
                             </div>
                        </CardContent>
                    </Card>

                    {/* THE DONUT CHART */}
                    <Card className="flex-1 flex flex-col shadow-sm min-h-0 h-[320px] lg:h-auto border-t-4 border-t-primary/20">
                        <CardHeader className="items-center pb-0 pt-4">
                            <CardTitle className="text-xs font-bold uppercase text-muted-foreground tracking-widest">Efficiency Rate</CardTitle>
                        </CardHeader>
                        <CardContent className="flex-1 pb-0 relative">
                            <ChartContainer
                              config={chartConfig}
                              className="mx-auto aspect-square h-[180px] sm:h-[220px]"
                            >
                              <PieChart>
                                <ChartTooltip
                                  cursor={false}
                                  content={<ChartTooltipContent hideLabel className="bg-card text-foreground border-2" />}
                                />
                                <Pie
                                  data={chartData}
                                  dataKey="hours"
                                  nameKey="status"
                                  innerRadius={65}
                                  strokeWidth={0}
                                  stroke="none"
                                >
                                  <Label
                                    content={({ viewBox }) => {
                                      if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                                        return (
                                          <text x={viewBox.cx} y={viewBox.cy} textAnchor="middle" dominantBaseline="middle">
                                            <tspan x={viewBox.cx} y={viewBox.cy} className="fill-foreground text-4xl font-extrabold tracking-tighter">
                                              {pct}%
                                            </tspan>
                                            <tspan x={viewBox.cx} y={(viewBox.cy || 0) + 24} className="fill-muted-foreground text-[10px] font-bold uppercase tracking-widest">
                                              Attended
                                            </tspan>
                                          </text>
                                        )
                                      }
                                    }}
                                  />
                                </Pie>
                              </PieChart>
                            </ChartContainer>
                        </CardContent>
                        
                        <CardFooter className="flex-col gap-2 pb-6 text-sm">
                            <div className="w-full flex justify-center gap-6">
                                <LegendDot label="Present" color="bg-green-600" />
                                <LegendDot label="Absent" color="bg-red-500" />
                            </div>
                        </CardFooter>
                    </Card>

                </div>
            </div>
        </div>
    );
}

// Helpers
const LegendItem = ({ label, desc, colorClass }: { label: string, desc: string, colorClass: string }) => (
    <div className="flex items-center gap-3">
        <span className={cn("flex items-center justify-center w-7 h-7 rounded border font-bold text-[10px] shadow-sm flex-shrink-0", colorClass)}>
            {label}
        </span>
        <span className="text-muted-foreground text-xs whitespace-nowrap">{desc}</span>
    </div>
);

const LegendDot = ({ label, color }: {label:string, color:string}) => (
    <div className="flex items-center gap-2">
        <span className={cn("h-2.5 w-2.5 rounded-full ring-2 ring-transparent shadow-sm", color)} />
        <span className="text-xs font-medium opacity-80">{label}</span>
    </div>
);

const HourWiseSkeleton = () => (
    <div className="flex flex-col lg:grid lg:grid-cols-2 gap-6 lg:h-[calc(100vh-120px)]">
        <Card className="h-[500px] lg:h-full flex flex-col p-4 gap-4 order-2 lg:order-1">
            <Skeleton className="h-8 w-1/3" />
            <Skeleton className="h-10 w-full" />
            <div className="space-y-2 flex-1">
                {[...Array(10)].map((_, i) => <Skeleton key={i} className="h-10 w-full" />)}
            </div>
        </Card>
        <div className="flex flex-col gap-6 h-auto order-1 lg:order-2">
            <Skeleton className="h-40 rounded-xl" />
            <Skeleton className="flex-1 rounded-xl" />
        </div>
    </div>
);