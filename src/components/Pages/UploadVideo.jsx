import { useMutation } from "@tanstack/react-query";
import { publishVideo } from "../../Api/videos.js";
import { useDispatch } from "react-redux";
import { showPopup } from "../../features/popup.js";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Loader from "../Loader";

function UploadVideo() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [videoFile, setVideoFile] = useState(null);
  const [thumbnail, setThumbnail] = useState(null);
  const [error, setError] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { mutate: uploadAVideo, isPending } = useMutation({
    mutationFn: publishVideo,
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!title) {
      setError("Title is required");
      return;
    }
    if (!description) {
      setError("Description is required");
      return;
    }
    if (!thumbnail) {
      setError("Thumbnail is required");
      return;
    }
    if (!videoFile) {
      setError("Video file is required");
      return;
    }

    uploadAVideo(
      { title, description, videoFile, thumbnail },
      {
        onSuccess: () => {
          setTitle("");
          setDescription("");
          setVideoFile(null);
          setThumbnail(null);
          dispatch(
            showPopup({
              component: "Successful_Popup",
              props: {
                isOpen: true,
                message: "🎉 Video uploaded successfully!",
              },
            })
          );
          navigate("/");
        },
        onError: () => {
          alert("Failed");
        },
      }
    );
  };

  useEffect(() => {
    if (error) {
      //Always dispatch shouldn't be called inside JSX. Call it using UseEffect
      dispatch(
        showPopup({
          component: "SomethingWentWrong_Popup",
          props: {
            isOpen: true,
            message: error,
          },
        })
      );
    }
  }, [error, dispatch]);

  if (isPending) return <Loader isLoading={true} />;

  return (
    <>
      <div className="flex justify-center">
        <div className="flex justify-center items-center p-4 w-full">
          <div className="w-full">
            <h1 className="mb-4">Upload Your Video: </h1>
            <form onSubmit={handleSubmit}>
              <label
                htmlFor="title"
                className="block mb-1 font-medium text-black dark:text-slate-300"
              >
                Title:
              </label>
              <input
                type="text"
                id="title"
                name="title"
                placeholder="Title"
                className="w-full p-2 mb-3 bg-gray-50 dark:bg-slate-900 text-slate-400 dark:text-gray-400 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-1 transition focus:ring-indigo-500 focus:border-indigo-500 hover:bg-gray-100 dark:hover:bg-gray-800 focus:bg-gray-100 dark:focus:bg-gray-800"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />

              <label
                htmlFor="description"
                className="block mb-1 font-medium text-black dark:text-slate-300"
              >
                Description:
              </label>
              <textarea
                type="text"
                id="description"
                name="description"
                placeholder="Descripition"
                className="w-full p-2 mb-3 bg-gray-50 dark:bg-slate-900 text-slate-400 dark:text-gray-400 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-1 transition focus:ring-indigo-500 focus:border-indigo-500 hover:bg-gray-100 dark:hover:bg-gray-800 focus:bg-gray-100 dark:focus:bg-gray-800"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />

              <span className="block mb-1 font-medium text-black dark:text-slate-300">
                Video File:
              </span>
              <div className="flex items-center justify-center w-full">
                <label
                  htmlFor="dropzone-video"
                  className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:bg-gray-900 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-800"
                >
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <svg
                      className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 20 16"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                      />
                    </svg>
                    {!videoFile ? (
                      <div className="flex flex-col justify-center items-center">
                        <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                          <span className="font-semibold">Click to upload</span>{" "}
                          or drag and drop
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          MP4
                        </p>
                      </div>
                    ) : (
                      <div className="flex flex-col justify-center items-center">
                        <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                          📹 {videoFile.name}
                        </p>
                      </div>
                    )}
                  </div>
                  <input
                    id="dropzone-video"
                    name="videoFile"
                    type="file"
                    className="hidden"
                    accept="video/*"
                    onChange={(e) => {
                      if (e.target.files && e.target.files[0]) {
                        setVideoFile(e.target.files[0]); // ✅ store actual File object
                      }
                    }}
                  />
                </label>
              </div>

              <span className="block mb-1 font-medium text-black dark:text-slate-300">
                Thumbnail:
              </span>
              <div className="flex items-center justify-center w-full">
                <label
                  htmlFor="dropzone-file"
                  className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:bg-gray-900 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-800"
                >
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <svg
                      className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 20 16"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                      />
                    </svg>
                    {!thumbnail ? (
                      <div className="flex flex-col justify-center items-center">
                        <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                          <span className="font-semibold">Click to upload</span>{" "}
                          or drag and drop
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          PNG, JPG, JPEG
                        </p>
                      </div>
                    ) : (
                      <div className="flex flex-col justify-center items-center">
                        <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                          📁 Selected: {thumbnail.name}
                        </p>
                      </div>
                    )}
                  </div>
                  <input
                    id="dropzone-file"
                    name="thumbnail"
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => setThumbnail(e.target.files[0])}
                  />
                </label>
              </div>
              <div className="flex justify-end mt-2">
                <button
                  type="submit"
                  className="w-40 py-3 active:scale-95 transition text-sm text-white rounded-full bg-indigo-500"
                >
                  <p className="mb-0.5">
                    {isPending ? "Uploading..." : "Publish now"}
                  </p>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default UploadVideo;
