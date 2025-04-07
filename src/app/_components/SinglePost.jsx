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
  deleteComment,
  editComment,
  getPostComment,
} from "../_redux/commentSlice";
import { deletePost, editPost } from "../_redux/postsSlice";
// ==============================================
const SinglePost = ({ post }) => {
  const [loading, setLoading] = useState(false);
  const [currentEdit, setCurrentEdit] = useState({
    commentId: null,
    content: "",
  });
  const [closePostModal, setClosePostModal] = useState(false);
  const [commentContent, setCommentContent] = useState("");
  const [openBar, setOpenBar] = useState(false);
  const [closeModal, setCloseModal] = useState(true);
  const [openDrop, setOpenDrop] = useState(false);
  const { _id, image, body, createdAt, user } = post;
  const dispatch = useDispatch();
  // =================================
  const comments =
    useSelector((state) => state.comments.postComments[post._id]) || [];
  const { isLoading } = useSelector((state) => state.comments);
  // ===Add comment function===========
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
  // ===Delete The Comment function====
  const deleteTheComment = (commentId, postId) => {
    let confirmation = confirm("Are you sure to delete this comment ? ");
    if (confirmation) {
      dispatch(deleteComment({ commentId: commentId, postId: postId }));
    }
  };
  // ===Edit The Comment function======
  const editTheComment = (commentId, content) => {
    setCurrentEdit({
      commentId,
      content,
    });
    setCloseModal(false);
  };
  //==complete Edit Comment function===
  const completEditComment = (e) => {
    e.preventDefault();
    setCloseModal(true);
    dispatch(editComment(currentEdit));
  };
  // ===Delete The Post function=======
  const deleteThePost = (postId) => {
    let confirmation = confirm("Are you sure to delete this post ?");
    if (confirmation) {
      dispatch(deletePost(postId));
    }
  };
  // ===Complete Edit Post function====
  const completeEditThePost = async (e) => {
    e.preventDefault();
    let form = e.target;
    let formData = new FormData();
    formData.append("body", form.body.value.trim());
    formData.append("image", form.image.files[0]);
    const file = form.image.files[0];
    if (file && file.size > 5000000) {
      // 5MB size limit
      alert("File size should be less than 5MB.");
      return;
    }
    dispatch(editPost({ postId: post?._id, formData }));
    setClosePostModal(false);
  };
  // ==================================
  useEffect(() => {
    if (post?._id) {
      dispatch(getPostComment(post._id));
    }
  }, [dispatch, post?._id]);
  // =================================
  return (
    <ProtectedRoute>
      <section className="bg-white border border-gray-200 rounded-lg shadow-sm mb-5 w-full md:w-[600px]">
        {/* ========Post Header========= */}
        <div className="head w-full mb-1 flex items-center justify-between p-3">
          {/* The details of the post */}
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
          {/* ======Display edit & delete buttons   */}
          <div className="right relative">
            <HiOutlineDotsVertical
              onClick={() => setOpenBar(!openBar)}
              className=" w-12 h-12 rounded-full p-3 text-black cursor-pointer hover:bg-slate-200/40 transition-all duration-200"
            />
            {/* post actions */}
            {openBar && (
              <div className="absolute right-[45px] top-[9px] bg-white px-4 py-6 flex justify-center items-center gap-3 shadow-lg border border-slate-300/40">
                <button
                  onClick={() => deleteThePost(post?._id)}
                  className="text-lg px-3 py-2 text-white bg-red-500 capitalize rounded-md"
                >
                  delete
                </button>
                <button
                  onClick={() => setClosePostModal(true)}
                  className="text-lg px-3 py-2 text-white bg-yellow-500 capitalize rounded-md"
                >
                  edit
                </button>
              </div>
            )}
          </div>
        </div>
        {/* Display the Post */}
        <div className=" w-full px-2 pb-5">
          {/* ============Post Dody=========== */}
          <h5 className="mb-5 ml-3 text-xl font-normal tracking-tight text-gray-900">
            {body}
          </h5>
          {/* ============Post Image=========== */}
          <Image
            style={{ width: "100%" }}
            className="object-contain object-top shadow-md mb-6 md:w-[600px] border border-slate-300/30"
            width={600}
            height={400}
            src={image ? image : "/social-media.png"}
            alt="cardImage"
          />
          <div className="">
            {/*============ Comments ========== */}
            <div className="w-full">
              {/* The Toggle button of drop down menu */}
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
              {/* Dropdown menu To Display & Add comment*/}
              <div
                id="dropdownDivider"
                className={`z-10 w-full ${
                  openDrop ? "block" : "hidden"
                } bg-white divide-y divide-gray-100 rounded-lg shadow-sm`}
              >
                {/* ======= Form To Add Comment ======= */}
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
                {/* ======= Display The  Comments ======= */}
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
                            <div className="flex items-center gap-3">
                              <button
                                onClick={() =>
                                  deleteTheComment(comment?._id, post?._id)
                                }
                                className="px-3 py-2 text-white bg-red-800 capitalize text-[15px] rounded-md"
                              >
                                {"Delete"}
                              </button>
                              <button
                                onClick={() => {
                                  editTheComment(
                                    comment?._id,
                                    comment?.content
                                  );
                                }}
                                className="px-3 py-2 text-white bg-yellow-600 capitalize text-[15px] rounded-md"
                              >
                                edit
                              </button>
                            </div>
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
      {/* ========== Edit Clomment Modal=============== */}
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
                {/* Commnet Content */}
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
                  name="commentText"
                />
                {/* Submit BUtton   */}
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
      {/* ========== Edit post Modal=============== */}
      {closePostModal && (
        <section className="fixed left-0 top-0 bottom-0 right-0 flex items-center justify-center z-50 bg-black/40">
          {/* This Icon To close the modal */}
          <span
            onClick={() => setClosePostModal(false)}
            className="absolute right-10 top-10 bg-white p-2 text-black text-3xl cursor-pointer"
          >
            <FaDeleteLeft className="" />
          </span>
          <div className="container flex items-center justify-center">
            <div className="card">
              {/* This Form To Edit The Post */}
              <form
                onSubmit={(e) => completeEditThePost(e)}
                className="w-full md:w-[600px] mt-14 bg-white shadow-lg px-5 py-10 rounded-lg border border-slate-200/20"
              >
                <h2 className="mb-5 text-center text-2xl capitalize font-semibold">
                  Add your post
                </h2>
                {/* ======= Body Input ========= */}
                <div className="mb-5">
                  <label
                    htmlFor="text"
                    className="block mb-2 text-sm font-medium text-gray-900"
                  >
                    Post Body
                  </label>
                  <input
                    type="text"
                    id="text"
                    defaultValue={post?.body}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Description"
                    name="body"
                    required
                  />
                </div>
                {/* ======= Image Input ========= */}
                <div className="mb-5">
                  <label
                    htmlFor="image"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Your Image
                  </label>
                  <input
                    type="file"
                    id="image"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    name="image"
                    required
                  />
                </div>
                {/* ======= Submit Button ========= */}
                <div className="w-full flex items-center justify-center">
                  <button
                    type="submit"
                    className="text-white bg-yellow-600 hover:bg-yellow-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-lg w-full sm:w-[200px] px-5 py-2.5 flex items-center justify-center"
                  >
                    {loading ? (
                      <div role="status">
                        <svg
                          aria-hidden="true"
                          className="w-8 h-8 text-gray-200 animate-spin fill-blue-600"
                          viewBox="0 0 100 101"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                            fill="currentColor"
                          />
                          <path
                            d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                            fill="currentFill"
                          />
                        </svg>
                      </div>
                    ) : (
                      "Edit Post"
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </section>
      )}
    </ProtectedRoute>
  );
};

export default SinglePost;
