import React from 'react';

const PersonalDetails = () => {
  const studentData = {
    name: "GUDLA REVANTH ROSHAN GOUD",
    registerNo: "111724013034",
    course: "B.Sc.-Computer Science and Engineering [U.G.]",
    academicYear: "2025-2026",
    semester: "III SEMESTER",
    section: "A",
    institution: "LOYOLA ACADEMY DEGREE & PG COLLEGE",
    dob: "29-May-2007",
    gender: "Male",
    aadhaar: "997243834263",
    fatherName: "GUDLA SRINIVAS GOUD",
    motherName: "GUDLA ARUN JYOTHI GOUD",
    address: "7 8 82GOUTHAM NAGARMEDCHAL MALKAJGIRIHYDERABAD-500011",
    studentContact: "8686866463",
    studentEmail: "personallyrevanth@gmail.com",
    parentContact: "8686866463",
    parentEmail: "arunjyothigoud8@gmail.com",
    admittedDate: "08-Jun-2024",
    community: "BC - B",
    nationality: "INDIAN",
    religion: "HINDU",
    hosteller: "No",
    occupation: "",
    annualIncome: "400000",
    district: "HYDERABAD",
    state: "TELANGANA",
    status: "Active"
  };

  const InfoCard = ({ title, children, className = "" }) => (
    <div className={`card p-6 ${className}`}>
      <h3 className="text-lg font-semibold text-white mb-4 border-b border-gray-700 pb-2">{title}</h3>
      {children}
    </div>
  );

  const InfoRow = ({ label, value, fullWidth = false }) => (
    <div className={`grid ${fullWidth ? 'grid-cols-1' : 'grid-cols-1 md:grid-cols-3'} gap-2 py-2`}>
      <dt className="text-sm font-medium text-gray-400">{label}:</dt>
      <dd className={`text-sm text-gray-200 ${fullWidth ? '' : 'md:col-span-2'}`}>{value || 'N/A'}</dd>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white">Student Profile</h1>
          <p className="text-gray-400 mt-1">Personal and academic information</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 px-3 py-1.5 bg-green-900/30 border border-green-700 rounded-full">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <span className="text-sm text-green-400 font-medium">{studentData.status}</span>
          </div>
          <button className="btn-ghost p-2 rounded-md">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            <span className="sr-only">Refresh</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profile Picture */}
        <div className="lg:col-span-1">
          <InfoCard title="Profile Photo">
            <div className="flex flex-col items-center">
              <div className="w-32 h-32 bg-gray-700 rounded-lg mb-4 flex items-center justify-center border-2 border-gray-600">
                <svg className="w-16 h-16 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                </svg>
              </div>
              <p className="text-sm text-gray-400 text-center">Profile picture will be displayed here</p>
            </div>
          </InfoCard>
        </div>

        {/* Student Information */}
        <div className="lg:col-span-2 space-y-6">
          {/* Basic Information */}
          <InfoCard title="Basic Information">
            <dl className="space-y-3">
              <InfoRow label="Student Name" value={studentData.name} fullWidth />
              <InfoRow label="Register No." value={studentData.registerNo} />
              <InfoRow label="Course" value={studentData.course} fullWidth />
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <InfoRow label="Academic Year" value={studentData.academicYear} />
                <InfoRow label="Semester" value={studentData.semester} />
                <InfoRow label="Section" value={studentData.section} />
              </div>
              <InfoRow label="Institution" value={studentData.institution} fullWidth />
            </dl>
          </InfoCard>

          {/* Personal Information */}
          <InfoCard title="Personal Information">
            <dl className="space-y-3">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <InfoRow label="Date of Birth" value={studentData.dob} />
                <InfoRow label="Gender" value={studentData.gender} />
              </div>
              <InfoRow label="Aadhaar Number" value={studentData.aadhaar} />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <InfoRow label="Father Name" value={studentData.fatherName} />
                <InfoRow label="Mother Name" value={studentData.motherName} />
              </div>
              <InfoRow label="Residential Address" value={studentData.address} fullWidth />
            </dl>
          </InfoCard>

          {/* Contact Information */}
          <InfoCard title="Contact Information">
            <dl className="space-y-3">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <InfoRow label="Student Contact" value={studentData.studentContact} />
                <InfoRow label="Student Email" value={studentData.studentEmail} />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <InfoRow label="Parent Contact" value={studentData.parentContact} />
                <InfoRow label="Parent Email" value={studentData.parentEmail} />
              </div>
            </dl>
          </InfoCard>

          {/* Additional Information */}
          <InfoCard title="Additional Information">
            <dl className="space-y-3">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <InfoRow label="Admitted Date" value={studentData.admittedDate} />
                <InfoRow label="Community" value={studentData.community} />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <InfoRow label="Nationality" value={studentData.nationality} />
                <InfoRow label="Religion" value={studentData.religion} />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <InfoRow label="Hosteller" value={studentData.hosteller} />
                <InfoRow label="Annual Income" value={`₹${studentData.annualIncome}`} />
                <InfoRow label="Occupation" value={studentData.occupation || 'N/A'} />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <InfoRow label="District" value={studentData.district} />
                <InfoRow label="State" value={studentData.state} />
              </div>
            </dl>
          </InfoCard>
        </div>
      </div>
    </div>
  );
};

export default PersonalDetails;
