import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from "react-router-dom";
import { ThemeProvider } from "@/components/theme-provider";
import DashboardLayout from "@/components/DashboardLayout";
import { AnimatePresence } from "framer-motion";
import { PageTransition } from "@/components/PageTransition";
import ProtectedRoute from "@/components/ProtectedRoute"; 
import { Toaster } from "@/components/ui/sonner";

// Pages
import Login from "@/pages/Login"; 
import StudentProfile from "@/pages/StudentProfile";
import StudentSubjects from "@/pages/StudentSubjects";
import Attendance from "@/pages/Attendance";
import HourWiseAttendance from "@/pages/HourWiseAttendance";
import InternalMarks from "@/pages/InternalMarks";
import ExamMarks from "@/pages/ExamMarks";
import HallTicket from "@/pages/HallTicket";
import Services from "@/pages/Services";
import Fees from "@/pages/Fees";
import Library from "@/pages/Library";

function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        
        {/* Public Route: Login */}
        <Route path="/login" element={
            <PageTransition>
                <Login />
            </PageTransition>
        } />

        {/* Protected Routes (Dashboard) */}
        <Route element={<ProtectedRoute />}>
            <Route path="/" element={<DashboardLayout />}>
                {/* Default Child: Home -> Profile */}
                <Route index element={<PageTransition><StudentProfile /></PageTransition>} />
                
                <Route path="subjects" element={<PageTransition><StudentSubjects /></PageTransition>} />
                <Route path="attendance" element={<PageTransition><Attendance /></PageTransition>} />
                <Route path="attendance-hourly" element={<PageTransition><HourWiseAttendance /></PageTransition>} />
                <Route path="internals" element={<PageTransition><InternalMarks /></PageTransition>} />
                <Route path="hall-ticket" element={<PageTransition><HallTicket /></PageTransition>} />
                <Route path="exam-marks" element={<PageTransition><ExamMarks /></PageTransition>} />
                <Route path="services" element={<PageTransition><Services /></PageTransition>} />
                <Route path="fees" element={<PageTransition><Fees /></PageTransition>} />
                <Route path="library" element={<PageTransition><Library /></PageTransition>} />
                
                <Route path="*" element={<Navigate to="/" replace />} />
            </Route>
        </Route>

        {/* Catch all top-level unknown routes -> Login */}
        <Route path="*" element={<Navigate to="/login" replace />} />

      </Routes>
    </AnimatePresence>
  );
}

export default function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="erp-ui-theme">
      <Router>
           <AnimatedRoutes />
      </Router>
      <Toaster />
    </ThemeProvider>
  );
}