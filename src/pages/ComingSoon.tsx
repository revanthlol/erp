import { Card, CardContent } from "@/components/ui/card";
import { Construction } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export default function ComingSoon() {
  return (
    <div className="flex flex-col items-center justify-center h-[60vh] text-center space-y-4">
      <Card className="p-8 shadow-sm max-w-md w-full flex flex-col items-center">
        <div className="h-16 w-16 bg-muted rounded-full flex items-center justify-center mb-4">
           <Construction className="h-8 w-8 text-muted-foreground" />
        </div>
        <CardContent className="space-y-2 p-0">
          <h2 className="text-2xl font-bold tracking-tight">Work in Progress</h2>
          <p className="text-sm text-muted-foreground">
            We are currently building this module. Please check back later for updates.
          </p>
          <div className="pt-6">
            <Link to="/">
               <Button variant="outline" className="w-full">Return to Profile</Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}