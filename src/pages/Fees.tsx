import { useState } from "react";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Separator } from "@/components/ui/separator";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { 
    CreditCard, 
    Download, 
    History, 
    Wallet, 
    AlertTriangle, 
    Printer, 
    Landmark 
} from "lucide-react";

// --- Mock Data ---
const PAYMENT_HISTORY = [
    { date: "10/06/2024", mode: "Cash at Bank", number: "LOYOLA/24-25/114718", amount: 14998.00 },
    { date: "10/06/2024", mode: "Cash at Bank", number: "LOYOLA/24-25/114718", amount: 11300.00 },
    { date: "10/06/2024", mode: "Cash at Bank", number: "LOYOLA/24-25/114718", amount: 13702.00 },
    { date: "07/03/2025", mode: "Cash at Bank", number: "LOYOLA/24-25/141649", amount: 14997.00 },
    { date: "07/03/2025", mode: "Cash at Bank", number: "LOYOLA/24-25/141649", amount: 9500.00 },
    { date: "07/03/2025", mode: "Cash at Bank", number: "LOYOLA/24-25/141649", amount: 18203.00 },
    { date: "11/09/2024", mode: "Adj-Journal", number: "LOYOLA/24-25/123324", amount: 1900.00 },
    { date: "11/03/2025", mode: "Cash at Bank", number: "LOYOLA/24-25/144324", amount: 200.00 },
    { date: "11/03/2025", mode: "Cash at Bank", number: "LOYOLA/24-25/143604", amount: 10.00 },
    { date: "11/03/2025", mode: "Cash at Bank", number: "LOYOLA/24-25/144324", amount: 50.00 },
    { date: "21/08/2025", mode: "Cash at Bank", number: "LOYOLA/25-26/157351", amount: 8270.00 },
    { date: "21/08/2025", mode: "Cash at Bank", number: "LOYOLA/25-26/157351", amount: 22475.00 },
    { date: "21/08/2025", mode: "Cash at Bank", number: "LOYOLA/25-26/157351", amount: 12265.00 },
    { date: "04/09/2025", mode: "Cash at Bank", number: "LOYOLA/25-26/158863", amount: 2100.00 },
];

const DUE_INFO = {
    head: "Establishment & Infrastructure Fee, Laboratory & Admin Fee, Tuition Fee",
    dueDate: "30/06/2025",
    amount: 39690.00
};

const TOTAL_PAID = 131700.00;
const TOTAL_DUE = 39690.00;
const TOTAL_FEE = TOTAL_PAID + TOTAL_DUE;
const PROGRESS_PCT = (TOTAL_PAID / TOTAL_FEE) * 100;

