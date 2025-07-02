import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addConnections } from "../utils/connectionSlice";
import { Link } from "react-router-dom";
import {
  MessageSquare,
  Search,
  Github,
  Linkedin,
  Clock,
  User,
  Users,
} from "lucide-react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const Connections = () => {
  const connections = useSelector((store) => store.connections);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  const fetchConnections = async () => {
    try {
      setLoading(true);
      const res = await axios.get(BASE_URL + "/user/connections", {
        withCredentials: true,
      });
      dispatch(addConnections(res.data.data));
    } catch (err) {
      setError("Failed to load connections. Please try again later.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchConnections();
  }, []);

  const filteredConnections = connections?.filter((connection) => {
    const fullName =
      `${connection.firstName} ${connection.lastName}`.toLowerCase();
    return fullName.includes(searchQuery.toLowerCase());
  });

  // Function to format connection time
  const formatConnectionTime = (dateString) => {
    const now = new Date();
    const connectionDate = new Date(dateString);
    const diffInDays = Math.floor(
      (now - connectionDate) / (1000 * 60 * 60 * 24)
    );

    if (diffInDays === 0) return "Today";
    if (diffInDays === 1) return "Yesterday";
    if (diffInDays < 7) return `${diffInDays} days ago`;
    if (diffInDays < 30) return `${Math.floor(diffInDays / 7)} weeks ago`;
    if (diffInDays < 365) return `${Math.floor(diffInDays / 30)} months ago`;
    return `${Math.floor(diffInDays / 365)} years ago`;
  };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        <div className="flex flex-col items-center mb-12">
          <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-500 mb-3">
            MY CONNECTIONS
          </h1>
          <div className="w-32 h-1 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full opacity-80"></div>
        </div>

        <div className="mb-8 max-w-2xl mx-auto">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <Skeleton height={48} className="rounded-xl" />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="bg-gradient-to-br from-gray-800/50 to-gray-900/30 rounded-2xl p-6 border border-gray-700/50 shadow-lg"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-4">
                  <Skeleton circle width={72} height={72} />
                  <div>
                    <Skeleton width={140} height={24} className="mb-2" />
                    <Skeleton width={100} height={16} />
                  </div>
                </div>
                <Skeleton width={60} height={16} />
              </div>
              <Skeleton count={3} className="mb-4" />
              <div className="flex flex-wrap gap-2 mb-4">
                {[...Array(4)].map((_, i) => (
                  <Skeleton
                    key={i}
                    width={60}
                    height={24}
                    className="rounded-full"
                  />
                ))}
              </div>
              <Skeleton height={40} className="rounded-lg" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12 flex flex-col items-center justify-center text-center">
        <div className="bg-gradient-to-br from-red-900/30 to-red-800/20 p-8 rounded-2xl border border-red-800/50 shadow-xl">
          <h2 className="text-2xl font-bold text-white mb-3">
            Connection Error
          </h2>
          <p className="text-gray-300 mb-6 max-w-md">{error}</p>
          <button
            onClick={fetchConnections}
            className="px-8 py-3 bg-gradient-to-r from-red-600 to-red-700 rounded-xl text-white hover:from-red-700 hover:to-red-800 transition-all shadow-lg hover:shadow-red-500/20"
          >
            Retry Connection
          </button>
        </div>
      </div>
    );
  }

  if (!filteredConnections || filteredConnections.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12 flex flex-col items-center justify-center text-center">
        <div className="p-10 bg-gradient-to-br from-gray-800/50 to-gray-900/30 rounded-2xl border border-gray-700/50 shadow-lg">
          <Users className="h-20 w-20 text-gray-400 mx-auto mb-6 opacity-70" />
          <h2 className="text-3xl font-bold text-white mb-3">
            {searchQuery ? "No matching connections" : "Your network is empty"}
          </h2>
          <p className="text-gray-400 mb-8 max-w-md text-lg">
            {searchQuery
              ? "Try adjusting your search query"
              : "Connect with other professionals to build your network"}
          </p>
          <Link
            to="/feed"
            className="inline-block px-8 py-3 bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl text-white hover:from-purple-700 hover:to-blue-700 transition-all shadow-lg hover:shadow-blue-500/20"
          >
            Discover Professionals
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
      <div className="flex flex-col items-center mb-12">
        <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-500 mb-3">
          MY CONNECTIONS
        </h1>
        <div className="w-32 h-1 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full opacity-80"></div>
      </div>

      <div className="mb-10 max-w-2xl mx-auto">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
          <input
            type="text"
            placeholder="Search connections by name..."
            className="w-full pl-12 pr-6 py-3.5 bg-gray-800/50 border border-gray-700/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500/50 text-white placeholder-gray-400 shadow-sm"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
        {filteredConnections.map((connection) => {
          const {
            _id,
            firstName,
            lastName,
            photoUrl,
            connectedAt,
            githubUrl,
            linkedinUrl,
            about,
            skills = [],
          } = connection;

          return (
            <div
              key={_id}
              className="bg-gradient-to-br from-gray-800/50 to-gray-900/30 rounded-2xl p-6 border border-gray-700/50 hover:border-purple-500/30 transition-all duration-300 shadow-lg hover:shadow-purple-500/10"
            >
              {/* Header with avatar and connection time */}
              <div className="flex items-start justify-between mb-5">
                <div className="flex items-center space-x-4">
                  <div className="relative">
                    <img
                      alt={`${firstName} ${lastName}`}
                      className="w-16 h-16 rounded-full object-cover border-2 border-purple-500/30"
                      src={
                        photoUrl ||
                        "https://cdn-icons-png.flaticon.com/512/149/149071.png"
                      }
                    />
                    <span className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-green-500 rounded-full border-2 border-gray-900"></span>
                  </div>
                  <div>
                    <h2 className="font-bold text-white text-xl">
                      {firstName} {lastName}
                    </h2>
                    {connectedAt && (
                      <div className="flex items-center text-gray-400 text-sm mt-1">
                        <Clock className="h-4 w-4 mr-1" />
                        <span>
                          Connected {formatConnectionTime(connectedAt)}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* About section */}
              {about && (
                <div className="mb-5">
                  <p className="text-gray-300 line-clamp-3">{about}</p>
                </div>
              )}

              {/* Skills section */}
              {skills.length > 0 && (
                <div className="mb-6">
                  <h3 className="text-sm font-medium text-gray-400 mb-2">
                    Skills
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {skills.map((skill, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-gray-700/50 text-gray-200 rounded-full text-xs font-medium"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Social links and action buttons */}
              <div className="flex items-center justify-between">
                <div className="flex space-x-3">
                  {githubUrl && (
                    <a
                      href={githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-400 hover:text-white transition-colors"
                    >
                      <Github className="h-5 w-5" />
                    </a>
                  )}
                  {linkedinUrl && (
                    <a
                      href={linkedinUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-400 hover:text-blue-400 transition-colors"
                    >
                      <Linkedin className="h-5 w-5" />
                    </a>
                  )}
                </div>

                <Link
                  to={"/chat/" + _id}
                  className="flex items-center px-5 py-2.5 bg-gradient-to-r from-purple-600/80 to-blue-600/80 rounded-xl text-white hover:from-purple-700/80 hover:to-blue-700/80 transition-all shadow-md hover:shadow-blue-500/30"
                >
                  <MessageSquare className="h-4 w-4 mr-2" />
                  Message
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Connections;
