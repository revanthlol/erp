import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import PersonalDetails from './components/PersonalDetails';
import StudentSubjects from './components/StudentSubjects';
import AttendanceDetails from './components/AttendanceDetails';
import HourWiseAttendance from './components/HourWiseAttendance';
import { 
  InternalMarkDetails, 
  HallTicket, 
  FeePaidDetails,
  FeeDueDetails,
  ChangePassword,
  OnlineExam, 
  ExamMarkDetails,
  DefaultPage 
} from './components/ExamplePages';

// --- Helper Data & Components (No Changes Here) ---

const menuItems = {
  main: [
    { name: 'Personal Details' }, { name: 'Student Wise Subjects' }, { name: 'Attendance Details' },
    { name: 'Hour Wise Attendance' }, { name: 'Internal Mark Details' }, { name: 'Hall Ticket' },
    { name: 'Exam Mark Details' }, { name: 'Fee Paid Details' }, { name: 'Fee Due Details' },
    { name: 'Change Password' }, { name: 'Exam Application Registration' }, { name: 'General Elective Registration' },
    { name: 'Online Exam' }, { name: 'Revaluation Application Registration' }, { name: 'Bonafide Certificate Registration' },
    { name: 'Custodian Certificate Registration' }, { name: 'Medium of Instruction Certificate Registration' },
    { name: 'Duplicate ID Card Registration' }, { name: 'Club Registration' }, { name: 'Student Feedback Entry' },
    { name: 'Grievance' }, { name: 'Sign Out' },
  ],
  library: [
    { name: 'DELNET Login' }, { name: 'N-List Login' },
  ],
};

