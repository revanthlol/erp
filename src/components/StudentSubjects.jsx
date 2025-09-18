import React, { useState } from 'react';

const StudentSubjects = () => {
  const [selectedSemester, setSelectedSemester] = useState('All');

  const subjectsData = [
    // Semester 1
    { semester: 1, id: 'N/A', code: 'CLUB011', description: 'FINANCE CLUB', credit: 1 },
    { semester: 1, id: 'AECC', code: 'EN23101', description: 'GENERAL ENGLISH - I', credit: 2 },
    { semester: 1, id: 'AECC', code: 'BS19101', description: 'VALUE EDUCATION AND PERSONALITY DEVELOPMENT', credit: 2 },
    { semester: 1, id: 'Core', code: 'CS18102', description: 'MATHEMATICS - I', credit: 4 },
    { semester: 1, id: 'Core', code: 'SS001', description: 'PROBLEM SOLVING AND PROGRAMMING IN C', credit: 4 },
    { semester: 1, id: 'Core', code: 'IC23201', description: 'C PROGRAMMING [PR]', credit: 2 },
    { semester: 1, id: 'Core', code: 'PL18001', description: 'ELECTRONIC DEVICES AND CIRCUITS [PR]', credit: 2 },
    { semester: 1, id: 'Core', code: 'ES23301', description: 'ELECTRONIC DEVICES AND CIRCUITS', credit: 4 },
    { semester: 1, id: 'Core', code: 'BS18330', description: 'ENGINEERING PHYSICS', credit: 4 },
    { semester: 1, id: 'Core', code: 'G20CSIT1P', description: 'ENGINEERING PHYSICS [PR]', credit: 2 },
    
    // Semester 2
    { semester: 2, id: 'N/A', code: 'BS18335', description: 'SOFT SKILLS', credit: 1 },
    { semester: 2, id: 'AECC', code: 'EN23102', description: 'GENERAL ENGLISH - II', credit: 2 },
    { semester: 2, id: 'AECC', code: 'BS19102', description: 'INDIAN HERITAGE AND CULTURE', credit: 2 },
    { semester: 2, id: 'Core', code: 'CS18103', description: 'MATHEMATICS - II', credit: 4 },
    { semester: 2, id: 'Core', code: 'CS18104', description: 'C PLUS PLUS WITH DATA STRUCTURES [PR]', credit: 2 },
    { semester: 2, id: 'Core', code: 'CS18105', description: 'C PLUS PLUS WITH DATA STRUCTURES', credit: 4 },
    { semester: 2, id: 'Core', code: 'CS18106', description: 'LOGIC AND DIGITAL CIRCUITS', credit: 4 },
    { semester: 2, id: 'Core', code: 'CS18107', description: 'LOGIC AND DIGITAL CIRCUITS [PR]', credit: 2 },
    { semester: 2, id: 'Core', code: 'CS18108', description: 'ENGINEERING DRAWING & ENGG.', credit: 2 },
    { semester: 2, id: 'Core', code: 'CS18109', description: 'WORKSHOP [PR]', credit: 2 },
    { semester: 2, id: 'N/A', code: 'PLANET', description: 'PLANET', credit: 1 },
    
    // Semester 3
    { semester: 3, id: 'AECC', code: 'BS19103', description: 'ENVIRONMENTAL STUDIES AND GENDER SENSITIZATION', credit: 2 },
    { semester: 3, id: 'Core', code: 'CS18110', description: 'OPERATING SYSTEMS', credit: 4 },
    { semester: 3, id: 'Core', code: 'CS18111', description: 'UNIX SHELL PROGRAMMING [PR]', credit: 2 },
    { semester: 3, id: 'Core', code: 'CS18112', description: 'OBJECT ORIENTED PROGRAMMING THROUGH JAVA', credit: 4 },
    { semester: 3, id: 'Core', code: 'CS18113', description: 'OBJECT ORIENTED PROGRAMMING THROUGH JAVA [PR]', credit: 2 },
    { semester: 3, id: 'Core', code: 'CS18114', description: 'ELECTRICAL CIRCUITS AND MACHINES', credit: 4 },
    { semester: 3, id: 'Core', code: 'CS18115', description: 'ELECTRICAL CIRCUITS AND MACHINES [PR]', credit: 2 },
    { semester: 3, id: 'Core', code: 'CS18116', description: 'PC HARDWARE AND SOFTWARE INSTALLATION [PR]', credit: 2 },
    { semester: 3, id: 'Core', code: 'CS18117', description: 'PC HARDWARE AND SOFTWARE INSTALLATION', credit: 2 },
    { semester: 3, id: 'Core', code: 'CS18118', description: 'DISCRETE MATHEMATICS', credit: 4 },
  ];

  const filteredSubjects = selectedSemester === 'All' 
    ? subjectsData 
    : subjectsData.filter(subject => subject.semester === parseInt(selectedSemester));

  const semesterOptions = ['All', ...Array.from(new Set(subjectsData.map(s => s.semester))).sort()];

  const getSubjectTypeColor = (id) => {
    switch (id) {
      case 'Core': return 'bg-blue-900/30 text-blue-300 border-blue-700';
      case 'AECC': return 'bg-green-900/30 text-green-300 border-green-700';
      case 'GE': return 'bg-purple-900/30 text-purple-300 border-purple-700';
      case 'SEC': return 'bg-orange-900/30 text-orange-300 border-orange-700';
      case 'PL': return 'bg-pink-900/30 text-pink-300 border-pink-700';
      default: return 'bg-gray-800/50 text-gray-300 border-gray-600';
    }
  };

  const getCreditColor = (credit) => {
    if (credit >= 4) return 'text-green-400 font-semibold';
    if (credit >= 2) return 'text-yellow-400 font-medium';
    return 'text-gray-400';
  };

  const totalCredits = filteredSubjects.reduce((sum, subject) => sum + subject.credit, 0);
  const subjectsByType = filteredSubjects.reduce((acc, subject) => {
    acc[subject.id] = (acc[subject.id] || 0) + 1;
    return acc;
  }, {});

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white">Student Wise Subjects</h1>
          <p className="text-gray-400 mt-1">Academic subjects and course structure</p>
        </div>
        
        {/* Semester Filter */}
        <div className="flex items-center gap-3">
          <label className="text-sm font-medium text-gray-300">Filter by Semester:</label>
          <select
            value={selectedSemester}
            onChange={(e) => setSelectedSemester(e.target.value)}
            className="bg-gray-800 border border-gray-600 rounded-md px-3 py-2 text-white text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
          >
            {semesterOptions.map(sem => (
              <option key={sem} value={sem}>
                {sem === 'All' ? 'All Semesters' : `Semester ${sem}`}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="card p-4">
          <p className="text-gray-400 text-sm">Total Subjects</p>
          <p className="text-2xl font-bold text-white mt-1">{filteredSubjects.length}</p>
        </div>
        <div className="card p-4">
          <p className="text-gray-400 text-sm">Total Credits</p>
          <p className="text-2xl font-bold text-white mt-1">{totalCredits}</p>
        </div>
        <div className="card p-4">
          <p className="text-gray-400 text-sm">Core Subjects</p>
          <p className="text-2xl font-bold text-white mt-1">{subjectsByType.Core || 0}</p>
        </div>
        <div className="card p-4">
          <p className="text-gray-400 text-sm">Practical Subjects</p>
          <p className="text-2xl font-bold text-white mt-1">
            {filteredSubjects.filter(s => s.description.includes('[PR]')).length}
          </p>
        </div>
      </div>

      {/* Subjects Table */}
      <div className="card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-800/50 border-b border-gray-700">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider">
                  Semester
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider">
                  Type
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider">
                  Subject Code
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider">
                  Subject Description
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider">
                  Credit
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-700">
              {filteredSubjects.map((subject, index) => (
                <tr key={`${subject.semester}-${subject.code}-${index}`} className="hover:bg-gray-800/30 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary-900/30 text-primary-300">
                      Sem {subject.semester}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center px-2 py-1 rounded text-xs font-medium border ${getSubjectTypeColor(subject.id)}`}>
                      {subject.id}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-gray-300">
                    {subject.code}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-200">
                    <div className="flex items-center gap-2">
                      <span>{subject.description}</span>
                      {subject.description.includes('[PR]') && (
                        <span className="inline-flex items-center px-1.5 py-0.5 rounded text-xs font-medium bg-orange-900/30 text-orange-300">
                          PR
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`text-sm font-medium ${getCreditColor(subject.credit)}`}>
                      {subject.credit}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Subject Type Legend */}
      <div className="card p-4">
        <h3 className="text-sm font-semibold text-gray-300 mb-3">Subject Type Legend</h3>
        <div className="flex flex-wrap gap-3">
          <div className="flex items-center gap-2">
            <span className={`inline-flex items-center px-2 py-1 rounded text-xs font-medium border ${getSubjectTypeColor('Core')}`}>
              Core
            </span>
            <span className="text-xs text-gray-400">Core subjects</span>
          </div>
          <div className="flex items-center gap-2">
            <span className={`inline-flex items-center px-2 py-1 rounded text-xs font-medium border ${getSubjectTypeColor('AECC')}`}>
              AECC
            </span>
            <span className="text-xs text-gray-400">Ability Enhancement Compulsory Course</span>
          </div>
          <div className="flex items-center gap-2">
            <span className={`inline-flex items-center px-2 py-1 rounded text-xs font-medium border ${getSubjectTypeColor('GE')}`}>
              GE
            </span>
            <span className="text-xs text-gray-400">Generic Elective</span>
          </div>
          <div className="flex items-center gap-2">
            <span className={`inline-flex items-center px-2 py-1 rounded text-xs font-medium border ${getSubjectTypeColor('SEC')}`}>
              SEC
            </span>
            <span className="text-xs text-gray-400">Skill Enhancement Course</span>
          </div>
          <div className="flex items-center gap-2">
            <span className={`inline-flex items-center px-2 py-1 rounded text-xs font-medium border ${getSubjectTypeColor('PL')}`}>
              PL
            </span>
            <span className="text-xs text-gray-400">Project/Lab</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentSubjects;
