import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Card,
  CardHeader,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { 
  ClipboardList, 
  AlertCircle, 
  Award,
  ShieldCheck 
} from "lucide-react";

// Standard breakdown pattern used across most subjects in this semester
const STANDARD_BREAKDOWN = [
  { label: "Assignment", max: 3.00, code: "ASG" },
  { label: "Seminar or Viva Voce", max: 3.00, code: "SEM" },
  { label: "Attendance", max: 4.00, code: "ATT" },
  { label: "Mid Exam 1", max: 12.50, code: "MID1" },
  { label: "Mid Exam 2", max: 12.50, code: "MID2" },
  { label: "CBT / Case Study / Presentation", max: 5.00, code: "OTH" },
];

const COMPONENT_SCORES: Record<string, Record<string, number>> = {
  BS20404: { ASG: 2.5, SEM: 2.0, ATT: 3.5, MID1: 8.0, MID2: 8.5, OTH: 3.0 },
  BS23406: { ASG: 3.0, SEM: 2.5, ATT: 3.5, MID1: 9.0, MID2: 8.5, OTH: 2.5 },
  BS23409: { ASG: 3.0, SEM: 3.0, ATT: 4.0, MID1: 10.0, MID2: 9.0, OTH: 2.5 },
  CS18407: { ASG: 2.0, SEM: 2.0, ATT: 3.0, MID1: 7.0, MID2: 7.0, OTH: 3.0 },
  CS18408: { ASG: 2.5, SEM: 2.5, ATT: 3.5, MID1: 8.5, MID2: 8.0, OTH: 3.0 },
  CS20405: { ASG: 2.0, SEM: 2.0, ATT: 3.5, MID1: 9.0, MID2: 7.5, OTH: 2.0 },
  CS23402: { ASG: 1.5, SEM: 1.5, ATT: 3.0, MID1: 7.0, MID2: 6.0, OTH: 2.0 },
  CS23403: { ASG: 2.0, SEM: 2.5, ATT: 3.5, MID1: 8.0, MID2: 7.5, OTH: 2.0 },
  CS23410: { ASG: 3.0, SEM: 3.0, ATT: 4.0, MID1: 10.0, MID2: 9.0, OTH: 3.0 },
  BS23401: { ASG: 2.0, SEM: 1.5, ATT: 3.0, MID1: 7.0, MID2: 6.5, OTH: 2.0 },
};

const SUBJECTS = [
  { code: "BS20404", name: "MICROPROCESSORS AND MICROCONTROLLERS", obtained: 27.5, max: 40 },
  { code: "BS23406", name: "DATABASE MANAGEMENT SYSTEM", obtained: 29.0, max: 40 },
  { code: "BS23409", name: "DATABASE MANAGEMENT SYSTEMS [PR]", obtained: 31.5, max: 40 },
  { code: "CS18407", name: "MICROPROCESSORS SYSTEMS AND APPS [PR]", obtained: 24.0, max: 40 },
  { code: "CS18408", name: "OBJECT ORIENTED SYSTEMS DEV [PR]", obtained: 28.0, max: 40 },
  { code: "CS20405", name: "OBJECT ORIENTED SYSTEMS DEVELOPMENT", obtained: 26.0, max: 40 },
  { code: "CS23402", name: "COMPUTER ORGANIZATION", obtained: 21.0, max: 40 }, // slightly weak
  { code: "CS23403", name: "WEB TECHNOLOGIES", obtained: 25.5, max: 40 },
  { code: "CS23410", name: "WEB TECHNOLOGIES [PR]", obtained: 32.0, max: 40 },
  { code: "BS23401", name: "PROBABILITY AND STATISTICS", obtained: 22.0, max: 40 }, // borderline-safe
];


