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
  if (!feed) return;

  if (feed.length <= 0)
    return (
      <div className="flex flex-col items-center justify-center mt-20 text-center">
        <Users className="h-16 w-16 text-purple-500 animate-pulse mb-4" />
        <h2 className="text-2xl font-bold text-white mb-2">No New Users Yet</h2>
        <p className="text-gray-400 max-w-sm">
          Looks like the dev space is quiet... Check back soon to discover and
          connect with talented developers.
        </p>
      </div>
    );

  return (
    feed && (
      <div>
        <UserCard user={feed[0]} />
      </div>
    )
  );
};

export default Feed;
