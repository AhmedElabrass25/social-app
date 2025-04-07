"use client";
import React, { useEffect } from "react";
import ProtectedRoute from "../_components/ProtectedRoute";
import { jwtDecode } from "jwt-decode";
import { useDispatch, useSelector } from "react-redux";
import { getUserPosts } from "../_redux/postsSlice";
import Loading from "../loading";
import SinglePost from "../_components/SinglePost";

const Profile = () => {
  const dispatch = useDispatch();
  const { isLoading, isError, userPosts } = useSelector((state) => state.posts);
  useEffect(() => {
    const token = localStorage.getItem("socialToken");
    const userId = token !== null ? jwtDecode(token).user : null;
    if (userId) {
      dispatch(getUserPosts(userId));
    }
  }, [dispatch]);
  return (
    <ProtectedRoute>
      <section className="w-full">
        {isLoading && <Loading />}
        {/* display the error */}
        {isError && (
          <div className="w-full flex items-center justify-center">
            <p className="text-lg bg-red-500 px-4 py-2 text-white">{isError}</p>
          </div>
        )}
        {/* If there is no posts */}
        {userPosts.length === 0 && !isLoading && (
          <div className="w-full text-center text-xl py-8 bg-black/80 text-white">
            <p>There is no posts to display it .</p>
          </div>
        )}
        {/* Dsiplay all posts */}
        <div className="container">
          <div className="row flex items-center justify-center flex-col">
            {userPosts.length > 0 &&
              [...userPosts].reverse().map((post) => {
                return <SinglePost key={post?._id} post={post} />;
              })}
          </div>
        </div>
      </section>
    </ProtectedRoute>
  );
};

export default Profile;
