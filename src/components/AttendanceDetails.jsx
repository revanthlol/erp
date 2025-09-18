import React, { useState } from 'react';

const AttendanceDetails = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('11/Jun/2025 To 17/Sep/2025');

  const subjectAttendanceData = [
    { code: 'BS18330', description: 'OPERATING SYSTEMS', totalHrs: 63, presentHrs: 47, absentHrs: 16, attendance: 74.60 },
    { code: 'BS18331', description: 'UNIX SHELL PROGRAMMING [PR]', totalHrs: 22, presentHrs: 20, absentHrs: 2, attendance: 90.91 },
    { code: 'BS18335', description: 'DISCRETE MATHEMATICS', totalHrs: 63, presentHrs: 55, absentHrs: 8, attendance: 87.30 },
    { code: 'CS20302', description: 'OBJECT ORIENTED PROGRAMMING THROUGH JAVA', totalHrs: 63, presentHrs: 58, absentHrs: 5, attendance: 92.06 },
    { code: 'CS20303', description: 'OBJECT ORIENTED PROGRAMMING THROUGH JAVA [PR]', totalHrs: 22, presentHrs: 22, absentHrs: 0, attendance: 100.00 },
    { code: 'CS23301', description: 'ELECTRICAL CIRCUITS AND MACHINES', totalHrs: 63, presentHrs: 50, absentHrs: 13, attendance: 79.37 },
    { code: 'CS23349', description: 'ELECTRICAL CIRCUITS AND MACHINES [PR]', totalHrs: 22, presentHrs: 18, absentHrs: 4, attendance: 81.82 },
    { code: 'ES23301', description: 'ENVIRONMENTAL STUDIES AND GENDER SENSITIZATION', totalHrs: 22, presentHrs: 20, absentHrs: 2, attendance: 90.91 },
    { code: 'G20CSIT1P', description: 'PC HARDWARE AND SOFTWARE INSTALLATION [PR]', totalHrs: 22, presentHrs: 20, absentHrs: 2, attendance: 90.91 },
    { code: 'G20CSIT1T', description: 'PC HARDWARE AND SOFTWARE INSTALLATION', totalHrs: 22, presentHrs: 20, absentHrs: 2, attendance: 90.91 },
  ];

  const cumulativeAttendanceData = [
    { month: 'Jun-2025', present: 42, absent: 20, odPresent: 0, odAbsent: 0, medical: 0, casual: 0 },
    { month: 'Jul-2025', present: 98, absent: 11, odPresent: 8, odAbsent: 0, medical: 0, casual: 0 },
    { month: 'Aug-2025', present: 95, absent: 18, odPresent: 7, odAbsent: 0, medical: 0, casual: 0 },
    { month: 'Sep-2025', present: 60, absent: 10, odPresent: 0, odAbsent: 0, medical: 0, casual: 0 },
  ];

  const getAttendanceColor = (percentage) => {
    if (percentage >= 90) return 'text-green-400 font-semibold';
    if (percentage >= 80) return 'text-yellow-400 font-medium';
    if (percentage >= 75) return 'text-orange-400 font-medium';
    return 'text-red-400 font-semibold';
  };

  const getAttendanceBadge = (percentage) => {
    if (percentage >= 90) return 'bg-green-900/30 text-green-300 border-green-700';
    if (percentage >= 80) return 'bg-yellow-900/30 text-yellow-300 border-yellow-700';
    if (percentage >= 75) return 'bg-orange-900/30 text-orange-300 border-orange-700';
    return 'bg-red-900/30 text-red-300 border-red-700';
  };

  const totalSubjectAttendance = subjectAttendanceData.reduce((acc, subject) => ({
    totalHrs: acc.totalHrs + subject.totalHrs,
    presentHrs: acc.presentHrs + subject.presentHrs,
    absentHrs: acc.absentHrs + subject.absentHrs,
  }), { totalHrs: 0, presentHrs: 0, absentHrs: 0 });

  const totalSubjectPercentage = ((totalSubjectAttendance.presentHrs / totalSubjectAttendance.totalHrs) * 100).toFixed(2);

  const totalCumulativeAttendance = cumulativeAttendanceData.reduce((acc, month) => ({
    present: acc.present + month.present,
    absent: acc.absent + month.absent,
    odPresent: acc.odPresent + month.odPresent,
    odAbsent: acc.odAbsent + month.odAbsent,
    medical: acc.medical + month.medical,
    casual: acc.casual + month.casual,
  }), { present: 0, absent: 0, odPresent: 0, odAbsent: 0, medical: 0, casual: 0 });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white">Attendance Details</h1>
          <p className="text-gray-400 mt-1">Subject-wise and cumulative attendance tracking</p>
        </div>
        
        {/* Period Filter */}
        <div className="flex items-center gap-3">
          <label className="text-sm font-medium text-gray-300">Period:</label>
          <select
            value={selectedPeriod}
            onChange={(e) => setSelectedPeriod(e.target.value)}
            className="bg-gray-800 border border-gray-600 rounded-md px-3 py-2 text-white text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
          >
            <option value="11/Jun/2025 To 17/Sep/2025">11/Jun/2025 To 17/Sep/2025</option>
            <option value="01/Jan/2025 To 31/Mar/2025">01/Jan/2025 To 31/Mar/2025</option>
            <option value="01/Apr/2025 To 30/Jun/2025">01/Apr/2025 To 30/Jun/2025</option>
          </select>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="card p-4">
          <p className="text-gray-400 text-sm">Overall Attendance</p>
          <p className={`text-2xl font-bold mt-1 ${getAttendanceColor(parseFloat(totalSubjectPercentage))}`}>
            {totalSubjectPercentage}%
          </p>
        </div>
        <div className="card p-4">
          <p className="text-gray-400 text-sm">Total Hours</p>
          <p className="text-2xl font-bold text-white mt-1">{totalSubjectAttendance.totalHrs}</p>
        </div>
        <div className="card p-4">
          <p className="text-gray-400 text-sm">Present Hours</p>
          <p className="text-2xl font-bold text-green-400 mt-1">{totalSubjectAttendance.presentHrs}</p>
        </div>
        <div className="card p-4">
          <p className="text-gray-400 text-sm">Absent Hours</p>
          <p className="text-2xl font-bold text-red-400 mt-1">{totalSubjectAttendance.absentHrs}</p>
        </div>
      </div>

      {/* Subject-wise Attendance */}
      <div className="card overflow-hidden">
        <div className="bg-primary-600 px-6 py-4">
          <h2 className="text-lg font-semibold text-white">Subject-wise Attendance Details</h2>
          <p className="text-primary-100 text-sm mt-1">During the Period: {selectedPeriod}</p>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-800/50 border-b border-gray-700">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider">
                  Subject Code
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider">
                  Subject Description
                </th>
                <th className="px-6 py-4 text-center text-xs font-semibold text-gray-300 uppercase tracking-wider">
                  Total Hrs.
                </th>
                <th className="px-6 py-4 text-center text-xs font-semibold text-gray-300 uppercase tracking-wider">
                  Present Hrs.
                </th>
                <th className="px-6 py-4 text-center text-xs font-semibold text-gray-300 uppercase tracking-wider">
                  Absent Hrs.
                </th>
                <th className="px-6 py-4 text-center text-xs font-semibold text-gray-300 uppercase tracking-wider">
                  Attendance (%)
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-700">
              {subjectAttendanceData.map((subject, index) => (
                <tr key={subject.code} className={`hover:bg-gray-800/30 transition-colors ${index % 2 === 0 ? 'bg-gray-800/20' : 'bg-gray-800/10'}`}>
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
                  <td className="px-6 py-4 whitespace-nowrap text-center text-sm text-gray-300">
                    {subject.totalHrs}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-center text-sm text-green-400 font-medium">
                    {subject.presentHrs}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-center text-sm text-red-400 font-medium">
                    {subject.absentHrs}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-center">
                    <span className={`inline-flex items-center px-2 py-1 rounded text-sm font-medium border ${getAttendanceBadge(subject.attendance)}`}>
                      {subject.attendance.toFixed(2)}%
                    </span>
                  </td>
                </tr>
              ))}
              {/* Total Row */}
              <tr className="bg-gray-800/60 border-t-2 border-gray-600 font-semibold">
                <td className="px-6 py-4 whitespace-nowrap text-sm text-white font-bold">Total</td>
                <td className="px-6 py-4 text-sm text-gray-300"></td>
                <td className="px-6 py-4 whitespace-nowrap text-center text-sm text-white font-bold">
                  {totalSubjectAttendance.totalHrs}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-center text-sm text-green-400 font-bold">
                  {totalSubjectAttendance.presentHrs}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-center text-sm text-red-400 font-bold">
                  {totalSubjectAttendance.absentHrs}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-center">
                  <span className={`inline-flex items-center px-2 py-1 rounded text-sm font-bold border ${getAttendanceBadge(parseFloat(totalSubjectPercentage))}`}>
                    {totalSubjectPercentage}%
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Cumulative Attendance */}
      <div className="card overflow-hidden">
        <div className="bg-primary-600 px-6 py-4">
          <h2 className="text-lg font-semibold text-white">Cumulative Attendance</h2>
          <p className="text-primary-100 text-sm mt-1">Monthly attendance breakdown</p>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-800/50 border-b border-gray-700">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider">
                  Month / Year
                </th>
                <th className="px-6 py-4 text-center text-xs font-semibold text-gray-300 uppercase tracking-wider">
                  Present
                </th>
                <th className="px-6 py-4 text-center text-xs font-semibold text-gray-300 uppercase tracking-wider">
                  Absent
                </th>
                <th className="px-6 py-4 text-center text-xs font-semibold text-gray-300 uppercase tracking-wider">
                  OD (Present)
                </th>
                <th className="px-6 py-4 text-center text-xs font-semibold text-gray-300 uppercase tracking-wider">
                  OD (Absent)
                </th>
                <th className="px-6 py-4 text-center text-xs font-semibold text-gray-300 uppercase tracking-wider">
                  Medical
                </th>
                <th className="px-6 py-4 text-center text-xs font-semibold text-gray-300 uppercase tracking-wider">
                  Casual
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-700">
              {cumulativeAttendanceData.map((month, index) => (
                <tr key={month.month} className={`hover:bg-gray-800/30 transition-colors ${index % 2 === 0 ? 'bg-gray-800/20' : 'bg-gray-800/10'}`}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-200">
                    {month.month}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-center text-sm text-green-400 font-medium">
                    {month.present}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-center text-sm text-red-400 font-medium">
                    {month.absent}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-center text-sm text-blue-400 font-medium">
                    {month.odPresent}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-center text-sm text-orange-400 font-medium">
                    {month.odAbsent}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-center text-sm text-purple-400 font-medium">
                    {month.medical}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-center text-sm text-yellow-400 font-medium">
                    {month.casual}
                  </td>
                </tr>
              ))}
              {/* Total Row */}
              <tr className="bg-gray-800/60 border-t-2 border-gray-600 font-semibold">
                <td className="px-6 py-4 whitespace-nowrap text-sm text-white font-bold">Total</td>
                <td className="px-6 py-4 whitespace-nowrap text-center text-sm text-green-400 font-bold">
                  {totalCumulativeAttendance.present}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-center text-sm text-red-400 font-bold">
                  {totalCumulativeAttendance.absent}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-center text-sm text-blue-400 font-bold">
                  {totalCumulativeAttendance.odPresent}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-center text-sm text-orange-400 font-bold">
                  {totalCumulativeAttendance.odAbsent}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-center text-sm text-purple-400 font-bold">
                  {totalCumulativeAttendance.medical}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-center text-sm text-yellow-400 font-bold">
                  {totalCumulativeAttendance.casual}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Attendance Legend */}
      <div className="card p-4">
        <h3 className="text-sm font-semibold text-gray-300 mb-3">Attendance Status Legend</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            <span className="text-xs text-gray-400">90%+ (Excellent)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
            <span className="text-xs text-gray-400">80-89% (Good)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
            <span className="text-xs text-gray-400">75-79% (Warning)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-red-500 rounded-full"></div>
            <span className="text-xs text-gray-400">Below 75% (Critical)</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AttendanceDetails;
