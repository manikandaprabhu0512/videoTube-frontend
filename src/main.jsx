import React from "react";
import "./index.css";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App";
import { Provider } from "react-redux";
import store from "./store/store.js";
import Videos from "./components/Home/Videos";
import VideoGramLayout from "./layouts/VideoGramLayout";
import WatchCard from "./components/Cards/WatchCard";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import UploadVideo from "./components/Pages/UploadVideo";
import UploadLayout from "./layouts/UploadLayout";
import CreaterLayout from "./layouts/CreaterLayout";
import LoadUserVideos from "./utils/LoadUserVideos";
import EditorLayout from "./layouts/EditorLayout";
import WatchHistory from "./components/Pages/WatchHistory";
import ProtectedRoute from "./components/Authentication";
import SignUp from "./components/Pages/SignUp";
import SettingsOptions from "./components/Pages/SettingsOptions";
import Settings from "./components/Pages/Settings";
import ChangePassword from "./components/Pages/ChangePassword";
import Login from "./components/Login/Login.jsx";
import UserProfile from "./components/Pages/UserProfile.jsx";
import PlayLists from "./components/Pages/PlayLists.jsx";
import UserPlaylists from "./components/Pages/UserPlaylists.jsx";
import CreatePlaylist from "./components/Pages/CreatePlaylist.jsx";
import PlaylistViewPage from "./components/Pages/PlaylistViewPage.jsx";
import ErrorPage from "./components/Pages/NotFoundPage.jsx";

const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "",
        element: (
          <ProtectedRoute>
            <VideoGramLayout />
          </ProtectedRoute>
        ),
        children: [
          { path: "", element: <Videos /> },
          { path: "watch-history", element: <WatchHistory /> },
          { path: "settings", element: <SettingsOptions /> },
          { path: "feed/playlists", element: <PlayLists /> },
          { path: "playlist/:playlistid", element: <PlaylistViewPage /> },
        ],
      },
      {
        path: "account/signup",
        element: <SignUp />,
      },
      {
        path: "/settings/profile/:username",
        element: (
          <ProtectedRoute>
            <Settings />
          </ProtectedRoute>
        ),
      },
      {
        path: "change-password",
        element: (
          <ProtectedRoute>
            <ChangePassword />
          </ProtectedRoute>
        ),
      },
      {
        path: "user/:channelname",
        element: (
          <ProtectedRoute>
            <UserProfile />
          </ProtectedRoute>
        ),
      },
      {
        path: "watch",
        element: (
          <ProtectedRoute>
            <VideoGramLayout />
          </ProtectedRoute>
        ),
        children: [{ path: ":videoid", element: <WatchCard /> }],
      },
      {
        path: "upload",
        element: (
          <ProtectedRoute>
            <UploadLayout />
          </ProtectedRoute>
        ),
        children: [{ path: "video", element: <UploadVideo /> }],
      },
      {
        path: "studio",
        element: (
          <ProtectedRoute>
            <CreaterLayout />
          </ProtectedRoute>
        ),
        children: [
          {
            path: "content/:username",
            element: (
              <LoadUserVideos isPublished={true} header={"Your Videos: "} />
            ),
          },
          {
            path: "archive/:username",
            element: (
              <LoadUserVideos
                isPublished={false}
                header={"Archived Videos: "}
              />
            ),
          },
          {
            path: "playlists/:username",
            element: <UserPlaylists />,
          },
          {
            path: "create-playlist/:username",
            element: <CreatePlaylist />,
          },
        ],
      },
      {
        path: "edit/:videoid",
        element: (
          <ProtectedRoute>
            <EditorLayout />
          </ProtectedRoute>
        ),
      },
      {
        path: "*",
        element: <ErrorPage />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </Provider>
);
