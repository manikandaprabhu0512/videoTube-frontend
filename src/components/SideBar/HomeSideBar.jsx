import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import {
  HomeIcon,
  VideoCameraIcon,
  ClockIcon,
  UserIcon,
  RectangleStackIcon,
  UserCircleIcon,
  Cog6ToothIcon,
  RectangleGroupIcon,
  HandThumbUpIcon,
  ArrowDownTrayIcon,
  Bars3Icon,
  ChevronDownIcon,
} from "@heroicons/react/24/outline";
import { useDispatch, useSelector } from "react-redux";
import { toggleSideBar } from "../../features/sidebar";
import { useChannelSubscribed } from "../hooks/useSubscription";

export default function Sidebar() {
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);

  const Open = useSelector((state) => state.sidebar.visible);
  const user = JSON.parse(localStorage.getItem("auth"));

  const { data: subscribedChannels } = useChannelSubscribed({ id: user?._id });

  return (
    <>
      {/* Tab */}
      <aside
        className={`hidden md:block lg:hidden top-0 left-0 z-40 w-28 bg-white dark:bg-[#0f0f0f]
        transform transition-transform duration-300 overflow-x-hidden
        ${Open ? "translate-x-0" : "-translate-x-full sm:translate-x-0"}`}
        aria-label="Sidebar"
      >
        <div className="pl-4 py-2 h-full flex flex-col gap-4 overflow-y-auto">
          <nav className="flex flex-col gap-4">
            <SidebarItemVertical
              icon={<HomeIcon className="h-6 w-6" />}
              label="Home"
              to="/"
              className="flex flex-col text-md items-center gap-1"
            />
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="flex flex-col text-md items-center gap-1 p-2 hover:bg-gray-100 rounded-lg w-full"
            >
              <RectangleGroupIcon className="h-6 w-6" />
              <span className="flex items-center gap-1">
                Subscriptions
                <ChevronDownIcon
                  className={`h-3 w-3 transition-transform ${
                    isOpen ? "rotate-180" : ""
                  }`}
                />
              </span>
            </button>
            {isOpen && (
              <div className="flex flex-col items-center bg-gray-50 py-2 gap-2 text-sm">
                <Link to="/subscriptions/plans" className="hover:text-blue-600">
                  Plans
                </Link>
                <Link
                  to="/subscriptions/billing"
                  className="hover:text-blue-600"
                >
                  Billing
                </Link>
              </div>
            )}
            <SidebarItemVertical
              icon={<ClockIcon className="h-6 w-6" />}
              label="History"
              to="watch-history"
              className="flex flex-col text-md items-center gap-1"
            />
            <SidebarItemVertical
              icon={<UserCircleIcon className="h-6 w-6" />}
              label="You"
              to={`/settings/profile/${user.username}`}
              className="flex flex-col text-md items-center gap-1"
            />
          </nav>
        </div>
      </aside>

      {/* Desktop */}
      <aside
        className={`lg:block top-0 left-0 z-40 w-50 xl:w-58 h-full bg-white dark:bg-[#0f0f0f]
        transform transition-transform duration-300
        ${
          Open
            ? "fixed translate-x-0 lg:hidden"
            : "-translate-x-full sm:translate-x-0 hidden"
        }`}
        aria-label="Sidebar"
      >
        {Open && (
          <div className="m-3">
            <button onClick={() => dispatch(toggleSideBar())}>
              <Bars3Icon className="h-6 w-6" />
            </button>
          </div>
        )}
        <div className="p-4 sm:pl-4 py-2 flex flex-col h-full gap-4 overflow-y-auto">
          {/* Menu Items */}
          <nav className="flex flex-col gap-4">
            <SidebarItem
              icon={<HomeIcon className="h-6 w-6" />}
              label="Home"
              to="/"
            />
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="flex text-md gap-2 p-2 hover:bg-gray-800 rounded-lg w-full"
            >
              <span className="flex items-center gap-1">
                <RectangleGroupIcon className="h-6 w-6" />
                Subscriptions
                <ChevronDownIcon
                  className={`h-3 w-3 transition-transform ${
                    isOpen ? "rotate-180" : ""
                  }`}
                />
              </span>
            </button>
            {isOpen && (
              <div className="flex flex-col mt-1 w-full">
                <div className="max-h-[300px] overflow-y-auto pr-1 custom-scrollbar">
                  {subscribedChannels?.map((channel) => (
                    <Link
                      key={channel._id}
                      to={`/user/${channel.username}`}
                      className="flex items-center gap-3 px-3 py-2 hover:bg-gray-100 active:bg-gray-200 rounded-lg transition-colors group"
                    >
                      <div className="flex-shrink-0 h-7 w-7 rounded-full overflow-hidden bg-gray-200">
                        <img
                          src={channel.avatar.url || "./dummy-avatar.png"}
                          alt={channel.username}
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <span className="text-sm font-normal dark:text-gray-300 text-gray-700 truncate group-hover:text-black">
                        {channel.username}
                      </span>
                    </Link>
                  ))}
                </div>
              </div>
            )}
            <hr className="border-t border-gray-200"></hr>
            <SidebarItem
              icon={<ClockIcon className="h-6 w-6" />}
              label="History"
              to="watch-history"
            />
            <SidebarItem
              icon={<RectangleStackIcon className="h-6 w-6" />}
              label="Playlists"
              to="feed/playlists"
            />
            <SidebarItem
              icon={<VideoCameraIcon className="h-6 w-6" />}
              label="Your Videos"
              to={`/studio/content/${user.username}`}
            />
            <SidebarItem
              icon={<HandThumbUpIcon className="h-6 w-6" />}
              label="Liked Videos"
              to={`/liked-videos`}
            />
            <SidebarItem
              icon={<ArrowDownTrayIcon className="h-6 w-6" />}
              label="Downloads"
              to={`/downloads`}
            />
            <hr className="border-t border-gray-200"></hr>
            <SidebarItem
              icon={<Cog6ToothIcon className="h-6 w-6" />}
              label="Settings"
              to={`/settings`}
            />
          </nav>
        </div>
      </aside>
      {!Open && (
        <div className="hidden lg:block fixed bottom-0 left-15 mt-auto text-xs text-gray-500 dark:text-gray-400 pb-4">
          © 2025 Videogram
        </div>
      )}

      {/* Overlay for mobile when sidebar open */}
      {Open && (
        <>
          <div
            className="fixed inset-0 bg-black/40 z-10 lg:hidden"
            onClick={() => dispatch(toggleSideBar())}
          ></div>
        </>
      )}
    </>
  );
}

const SidebarItem = ({ icon, label, to }) => {
  return (
    <NavLink
      to={to}
      end
      className={({ isActive }) =>
        `flex items-center gap-4 p-2 rounded-lg transition
        ${
          isActive
            ? "bg-gray-200 dark:bg-gray-700 font-semibold"
            : "hover:bg-gray-100 dark:hover:bg-gray-800"
        }`
      }
    >
      {icon}
      <span className="text-base text-black dark:text-white sm:inline">
        {label}
      </span>
    </NavLink>
  );
};

const SidebarItemVertical = ({ to, icon, label }) => {
  return (
    <NavLink
      to={to}
      end
      className={({ isActive }) =>
        `flex flex-col items-center gap-1 p-3 rounded-lg transition text-center
        ${
          isActive
            ? "bg-gray-200 dark:bg-gray-700 font-semibold"
            : "hover:bg-gray-100 dark:hover:bg-gray-800"
        }`
      }
    >
      {icon}
      <span className="text-xs sm:text-sm text-black dark:text-white">
        {label}
      </span>
    </NavLink>
  );
};
