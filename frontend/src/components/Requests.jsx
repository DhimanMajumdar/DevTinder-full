import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addRequests, removeRequest } from "../utils/requestSlice";
import { useEffect, useState } from "react";
import {
  User,
  Users,
  Clock,
  X,
  Check,
  MessageSquare,
  MoreHorizontal,
} from "lucide-react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const Requests = () => {
  const requests = useSelector((store) => store.requests);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [processingId, setProcessingId] = useState(null);

  const reviewRequest = async (status, _id) => {
    try {
      setProcessingId(_id);
      await axios.post(
        BASE_URL + "/request/review/" + status + "/" + _id,
        {},
        { withCredentials: true }
      );
      dispatch(removeRequest(_id));
    } catch (err) {
      setError("Failed to process request. Please try again.");
      console.error(err);
    } finally {
      setProcessingId(null);
    }
  };

  const fetchRequests = async () => {
    try {
      setLoading(true);
      const res = await axios.get(BASE_URL + "/user/requests/received", {
        withCredentials: true,
      });
      dispatch(addRequests(res.data.data));
    } catch (err) {
      setError("Failed to load connection requests. Please try again later.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
        <div className="flex flex-col items-center mb-10">
          <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-500 mb-2">
            Connection Requests
          </h1>
          <div className="w-24 h-1 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full"></div>
        </div>

        <div className="space-y-6">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="bg-gray-800/50 rounded-xl p-6 border border-gray-700/50"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <Skeleton circle width={72} height={72} />
                  <div>
                    <Skeleton width={160} height={24} className="mb-2" />
                    <Skeleton width={120} height={16} />
                  </div>
                </div>
                <div className="flex space-x-3">
                  <Skeleton width={80} height={40} className="rounded-lg" />
                  <Skeleton width={80} height={40} className="rounded-lg" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12 flex flex-col items-center justify-center text-center">
        <div className="bg-gradient-to-br from-red-900/30 to-red-800/20 p-8 rounded-xl border border-red-800/50">
          <h2 className="text-2xl font-bold text-white mb-3">
            Error Loading Requests
          </h2>
          <p className="text-gray-300 mb-6">{error}</p>
          <button
            onClick={fetchRequests}
            className="px-6 py-2 bg-gradient-to-r from-red-600 to-red-700 rounded-lg text-white hover:from-red-700 hover:to-red-800 transition-all"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  if (!requests || requests.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12 flex flex-col items-center justify-center text-center">
        <div className="p-8 bg-gray-800/50 rounded-xl border border-gray-700/50">
          <Users className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-white mb-2">
            No Pending Requests
          </h2>
          <p className="text-gray-400 mb-6">
            You don't have any connection requests at this time.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
      <div className="flex flex-col items-center mb-10">
        <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-500 mb-2">
          Connection Requests
        </h1>
        <div className="w-24 h-1 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full"></div>
      </div>

      <div className="space-y-6">
        {requests.map((request) => {
          const { _id, createdAt } = request;
          const { firstName, lastName, photoUrl, title, about } =
            request.fromUserId;

          return (
            <div
              key={_id}
              className="bg-gradient-to-br from-gray-800/50 to-gray-900/30 rounded-xl p-6 border border-gray-700/50 hover:border-purple-500/30 transition-all"
            >
              <div className="flex items-center justify-between">
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
                  </div>
                  <div>
                    <h2 className="font-bold text-white text-lg">
                      {firstName} {lastName}
                    </h2>
                    {title && <p className="text-gray-400 text-sm">{title}</p>}
                    <div className="flex items-center text-gray-400 text-xs mt-1">
                      <Clock className="h-3 w-3 mr-1" />
                      <span>
                        Requested {new Date(createdAt).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex space-x-3">
                  <button
                    onClick={() => reviewRequest("rejected", _id)}
                    disabled={processingId === _id}
                    className={`px-5 py-2 rounded-lg flex items-center space-x-2 ${
                      processingId === _id
                        ? "bg-gray-700 text-gray-400"
                        : "bg-gradient-to-r from-red-600/80 to-red-700/80 text-white hover:from-red-700/80 hover:to-red-800/80"
                    } transition-all`}
                  >
                    {processingId === _id ? (
                      <span className="animate-spin h-4 w-4 border-2 border-gray-400 border-t-transparent rounded-full"></span>
                    ) : (
                      <>
                        <X className="h-4 w-4" />
                        <span>Decline</span>
                      </>
                    )}
                  </button>

                  <button
                    onClick={() => reviewRequest("accepted", _id)}
                    disabled={processingId === _id}
                    className={`px-5 py-2 rounded-lg flex items-center space-x-2 ${
                      processingId === _id
                        ? "bg-gray-700 text-gray-400"
                        : "bg-gradient-to-r from-green-600/80 to-green-700/80 text-white hover:from-green-700/80 hover:to-green-800/80"
                    } transition-all`}
                  >
                    {processingId === _id ? (
                      <span className="animate-spin h-4 w-4 border-2 border-gray-400 border-t-transparent rounded-full"></span>
                    ) : (
                      <>
                        <Check className="h-4 w-4" />
                        <span>Accept</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              {about && (
                <div className="mt-4 pl-20">
                  <p className="text-gray-300 text-sm line-clamp-2">{about}</p>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Requests;
