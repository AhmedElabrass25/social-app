"use client";
import React, { useEffect, useState } from "react";
import ProtectedRoute from "./ProtectedRoute";
import Image from "next/image";
import { HiOutlineDotsVertical } from "react-icons/hi";
import { MdComment } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { FaDeleteLeft } from "react-icons/fa6";

import {
  addComment,
  editComment,
  getPostComment,
} from "../_redux/commentSlice";
import { jwtDecode } from "jwt-decode";
// ====================================
const PostDetails = ({ post }) => {
  const token = `${localStorage.getItem("socialToken")}`;
  const decoded = jwtDecode(token);
  const userId = decoded?.user;
  const [currentEdit, setCurrentEdit] = useState({
    commentId: null,
    content: "",
  });
  const [closeModal, setCloseModal] = useState(true);
  const [openDrop, setOpenDrop] = useState(false);
  const { _id, image, body, createdAt, user } = post;
  const dispatch = useDispatch();
  const comments =
    useSelector((state) => state.comments.postComments[post._id]) || [];
  const [commentContent, setCommentContent] = useState("");
  const { isLoading } = useSelector((state) => state.comments);
  // === Add The Comment================
  const handleSubmit = (e) => {
    e.preventDefault();
    if (commentContent === "") {
      alert("Please enter your comment");
    } else {
      dispatch(
        addComment({
          content: commentContent,
          postId: post?._id,
        })
      );
      e.target.reset();
    }
  };
  // === Edit The Comment=================
  const editTheComment = (commentId, content) => {
    setCurrentEdit({
      commentId,
      content,
    });
    setCloseModal(false);
  };
  // === Complete Edit The Comment========
  const completEditComment = (e) => {
    e.preventDefault();
    setCloseModal(true);
    dispatch(editComment(currentEdit));
  };
  useEffect(() => {
    if (post?._id) {
      dispatch(getPostComment(post._id));
    }
  }, [dispatch, post?._id]);
  // =====================================
  return (
    <ProtectedRoute>
      <section className="bg-white border border-gray-200 rounded-lg shadow-sm mb-5 w-[600px]">
        {/* Post Header */}
        <div className="head w-full mb-1 flex items-center justify-between p-3">
          {/* ======post details======= */}
          <div className="left flex items-center gap-3">
            <Image
              src={image ? image : "/social-media.png"}
              width={60}
              height={60}
              className="rounded-full w-14 h-14 object-cover object-top"
              alt="post Image"
            />
            <div>
              <h1 className="text-black">{user?.name}</h1>
              <p className="text-black">{createdAt?.split("T")[0]}</p>
            </div>
          </div>
          <div className="right">
            <HiOutlineDotsVertical className=" w-12 h-12 rounded-full p-3 text-black cursor-pointer hover:bg-slate-200/40 transition-all duration-200" />
          </div>
        </div>
        {/* Post Body */}
        <div className=" w-full px-5 pb-5">
          {/* ======Post Content===== */}
          <h5 className="mb-5 ml-3 text-xl font-normal tracking-tight text-gray-900">
            {body}
          </h5>
          {/* ======Post Image===== */}
          <Image
            style={{ width: "100%" }}
            className="object-contain object-top shadow-md mb-6 md:w-[600px] border border-slate-300/30"
            width={600}
            height={400}
            src={image ? image : "/social-media.png"}
            alt="cardImage"
          />
          <div className="">
            {/* Comments */}
            <div className="w-full">
              {/* Toggle buton to Dropdown menu */}
              <button
                onClick={() => setOpenDrop(!openDrop)}
                id="dropdownDividerButton"
                data-dropdown-toggle="dropdownDivider"
                className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center justify-center"
                type="button"
              >
                <MdComment
                  className={`text-2xl transition-transform duration-300 ${
                    !openDrop ? "rotate-180" : "rotate-0"
                  }`}
                />
              </button>
              {/* Dropdown menu */}
              <div
                id="dropdownDivider"
                className={`z-10 w-full ${
                  openDrop ? "block" : "hidden"
                } bg-white divide-y divide-gray-100 rounded-lg shadow-sm`}
              >
                {/* ======= This form To Add Comment ======= */}
                <form
                  onSubmit={(e) => {
                    handleSubmit(e);
                  }}
                  className="w-full my-5 p-3 flex items-center justify-between"
                >
                  <input
                    type="text"
                    onChange={(e) => setCommentContent(e.target.value.trim())}
                    placeholder="comment"
                    className="px-4 py-2 outline-none border border-slate-200/80 rounded-md"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2 capitalize bg-blue-500 text-white rounded-md"
                  >
                    {isLoading ? "Adding..." : "Add"}
                  </button>
                </form>
                {/* ======= display the Comments ======= */}
                <ul
                  className="w-full mt-3 text-sm text-gray-700"
                  aria-labelledby="dropdownDividerButton"
                >
                  {comments.length > 0 &&
                    comments.map((comment) => {
                      return (
                        <li
                          key={comment?._id}
                          className="w-full p-3 border border-slate-300/30 mb-3 rounded-lg bg-gray-100"
                        >
                          {/* comment details */}
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              {/* image of commnet */}
                              <div className="w-12 h-12 rounded-full bg-slate-500 text-white text-xl flex items-center justify-center">
                                {comment?.commentCreator?.name.charAt(0)}
                              </div>
                              {/* ======Comment Details */}
                              <div className="commentDetails">
                                <h2 className="text-sm">
                                  {comment?.commentCreator?.name}
                                </h2>
                                <p className="text-sm">
                                  {comment?.createdAt?.split("T")[0]}
                                </p>
                              </div>
                            </div>
                            {/* commnet actions */}
                            {userId === comment?.commentCreator?._id && (
                              <div className="flex items-center gap-3">
                                <button
                                  onClick={() => {
                                    editTheComment(
                                      comment?._id,
                                      comment?.content
                                    );
                                  }}
                                  className="px-2 py-1 text-white bg-yellow-600 capitalize text-[15px] rounded-md"
                                >
                                  edit
                                </button>
                              </div>
                            )}
                          </div>
                          {/* comment body */}
                          <div className="mt-2 pl-4">
                            <p className="text-xl">{comment?.content}</p>
                          </div>
                        </li>
                      );
                    })}
                </ul>
              </div>
            </div>

            {/* Comments */}
          </div>
        </div>
      </section>
      {/* ================This Modal to edit the comment======== */}
      {!closeModal && (
        <section className="fixed left-0 top-0 bottom-0 right-0 flex items-center justify-center z-50 bg-black/40">
          {/* This Icon To close the modal */}
          <span
            onClick={() => setCloseModal(true)}
            className="absolute right-10 top-10 bg-white p-2 text-black text-3xl cursor-pointer"
          >
            <FaDeleteLeft className="" />
          </span>
          <div className="container flex items-center justify-center">
            <div className="card">
              {/* This Form To Edit The Comment */}
              <form
                onSubmit={(e) => {
                  completEditComment(e);
                }}
                className="w-fit my-5 px-10 py-6 flex items-center justify-center flex-col bg-white gap-8"
              >
                <input
                  type="text"
                  onChange={(e) => {
                    setCurrentEdit({
                      ...currentEdit,
                      content: e.target.value.trim(), // تحديث المحتوى المعدل
                    });
                  }}
                  value={currentEdit.content}
                  placeholder="edit comment...."
                  className="px-4 py-2 outline-none border border-slate-200/80 rounded-md"
                  required
                />
                <button
                  type="submit"
                  className="px-4 py-2 capitalize bg-blue-500 text-white rounded-md"
                >
                  {"Edit"}
                </button>
              </form>
            </div>
          </div>
        </section>
      )}
    </ProtectedRoute>
  );
};

export default PostDetails;
