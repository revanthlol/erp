import { useState, useEffect } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Card,
  CardHeader,
  CardContent
} from "@/components/ui/card";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { 
  ClipboardList, 
  AlertCircle, 
  ShieldCheck, 
  Loader2,
  AlertTriangle
} from "lucide-react";
import { authApi } from "@/lib/api";

// Interfaces Matching Backend
interface ComponentMark {
    label: string;
    obtained: string;
    max: string;
}
interface SubjectMark {
    code: string;
    name: string;
    obtainedTotal: string;
    maxTotal: string;
    components: ComponentMark[];
}

export default function InternalMarks() {
  const [subjects, setSubjects] = useState<SubjectMark[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchData = async () => {
      setLoading(true);
      setError("");
      try {
          const data: any = await authApi.getInternals();
          setSubjects(data || []);
      } catch (err) {
          console.error(err);
          setError("Failed to retrieve internal marks.");
      } finally {
          setLoading(false);
      }
  };

  useEffect(() => {
      fetchData();
  }, []);

  if (loading) {
      return (
          <div className="h-[60vh] flex flex-col items-center justify-center gap-3 text-muted-foreground animate-in fade-in-50">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
              <p>Loading assessment records...</p>
          </div>
      );
  }

  if (error && subjects.length === 0) {
      return (
          <div className="h-[50vh] flex flex-col items-center justify-center gap-4 text-center">
              <AlertTriangle className="h-10 w-10 text-destructive/50" />
              <p className="text-muted-foreground">{error}</p>
              <button onClick={fetchData} className="underline text-sm font-medium">Try Again</button>
          </div>
      );
  }

  return (
    <div className="space-y-6 animate-in fade-in-50 duration-500 pb-10">
      
      {/* Header Summary */}
      <div className="flex flex-col gap-1">
         <h2 className="text-3xl font-bold tracking-tight">Internal Marks</h2>
         <p className="text-muted-foreground text-sm">Continuous Internal Assessment (CIA)</p>
      </div>

      {/* Info Banner */}
      <Alert className="bg-primary/5 border-primary/20">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Assessment Status</AlertTitle>
        <AlertDescription className="text-muted-foreground text-xs mt-1">
          If scores appear as zero or empty, the faculty has not yet uploaded finalized marks for that component. 
          Please verify maximum weightage meanwhile.
        </AlertDescription>
      </Alert>

      {/* Subject Accordion List */}
      <Card className="border shadow-sm bg-card">
        <CardHeader className="bg-muted/40 py-3 border-b hidden md:block">
           <div className="flex justify-between items-center px-4">
              <span className="text-[10px] font-bold uppercase text-muted-foreground tracking-wider">Subject Code / Name</span>
              <span className="text-[10px] font-bold uppercase text-muted-foreground tracking-wider md:pr-10">Current Standing</span>
           </div>
        </CardHeader>
        <Accordion type="single" collapsible className="w-full">
          {subjects.map((subject) => (
            <AccordionItem key={subject.code} value={subject.code} className="border-b last:border-0">
              <AccordionTrigger className="hover:no-underline py-4 px-4 hover:bg-muted/30 transition-colors data-[state=open]:bg-muted/20 group">
                 <div className="flex flex-col md:flex-row md:items-center w-full gap-4 text-left">
                    
                    {/* Subject Identifiers */}
                    <div className="flex items-center gap-4 flex-1">
                        <div className="h-9 w-9 rounded-md bg-blue-50 text-blue-700 border border-blue-100 dark:bg-blue-900/30 dark:text-blue-300 dark:border-blue-800 flex items-center justify-center font-bold text-[10px] shadow-sm flex-shrink-0 group-hover:scale-105 transition-transform">
                            {subject.code.slice(0, 2)}
                        </div>
                        <div className="flex flex-col gap-0.5">
                            <span className="font-semibold text-sm leading-tight line-clamp-1 group-hover:text-primary transition-colors">
                                {subject.name}
                            </span>
                            <span className="text-[10px] font-mono text-muted-foreground">
                                {subject.code}
                            </span>
                        </div>
                    </div>
                    
                    {/* Top Level Scores (Always Visible) */}
                    <div className="flex items-center gap-6 md:mr-6 justify-between md:justify-end w-full md:w-auto mt-2 md:mt-0 pl-14 md:pl-0">
                        <div className="flex flex-col items-end gap-0.5 min-w-[3rem]">
                            <span className="text-[9px] uppercase font-bold text-muted-foreground/70">Obtained</span>
                            <span className={`font-mono text-base font-bold ${parseFloat(subject.obtainedTotal) > 0 ? "text-foreground" : "text-muted-foreground/50"}`}>
                                {parseFloat(subject.obtainedTotal).toFixed(2)}
                            </span>
                        </div>
                        <div className="hidden md:block h-8 w-px bg-border/60" />
                        <div className="flex flex-col items-end gap-0.5 min-w-[3rem]">
                             <span className="text-[9px] uppercase font-bold text-muted-foreground/70">Max</span>
                             <span className="font-mono text-sm text-muted-foreground">
                                {parseFloat(subject.maxTotal).toFixed(2)}
                             </span>
                        </div>
                    </div>
                 </div>
              </AccordionTrigger>
              
              <AccordionContent className="bg-muted/5 border-t">
                  <div className="p-4 sm:p-6 space-y-6">
                      
                      {/* Component Grid */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-4">
                          {subject.components.map((comp, idx) => {
                              // Identify key exams for highlighting
                              const isExam = comp.label.toLowerCase().includes("exam");
                              const val = parseFloat(comp.obtained) || 0;
                              const max = parseFloat(comp.max) || 0;
                              
                              return (
                                  <div key={idx} className="flex justify-between items-center pb-2 border-b border-dashed border-border/50">
                                      <div className="flex items-center gap-3">
                                          <div className={`w-1.5 h-1.5 rounded-full ${isExam ? "bg-amber-500" : "bg-muted-foreground/30"}`} />
                                          <span className="text-xs font-medium text-muted-foreground line-clamp-1 max-w-[150px]" title={comp.label}>
                                              {comp.label}
                                          </span>
                                      </div>
                                      <div className="flex items-baseline gap-1 font-mono text-xs">
                                          <span className={`font-semibold ${val > 0 ? "text-foreground" : "text-muted-foreground/40"}`}>
                                              {val > 0 ? val.toFixed(2) : "-"}
                                          </span>
                                          <span className="text-muted-foreground/40">/</span>
                                          <span className="text-muted-foreground">
                                              {max.toFixed(2)}
                                          </span>
                                      </div>
                                  </div>
                              );
                          })}
                      </div>

                      {/* Footer Totals */}
                      <div className="rounded-md bg-muted/40 p-3 flex items-center justify-between border border-border/50">
                           <div className="flex items-center gap-2">
                               <ShieldCheck className="w-4 h-4 text-primary" />
                               <span className="text-xs font-medium">Evaluation Summary</span>
                           </div>
                           <div className="flex gap-4 text-xs">
                                <span className="text-muted-foreground">Passed: 
                                    <span className="font-mono ml-1 font-bold text-foreground">16/40</span>
                                </span>
                                <span className="text-muted-foreground hidden sm:inline">Safe: 
                                    <span className="font-mono ml-1 font-bold text-green-600 dark:text-green-500">20/40</span>
                                </span>
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