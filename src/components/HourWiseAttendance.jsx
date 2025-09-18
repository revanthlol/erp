import React, { useState, useMemo } from 'react';

const HourWiseAttendance = () => {
  const [selectedMonth, setSelectedMonth] = useState('All');

  // Raw attendance data
  const attendanceData = [
    { date: '17-Sep-2025', hours: ['P', 'P', 'P', '', 'P'] },
    { date: '16-Sep-2025', hours: ['P', 'P', '', 'A', 'A'] },
    { date: '15-Sep-2025', hours: ['A', 'P', 'P', '', 'P'] },
    { date: '13-Sep-2025', hours: ['P', 'P', 'P', 'P', 'P'] },
    { date: '12-Sep-2025', hours: ['P', 'P', 'P', 'P', 'P'] },
    { date: '11-Sep-2025', hours: ['P', 'P', 'P', 'P', 'P'] },
    { date: '10-Sep-2025', hours: ['P', 'A', 'P', 'P', 'A'] },
    { date: '09-Sep-2025', hours: ['P', 'P', 'P', 'P', 'P'] },
    { date: '08-Sep-2025', hours: ['A', 'A', 'A', 'A', 'A'] },
    { date: '04-Sep-2025', hours: ['P', 'P', 'P', 'A', 'A'] },
    { date: '03-Sep-2025', hours: ['P', 'P', 'P', 'P', 'P'] },
    { date: '02-Sep-2025', hours: ['OD', 'OD', 'OD', 'P', 'P'] },
    { date: '01-Sep-2025', hours: ['OD', 'OD', 'OD', 'OD', 'OD'] },
    { date: '30-Aug-2025', hours: ['', 'P', 'P', 'P', 'P'] },
    { date: '29-Aug-2025', hours: ['P', 'P', 'P', 'P', 'P'] },
    { date: '28-Aug-2025', hours: ['P', 'P', 'P', 'P', 'P'] },
    { date: '26-Aug-2025', hours: ['P', 'P', 'P', 'P', 'P'] },
    { date: '25-Aug-2025', hours: ['P', 'P', 'P', 'P', 'P'] },
    { date: '23-Aug-2025', hours: ['P', 'P', 'P', 'P', 'P'] },
    { date: '22-Aug-2025', hours: ['P', 'P', 'P', 'P', 'P'] },
    { date: '21-Aug-2025', hours: ['P', 'P', 'P', 'P', 'P'] },
    { date: '20-Aug-2025', hours: ['P', 'P', 'P', 'P', 'P'] },
    { date: '19-Aug-2025', hours: ['P', 'P', 'P', 'A', 'A'] },
    { date: '18-Aug-2025', hours: ['P', 'P', 'P', 'P', 'P'] },
    { date: '14-Aug-2025', hours: ['A', 'A', 'A', 'A', 'A'] },
    { date: '13-Aug-2025', hours: ['P', 'P', 'P', 'P', 'P'] },
    { date: '12-Aug-2025', hours: ['P', 'P', 'P', 'P', 'P'] },
    { date: '11-Aug-2025', hours: ['P', 'P', 'P', 'P', 'P'] },
    { date: '08-Aug-2025', hours: ['A', 'P', 'P', 'P', 'P'] },
    { date: '07-Aug-2025', hours: ['P', 'P', 'P', 'P', 'P'] },
    { date: '06-Aug-2025', hours: ['P', 'P', 'P', 'P', 'P'] },
    { date: '05-Aug-2025', hours: ['P', 'P', 'P', 'P', 'P'] },
    { date: '04-Aug-2025', hours: ['P', 'P', 'P', 'P', 'P'] },
    { date: '02-Aug-2025', hours: ['P', 'P', 'P', 'P', 'P'] },
    { date: '01-Aug-2025', hours: ['P', 'A', 'P', 'A', 'A'] },
    { date: '30-Jul-2025', hours: ['P', 'P', 'P', 'P', 'P'] },
    { date: '29-Jul-2025', hours: ['A', 'A', 'A', 'A', 'A'] },
    { date: '28-Jul-2025', hours: ['P', 'P', 'P', 'P', 'P'] },
    { date: '26-Jul-2025', hours: ['P', 'P', 'P', 'P', 'P'] },
    { date: '25-Jul-2025', hours: ['P', 'P', 'P', 'P', 'P'] },
    { date: '24-Jul-2025', hours: ['P', 'P', 'P', 'P', 'P'] },
    { date: '23-Jul-2025', hours: ['A', 'A', 'A', 'A', 'A'] },
    { date: '22-Jul-2025', hours: ['P', 'P', 'P', 'A', 'A'] },
    { date: '19-Jul-2025', hours: ['P', 'P', 'P', 'P', 'P'] },
    { date: '18-Jul-2025', hours: ['P', 'P', 'P', 'P', 'P'] },
    { date: '17-Jul-2025', hours: ['P', 'P', 'P', 'A', 'A'] },
    { date: '16-Jul-2025', hours: ['P', 'P', 'P', 'OD', 'OD'] },
    { date: '15-Jul-2025', hours: ['P', 'P', 'P', 'P', 'P'] },
    { date: '14-Jul-2025', hours: ['P', 'P', 'P', 'P', 'P'] },
    { date: '11-Jul-2025', hours: ['P', 'P', 'P', 'P', 'P'] },
    { date: '10-Jul-2025', hours: ['P', 'P', 'P', 'A', 'A'] },
    { date: '09-Jul-2025', hours: ['P', 'P', 'P', 'A', 'A'] },
    { date: '08-Jul-2025', hours: ['P', 'P', 'P', 'P', 'P'] },
    { date: '07-Jul-2025', hours: ['P', 'P', 'P', 'P', 'P'] },
    { date: '05-Jul-2025', hours: ['OD', 'OD', 'OD', 'OD', 'OD'] },
    { date: '04-Jul-2025', hours: ['P', 'P', 'P', 'P', 'P'] },
    { date: '03-Jul-2025', hours: ['P', 'P', 'P', 'P', 'P'] },
    { date: '02-Jul-2025', hours: ['P', 'P', 'P', 'A', 'A'] },
    { date: '01-Jul-2025', hours: ['P', 'P', 'P', 'P', 'P'] },
    { date: '30-Jun-2025', hours: ['P', 'P', 'P', 'P', 'P'] },
    { date: '28-Jun-2025', hours: ['A', 'A', 'A', 'A', 'A'] },
    { date: '27-Jun-2025', hours: ['P', 'P', 'P', 'P', 'P'] },
    { date: '26-Jun-2025', hours: ['P', 'P', 'P', 'P', 'P'] },
    { date: '25-Jun-2025', hours: ['P', 'P', 'P', 'P', 'P'] },
    { date: '24-Jun-2025', hours: ['P', 'P', 'P', 'P', 'P'] },
    { date: '23-Jun-2025', hours: ['P', 'P', 'P', 'P', 'P'] },
    { date: '20-Jun-2025', hours: ['P', 'P', 'P', 'P', 'P'] },
    { date: '19-Jun-2025', hours: ['P', 'P', 'P', 'P', 'P'] },
    { date: '18-Jun-2025', hours: ['P', 'P', 'P', 'P', 'P'] },
    { date: '17-Jun-2025', hours: ['A', 'P', 'P', '', ''] },
    { date: '16-Jun-2025', hours: ['P', 'P', 'P', 'P', 'P'] },
    { date: '14-Jun-2025', hours: ['P', 'P', 'P', 'P', 'P'] },
    { date: '13-Jun-2025', hours: ['P', 'P', 'P', 'P', 'P'] },
    { date: '12-Jun-2025', hours: ['A', 'A', 'A', 'A', 'A'] },
    { date: '11-Jun-2025', hours: ['A', 'A', 'A', 'A', 'A'] },
  ];

  // Calculate statistics
  const stats = useMemo(() => {
    let present = 0;
    let absent = 0;
    let od = 0;
    let cl = 0;
    let ml = 0;
    let da = 0;
    let la = 0;
    let empty = 0;

    attendanceData.forEach(day => {
      day.hours.forEach(hour => {
        switch (hour) {
          case 'P': present++; break;
          case 'A': absent++; break;
          case 'OD': od++; break;
          case 'CL': cl++; break;
          case 'ML': ml++; break;
          case 'DA': da++; break;
          case 'LA': la++; break;
          case '': empty++; break;
          default: break;
        }
      });
    });

    const total = present + absent + od + cl + ml + da + la;
    const workingDays = attendanceData.length;
    const totalHours = total;
    const attendancePercentage = total > 0 ? ((present / total) * 100).toFixed(1) : 0;

    return {
      present,
      absent,
      od,
      cl,
      ml,
      da,
      la,
      empty,
      total,
      workingDays,
      totalHours,
      attendancePercentage
    };
  }, []);

  // Filter data by month
  const filteredData = useMemo(() => {
    if (selectedMonth === 'All') return attendanceData;
    return attendanceData.filter(day => day.date.includes(selectedMonth));
  }, [selectedMonth, attendanceData]);

  const getAttendanceColor = (status) => {
    switch (status) {
      case 'P': return 'bg-green-500 text-white';
      case 'A': return 'bg-red-500 text-white';
      case 'OD': return 'bg-blue-500 text-white';
      case 'CL': return 'bg-yellow-500 text-white';
      case 'ML': return 'bg-purple-500 text-white';
      case 'DA': return 'bg-orange-500 text-white';
      case 'LA': return 'bg-pink-500 text-white';
      default: return 'bg-gray-600 text-gray-300';
    }
  };

  const getAttendanceLabel = (status) => {
    switch (status) {
      case 'P': return 'Present';
      case 'A': return 'Absent';
      case 'OD': return 'On Duty';
      case 'CL': return 'Casual Leave';
      case 'ML': return 'Medical Leave';
      case 'DA': return 'Duty Absent';
      case 'LA': return 'Leave Absent';
      default: return 'Empty';
    }
  };

  const getAttendanceLevel = (percentage) => {
    if (percentage >= 85) return { text: 'Excellent', color: 'bg-green-900/30 text-green-300 border-green-700' };
    if (percentage >= 75) return { text: 'Good', color: 'bg-blue-900/30 text-blue-300 border-blue-700' };
    if (percentage >= 65) return { text: 'Should Improve', color: 'bg-yellow-900/30 text-yellow-300 border-yellow-700' };
    return { text: 'Critical', color: 'bg-red-900/30 text-red-300 border-red-700' };
  };

  const attendanceLevel = getAttendanceLevel(parseFloat(stats.attendancePercentage));

  // Pie chart data
  const pieData = [
    { label: 'Present', value: stats.present, color: '#10B981', percentage: ((stats.present / stats.total) * 100).toFixed(1) },
    { label: 'Absent', value: stats.absent, color: '#EF4444', percentage: ((stats.absent / stats.total) * 100).toFixed(1) },
    { label: 'On Duty', value: stats.od, color: '#3B82F6', percentage: ((stats.od / stats.total) * 100).toFixed(1) },
    { label: 'Other Leaves', value: stats.cl + stats.ml + stats.da + stats.la, color: '#8B5CF6', percentage: (((stats.cl + stats.ml + stats.da + stats.la) / stats.total) * 100).toFixed(1) },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white">Hour Wise Attendance</h1>
          <p className="text-gray-400 mt-1">Detailed daily attendance tracking by hours</p>
        </div>
        
        {/* Month Filter */}
        <div className="flex items-center gap-3">
          <label className="text-sm font-medium text-gray-300">Filter by Month:</label>
          <select
            value={selectedMonth}
            onChange={(e) => setSelectedMonth(e.target.value)}
            className="bg-gray-800 border border-gray-600 rounded-md px-3 py-2 text-white text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
          >
            <option value="All">All Months</option>
            <option value="Sep">September 2025</option>
            <option value="Aug">August 2025</option>
            <option value="Jul">July 2025</option>
            <option value="Jun">June 2025</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Pie Chart and Stats */}
        <div className="lg:col-span-1 space-y-6">
          {/* Legend */}
          <div className="card p-4">
            <h3 className="text-sm font-semibold text-gray-300 mb-3">Attendance Legend</h3>
            <div className="grid grid-cols-2 gap-2">
              {[
                { code: 'P', label: 'Present', color: 'bg-green-500' },
                { code: 'A', label: 'Absent', color: 'bg-red-500' },
                { code: 'OD', label: 'On Duty', color: 'bg-blue-500' },
                { code: 'CL', label: 'Casual Leave', color: 'bg-yellow-500' },
                { code: 'ML', label: 'Medical Leave', color: 'bg-purple-500' },
                { code: 'DA', label: 'Duty Absent', color: 'bg-orange-500' },
                { code: 'LA', label: 'Leave Absent', color: 'bg-pink-500' },
              ].map(item => (
                <div key={item.code} className="flex items-center gap-2">
                  <div className={`w-3 h-3 rounded ${item.color}`}></div>
                  <span className="text-xs text-gray-400">{item.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Pie Chart */}
          <div className="card p-6">
            <h3 className="text-lg font-semibold text-white mb-4">Attendance Distribution</h3>
            <div className="flex items-center justify-center mb-4">
              <div className="relative w-48 h-48">
                {/* Simple pie chart representation */}
                <div className="absolute inset-0 rounded-full border-8 border-gray-700"></div>
                <div 
                  className="absolute inset-0 rounded-full border-8 border-green-500"
                  style={{ 
                    clipPath: `polygon(50% 50%, 50% 0%, ${50 + 50 * Math.cos(0)}% ${50 + 50 * Math.sin(0)}%)`,
                    transform: 'rotate(-90deg)'
                  }}
                ></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-white">{stats.attendancePercentage}%</div>
                    <div className="text-xs text-gray-400">Present</div>
                  </div>
                </div>
              </div>
            </div>
            <div className="space-y-2">
              {pieData.map((item, index) => (
                <div key={item.label} className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded" style={{ backgroundColor: item.color }}></div>
                    <span className="text-gray-300">{item.label}</span>
                  </div>
                  <span className="text-gray-400">{item.percentage}%</span>
                </div>
              ))}
            </div>
          </div>

          {/* Summary Statistics */}
          <div className="card p-4">
            <h3 className="text-sm font-semibold text-gray-300 mb-3">Summary Statistics</h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-sm text-gray-400">Total Working Days:</span>
                <span className="text-sm font-medium text-white">{stats.workingDays}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-400">Hours Present:</span>
                <span className="text-sm font-medium text-green-400">{stats.present}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-400">Hours Absent:</span>
                <span className="text-sm font-medium text-red-400">{stats.absent}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-400">Hours On Duty:</span>
                <span className="text-sm font-medium text-blue-400">{stats.od}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-400">Total Hours:</span>
                <span className="text-sm font-medium text-white">{stats.total}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-400">Attendance Level:</span>
                <span className={`inline-flex items-center px-2 py-1 rounded text-xs font-medium border ${attendanceLevel.color}`}>
                  {attendanceLevel.text}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column - Attendance Table */}
        <div className="lg:col-span-2">
          <div className="card overflow-hidden">
            <div className="bg-primary-600 px-6 py-4">
              <h2 className="text-lg font-semibold text-white">Daily Attendance Details</h2>
              <p className="text-primary-100 text-sm mt-1">Hour-wise attendance for each working day</p>
            </div>
            
            <div className="overflow-x-auto max-h-96">
              <table className="w-full">
                <thead className="bg-gray-800/50 border-b border-gray-700 sticky top-0">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider">
                      Date
                    </th>
                    <th className="px-2 py-3 text-center text-xs font-semibold text-gray-300 uppercase tracking-wider">
                      1
                    </th>
                    <th className="px-2 py-3 text-center text-xs font-semibold text-gray-300 uppercase tracking-wider">
                      2
                    </th>
                    <th className="px-2 py-3 text-center text-xs font-semibold text-gray-300 uppercase tracking-wider">
                      3
                    </th>
                    <th className="px-2 py-3 text-center text-xs font-semibold text-gray-300 uppercase tracking-wider">
                      4
                    </th>
                    <th className="px-2 py-3 text-center text-xs font-semibold text-gray-300 uppercase tracking-wider">
                      5
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-700">
                  {filteredData.map((day, index) => (
                    <tr key={day.date} className={`hover:bg-gray-800/30 transition-colors ${index % 2 === 0 ? 'bg-gray-800/20' : 'bg-gray-800/10'}`}>
                      <td className="px-4 py-3 text-sm font-medium text-gray-200 whitespace-nowrap">
                        {day.date}
                      </td>
                      {day.hours.map((hour, hourIndex) => (
                        <td key={hourIndex} className="px-2 py-3 text-center">
                          {hour ? (
                            <span className={`inline-flex items-center justify-center w-8 h-8 rounded text-xs font-medium ${getAttendanceColor(hour)}`}>
                              {hour}
                            </span>
                          ) : (
                            <span className="inline-flex items-center justify-center w-8 h-8 rounded text-xs font-medium bg-gray-700 text-gray-500">
                              -
                            </span>
                          )}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HourWiseAttendance;
