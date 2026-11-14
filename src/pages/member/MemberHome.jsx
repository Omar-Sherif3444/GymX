import { useState } from "react";

import MemberProfileHeader from "./member profile/MemberProfileHeader";
import MemberStats from "./member profile/MemberStats";
import PersonalDetails from "./member profile/PersonalDetails";
import MembershipCard from "./member profile/MembershipCard";
import RecentVisits from "./member profile/RecentVisits";

import { memberData } from "./member profile/memberData";
import AttendanceOverview from "./member profile/AttendanceOverview";

const MemberHome = () => {
  const [member, setMember] = useState(memberData);

  // Save personal details
  const handleSaveDetails = (updatedDetails) => {
    setMember((prev) => ({
      ...prev,
      personalDetails: updatedDetails,
    }));

    // Later: send updatedDetails to your backend API.
  };

  // Upload profile photo
  const handleUploadPhoto = (e) => {
    const file = e.target.files?.[0];

    if (!file) return;

    const imageUrl = URL.createObjectURL(file);

    setMember((prev) => ({
      ...prev,
      profile: {
        ...prev.profile,
        avatar: imageUrl,
      },
    }));
  };

  // Remove profile photo
  const handleRemovePhoto = () => {
    setMember((prev) => ({
      ...prev,
      profile: {
        ...prev.profile,
        avatar: null,
      },
    }));
  };

  // Renew membership
  const handleRenew = () => {
    // Later: navigate to membership renewal page.
  };

  return (
    <div className="min-h-screen w-full bg-var(--gym-bg) py-6 px-4 sm:px-6 lg:px-8 xl:px-10">
      <div className="w-full max-w-none space-y-4">
        {/* Profile */}
        <MemberProfileHeader
          profile={member.profile}
          onUploadPhoto={handleUploadPhoto}
          onRemovePhoto={handleRemovePhoto}
        />

        {/* Attendance */}
        <AttendanceOverview attendance={member.attendance} />

        {/* Statistics */}
        <MemberStats stats={member.stats} />

        {/* Main dashboard content */}
        <div className="grid grid-cols-1 lg:grid-cols-[2.2fr_1fr] gap-4">
          {/* Left column */}
          <div className="min-w-0">
            <PersonalDetails
              details={member.personalDetails}
              onSave={handleSaveDetails}
            />
          </div>

          {/* Right column */}
          <div className="min-w-0 space-y-4">
            <MembershipCard
              membership={member.membership}
              onRenew={handleRenew}
            />

            <RecentVisits visits={member.recentVisits} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MemberHome;
