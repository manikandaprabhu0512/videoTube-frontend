import React from "react";
import "./index.css";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App";
import { Login } from "./components";
import { Provider } from "react-redux";
import store from "./store/store";
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

const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "",
        element: <Login />,
      },
      {
        path: "account/signup",
        element: <SignUp />,
      },
      {
        path: ":username",
        element: (
          <ProtectedRoute>
            <VideoGramLayout />
          </ProtectedRoute>
        ),
        children: [
          { path: "", element: <Videos /> },
          { path: "watch-history", element: <WatchHistory /> },
          { path: "settings", element: <SettingsOptions /> },
        ],
      },
      { path: ":username/settings/profile", element: <Settings /> },
      { path: "change-password", element: <ChangePassword /> },
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
