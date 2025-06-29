import React from "react";
import { useSelector } from "react-redux";
import EditProfile from "./EditProfile";

const Profile = () => {
  const user = useSelector((store) => store.user);

  if (!user) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-center bg-gradient-to-br from-gray-900 to-gray-800 p-8 rounded-xl border border-gray-700">
          <p className="text-gray-400">No user data available</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <EditProfile user={user} />
    </div>
  );
};

export default Profile;
