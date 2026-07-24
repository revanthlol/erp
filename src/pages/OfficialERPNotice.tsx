import { ExternalLink, ShieldAlert } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const OFFICIAL_ERP_URL = "http://202.160.160.58:8080/lastudentportal/students/loginManager/youLogin.jsp";

export default function OfficialERPNotice() {
  return (
    <div className="flex min-h-[60vh] items-center justify-center py-8">
      <Card className="w-full max-w-2xl overflow-hidden border-amber-500/20 shadow-sm">
        <div className="h-2 bg-amber-500" />
        <CardHeader className="items-center space-y-4 pb-3 text-center">
          <div className="flex size-14 items-center justify-center rounded-2xl bg-amber-500/10 text-amber-600">
            <ShieldAlert className="size-7" />
          </div>
          <div className="space-y-2">
            <CardTitle className="text-2xl tracking-tight">Use the Official ERP Portal</CardTitle>
            <p className="text-sm text-muted-foreground">This student portal is an unofficial companion and is not the official Loyola ERP website.</p>
          </div>
        </CardHeader>
        <CardContent className="space-y-5 text-center">
          <p className="text-sm leading-relaxed text-muted-foreground">
            For hall tickets, attendance records, and official academic updates, please verify everything directly on the college ERP portal.
          </p>
          <Button asChild className="gap-2">
            <a href={OFFICIAL_ERP_URL} target="_blank" rel="noreferrer">
              Open Official ERP
              <ExternalLink className="size-4" />
            </a>
          </Button>
          <p className="break-all text-xs text-muted-foreground/70">{OFFICIAL_ERP_URL}</p>
        </CardContent>
      </Card>
    </div>
  );
}
