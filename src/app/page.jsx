"use client";
import React, { useEffect } from "react";
import ProtectedRoute from "./_components/ProtectedRoute";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { getAllPosts } from "./_redux/postsSlice";
import Loading from "./loading";
import PostDetails from "./_components/PostDetails";

const Home = () => {
  const { allPosts, isLoading, isError } = useSelector((state) => state.posts);
  const router = useRouter();
  const dispatch = useDispatch();
  useEffect(() => {
    if (localStorage.getItem("socialToken")) {
      router.push("/");
      dispatch(getAllPosts());
    } else {
      router.push("/login");
    }
  }, [router, dispatch]);
  return (
    <ProtectedRoute>
      {isLoading && <Loading />}
      {isError && (
        <div className="w-full flex items-center justify-center">
          <p className="text-lg bg-red-500 px-4 py-2 text-white">{isError}</p>
        </div>
      )}

      <section className="text-red-500">
        <div className="container">
          <div className="row flex items-center justify-between flex-col">
            {allPosts?.map((post) => {
              return <PostDetails key={post?.id} post={post} />;
            })}
          </div>
        </div>
      </section>
    </ProtectedRoute>
  );
};

export default Home;