export default function Fees() {
    const [paymentType, setPaymentType] = useState("full");
    const [partialAmount, setPartialAmount] = useState("");
    const [isPaying, setIsPaying] = useState(false);

    const handlePayment = () => {
        setIsPaying(true);
        // Simulation
        setTimeout(() => {
            alert("Redirecting to Payment Gateway...");
            setIsPaying(false);
        }, 1000);
    };

    return (
        <div className="space-y-6 animate-in fade-in-50 duration-500 max-w-7xl mx-auto">
            
            {/* --- Summary Dashboard --- */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="bg-gradient-to-br from-green-50 to-emerald-100/50 dark:from-green-900/10 dark:to-transparent border-green-200 dark:border-green-800 shadow-sm">
                    <CardHeader className="pb-2">
                        <CardDescription className="text-green-700 dark:text-green-400 font-medium">Total Paid</CardDescription>
                        <CardTitle className="text-3xl font-bold">₹{TOTAL_PAID.toLocaleString()}</CardTitle>
                    </CardHeader>
                    <CardFooter>
                         <div className="w-full space-y-1">
                             <div className="flex justify-between text-xs text-muted-foreground">
                                 <span>Academic Progress</span>
                                 <span>{PROGRESS_PCT.toFixed(0)}%</span>
                             </div>
                             <Progress value={PROGRESS_PCT} className="h-2 bg-green-200 dark:bg-green-900/50" indicatorClassName="bg-green-600 dark:bg-green-400" />
                         </div>
                    </CardFooter>
                </Card>

                <Card className="bg-gradient-to-br from-red-50 to-rose-100/50 dark:from-red-900/10 dark:to-transparent border-red-200 dark:border-red-800 shadow-sm">
                    <CardHeader className="pb-2">
                        <CardDescription className="text-red-700 dark:text-red-400 font-medium">Total Due</CardDescription>
                        <CardTitle className="text-3xl font-bold">₹{TOTAL_DUE.toLocaleString()}</CardTitle>
                    </CardHeader>
                    <CardFooter>
                         <p className="text-xs text-red-600/80 dark:text-red-400/80 flex items-center gap-1 font-semibold">
                            <AlertTriangle className="w-3 h-3" /> Due by {DUE_INFO.dueDate}
                         </p>
                    </CardFooter>
                </Card>

                <Card className="flex flex-col justify-center border-l-4 border-l-primary shadow-sm">
                    <CardContent className="py-6 space-y-2">
                         <div className="flex items-center gap-2 text-muted-foreground">
                             <Wallet className="w-5 h-5" />
                             <span className="font-semibold text-sm">Estimated Total Fee</span>
                         </div>
                         <div className="text-2xl font-bold">₹{TOTAL_FEE.toLocaleString()}</div>
                         <p className="text-xs text-muted-foreground">For Academic Year 2025-2026</p>
                    </CardContent>
                </Card>
            </div>


            {/* --- Tabs for Action vs History --- */}
            <Tabs defaultValue="pay" className="w-full">
                <TabsList className="grid w-full grid-cols-2 md:w-[400px]">
                    <TabsTrigger value="pay">Make Payment</TabsTrigger>
                    <TabsTrigger value="history">History ({PAYMENT_HISTORY.length})</TabsTrigger>
                </TabsList>
                
                {/* --- Tab: Payment Actions --- */}
                <TabsContent value="pay" className="space-y-4 mt-4">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        
                        {/* Left: Payment Form */}
                        <Card className="lg:col-span-2 shadow-sm border-2 border-primary/10">
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <CreditCard className="w-5 h-5 text-primary" /> Fee Payment Portal
                                </CardTitle>
                                <CardDescription>Clear your outstanding dues securely</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                {/* Dues Summary within form */}
                                <div className="p-4 bg-muted/40 rounded-lg space-y-3">
                                    <div className="space-y-1">
                                        <p className="text-xs font-semibold uppercase text-muted-foreground">Fee Head</p>
                                        <p className="text-sm font-medium leading-snug">{DUE_INFO.head}</p>
                                    </div>
                                    <Separator />
                                    <div className="flex justify-between items-center">
                                        <p className="text-xs font-semibold uppercase text-muted-foreground">Due Amount</p>
                                        <p className="font-mono text-xl font-bold">₹{DUE_INFO.amount.toLocaleString()}</p>
                                    </div>
                                </div>

                                <RadioGroup defaultValue="full" onValueChange={setPaymentType} className="grid grid-cols-2 gap-4">
                                    <div>
                                        <RadioGroupItem value="full" id="full" className="peer sr-only" />
                                        <Label
                                        htmlFor="full"
                                        className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary peer-data-[state=checked]:text-primary cursor-pointer transition-all"
                                        >
                                            <span className="mb-2 text-sm font-bold">Full Payment</span>
                                            <span className="font-mono text-lg">₹{DUE_INFO.amount.toLocaleString()}</span>
                                        </Label>
                                    </div>
                                    <div>
                                        <RadioGroupItem value="partial" id="partial" className="peer sr-only" />
                                        <Label
                                        htmlFor="partial"
                                        className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary peer-data-[state=checked]:text-primary cursor-pointer transition-all"
                                        >
                                            <span className="mb-2 text-sm font-bold">Partial Payment</span>
                                            <span className="font-mono text-sm text-muted-foreground">Custom Amount</span>
                                        </Label>
                                    </div>
                                </RadioGroup>

                                {paymentType === 'partial' && (
                                    <div className="space-y-2 animate-in fade-in slide-in-from-top-2">
                                        <Label htmlFor="amount">Enter Amount (INR)</Label>
                                        <div className="relative">
                                            <span className="absolute left-3 top-2.5 text-muted-foreground">₹</span>
                                            <Input 
                                                id="amount" 
                                                type="number" 
                                                className="pl-7" 
                                                placeholder="0.00" 
                                                value={partialAmount}
                                                onChange={(e) => setPartialAmount(e.target.value)}
                                            />
                                        </div>
                                        <p className="text-xs text-muted-foreground">Min allowed partial payment is ₹1,000</p>
                                    </div>
                                )}
                            </CardContent>
                            <CardFooter className="flex flex-col md:flex-row gap-3 bg-muted/20 py-4">
                                <Button className="w-full md:w-auto text-base" size="lg" onClick={handlePayment} disabled={isPaying}>
                                    {isPaying ? "Processing..." : "Pay via Net Banking / Card"}
                                </Button>
                                <Button variant="outline" className="w-full md:w-auto" onClick={() => alert('Downloading Challan...')}>
                                    <Printer className="w-4 h-4 mr-2" />
                                    Print Bank Challan
                                </Button>
                            </CardFooter>
                        </Card>

                        {/* Right: Important Warnings */}
                        <div className="space-y-4">
                            <Alert variant="destructive" className="bg-red-50 text-red-900 border-red-200 dark:bg-red-900/10 dark:text-red-300 dark:border-red-900">
                                <AlertTriangle className="h-4 w-4" />
                                <AlertTitle>Prerequisites</AlertTitle>
                                <AlertDescription className="text-xs leading-relaxed mt-2 list-disc pl-4 space-y-1">
                                    <li>Clear all earlier Semester/Year dues.</li>
                                    <li>Clear Skill Enhancement Course fees.</li>
                                    <li>Clear at least <strong>50%</strong> of current Academic Year's fee to be eligible for Exam Fee generation.</li>
                                </AlertDescription>
                            </Alert>

                            <Alert className="bg-amber-50 text-amber-900 border-amber-200 dark:bg-amber-900/10 dark:text-amber-300 dark:border-amber-900">
                                <Landmark className="h-4 w-4" />
                                <AlertTitle>Reconciliation Delay</AlertTitle>
                                <AlertDescription className="text-xs leading-relaxed mt-2">
                                    Payments made online typically reflect immediately. However, challan or bank payments may take up to <strong>2-3 working days</strong> for Accounts confirmation.
                                </AlertDescription>
                            </Alert>
                        </div>
                    </div>
                </TabsContent>
                

                {/* --- Tab: Payment History --- */}
                <TabsContent value="history" className="mt-4">
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <History className="w-5 h-5" /> Transaction Logs
                            </CardTitle>
                            <CardDescription>Comprehensive list of all payments received</CardDescription>
                        </CardHeader>
                        <div className="relative w-full overflow-auto">
                            <Table>
                                <TableHeader className="bg-muted/40">
                                    <TableRow>
                                        <TableHead>Date</TableHead>
                                        <TableHead>Receipt No</TableHead>
                                        <TableHead>Payment Mode</TableHead>
                                        <TableHead className="text-right">Amount (₹)</TableHead>
                                        <TableHead className="text-right w-[50px]">Action</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {PAYMENT_HISTORY.map((txn, idx) => (
                                        <TableRow key={idx}>
                                            <TableCell className="font-medium text-muted-foreground text-xs">{txn.date}</TableCell>
                                            <TableCell className="font-mono text-xs">{txn.number}</TableCell>
                                            <TableCell>
                                                <Badge variant="outline" className="font-normal text-xs text-muted-foreground">
                                                    {txn.mode}
                                                </Badge>
                                            </TableCell>
                                            <TableCell className="text-right font-bold text-sm">
                                                {txn.amount.toLocaleString()}
                                            </TableCell>
                                            <TableCell className="text-right">
                                                <Button size="icon" variant="ghost" className="h-6 w-6" title="Download Receipt">
                                                    <Download className="w-3 h-3 text-primary" />
                                                </Button>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                     <TableRow className="bg-primary/5 hover:bg-primary/5 font-bold border-t-2 border-primary/20">
                                        <TableCell colSpan={3} className="text-right">Grand Total Paid:</TableCell>
                                        <TableCell className="text-right text-base text-primary">₹1,31,700</TableCell>
                                        <TableCell></TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </div>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    );
}