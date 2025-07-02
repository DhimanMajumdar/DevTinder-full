import axios from "axios";
import React, { useEffect } from "react";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addFeed } from "../utils/feedSlice";
import UserCard from "./UserCard";
import { Users } from "lucide-react";

const Feed = () => {
  const feed = useSelector((store) => store.feed);
  const dispatch = useDispatch();

  const getFeed = async () => {
    if (feed) return;
    try {
      const res = await axios.get(BASE_URL + "/feed", {
        withCredentials: true,
      });
      console.log(res);
      dispatch(addFeed(res?.data));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getFeed();
  }, []);

  if (feed === null || feed === undefined) return null;

  if (feed.length <= 0)
    return (
      <div className="flex flex-col items-center justify-center mt-20 text-center px-4">
        <Users className="h-16 w-16 text-purple-500 animate-pulse mb-4" />
        <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2">
          No New Users Yet
        </h2>
        <p className="text-gray-400 max-w-sm sm:max-w-md">
          Looks like the dev space is quiet... Check back soon to discover and
          connect with talented developers.
        </p>
      </div>
    );

  return (
    <div className="mt-10 px-4 sm:px-6 md:px-10 flex justify-center">
      <div className="w-full max-w-xl">
        <UserCard user={feed[0]} />
      </div>
    </div>
  );
};

export default Feed;
