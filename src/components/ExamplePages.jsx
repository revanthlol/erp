import React, { useState } from 'react';
import EmptyState from './EmptyState';

// Internal Mark Details Page
export const InternalMarkDetails = () => {
  const internalMarksData = [
    {
      subjectCode: 'ES23301',
      subjectDescription: 'ENVIRONMENTAL STUDIES AND GENDER SENSITIZATION',
      totalMarks: 11.50,
      maxMarks: 40.00,
      components: [
        { name: 'Assignment', obtained: 3.00, max: 3.00 },
        { name: 'Seminar or Viva Voce', obtained: 3.00, max: 3.00 },
        { name: 'Attendance', obtained: 4.00, max: 4.00 },
        { name: 'Mid Exam1', obtained: 11.50, max: 12.50 },
        { name: 'Mid Exam2', obtained: 0.00, max: 12.50 },
        { name: 'Group Discussion OR Presentation OR Case Study OR Computer Based Test', obtained: 0.00, max: 5.00 }
      ]
    },
    {
      subjectCode: 'BS18330',
      subjectDescription: 'OPERATING SYSTEMS',
      totalMarks: 10.50,
      maxMarks: 40.00,
      components: [
        { name: 'Assignment', obtained: 3.00, max: 3.00 },
        { name: 'Seminar or Viva Voce', obtained: 3.00, max: 3.00 },
        { name: 'Attendance', obtained: 4.00, max: 4.00 },
        { name: 'Mid Exam1', obtained: 10.50, max: 12.50 },
        { name: 'Mid Exam2', obtained: 0.00, max: 12.50 },
        { name: 'Group Discussion OR Presentation OR Case Study OR Computer Based Test', obtained: 0.00, max: 5.00 }
      ]
    },
    {
      subjectCode: 'BS18331',
      subjectDescription: 'UNIX SHELL PROGRAMMING [PR]',
      totalMarks: 0.00,
      maxMarks: 40.00,
      components: [
        { name: 'Pre Final', obtained: 0.00, max: 40.00 }
      ]
    },
    {
      subjectCode: 'CS20302',
      subjectDescription: 'OBJECT ORIENTED PROGRAMMING THROUGH JAVA',
      totalMarks: 11.25,
      maxMarks: 40.00,
      components: [
        { name: 'Assignment', obtained: 3.00, max: 3.00 },
        { name: 'Seminar or Viva Voce', obtained: 3.00, max: 3.00 },
        { name: 'Attendance', obtained: 4.00, max: 4.00 },
        { name: 'Mid Exam1', obtained: 11.25, max: 12.50 },
        { name: 'Mid Exam2', obtained: 0.00, max: 12.50 },
        { name: 'Group Discussion OR Presentation OR Case Study OR Computer Based Test', obtained: 0.00, max: 5.00 }
      ]
    },
    {
      subjectCode: 'CS20303',
      subjectDescription: 'OBJECT ORIENTED PROGRAMMING THROUGH JAVA [PR]',
      totalMarks: 0.00,
      maxMarks: 40.00,
      components: [
        { name: 'Pre Final', obtained: 0.00, max: 40.00 }
      ]
    },
    {
      subjectCode: 'CS23301',
      subjectDescription: 'ELECTRICAL CIRCUITS AND MACHINES',
      totalMarks: 6.50,
      maxMarks: 40.00,
      components: [
        { name: 'Assignment', obtained: 3.00, max: 3.00 },
        { name: 'Seminar or Viva Voce', obtained: 3.00, max: 3.00 },
        { name: 'Attendance', obtained: 4.00, max: 4.00 },
        { name: 'Mid Exam1', obtained: 6.50, max: 12.50 },
        { name: 'Mid Exam2', obtained: 0.00, max: 12.50 },
        { name: 'Group Discussion OR Presentation OR Case Study OR Computer Based Test', obtained: 0.00, max: 5.00 }
      ]
    },
    {
      subjectCode: 'CS23349',
      subjectDescription: 'ELECTRICAL CIRCUITS AND MACHINES [PR]',
      totalMarks: 0.00,
      maxMarks: 40.00,
      components: [
        { name: 'Pre Final', obtained: 0.00, max: 40.00 }
      ]
    },
    {
      subjectCode: 'BS18335',
      subjectDescription: 'DISCRETE MATHEMATICS',
      totalMarks: 3.75,
      maxMarks: 40.00,
      components: [
        { name: 'Assignment', obtained: 3.00, max: 3.00 },
        { name: 'Seminar or Viva Voce', obtained: 3.00, max: 3.00 },
        { name: 'Attendance', obtained: 4.00, max: 4.00 },
        { name: 'Mid Exam1', obtained: 3.75, max: 12.50 },
        { name: 'Mid Exam2', obtained: 0.00, max: 12.50 },
        { name: 'Group Discussion OR Presentation OR Case Study OR Computer Based Test', obtained: 0.00, max: 5.00 }
      ]
    },
    {
      subjectCode: 'G20CSIT1P',
      subjectDescription: 'PC HARDWARE AND SOFTWARE INSTALLATION [PR]',
      totalMarks: 0.00,
      maxMarks: 40.00,
      components: [
        { name: 'Pre Final', obtained: 0.00, max: 40.00 }
      ]
    },
    {
      subjectCode: 'G20CSIT1T',
      subjectDescription: 'PC HARDWARE AND SOFTWARE INSTALLATION',
      totalMarks: 9.25,
      maxMarks: 40.00,
      components: [
        { name: 'Assignment', obtained: 3.00, max: 3.00 },
        { name: 'Seminar or Viva Voce', obtained: 3.00, max: 3.00 },
        { name: 'Attendance', obtained: 4.00, max: 4.00 },
        { name: 'Mid Exam1', obtained: 9.25, max: 12.50 },
        { name: 'Mid Exam2', obtained: 0.00, max: 12.50 },
        { name: 'Group Discussion OR Presentation OR Case Study OR Computer Based Test', obtained: 0.00, max: 5.00 }
      ]
    }
  ];

  const getGradeColor = (percentage) => {
    if (percentage >= 90) return 'text-green-400';
    if (percentage >= 80) return 'text-blue-400';
    if (percentage >= 70) return 'text-yellow-400';
    if (percentage >= 60) return 'text-orange-400';
    return 'text-red-400';
  };

  const getGradeBadge = (percentage) => {
    if (percentage >= 90) return 'bg-green-900/30 text-green-300 border-green-700';
    if (percentage >= 80) return 'bg-blue-900/30 text-blue-300 border-blue-700';
    if (percentage >= 70) return 'bg-yellow-900/30 text-yellow-300 border-yellow-700';
    if (percentage >= 60) return 'bg-orange-900/30 text-orange-300 border-orange-700';
    return 'bg-red-900/30 text-red-300 border-red-700';
  };

  const getGrade = (percentage) => {
    if (percentage >= 90) return 'A+';
    if (percentage >= 80) return 'A';
    if (percentage >= 70) return 'B+';
    if (percentage >= 60) return 'B';
    if (percentage >= 50) return 'C';
    return 'F';
  };

  const totalMarks = internalMarksData.reduce((sum, subject) => sum + subject.totalMarks, 0);
  const maxTotalMarks = internalMarksData.reduce((sum, subject) => sum + subject.maxMarks, 0);
  const overallPercentage = ((totalMarks / maxTotalMarks) * 100).toFixed(1);
  const completedSubjects = internalMarksData.filter(subject => subject.totalMarks > 0).length;
  const pendingSubjects = internalMarksData.filter(subject => subject.totalMarks === 0).length;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-white">Internal Mark Details</h1>
        <p className="text-gray-400 mt-1">Internal assessment marks and component-wise breakdown</p>
      </div>
      
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="card p-4">
          <p className="text-gray-400 text-sm">Total Subjects</p>
          <p className="text-2xl font-bold text-white mt-1">{internalMarksData.length}</p>
        </div>
        <div className="card p-4">
          <p className="text-gray-400 text-sm">Overall Percentage</p>
          <p className={`text-2xl font-bold mt-1 ${getGradeColor(parseFloat(overallPercentage))}`}>
            {overallPercentage}%
          </p>
        </div>
        <div className="card p-4">
          <p className="text-gray-400 text-sm">Completed</p>
          <p className="text-2xl font-bold text-green-400 mt-1">{completedSubjects}</p>
        </div>
        <div className="card p-4">
          <p className="text-gray-400 text-sm">Pending</p>
          <p className="text-2xl font-bold text-yellow-400 mt-1">{pendingSubjects}</p>
        </div>
      </div>

      {/* Subjects List */}
      <div className="space-y-4">
        {internalMarksData.map((subject, index) => {
          const percentage = ((subject.totalMarks / subject.maxMarks) * 100).toFixed(1);
          const grade = getGrade(parseFloat(percentage));
          
          return (
            <div key={subject.subjectCode} className="card overflow-hidden">
              <div className="bg-gray-800/50 px-6 py-4 border-b border-gray-700">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-semibold text-white">{subject.subjectCode}</h3>
                    <p className="text-gray-400 text-sm mt-1">{subject.subjectDescription}</p>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center gap-4">
                      <div>
                        <p className="text-sm text-gray-400">Total Marks</p>
                        <p className={`text-xl font-bold ${getGradeColor(parseFloat(percentage))}`}>
                          {subject.totalMarks} / {subject.maxMarks}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-400">Percentage</p>
                        <p className={`text-xl font-bold ${getGradeColor(parseFloat(percentage))}`}>
                          {percentage}%
                        </p>
                      </div>
                      <div>
                        <span className={`inline-flex items-center px-3 py-1 rounded text-sm font-medium border ${getGradeBadge(parseFloat(percentage))}`}>
                          {grade}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {subject.components.map((component, compIndex) => {
                    const compPercentage = component.max > 0 ? ((component.obtained / component.max) * 100).toFixed(1) : 0;
                    return (
                      <div key={compIndex} className="bg-gray-800/30 p-4 rounded-lg">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="text-sm font-medium text-gray-300">{component.name}</h4>
                          <span className={`text-xs font-medium ${getGradeColor(parseFloat(compPercentage))}`}>
                            {compPercentage}%
                          </span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-gray-400">
                            {component.obtained} / {component.max}
                          </span>
                          <div className="w-16 bg-gray-700 rounded-full h-2">
                            <div 
                              className="bg-primary-500 h-2 rounded-full transition-all duration-300"
                              style={{ width: `${Math.min(compPercentage, 100)}%` }}
                            ></div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Overall Summary */}
      <div className="card p-6">
        <h3 className="text-lg font-semibold text-white mb-4">Overall Summary</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <p className="text-3xl font-bold text-white">{totalMarks}</p>
            <p className="text-sm text-gray-400">Total Marks Obtained</p>
          </div>
          <div className="text-center">
            <p className="text-3xl font-bold text-white">{maxTotalMarks}</p>
            <p className="text-sm text-gray-400">Maximum Possible Marks</p>
          </div>
          <div className="text-center">
            <p className={`text-3xl font-bold ${getGradeColor(parseFloat(overallPercentage))}`}>
              {overallPercentage}%
            </p>
            <p className="text-sm text-gray-400">Overall Percentage</p>
          </div>
        </div>
      </div>
    </div>
  );
};

// Hall Ticket Page
export const HallTicket = () => (
  <div className="space-y-6">
    <div>
      <h1 className="text-3xl font-bold text-white">Hall Ticket</h1>
      <p className="text-gray-400 mt-1">Download your examination hall ticket</p>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="card p-6">
        <h3 className="text-lg font-semibold text-white mb-4">Upcoming Examinations</h3>
        <div className="space-y-3">
          <div className="flex items-center justify-between p-3 bg-gray-800/50 rounded-lg">
            <div>
              <p className="text-sm font-medium text-white">Semester III Examinations</p>
              <p className="text-xs text-gray-400">Dec 15 - Dec 30, 2024</p>
            </div>
            <button className="btn-primary px-3 py-1.5 text-sm">Download</button>
          </div>
        </div>
      </div>

      <div className="card p-6">
        <h3 className="text-lg font-semibold text-white mb-4">Previous Hall Tickets</h3>
        <div className="space-y-3">
          <div className="flex items-center justify-between p-3 bg-gray-800/50 rounded-lg">
            <div>
              <p className="text-sm font-medium text-white">Semester II Examinations</p>
              <p className="text-xs text-gray-400">May 10 - May 25, 2024</p>
            </div>
            <button className="btn-ghost px-3 py-1.5 text-sm">View</button>
          </div>
        </div>
      </div>
    </div>
  </div>
);

// Fee Paid Details Page
export const FeePaidDetails = () => {
  const feePaidData = [
    { date: '10/06/2024', mode: 'Cash Collection at Bank', number: 'LOYOLA/24-25/114718', amount: 14998.00 },
    { date: '10/06/2024', mode: 'Cash Collection at Bank', number: 'LOYOLA/24-25/114718', amount: 11300.00 },
    { date: '10/06/2024', mode: 'Cash Collection at Bank', number: 'LOYOLA/24-25/114718', amount: 13702.00 },
    { date: '07/03/2025', mode: 'Cash Collection at Bank', number: 'LOYOLA/24-25/141649', amount: 14997.00 },
    { date: '07/03/2025', mode: 'Cash Collection at Bank', number: 'LOYOLA/24-25/141649', amount: 9500.00 },
    { date: '07/03/2025', mode: 'Cash Collection at Bank', number: 'LOYOLA/24-25/141649', amount: 18203.00 },
    { date: '11/09/2024', mode: 'Adj-Journal', number: 'LOYOLA/24-25/123324', amount: 1900.00 },
    { date: '11/03/2025', mode: 'Cash Collection at Bank', number: 'LOYOLA/24-25/144324', amount: 200.00 },
    { date: '11/03/2025', mode: 'Cash Collection at Bank', number: 'LOYOLA/24-25/143604', amount: 10.00 },
    { date: '11/03/2025', mode: 'Cash Collection at Bank', number: 'LOYOLA/24-25/144324', amount: 50.00 },
    { date: '11/03/2025', mode: 'Cash Collection at Bank', number: 'LOYOLA/24-25/144324', amount: 20.00 },
    { date: '17/03/2025', mode: 'Cash Collection at Bank', number: 'LOYOLA/24-25/144824', amount: 1700.00 },
    { date: '11/03/2025', mode: 'Cash Collection at Bank', number: 'LOYOLA/24-25/144324', amount: 10.00 },
    { date: '21/08/2025', mode: 'Cash Collection at Bank', number: 'LOYOLA/25-26/157351', amount: 8270.00 },
    { date: '21/08/2025', mode: 'Cash Collection at Bank', number: 'LOYOLA/25-26/157351', amount: 22475.00 },
    { date: '21/08/2025', mode: 'Cash Collection at Bank', number: 'LOYOLA/25-26/157351', amount: 12265.00 },
    { date: '04/09/2025', mode: 'Cash Collection at Bank', number: 'LOYOLA/25-26/158863', amount: 2100.00 },
  ];

  const totalPaid = feePaidData.reduce((sum, payment) => sum + payment.amount, 0);
  const totalTransactions = feePaidData.length;
  const averagePayment = (totalPaid / totalTransactions).toFixed(2);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-white">Fee Paid Details</h1>
        <p className="text-gray-400 mt-1">Complete payment history and receipts</p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="card p-4">
          <p className="text-gray-400 text-sm">Total Paid</p>
          <p className="text-2xl font-bold text-green-400 mt-1">₹{totalPaid.toLocaleString()}</p>
        </div>
        <div className="card p-4">
          <p className="text-gray-400 text-sm">Transactions</p>
          <p className="text-2xl font-bold text-white mt-1">{totalTransactions}</p>
        </div>
        <div className="card p-4">
          <p className="text-gray-400 text-sm">Average Payment</p>
          <p className="text-2xl font-bold text-blue-400 mt-1">₹{averagePayment}</p>
        </div>
        <div className="card p-4">
          <p className="text-gray-400 text-sm">Last Payment</p>
          <p className="text-2xl font-bold text-yellow-400 mt-1">04/09/2025</p>
        </div>
      </div>

      {/* Payment History */}
      <div className="card overflow-hidden">
        <div className="bg-primary-600 px-6 py-4">
          <h2 className="text-lg font-semibold text-white">Receipts/Payments</h2>
          <p className="text-primary-100 text-sm mt-1">Complete payment transaction history</p>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-800/50 border-b border-gray-700">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider">Receipt Date</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider">Mode</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider">Number</th>
                <th className="px-6 py-4 text-right text-xs font-semibold text-gray-300 uppercase tracking-wider">Amount</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-700">
              {feePaidData.map((payment, index) => (
                <tr key={`${payment.date}-${payment.number}-${index}`} className={`hover:bg-gray-800/30 transition-colors ${index % 2 === 0 ? 'bg-gray-800/20' : 'bg-gray-800/10'}`}>
                  <td className="px-6 py-4 text-sm text-gray-300">{payment.date}</td>
                  <td className="px-6 py-4 text-sm text-gray-200">{payment.mode}</td>
                  <td className="px-6 py-4 text-sm font-mono text-gray-300">{payment.number}</td>
                  <td className="px-6 py-4 text-sm text-green-400 text-right font-medium">₹{payment.amount.toLocaleString()}</td>
                </tr>
              ))}
              {/* Total Row */}
              <tr className="bg-gray-800/60 border-t-2 border-gray-600 font-semibold">
                <td className="px-6 py-4 text-sm text-white font-bold" colSpan="3">Total</td>
                <td className="px-6 py-4 text-sm text-green-400 text-right font-bold">₹{totalPaid.toLocaleString()}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Fee Refund Details */}
      <div className="card overflow-hidden">
        <div className="bg-primary-600 px-6 py-4">
          <h2 className="text-lg font-semibold text-white">Fee Refund Details</h2>
          <p className="text-primary-100 text-sm mt-1">Refund transactions and history</p>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-800/50 border-b border-gray-700">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider">Refund Date</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider">Mode</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider">Number</th>
                <th className="px-6 py-4 text-right text-xs font-semibold text-gray-300 uppercase tracking-wider">Amount</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-700">
              <tr className="bg-gray-800/20">
                <td className="px-6 py-8 text-center text-gray-500" colSpan="4">No refund transactions found</td>
              </tr>
              {/* Total Row */}
              <tr className="bg-gray-800/60 border-t-2 border-gray-600 font-semibold">
                <td className="px-6 py-4 text-sm text-white font-bold" colSpan="3">Total</td>
                <td className="px-6 py-4 text-sm text-red-400 text-right font-bold">₹0.00</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

// Fee Due Details Page
export const FeeDueDetails = () => {
  const [paymentType, setPaymentType] = useState('Full Payment');

  const feeDueData = [
    {
      feeType: 'Establishment and Infrastructure Fee, General Fee, Special Fee',
      feeHead: 'Establishment & Infrastructure Fee, Laboratory & Administration Fee, Tuition Fee',
      dueDate: '30/06/2025',
      dueAmount: 39690.00
    }
  ];

  const totalDue = feeDueData.reduce((sum, fee) => sum + fee.dueAmount, 0);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-white">Fee Due Details</h1>
        <p className="text-gray-400 mt-1">Outstanding fees and payment options</p>
      </div>

      {/* Payment Type Selection */}
      <div className="card p-6">
        <h3 className="text-lg font-semibold text-white mb-4">Payment Type</h3>
        <div className="flex gap-4">
          <label className="flex items-center">
            <input
              type="radio"
              name="paymentType"
              value="Full Payment"
              checked={paymentType === 'Full Payment'}
              onChange={(e) => setPaymentType(e.target.value)}
              className="w-4 h-4 text-primary-600 bg-gray-700 border-gray-600 focus:ring-primary-500"
            />
            <span className="ml-2 text-gray-300">Full Payment</span>
          </label>
          <label className="flex items-center">
            <input
              type="radio"
              name="paymentType"
              value="Partial Payment"
              checked={paymentType === 'Partial Payment'}
              onChange={(e) => setPaymentType(e.target.value)}
              className="w-4 h-4 text-primary-600 bg-gray-700 border-gray-600 focus:ring-primary-500"
            />
            <span className="ml-2 text-gray-300">Partial Payment</span>
          </label>
        </div>
      </div>

      {/* Fee Due Table */}
      <div className="card overflow-hidden">
        <div className="bg-primary-600 px-6 py-4">
          <h2 className="text-lg font-semibold text-white">Outstanding Fees</h2>
          <p className="text-primary-100 text-sm mt-1">Fees due for payment</p>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-800/50 border-b border-gray-700">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider">Fee Type</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider">Fee Head</th>
                <th className="px-6 py-4 text-center text-xs font-semibold text-gray-300 uppercase tracking-wider">Due Date</th>
                <th className="px-6 py-4 text-right text-xs font-semibold text-gray-300 uppercase tracking-wider">Due Amount</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-700">
              {feeDueData.map((fee, index) => (
                <tr key={index} className="hover:bg-gray-800/30 transition-colors">
                  <td className="px-6 py-4 text-sm text-gray-200">{fee.feeType}</td>
                  <td className="px-6 py-4 text-sm text-gray-200">{fee.feeHead}</td>
                  <td className="px-6 py-4 text-sm text-gray-300 text-center">{fee.dueDate}</td>
                  <td className="px-6 py-4 text-sm text-red-400 text-right font-bold">₹{fee.dueAmount.toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Payment Options */}
      <div className="card p-6">
        <h3 className="text-lg font-semibold text-white mb-4">Payment Options</h3>
        <div className="flex flex-col sm:flex-row gap-4">
          <button className="btn-primary flex-1">
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
            </svg>
            Debit Card / Credit Card / Net Banking Payment
          </button>
          <button className="btn-ghost flex-1">
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
            </svg>
            Print Challan
          </button>
        </div>
      </div>

      {/* Important Notice */}
      <div className="card p-6 border-l-4 border-red-500 bg-red-900/10">
        <h3 className="text-lg font-semibold text-red-400 mb-4">Important Notice</h3>
        <div className="space-y-3 text-sm text-red-300">
          <p className="font-semibold">IN-ORDER TO PAY/GENERATE EXAMINATION FEE, YOU SHOULD HAVE COMPLETED THE FOLLOWING THINGS:</p>
          <ol className="list-decimal list-inside space-y-2 ml-4">
            <li>YOU MUST CLEAR ALL YOUR EARLIER (SEMESTER/YEAR) DUES</li>
            <li>YOU SHOULD CLEAR ALL YOUR SKILL ENHANCEMENT COURSE FEES</li>
            <li>YOU SHOULD HAVE CLEARED AT LEAST HALF OF THIS ACADEMIC YEAR'S FEE</li>
          </ol>
          <p className="font-semibold mt-4">IF YOU ARE PAYING NOW ANY OF THE ABOVE, YOU NEED TO WAIT FOR THE CONFIRMATION OF ACCOUNT DEPARTMENT, ONLY AFTER THAT, YOU CAN PAY/GENERATE THE EXAMINATION FEE.</p>
        </div>
      </div>
    </div>
  );
};

// Change Password Page
export const ChangePassword = () => {
  const [formData, setFormData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.currentPassword) {
      newErrors.currentPassword = 'Current password is required';
    }

    if (!formData.newPassword) {
      newErrors.newPassword = 'New password is required';
    } else if (formData.newPassword.length < 8) {
      newErrors.newPassword = 'Password must be at least 8 characters long';
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your new password';
    } else if (formData.newPassword !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    if (formData.currentPassword === formData.newPassword) {
      newErrors.newPassword = 'New password must be different from current password';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      alert('Password changed successfully!');
      setFormData({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      });
    }, 2000);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-white">Change Password</h1>
        <p className="text-gray-400 mt-1">Update your account password securely</p>
      </div>

      <div className="max-w-md mx-auto">
        <div className="card p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="currentPassword" className="block text-sm font-medium text-gray-300 mb-2">
                Current Password
              </label>
              <input
                type="password"
                id="currentPassword"
                name="currentPassword"
                value={formData.currentPassword}
                onChange={handleInputChange}
                className={`w-full px-3 py-2 bg-gray-800 border rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 ${
                  errors.currentPassword ? 'border-red-500' : 'border-gray-600'
                }`}
                placeholder="Enter current password"
              />
              {errors.currentPassword && (
                <p className="mt-1 text-sm text-red-400">{errors.currentPassword}</p>
              )}
            </div>

            <div>
              <label htmlFor="newPassword" className="block text-sm font-medium text-gray-300 mb-2">
                New Password
              </label>
              <input
                type="password"
                id="newPassword"
                name="newPassword"
                value={formData.newPassword}
                onChange={handleInputChange}
                className={`w-full px-3 py-2 bg-gray-800 border rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 ${
                  errors.newPassword ? 'border-red-500' : 'border-gray-600'
                }`}
                placeholder="Enter new password"
              />
              {errors.newPassword && (
                <p className="mt-1 text-sm text-red-400">{errors.newPassword}</p>
              )}
            </div>

            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-300 mb-2">
                Confirm New Password
              </label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                className={`w-full px-3 py-2 bg-gray-800 border rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 ${
                  errors.confirmPassword ? 'border-red-500' : 'border-gray-600'
                }`}
                placeholder="Confirm new password"
              />
              {errors.confirmPassword && (
                <p className="mt-1 text-sm text-red-400">{errors.confirmPassword}</p>
              )}
            </div>

            <div className="flex justify-end">
              <button
                type="submit"
                disabled={isSubmitting}
                className="btn-primary px-6 py-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <div className="flex items-center">
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Saving...
                  </div>
                ) : (
                  'Save'
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

// Online Exam Page
export const OnlineExam = () => (
  <div className="space-y-6">
    <div>
      <h1 className="text-3xl font-bold text-white">Online Exam</h1>
      <p className="text-gray-400 mt-1">Access your online examinations</p>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="card p-6">
        <h3 className="text-lg font-semibold text-white mb-4">Scheduled Exams</h3>
        <div className="space-y-3">
          <div className="p-4 bg-gray-800/50 rounded-lg border border-yellow-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-white">Mathematics - I</p>
                <p className="text-xs text-gray-400">Dec 20, 2024 at 10:00 AM</p>
              </div>
              <span className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-yellow-900/30 text-yellow-300 border border-yellow-700">
                Upcoming
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="card p-6">
        <h3 className="text-lg font-semibold text-white mb-4">Completed Exams</h3>
        <div className="space-y-3">
          <div className="p-4 bg-gray-800/50 rounded-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-white">Programming in C</p>
                <p className="text-xs text-gray-400">Nov 15, 2024</p>
              </div>
              <span className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-green-900/30 text-green-300 border border-green-700">
                Completed
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

// Exam Mark Details Page
export const ExamMarkDetails = () => {
  const examMarksData = [
    // Semester 1 - NOV 2024
    { semester: 1, monthYear: 'NOV 2024', part: 'I', subPart: 'AECC', code: 'EN23101', description: 'GENERAL ENGLISH - I', credit: 2, pointValue: 9.00, grade: 'A', result: 'PASS', attempts: 1 },
    { semester: 1, monthYear: 'NOV 2024', part: 'I', subPart: 'AECC', code: 'BS19101', description: 'VALUE EDUCATION AND PERSONALITY DEVELOPMENT', credit: 2, pointValue: 8.00, grade: 'B', result: 'PASS', attempts: 1 },
    { semester: 1, monthYear: 'NOV 2024', part: 'I', subPart: 'Core', code: 'CS18102', description: 'MATHEMATICS - I', credit: 4, pointValue: 9.00, grade: 'A', result: 'PASS', attempts: 1 },
    { semester: 1, monthYear: 'NOV 2024', part: 'I', subPart: 'Core', code: 'SS001', description: 'PROBLEM SOLVING AND PROGRAMMING IN C', credit: 4, pointValue: 10.00, grade: 'O', result: 'PASS', attempts: 1 },
    { semester: 1, monthYear: 'NOV 2024', part: 'I', subPart: 'Core', code: 'IC23201', description: 'C PROGRAMMING [PR]', credit: 2, pointValue: 9.00, grade: 'A', result: 'PASS', attempts: 1 },
    { semester: 1, monthYear: 'NOV 2024', part: 'I', subPart: 'Core', code: 'PL18001', description: 'ELECTRONIC DEVICES AND CIRCUITS [PR]', credit: 2, pointValue: 8.00, grade: 'B', result: 'PASS', attempts: 1 },
    { semester: 1, monthYear: 'NOV 2024', part: 'I', subPart: 'Core', code: 'ES23301', description: 'ELECTRONIC DEVICES AND CIRCUITS', credit: 4, pointValue: 9.00, grade: 'A', result: 'PASS', attempts: 1 },
    { semester: 1, monthYear: 'NOV 2024', part: 'I', subPart: 'Core', code: 'BS18330', description: 'ENGINEERING PHYSICS', credit: 4, pointValue: 8.00, grade: 'B', result: 'PASS', attempts: 1 },
    { semester: 1, monthYear: 'NOV 2024', part: 'I', subPart: 'Core', code: 'G20CSIT1P', description: 'ENGINEERING PHYSICS [PR]', credit: 2, pointValue: 9.00, grade: 'A', result: 'PASS', attempts: 1 },
    
    // Semester 2 - APR 2025
    { semester: 2, monthYear: 'APR 2025', part: 'II', subPart: 'AECC', code: 'EN23102', description: 'GENERAL ENGLISH - II', credit: 2, pointValue: 8.00, grade: 'B', result: 'PASS', attempts: 1 },
    { semester: 2, monthYear: 'APR 2025', part: 'II', subPart: 'AECC', code: 'BS19102', description: 'INDIAN HERITAGE AND CULTURE', credit: 2, pointValue: 9.00, grade: 'A', result: 'PASS', attempts: 1 },
    { semester: 2, monthYear: 'APR 2025', part: 'II', subPart: 'Core', code: 'CS18103', description: 'MATHEMATICS - II', credit: 4, pointValue: 9.00, grade: 'A', result: 'PASS', attempts: 1 },
    { semester: 2, monthYear: 'APR 2025', part: 'II', subPart: 'Core', code: 'CS18104', description: 'C PLUS PLUS WITH DATA STRUCTURES [PR]', credit: 2, pointValue: 10.00, grade: 'O', result: 'PASS', attempts: 1 },
    { semester: 2, monthYear: 'APR 2025', part: 'II', subPart: 'Core', code: 'CS18105', description: 'C PLUS PLUS WITH DATA STRUCTURES', credit: 4, pointValue: 9.00, grade: 'A', result: 'PASS', attempts: 1 },
    { semester: 2, monthYear: 'APR 2025', part: 'II', subPart: 'Core', code: 'CS18106', description: 'LOGIC AND DIGITAL CIRCUITS', credit: 4, pointValue: 8.00, grade: 'B', result: 'PASS', attempts: 1 },
    { semester: 2, monthYear: 'APR 2025', part: 'II', subPart: 'Core', code: 'CS18107', description: 'LOGIC AND DIGITAL CIRCUITS [PR]', credit: 2, pointValue: 9.00, grade: 'A', result: 'PASS', attempts: 1 },
    { semester: 2, monthYear: 'APR 2025', part: 'II', subPart: 'Core', code: 'CS18108', description: 'ENGINEERING DRAWING & ENGG.', credit: 2, pointValue: 8.00, grade: 'B', result: 'PASS', attempts: 1 },
    { semester: 2, monthYear: 'APR 2025', part: 'II', subPart: 'Core', code: 'CS18109', description: 'WORKSHOP [PR]', credit: 2, pointValue: 9.00, grade: 'A', result: 'PASS', attempts: 1 },
    { semester: 2, monthYear: 'APR 2025', part: 'II', subPart: 'PL', code: 'PLANET', description: 'PLANET', credit: 1, pointValue: null, grade: null, result: 'PASS', attempts: 1 },
  ];

  const getGradeColor = (grade) => {
    switch (grade) {
      case 'O': return 'text-green-400 bg-green-900/30 border-green-700';
      case 'A': return 'text-blue-400 bg-blue-900/30 border-blue-700';
      case 'B': return 'text-yellow-400 bg-yellow-900/30 border-yellow-700';
      case 'C': return 'text-orange-400 bg-orange-900/30 border-orange-700';
      case 'D': return 'text-red-400 bg-red-900/30 border-red-700';
      case 'F': return 'text-red-400 bg-red-900/30 border-red-700';
      default: return 'text-gray-400 bg-gray-800/30 border-gray-600';
    }
  };

  const getSubPartColor = (subPart) => {
    switch (subPart) {
      case 'Core': return 'bg-blue-900/30 text-blue-300 border-blue-700';
      case 'AECC': return 'bg-green-900/30 text-green-300 border-green-700';
      case 'GE': return 'bg-purple-900/30 text-purple-300 border-purple-700';
      case 'SEC': return 'bg-orange-900/30 text-orange-300 border-orange-700';
      case 'PL': return 'bg-pink-900/30 text-pink-300 border-pink-700';
      default: return 'bg-gray-800/30 text-gray-300 border-gray-600';
    }
  };

  const getResultColor = (result) => {
    switch (result) {
      case 'PASS': return 'text-green-400 bg-green-900/30 border-green-700';
      case 'FAIL': return 'text-red-400 bg-red-900/30 border-red-700';
      default: return 'text-gray-400 bg-gray-800/30 border-gray-600';
    }
  };

  // Calculate statistics
  const totalSubjects = examMarksData.length;
  const passedSubjects = examMarksData.filter(subject => subject.result === 'PASS').length;
  const totalCredits = examMarksData.reduce((sum, subject) => sum + subject.credit, 0);
  const totalPoints = examMarksData.filter(subject => subject.pointValue !== null).reduce((sum, subject) => sum + subject.pointValue, 0);
  const averagePoints = examMarksData.filter(subject => subject.pointValue !== null).length > 0 
    ? (totalPoints / examMarksData.filter(subject => subject.pointValue !== null).length).toFixed(2) 
    : 0;

  const gradeDistribution = examMarksData.reduce((acc, subject) => {
    if (subject.grade) {
      acc[subject.grade] = (acc[subject.grade] || 0) + 1;
    }
    return acc;
  }, {});

  const semester1Subjects = examMarksData.filter(subject => subject.semester === 1);
  const semester2Subjects = examMarksData.filter(subject => subject.semester === 2);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-white">Exam Mark Details</h1>
        <p className="text-gray-400 mt-1">Examination results and academic performance</p>
      </div>
      
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="card p-4">
          <p className="text-gray-400 text-sm">Total Subjects</p>
          <p className="text-2xl font-bold text-white mt-1">{totalSubjects}</p>
        </div>
        <div className="card p-4">
          <p className="text-gray-400 text-sm">Passed Subjects</p>
          <p className="text-2xl font-bold text-green-400 mt-1">{passedSubjects}</p>
        </div>
        <div className="card p-4">
          <p className="text-gray-400 text-sm">Total Credits</p>
          <p className="text-2xl font-bold text-blue-400 mt-1">{totalCredits}</p>
        </div>
        <div className="card p-4">
          <p className="text-gray-400 text-sm">Average Points</p>
          <p className="text-2xl font-bold text-yellow-400 mt-1">{averagePoints}</p>
        </div>
      </div>

      {/* Grade Distribution */}
      <div className="card p-6">
        <h3 className="text-lg font-semibold text-white mb-4">Grade Distribution</h3>
        <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
          {Object.entries(gradeDistribution).map(([grade, count]) => (
            <div key={grade} className="text-center">
              <div className={`inline-flex items-center justify-center w-12 h-12 rounded-full text-lg font-bold border ${getGradeColor(grade)}`}>
                {grade}
              </div>
              <p className="text-sm text-gray-400 mt-2">{count} subjects</p>
            </div>
          ))}
        </div>
      </div>

      {/* Semester-wise Performance */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="card p-6">
          <h3 className="text-lg font-semibold text-white mb-4">Semester 1 (NOV 2024)</h3>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-sm text-gray-400">Subjects:</span>
              <span className="text-sm font-medium text-white">{semester1Subjects.length}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-400">Credits:</span>
              <span className="text-sm font-medium text-white">
                {semester1Subjects.reduce((sum, subject) => sum + subject.credit, 0)}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-400">Average Points:</span>
              <span className="text-sm font-medium text-white">
                {semester1Subjects.filter(s => s.pointValue !== null).length > 0 
                  ? (semester1Subjects.filter(s => s.pointValue !== null).reduce((sum, s) => sum + s.pointValue, 0) / semester1Subjects.filter(s => s.pointValue !== null).length).toFixed(2)
                  : 'N/A'
                }
              </span>
            </div>
          </div>
        </div>

        <div className="card p-6">
          <h3 className="text-lg font-semibold text-white mb-4">Semester 2 (APR 2025)</h3>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-sm text-gray-400">Subjects:</span>
              <span className="text-sm font-medium text-white">{semester2Subjects.length}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-400">Credits:</span>
              <span className="text-sm font-medium text-white">
                {semester2Subjects.reduce((sum, subject) => sum + subject.credit, 0)}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-400">Average Points:</span>
              <span className="text-sm font-medium text-white">
                {semester2Subjects.filter(s => s.pointValue !== null).length > 0 
                  ? (semester2Subjects.filter(s => s.pointValue !== null).reduce((sum, s) => sum + s.pointValue, 0) / semester2Subjects.filter(s => s.pointValue !== null).length).toFixed(2)
                  : 'N/A'
                }
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Detailed Results Table */}
      <div className="card overflow-hidden">
        <div className="bg-primary-600 px-6 py-4">
          <h2 className="text-lg font-semibold text-white">Detailed Examination Results</h2>
          <p className="text-primary-100 text-sm mt-1">Complete academic performance record</p>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-800/50 border-b border-gray-700">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider">Semester</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider">Month/Year</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider">Code</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider">Description</th>
                <th className="px-4 py-3 text-center text-xs font-semibold text-gray-300 uppercase tracking-wider">Credit</th>
                <th className="px-4 py-3 text-center text-xs font-semibold text-gray-300 uppercase tracking-wider">Points</th>
                <th className="px-4 py-3 text-center text-xs font-semibold text-gray-300 uppercase tracking-wider">Grade</th>
                <th className="px-4 py-3 text-center text-xs font-semibold text-gray-300 uppercase tracking-wider">Result</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-700">
              {examMarksData.map((subject, index) => (
                <tr key={`${subject.semester}-${subject.code}`} className={`hover:bg-gray-800/30 transition-colors ${index % 2 === 0 ? 'bg-gray-800/20' : 'bg-gray-800/10'}`}>
                  <td className="px-4 py-3 text-sm font-medium text-gray-200">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary-900/30 text-primary-300">
                      Sem {subject.semester}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-300">{subject.monthYear}</td>
                  <td className="px-4 py-3 text-sm font-mono text-gray-300">{subject.code}</td>
                  <td className="px-4 py-3 text-sm text-gray-200">
                    <div className="flex items-center gap-2">
                      <span>{subject.description}</span>
                      {subject.description.includes('[PR]') && (
                        <span className="inline-flex items-center px-1.5 py-0.5 rounded text-xs font-medium bg-orange-900/30 text-orange-300">
                          PR
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="px-4 py-3 text-center text-sm text-gray-300">{subject.credit}</td>
                  <td className="px-4 py-3 text-center text-sm text-gray-300">
                    {subject.pointValue !== null ? subject.pointValue.toFixed(2) : '-'}
                  </td>
                  <td className="px-4 py-3 text-center">
                    {subject.grade ? (
                      <span className={`inline-flex items-center px-2 py-1 rounded text-xs font-medium border ${getGradeColor(subject.grade)}`}>
                        {subject.grade}
                      </span>
                    ) : (
                      <span className="text-gray-500">-</span>
                    )}
                  </td>
                  <td className="px-4 py-3 text-center">
                    <span className={`inline-flex items-center px-2 py-1 rounded text-xs font-medium border ${getResultColor(subject.result)}`}>
                      {subject.result}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

// Default Empty Page
export const DefaultPage = ({ title, description }) => (
  <div className="space-y-6">
    <div>
      <h1 className="text-3xl font-bold text-white">{title}</h1>
      <p className="text-gray-400 mt-1">{description}</p>
    </div>

    <EmptyState
      title={`${title} Coming Soon`}
      description="This feature is currently under development. We're working hard to bring you the best experience."
      variant="info"
      actionText="Learn More"
      onAction={() => console.log('Learn more clicked')}
    />
  </div>
);
