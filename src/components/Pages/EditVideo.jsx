import { useMutation, useQuery } from "@tanstack/react-query";
import {
  fetchVideoById,
  toggleVideo,
  updateThumbnail,
  updateVideoDetails,
} from "../../Api/videos";
import { useNavigate, useParams } from "react-router-dom";
import Loader from "../Loader";
import ReactPlayer from "react-player";
import { useEffect, useState } from "react";
import { Change, DeleteBtn, EditIcon, SaveFileBtn } from "../../assets/Icons";
import { useDispatch } from "react-redux";
import { showPopup } from "../../features/popup.js";

function EditVideo() {
  const [thumbnail, setThumbnail] = useState("");
  const [editBtn, seteditBtn] = useState(false);
  const [editTitle, setEditTitle] = useState("");
  const [editDescription, setEditDescription] = useState("");

  const dispatch = useDispatch();

  const user = JSON.parse(localStorage.getItem("auth"));

  const navigate = useNavigate();

  const { videoid } = useParams();

  // Fetching Video By Id
  const { data: video, isLoading: isVideoLoading } = useQuery({
    queryKey: ["videobyid"],
    queryFn: () => fetchVideoById(videoid),
  });
  useEffect(() => {
    if (!video) return;

    setEditTitle(video.title);
    setEditDescription(video.description);
  }, [video]);

  // Toggle the video
  const { mutate: videoToggle, isPending } = useMutation({
    mutationKey: ["videoToggle"],
    mutationFn: toggleVideo,
  });
  const handleToggle = () => {
    videoToggle(
      { videoId: videoid },
      {
        onSuccess: () => {
          if (video.isPublished) {
            dispatch(
              showPopup({
                component: "Successful_Popup",
                props: {
                  isOpen: true,
                  message: "📥 Video Moved to Archive!",
                },
              })
            );
          } else {
            dispatch(
              showPopup({
                component: "Successful_Popup",
                props: {
                  isOpen: true,
                  message: "📥 Video Moved to Content!",
                },
              })
            );
          }
          navigate(`/studio/content/${user.username}`);
        },
        onError: () => {
          alert("Failed");
        },
      }
    );
  };

  // Update Thumbnail
  const { mutate: updatenewThumbnail, isPending: updateThumbnailPending } =
    useMutation({
      mutationKey: ["updateThumbnail"],
      mutationFn: updateThumbnail,
    });
  useEffect(() => {
    if (!thumbnail) return;

    updatenewThumbnail(
      { videoId: videoid, thumbnail: thumbnail },
      {
        onSuccess: () => {
          dispatch(
            showPopup({
              component: "Successful_Popup",
              props: {
                isOpen: true,
                message: "📸 Thumbnail Updated..!!",
              },
            })
          );
        },
        onError: () => {
          alert("Failed");
        },
      }
    );
  }, [thumbnail]);

  // Update Video Details
  const {
    mutate: updateNewVideoDetails,
    isPending: updateVideoDetailsPending,
  } = useMutation({
    mutationKey: ["updataVideoDetails"],
    mutationFn: updateVideoDetails,
  });

  const handleEdit = () => {
    seteditBtn(!editBtn);

    if (
      editBtn &&
      (editTitle != video.title || editDescription != video.description)
    ) {
      updateNewVideoDetails(
        {
          videoId: videoid,
          title: editTitle,
          description: editDescription,
        },
        {
          onSuccess: () => {
            seteditBtn(!editBtn);
            dispatch(
              showPopup({
                component: "Successful_Popup",
                props: {
                  isOpen: true,
                  message: "☑️ Details Updated..!!",
                },
              })
            );
          },
          onError: () => {
            alert("Failed");
          },
        }
      );
    }
  };

  const handleDelete = () => {
    dispatch(
      showPopup({
        component: "Alert_Popup",
        props: {
          isOpen: true,
          message: "Are you Sure?",
          videoId: videoid,
          actionType: "DELETE_VIDEO",
          btnName: "Delete",
          popMsg: "Delete the Video",
        },
      })
    );
  };

  if (
    isVideoLoading ||
    isPending ||
    updateVideoDetailsPending ||
    updateThumbnailPending
  )
    return <Loader isLoading={true} />;
  if (!video) return <p>No User Found</p>;

  return (
    <div className="p-4">
      <div className="max-w-7xl mx-auto bg-white dark:bg-black p-4 rounded shadow-md">
        <div className="p-3">
          <div className="flex justify-between">
            <h1 className="font-bold">Preview Your Video: </h1>
            <div className="flex flex-wrap items-center justify-end ">
              <label className="relative inline-flex items-center cursor-pointer text-gray-900 dark:text-white gap-3">
                <input
                  type="checkbox"
                  className="sr-only peer"
                  onChange={handleToggle}
                  checked={!video.isPublished}
                />
                <div className="w-16 h-8 bg-red-500 rounded-full peer peer-checked:bg-slate-300 transition-colors duration-200"></div>
                <span className="dot absolute left-1 top-1 w-6 h-6 bg-white rounded-full transition-transform duration-200 ease-in-out peer-checked:translate-x-8"></span>
                Hide the video
              </label>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-5 my-3">
            {/* Thumbnail */}
            <div>
              <label
                htmlFor="thumbnail"
                className="block mb-1 font-medium text-black dark:text-slate-300"
              >
                Thumbnail:
              </label>
              <div
                id="thumbnail"
                className="group relative w-full aspect-[20/10] bg-gray-200 dark:bg-gray-700 rounded-md overflow-hidden"
              >
                <img
                  src={video.thumbnail.url || "/rectangle-32.png"}
                  alt="thumbnail"
                  className="w-full h-full object-cover"
                />
                <label
                  type="button"
                  className="absolute inset-0 flex items-center justify-center bg-black/50 text-white font-medium opacity-0 group-hover:opacity-100 group-hover:cursor-pointer transition-opacity"
                >
                  <Change />
                  <span className="pl-2">Change</span>
                  <input
                    id="dropzone-file"
                    name="thumbnail"
                    type="file"
                    accept="image/*"
                    required
                    className="hidden"
                    onChange={(e) => setThumbnail(e.target.files[0])}
                  />
                </label>
              </div>
            </div>
            {/* Video */}
            <div>
              <label
                htmlFor="playVideo"
                className="block mb-1 font-medium text-black dark:text-slate-300"
              >
                Video File:
              </label>
              <div
                id="playVideo"
                className="group relative w-full aspect-[20/10] bg-gray-200 dark:bg-gray-700 rounded-md overflow-hidden"
              >
                <ReactPlayer
                  src={video.videoFile.url}
                  controls
                  playing={false}
                  width="100%"
                  height="100%"
                  className="rounded-md"
                />
              </div>
            </div>
          </div>
          <div>
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
              className="w-full p-2 mb-3 bg-gray-50 dark:bg-slate-900 text-slate-400 dark:text-gray-400 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-1 transition focus:ring-indigo-500 focus:border-indigo-500 hover:bg-gray-100 dark:hover:bg-gray-800 focus:bg-gray-100 dark:focus:bg-gray-800"
              value={editTitle}
              readOnly={!editBtn}
              onChange={(e) => setEditTitle(e.target.value)}
            />
          </div>
          <div>
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
              className="w-full h-50 p-3 mb-3 bg-gray-50 dark:bg-slate-900 text-slate-400 dark:text-gray-400 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-1 transition focus:ring-indigo-500 focus:border-indigo-500 hover:bg-gray-100 dark:hover:bg-gray-800 focus:bg-gray-100 dark:focus:bg-gray-800"
              readOnly={!editBtn}
              value={editDescription}
              onChange={(e) => setEditDescription(e.target.value)}
            />
          </div>

          <div className="flex justify-end gap-2">
            <button
              type="submit"
              className="w-30 p-3 active:scale-95 transition text-sm text-white rounded-full bg-indigo-500 flex items-center justify-center gap-2"
              onClick={handleEdit}
            >
              {!editBtn ? <EditIcon /> : <SaveFileBtn />}
              <span>{!editBtn ? "Edit" : "Save"}</span>
            </button>

            <button
              type="submit"
              className="w-30 p-3 active:scale-95 transition text-sm text-white rounded-full bg-red-500 flex items-center justify-center gap-2"
              onClick={handleDelete}
            >
              <DeleteBtn />

              <span>Delete</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditVideo;
