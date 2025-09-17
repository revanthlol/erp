import React, { useState } from 'react';

// --- Helper Data & Components ---

const menuItems = {
  main: [
    { name: 'Personal Details' },
    { name: 'Student Wise Subjects' },
    { name: 'Attendance Details' },
    { name: 'Hour Wise Attendance' },
    { name: 'Internal Mark Details' },
    { name: 'Hall Ticket' },
    { name: 'Exam Mark Details' },
    { name: 'Fee Paid Details' },
    { name: 'Fee Due Details' },
    { name: 'Change Password' },
    { name: 'Exam Application Registration' },
    { name: 'General Elective Registration' },
    { name: 'Online Exam' },
    { name: 'Revaluation Application Registration' },
    { name: 'Bonafide Certificate Registration' },
    { name: 'Custodian Certificate Registration' },
    { name: 'Medium of Instruction Certificate Registration' },
    { name: 'Duplicate ID Card Registration' },
    { name: 'Club Registration' },
    { name: 'Student Feedback Entry' },
    { name: 'Grievance' },
    { name: 'Sign Out' },
  ],
  library: [
    { name: 'DELNET Login' },
    { name: 'N-List Login' },
  ],
};

const Icon = ({ path, className = "w-6 h-6" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d={path} />
  </svg>
);

// --- Main Application Component ---

export default function App() {
  // CHANGE 1: Set initial state to true so it's open on load
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const [activeItem, setActiveItem] = useState('Attendance Details');

  const NavItem = ({ name }) => {
    const isActive = activeItem === name;
    return (
      <a
        href="#"
        className={`flex items-center px-4 py-2.5 text-sm font-medium transition-colors duration-200 rounded-lg ${
          isActive
            ? 'bg-blue-600 text-white'
            : 'text-gray-300 hover:bg-gray-700 hover:text-white'
        }`}
        onClick={() => setActiveItem(name)}
        aria-current={isActive ? 'page' : undefined}
      >
        {name}
      </a>
    );
  };

  const Sidebar = () => (
    <aside
      // CHANGE 2: Removed `md:translate-x-0`. Now visibility is purely controlled by state.
      className={`fixed inset-y-0 left-0 z-30 w-64 px-4 py-8 overflow-y-auto bg-gray-900 border-r border-gray-700 transition-transform duration-300 ease-in-out ${
        isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
      }`}
      aria-label="Sidebar"
    >
      <div className="flex items-center justify-between mb-8">
        <a href="#" className="text-2xl font-bold text-white">
          Student Portal
        </a>
        {/* CHANGE 3: This button now toggles the state and is visible on all screen sizes */}
        <button onClick={() => setSidebarOpen(!isSidebarOpen)} className="text-gray-400 hover:text-white">
          <Icon path="M6 18L18 6M6 6l12 12" />
        </button>
      </div>

      <nav className="space-y-6">
        <div>
          {menuItems.main.map((item) => <NavItem key={item.name} {...item} />)}
        </div>
        <div>
          <h3 className="px-4 py-2 text-xs font-semibold text-gray-400 uppercase tracking-wider">
            Online Library
          </h3>
          <div className="mt-2 space-y-1">
            {menuItems.library.map((item) => <NavItem key={item.name} {...item} />)}
          </div>
        </div>
      </nav>
    </aside>
  );

  const MainContent = () => (
    // CHANGE 4: Margin is now conditional. Added transition for smooth content shift.
    <main className={`flex-1 p-4 sm:p-6 md:p-8 transition-all duration-300 ease-in-out ${
        isSidebarOpen ? 'md:ml-64' : 'md:ml-0'
      }`}>
       <div className="bg-slate-900 bg-[radial-gradient(rgba(255,255,255,0.1)_1px,transparent_1px)] [background-size:30px_30px] min-h-screen text-white">
        <div className="max-w-7xl mx-auto">
          {/* CHANGE 5: This button is now only needed if sidebar is closed */}
          {!isSidebarOpen && (
             <button
                onClick={() => setSidebarOpen(true)}
                className="p-2 mb-4 text-gray-400 bg-gray-800 rounded-md"
                aria-controls="sidebar"
                aria-expanded={isSidebarOpen}
              >
                <Icon path="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                <span className="sr-only">Open sidebar</span>
            </button>
          )}
          
          <h1 className="text-3xl font-bold text-white mb-6">
            {activeItem}
          </h1>

          <div className="bg-gray-800/50 p-8 rounded-lg border border-gray-700">
            <p className="text-center text-gray-400">
              Content for "{activeItem}" will be displayed here.
            </p>
          </div>
        </div>
       </div>
    </main>
  );

  return (
    // Use `flex` on the container for better layout management
    <div className="flex bg-gray-900 min-h-screen">
      <Sidebar />
      <MainContent />
    </div>
  );
}