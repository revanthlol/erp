import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from "react-router-dom";
import { ThemeProvider } from "@/components/theme-provider";
import DashboardLayout from "@/components/DashboardLayout";
import { AnimatePresence } from "framer-motion";
import { PageTransition } from "@/components/PageTransition";
import ProtectedRoute from "@/components/ProtectedRoute"; // Import logic

// Pages
import Login from "@/pages/Login"; // Import Login
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
            {/* We wrap the entire Dashboard Layout here */}
            <Route path="*" element={
                <DashboardLayout>
                    <Routes>
                        <Route path="/" element={<PageTransition><StudentProfile /></PageTransition>} />
                        <Route path="/subjects" element={<PageTransition><StudentSubjects /></PageTransition>} />
                        <Route path="/attendance" element={<PageTransition><Attendance /></PageTransition>} />
                        <Route path="/attendance-hourly" element={<PageTransition><HourWiseAttendance /></PageTransition>} />
                        <Route path="/internals" element={<PageTransition><InternalMarks /></PageTransition>} />
                        <Route path="/hall-ticket" element={<PageTransition><HallTicket /></PageTransition>} />
                        <Route path="/exam-marks" element={<PageTransition><ExamMarks /></PageTransition>} />
                        <Route path="/services" element={<PageTransition><Services /></PageTransition>} />
                        <Route path="/fees" element={<PageTransition><Fees /></PageTransition>} />
                        <Route path="/library" element={<PageTransition><Library /></PageTransition>} />
                        {/* Catch all to redirect to home inside dashboard */}
                        <Route path="*" element={<Navigate to="/" replace />} />
                    </Routes>
                </DashboardLayout>
            } />
        </Route>

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
    </ThemeProvider>
  );
}