const Icon = ({ path, className = "w-6 h-6" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d={path} />
  </svg>
);

// --- Main Application Component ---

export default function App() {
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const [activeItem, setActiveItem] = useState('Personal Details');

  // Animation variants for the sidebar
  const sidebarVariants = {
    open: {
      x: 0,
      transition: { type: "spring", stiffness: 300, damping: 30 },
    },
    closed: {
      x: "-100%",
      transition: { type: "spring", stiffness: 300, damping: 30 },
    },
  };

  const NavItem = ({ name }) => {
    const isActive = activeItem === name;
    return (
      <a
        href="#"
        className={`group flex items-center px-3 py-3 text-sm font-medium transition-all duration-300 rounded-xl relative ${
          isActive 
            ? 'bg-gradient-to-r from-primary-600 to-primary-700 text-white shadow-lg shadow-primary-600/30' 
            : 'text-gray-300 hover:bg-gray-700/50 hover:text-white hover:shadow-md hover:scale-[1.02]'
        }`}
        onClick={(e) => {
            e.preventDefault();
            setActiveItem(name);
            if (window.innerWidth < 768) {
                setSidebarOpen(false);
            }
        }}
        aria-current={isActive ? 'page' : undefined}
      >
        {isActive && (
          <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-white rounded-r-full shadow-sm"></div>
        )}
        <div className="flex items-center space-x-3 w-full">
          <div className={`w-2 h-2 rounded-full transition-colors duration-200 ${
            isActive ? 'bg-white' : 'bg-gray-500 group-hover:bg-gray-300'
          }`}></div>
          <span className="relative z-10 flex-1">{name}</span>
          {isActive && (
            <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
          )}
        </div>
        {!isActive && (
          <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-transparent to-primary-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        )}
      </a>
    );
  };

  const Sidebar = () => (
    <>
      {/* Fixed Toggle Button */}
      <button
        onClick={() => setSidebarOpen(!isSidebarOpen)}
        className="fixed top-4 left-4 z-50 p-3 bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-700 hover:to-primary-800 text-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 focus:ring-offset-surface-100"
        aria-controls="sidebar"
        aria-expanded={isSidebarOpen}
      >
        <Icon path="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
        <span className="sr-only">Toggle sidebar</span>
      </button>

      <AnimatePresence>
        {isSidebarOpen && (
          <>
            {/* Mobile Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSidebarOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-20 md:hidden"
            />

            {/* Sidebar */}
            <motion.aside
              initial="closed"
              animate="open"
              exit="closed"
              variants={sidebarVariants}
              className="fixed inset-y-0 left-0 z-30 w-72 bg-gradient-to-b from-surface-200 via-surface-200 to-surface-300 border-r border-gray-700/50 shadow-2xl flex flex-col"
              aria-label="Sidebar"
            >
              {/* Sidebar Header */}
              <div className="px-6 py-6 border-b border-gray-700/50 flex-shrink-0">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gradient-to-r from-primary-500 to-primary-600 rounded-xl flex items-center justify-center">
                      <span className="text-white font-bold text-lg">E</span>
                    </div>
                    <div>
                      <h1 className="text-xl font-bold text-white">eVarsity ERP</h1>
                      <p className="text-xs text-gray-400">Student Portal</p>
                    </div>
                  </div>
                  <button 
                    onClick={() => setSidebarOpen(false)} 
                    className="p-2 text-gray-400 hover:text-white hover:bg-gray-700/50 rounded-lg transition-colors duration-200 md:hidden"
                  >
                    <Icon path="M6 18L18 6M6 6l12 12" />
                  </button>
                </div>
              </div>

              {/* Navigation - Scrollable */}
              <div className="flex-1 overflow-y-auto px-4 py-6">
                <nav className="space-y-2">
                  {/* Main Navigation */}
                  <div className="space-y-1">
                    {menuItems.main.map((item) => <NavItem key={item.name} {...item} />)}
                  </div>
                  
                  {/* Library Section */}
                  <div className="mt-8">
                    <div className="px-3 py-2 mb-3">
                      <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider flex items-center">
                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                        </svg>
                        Online Library
                      </h3>
                    </div>
                    <div className="space-y-1">
                      {menuItems.library.map((item) => <NavItem key={item.name} {...item} />)}
                    </div>
                  </div>
                </nav>
              </div>

              {/* Sidebar Footer */}
              <div className="px-4 py-4 border-t border-gray-700/50 flex-shrink-0">
                <div className="flex items-center space-x-3 p-3 bg-gray-800/50 rounded-lg">
                  <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-green-600 rounded-full flex items-center justify-center">
                    <span className="text-white text-sm font-semibold">G</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-white truncate">Gudla Revanth</p>
                    <p className="text-xs text-gray-400 truncate">Student</p>
                  </div>
                  <button className="p-1 text-gray-400 hover:text-white transition-colors">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                    </svg>
                  </button>
                </div>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );

  const Topbar = () => (
    <header className={`sticky top-0 z-10 flex items-center justify-between border-b border-gray-800 bg-surface-100/90 backdrop-blur-sm px-4 sm:px-6 h-14 transition-all duration-300 ${isSidebarOpen ? 'md:pl-72' : ''}`}>
      <div className="flex items-center gap-2">
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-400 hidden sm:block">eVarsity ERP</span>
          <span className="text-xs text-gray-500 hidden md:block">•</span>
          <span className="text-xs text-gray-500 hidden md:block">{activeItem}</span>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <button className="btn-ghost px-3 py-1.5 rounded-md hover:bg-gray-700 focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 focus:ring-offset-surface-100">
          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          Help
        </button>
        <button className="btn-primary px-3 py-1.5 rounded-md hover:bg-primary-700 focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 focus:ring-offset-surface-100">
          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
          Action
        </button>
      </div>
    </header>
  );

  const MainContent = () => {
    const renderContent = () => {
      switch (activeItem) {
        case 'Personal Details':
          return <PersonalDetails />;
        case 'Student Wise Subjects':
          return <StudentSubjects />;
        case 'Attendance Details':
          return <AttendanceDetails />;
        case 'Hour Wise Attendance':
          return <HourWiseAttendance />;
        case 'Internal Mark Details':
          return <InternalMarkDetails />;
        case 'Hall Ticket':
          return <HallTicket />;
        case 'Fee Paid Details':
          return <FeePaidDetails />;
        case 'Fee Due Details':
          return <FeeDueDetails />;
        case 'Online Exam':
          return <OnlineExam />;
        case 'Exam Mark Details':
          return <ExamMarkDetails />;
        case 'Change Password':
          return <ChangePassword />;
        case 'Exam Application Registration':
          return <DefaultPage title="Exam Application Registration" description="Register for upcoming examinations" />;
        case 'General Elective Registration':
          return <DefaultPage title="General Elective Registration" description="Register for elective subjects" />;
        case 'Revaluation Application Registration':
          return <DefaultPage title="Revaluation Application Registration" description="Apply for paper revaluation" />;
        case 'Bonafide Certificate Registration':
          return <DefaultPage title="Bonafide Certificate Registration" description="Request bonafide certificates" />;
        case 'Custodian Certificate Registration':
          return <DefaultPage title="Custodian Certificate Registration" description="Request custodian certificates" />;
        case 'Medium of Instruction Certificate Registration':
          return <DefaultPage title="Medium of Instruction Certificate Registration" description="Request medium of instruction certificates" />;
        case 'Duplicate ID Card Registration':
          return <DefaultPage title="Duplicate ID Card Registration" description="Request duplicate ID cards" />;
        case 'Club Registration':
          return <DefaultPage title="Club Registration" description="Register for student clubs and activities" />;
        case 'Student Feedback Entry':
          return <DefaultPage title="Student Feedback Entry" description="Submit feedback and suggestions" />;
        case 'Grievance':
          return <DefaultPage title="Grievance" description="Submit and track grievances" />;
        case 'Sign Out':
          return <DefaultPage title="Sign Out" description="Sign out of your account" />;
        case 'DELNET Login':
          return <DefaultPage title="DELNET Login" description="Access DELNET digital library" />;
        case 'N-List Login':
          return <DefaultPage title="N-List Login" description="Access N-List digital resources" />;
        default:
          return (
            <div className="space-y-6">
              <h1 className="text-2xl font-semibold text-white mb-4">{activeItem}</h1>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 mb-6">
                <div className="card p-4">
                  <p className="text-gray-400 text-sm">Quick stat</p>
                  <p className="text-3xl font-semibold mt-2">42</p>
                </div>
                <div className="card p-4">
                  <p className="text-gray-400 text-sm">Alert</p>
                  <p className="text-sm mt-2">No pending dues.</p>
                </div>
                <div className="card p-4">
                  <p className="text-gray-400 text-sm">Notice</p>
                  <p className="text-sm mt-2">Exam registration opens soon.</p>
                </div>
              </div>
              <div className="card p-6">
              <p className="text-center text-gray-400">Content for "{activeItem}" will be displayed here.</p>
            </div>
          </div>
          );
      }
    };

    return (
      <main className={`flex-1 transition-all duration-300 ease-in-out ${isSidebarOpen ? 'md:pl-72' : 'md:pl-0'} pt-16`}>
        <div className="px-4 sm:px-6 py-6">
          <div className="container">
            {renderContent()}
          </div>
        </div>
      </main>
    );
  };

  return (
    <div className="bg-surface-100 min-h-screen flex flex-col">
      <Sidebar />
      <Topbar />
      <MainContent />
    </div>
  );
}