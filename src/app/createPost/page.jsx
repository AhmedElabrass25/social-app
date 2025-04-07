"use client";
import React, { useState } from "react";
import ProtectedRoute from "../_components/ProtectedRoute";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

const CreatePost = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault();
    let form = e.target;
    let formData = new FormData();
    formData.append("body", form.body.value);
    formData.append("image", form.image.files[0]);
    try {
      setLoading(true);
      const { data } = await axios.post(
        "https://linked-posts.routemisr.com/posts",
        formData,
        {
          headers: { token: `${localStorage.getItem("socialToken")}` },
        }
      );
      toast.success(data?.message + "," + "post is added", {
        position: "top-center",
      });
      router.push("/profile");
    } catch (error) {
      toast.success(error?.message + "," + " post is added", {
        position: "top-center",
      });
    } finally {
      setLoading(false);
    }
  };
  return (
    <ProtectedRoute>
      <section>
        <div className="container">
          <div className="row flex items-center justify-center">
            <form
              onSubmit={handleSubmit}
              className="w-full md:w-[600px] mt-14 bg-white shadow-lg px-5 py-10 rounded-lg border border-slate-200/20"
            >
              <h2 className="mb-5 text-center text-2xl capitalize font-semibold">
                Add your post
              </h2>
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
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Description"
                  name="body"
                  required
                />
              </div>
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
              <div className="w-full flex items-center justify-center">
                <button
                  type="submit"
                  className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-lg w-full sm:w-[200px] px-5 py-2.5 flex items-center justify-center"
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
                    "Add Post"
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>
    </ProtectedRoute>
  );
};

export default CreatePost;
