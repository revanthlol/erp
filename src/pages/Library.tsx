import { useState, useEffect } from "react";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import {
    Book,
    Search,
    ExternalLink,
    GraduationCap,
    Code2,
    Globe,
    Library as LibraryIcon,
    Sparkles,
    Youtube,
    BookOpen,
    Terminal,
    Map,
    School
} from "lucide-react";
import { authApi } from "@/lib/api";

// --- Curated Resources ---
const INSTITUTIONAL_GATEWAYS = [
    { name: "DELNET", desc: "Developing Library Network. Access to millions of bibliographic records.", link: "https://delnet.in/index.html", tag: "Premium", color: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300" },
    { name: "N-LIST (INFLIBNET)", desc: "Access e-ShodhSindhu e-resources (6,000+ journals, 1,99,500+ ebooks).", link: "https://nlist.inflibnet.ac.in/", tag: "Institutional", color: "bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-300" }
];

const GLOBAL_LEARNING_HUB = [
    { name: "MIT OpenCourseWare", desc: "Direct access to virtually all MIT course content.", link: "https://ocw.mit.edu/", tag: "Foundation", icon: GraduationCap },
    { name: "Harvard CS50", desc: "The gold standard for introductory computer science education.", link: "https://cs50.harvard.edu/", tag: "CS Core", icon: Terminal },
    { name: "roadmap.sh", desc: "Step-by-step guides and paths to learn various technologies.", link: "https://roadmap.sh/", tag: "Pathways", icon: Map },
    { name: "freeCodeCamp", desc: "Learn to code for free through thousands of hours of content.", link: "https://www.freecodecamp.org/", tag: "Interactive", icon: Code2 },
    { name: "National Digital Library", desc: "NDLI - 24/7 access to educational and research content.", link: "https://ndl.iitkgp.ac.in/", tag: "Govt. of India", icon: LibraryIcon },
    { name: "Khan Academy", desc: "Free, world-class education for anyone, anywhere.", link: "https://www.khanacademy.org/", tag: "Fundamentals", icon: Sparkles },
    { name: "Stanford Online", desc: "Free online courses from Stanford University across multiple disciplines.", link: "https://online.stanford.edu/free-content", tag: "University", icon: School },
    { name: "WolframAlpha", desc: "Computational intelligence for science, math, and general knowledge queries.", link: "https://www.wolframalpha.com/", tag: "Knowledge", icon: Globe },
    { name: "Project Gutenberg", desc: "Library of over 70,000 free eBooks including classic academic texts.", link: "https://www.gutenberg.org/", tag: "E-Books", icon: BookOpen },
    { name: "TED-Ed", desc: "Lessons worth sharing through high-quality animated educational videos.", link: "https://ed.ted.com/", tag: "Video", icon: Globe },
    { name: "Coursera (Free Tools)", desc: "Access free audit-mode courses from top universities.", link: "https://www.coursera.org/courses?query=free", tag: "Certification", icon: Globe }
];

export default function Library() {
    const [student, setStudent] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const load = async () => {
            try {
                const data = await authApi.getProfile();
                setStudent(data);
            } catch (e) {
                console.error("Failed to load profile in Library", e);
            } finally {
                setLoading(false);
            }
        };
        load();
    }, []);

    const deptName = student?.course || "Your Department";

    return (
        <div className="space-y-6 animate-in fade-in-50 duration-500 max-w-7xl mx-auto">
            {/* Header */}
            <div className="flex flex-col gap-4 md:flex-row md:items-center justify-between">
                <div>
                    <h2 className="text-3xl font-bold tracking-tight text-primary">Digital Library</h2>
                    <p className="text-muted-foreground mt-1">Institutional Gateways & Global Learning Hub</p>
                </div>
                <div className="flex items-center w-full md:w-auto gap-2">
                    <div className="relative w-full md:w-80">
                        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input
                            type="search"
                            placeholder="Search OPAC (Books, journals)..."
                            className="pl-8 bg-background border-primary/10 focus-visible:ring-primary"
                        />
                    </div>
                    <Button>Search</Button>
                </div>
            </div>

            <div className="grid grid-cols-1 gap-8">
                
                {/* --- Section 1: Institutional Access --- */}
                <div className="space-y-4">
                    <h3 className="text-sm font-bold uppercase tracking-widest text-muted-foreground flex items-center gap-2">
                        <Badge variant="secondary" className="rounded-sm px-1.5 h-5">Official</Badge>
                        Loyola Academy Institutional Access
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {INSTITUTIONAL_GATEWAYS.map((item) => (
                            <Card key={item.name} className="hover:shadow-md transition-all cursor-pointer border-l-4 border-l-primary group bg-card/60 backdrop-blur-sm">
                                <CardHeader className="pb-2">
                                    <div className="flex justify-between items-start">
                                        <div className={`p-2 rounded-lg ${item.color}`}>
                                            <LibraryIcon className="w-6 h-6" />
                                        </div>
                                        <Badge variant="outline" className="text-[10px] font-bold">{item.tag}</Badge>
                                    </div>
                                    <CardTitle className="pt-4 flex items-center gap-2 group-hover:text-primary transition-colors text-lg">
                                        {item.name} <ExternalLink className="w-4 h-4 opacity-50" />
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <CardDescription className="text-sm line-clamp-2">
                                        {item.desc}
                                    </CardDescription>
                                </CardContent>
                                <CardFooter className="pt-2">
                                    <Button size="sm" variant="outline" className="w-full justify-between hover:bg-primary hover:text-primary-foreground" onClick={() => window.open(item.link, '_blank')}>
                                        Access Library Portal
                                        <Globe className="w-4 h-4" />
                                    </Button>
                                </CardFooter>
                            </Card>
                        ))}
                    </div>
                </div>

                <Separator className="opacity-50" />

                {/* --- Section 2: Global Learning Hub --- */}
                <div className="space-y-6">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                        <div className="space-y-1">
                            <h2 className="text-3xl font-extrabold tracking-tight bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                                Global Learning Hub
                            </h2>
                            <p className="text-muted-foreground text-sm font-medium flex items-center gap-2">
                                <GraduationCap className="w-4 h-4" />
                                {loading ? "Identifying your department..." : `Resources curated for ${deptName}`}
                            </p>
                        </div>
                    </div>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                        {GLOBAL_LEARNING_HUB.map((item) => (
                            <Card key={item.name} className="flex flex-col justify-between hover border-muted/60 hover:border-primary/30 transition-colors group">
                                <CardHeader className="p-4 pb-0">
                                    <div className="flex justify-between items-center mb-2">
                                        <div className="p-1.5 bg-muted rounded-md group-hover:bg-primary/10 transition-colors">
                                            <item.icon className="w-4 h-4 text-muted-foreground group-hover:text-primary" />
                                        </div>
                                        <Badge variant="secondary" className="text-[9px] font-semibold tracking-tighter uppercase">{item.tag}</Badge>
                                    </div>
                                    <CardTitle className="text-sm font-bold group-hover:text-primary transition-colors">{item.name}</CardTitle>
                                    <CardDescription className="text-xs mt-1 line-clamp-2 leading-relaxed">{item.desc}</CardDescription>
                                </CardHeader>
                                <CardFooter className="p-4 pt-4">
                                    <Button size="sm" variant="ghost" className="w-full text-xs h-8 border border-transparent hover:border-primary/20 hover:bg-primary/5" onClick={() => window.open(item.link, '_blank')}>
                                        Learn More <ExternalLink className="w-3 h-3 ml-2 opacity-50" />
                                    </Button>
                                </CardFooter>
                            </Card>
                        ))}
                    </div>
                </div>

                {/* --- Section 3: Quick Tip --- */}
                <Alert className="bg-primary/5 border-primary/10">
                    <GraduationCap className="h-4 w-4 text-primary" />
                    <AlertTitle className="text-sm font-bold">Research Tip</AlertTitle>
                    <AlertDescription className="text-xs text-muted-foreground">
                        Most premium journals and research papers are accessible via the **N-LIST** gateway using your institutional credentials. 
                        For developer roadmaps and project-based learning, refer to **roadmap.sh** and **freeCodeCamp**.
                    </AlertDescription>
                </Alert>
            </div>
        </div>
    );
}