export default function InternalMarks() {
  return (
    <div className="space-y-6 animate-in fade-in-50 duration-500">
      
      {/* Header Summary */}
      <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
         <div>
            <h2 className="text-3xl font-bold tracking-tight">Internal Marks</h2>
            <p className="text-muted-foreground mt-1">Continuous Internal Assessment (CIA) Report</p>
         </div>
      </div>

      {/* Overview Warning/Info */}
      <Alert className="bg-primary/5 border-primary/20">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Marks Update Pending</AlertTitle>
        <AlertDescription className="text-muted-foreground">
          Internal marks for the current semester are yet to be finalized or uploaded by the faculty. 
          Currently displaying the maximum weightage for each component.
        </AlertDescription>
      </Alert>

      {/* Main Content List */}
      <Card className="border shadow-sm">
        <CardHeader className="bg-muted/40 py-4 border-b">
           <div className="flex justify-between items-center px-2">
              <span className="font-semibold text-sm uppercase text-muted-foreground tracking-wider">Subject</span>
              <span className="font-semibold text-sm uppercase text-muted-foreground tracking-wider">Performance</span>
           </div>
        </CardHeader>
        <Accordion type="single" collapsible className="w-full">
          {SUBJECTS.map((subject) => (
            <AccordionItem key={subject.code} value={subject.code} className="border-b last:border-0 px-2">
              <AccordionTrigger className="hover:no-underline py-4 px-4 hover:bg-muted/20 transition-colors rounded-lg data-[state=open]:bg-muted/30">
                 <div className="flex flex-col md:flex-row md:items-center w-full gap-4 text-left">
                    {/* Subject Icon & Code */}
                    <div className="flex items-center gap-4 flex-1">
                        <div className="h-10 w-10 rounded bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300 flex items-center justify-center font-bold text-xs shadow-sm">
                            {subject.code.slice(0, 2)}
                        </div>
                        <div className="flex flex-col">
                            <span className="font-semibold text-sm md:text-base leading-tight">
                                {subject.name}
                            </span>
                            <span className="text-xs font-mono text-muted-foreground mt-0.5">
                                {subject.code}
                            </span>
                        </div>
                    </div>
                    
                    {/* Scores Right Side */}
                    <div className="flex items-center gap-6 md:mr-4">
                        <div className="flex flex-col items-end gap-1 w-24">
                            <span className="text-xs text-muted-foreground uppercase">Obtained</span>
                            <span className="font-mono font-bold text-lg leading-none">
                                {subject.obtained.toFixed(2)}
                            </span>
                        </div>
                        <div className="hidden md:block h-8 w-px bg-border" />
                        <div className="flex flex-col items-end gap-1 w-20">
                             <span className="text-xs text-muted-foreground uppercase">Max</span>
                             <span className="font-mono text-muted-foreground text-sm">
                                / {subject.max}
                             </span>
                        </div>
                    </div>
                 </div>
              </AccordionTrigger>
              
              <AccordionContent className="px-6 pb-6 pt-2">
                  <div className="mt-4 rounded-lg border bg-card p-4 shadow-sm">
                      <div className="flex items-center gap-2 mb-6 text-sm text-muted-foreground">
                          <ClipboardList className="w-4 h-4" />
                          <span>Component-wise Breakdown</span>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  {STANDARD_BREAKDOWN.map((comp) => {
    const score = COMPONENT_SCORES[subject.code]?.[comp.code] ?? 0;

    return (
      <div key={comp.code} className="flex items-start gap-3">
        {/* Status Icon */}
        <div
          className={`mt-0.5 h-8 w-8 rounded-full flex items-center justify-center text-[10px] font-bold border ${
            comp.code.includes("MID")
              ? "bg-amber-50 border-amber-200 text-amber-700 dark:bg-amber-900/20 dark:border-amber-800"
              : "bg-muted border-input"
          }`}
        >
          {comp.code}
        </div>

        <div className="flex-1 space-y-1.5">
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium">{comp.label}</span>
            <span className="text-xs font-mono font-medium text-muted-foreground">
              {score.toFixed(2)} / {comp.max.toFixed(2)}
            </span>
          </div>

          {/* Visual Weightage */}
          <div className="relative pt-1">
            <Progress
              value={score}
              max={comp.max}
              className="h-1.5 bg-muted"
            />
          </div>
        </div>
      </div>
    );
  })}
</div>


                      {/* Updated Target / Footer Section */}
                      <div className="mt-6 flex items-center justify-between p-3 rounded bg-blue-50 dark:bg-blue-900/10 border border-blue-100 dark:border-blue-900">
                           <div className="flex items-center gap-2">
                               <ShieldCheck className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                               <div className="flex flex-col">
                                   <span className="text-xs font-bold text-blue-700 dark:text-blue-300 uppercase">Target Score</span>
                                   <span className="text-[10px] text-blue-600/80 dark:text-blue-400/80">
                                       Internal Marks Required
                                   </span>
                               </div>
                           </div>
                           <div className="flex items-center gap-4 text-right">
                                <div>
                                    <span className="block text-[10px] text-muted-foreground uppercase">Min Pass</span>
                                    <span className="text-sm font-bold text-foreground">16/40</span>
                                </div>
                                <div className="h-8 w-px bg-blue-200 dark:bg-blue-800" />
                                <div>
                                    <span className="block text-[10px] text-muted-foreground uppercase">Safe Zone</span>
                                    <span className="text-sm font-bold text-green-600 dark:text-green-400">20/40</span>
                                </div>
                           </div>
                      </div>
                  </div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </Card>
    </div>
  );
}