import React from "react";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import {
  Code,
  Github,
  Linkedin,
  Heart,
  X,
  Star,
  GitBranch,
  Cpu,
} from "lucide-react";
import { removeUserFromFeed } from "../utils/feedSlice";

const UserCard = ({ user, showActions = true }) => {
  const dispatch = useDispatch();
  const { _id } = user;

  const handleSendRequest = async (status, userId) => {
    try {
      const res = await axios.post(
        BASE_URL + "/request/send/" + status + "/" + userId,
        {},
        { withCredentials: true }
      );
      dispatch(removeUserFromFeed(userId));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="max-w-sm mx-auto bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl mb-4 overflow-hidden shadow-xl border border-gray-700 hover:border-purple-500/50 transition-all duration-300">
      <div className="relative h-40 bg-gradient-to-r from-purple-900/40 to-blue-900/40">
        <div className="absolute top-3 right-3 flex space-x-2">
          <div className="p-1.5 bg-gray-800/80 rounded-lg backdrop-blur-sm">
            <Code className="h-4 w-4 text-purple-400" />
          </div>
          <div className="p-1.5 bg-gray-800/80 rounded-lg backdrop-blur-sm">
            <Cpu className="h-4 w-4 text-blue-400" />
          </div>
          <div className="p-1.5 bg-gray-800/80 rounded-lg backdrop-blur-sm">
            <GitBranch className="h-4 w-4 text-green-400" />
          </div>
        </div>

        <div className="absolute -bottom-14 left-1/2 transform -translate-x-1/2">
          <div className="relative">
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 blur-md opacity-30 animate-pulse"></div>
            <img
              className="relative h-28 w-28 rounded-full border-4 border-gray-900 object-cover shadow-lg z-10"
              src={user?.photoUrl}
              alt={`${user?.firstName} ${user?.lastName}`}
              onError={(e) => {
                e.target.src =
                  "https://cdn-icons-png.flaticon.com/512/149/149071.png";
              }}
            />
          </div>
        </div>
      </div>

      <div className="px-5 pt-16 pb-5">
        <div className="text-center mb-3">
          <h2 className="text-lg font-semibold text-white leading-tight">
            {user?.firstName} {user?.lastName}
          </h2>
          {(user?.age || user?.gender) && (
            <p className="text-sm text-gray-400 mt-1">
              {user.age && `${user.age} years`}
              {user.age && user.gender && " • "}
              {user.gender && `${user.gender}`}
            </p>
          )}
          <div className="flex items-center justify-center mt-1">
            <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
          </div>
        </div>

        <div className="bg-gray-800/50 rounded-lg p-3 mb-4 border border-gray-700/50">
          <p className="text-gray-300 text-xs leading-relaxed text-center">
            {user?.about}
          </p>
        </div>

        <div className="mb-4">
          <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1 text-center">
            Skills
          </h3>
          <div className="flex flex-wrap justify-center gap-1.5">
            {user?.skills?.map((skill, index) => (
              <span
                key={index}
                className="px-2 py-0.5 bg-gray-800/50 text-xs text-purple-300 rounded-full border border-gray-700"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>

        <div className="flex justify-center space-x-4 mb-4">
          {user?.GithubUrl && (
            <a
              href={user.GithubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white transition-colors"
            >
              <Github className="h-5 w-5" />
            </a>
          )}
          {user?.linkdlnUrl && (
            <a
              href={user.linkdlnUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-blue-400 transition-colors"
            >
              <Linkedin className="h-5 w-5" />
            </a>
          )}
        </div>

        {showActions && (
          <div className="flex space-x-2">
            <button
              className="flex-1 flex items-center justify-center py-2 px-3 rounded-lg bg-gray-800 hover:bg-gray-700 text-gray-300 text-xs font-medium transition-colors border border-gray-700 hover:border-gray-600"
              onClick={() => handleSendRequest("ignored", _id)}
            >
              <X className="h-4 w-4 mr-1" />
              Ignore
            </button>
            <button
              className="flex-1 flex items-center justify-center py-2 px-3 rounded-lg bg-gradient-to-r from-purple-600 to-blue-600 text-white hover:from-purple-700 hover:to-blue-700 text-xs font-medium transition-all shadow-lg hover:shadow-purple-500/20"
              onClick={() => handleSendRequest("interested", _id)}
            >
              <Heart className="h-4 w-4 mr-1" />
              Connect
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserCard;
