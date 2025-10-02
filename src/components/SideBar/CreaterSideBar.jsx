import { useQuery } from "@tanstack/react-query";
import { NavLink } from "react-router-dom";
import { fetchUserData } from "../../Api/users";
import Loader from "../Loader";
import { useSelector } from "react-redux";
import {
  Archive,
  Content,
  Copyright,
  Dashboard,
  Earn,
  Settings,
} from "../../assets/Icons";

function CreaterSideBar() {
  const {
    data: user,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["user"],
    queryFn: fetchUserData,
  });

  const visible = useSelector((state) => state.sidebar.visible);

  if (isLoading) return <Loader isLoading={true} />;

  if (!user) return <p>No User Found</p>;

  const firstList = [
    {
      id: 1,
      name: "Dashboard",
      path: "/studio/dashboard",
      icon: <Dashboard />,
    },
    {
      id: 2,
      name: "Content",
      path: `/studio/content/${user.username}`,
      icon: <Content />,
    },
    {
      id: 3,
      name: "Copyright",
      path: "/studio/copyright",
      icon: <Copyright />,
    },
    {
      id: 4,
      name: "Archive",
      path: `/studio/archive/${user.username}`,
      icon: <Archive />,
    },
    {
      id: 5,
      name: "Earn",
      path: "/studio/Earn",
      icon: <Earn />,
    },
  ];

  return (
    <div>
      {visible && (
        <aside
          id="separator-sidebar"
          className="top-0 left-0 z-40 w-64 transition-transform -translate-x-full sm:translate-x-0"
          aria-label="Sidebar"
        >
          <div className="px-3 py-4 overflow-y-auto bg-white dark:bg-[#0f0f0f]">
            <div className="flex flex-col justify-center items-center p-2">
              <img
                className="h-24 w-24 rounded-full object-cover border-2 border-gray-300 dark:border-gray-600"
                src={user.avatar.url || "/dummy-avatar.png"}
                alt="user avatar"
              />
              <span className="mt-3 text-sm font-medium text-gray-500 dark:text-gray-400">
                Your Channel
              </span>
              <span className="text-lg font-semibold text-gray-900 dark:text-white">
                {user.fullName}
              </span>
            </div>

            <ul className="pt-4 mt-4 space-y-2 font-medium border-t border-gray-200 dark:border-gray-700">
              {firstList.map((item) => (
                <li key={item.id}>
                  <NavLink
                    to={item.path}
                    className={({ isActive }) =>
                      `flex items-center p-2 text-gray-900 transition duration-75 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-white group ${
                        isActive ? "bg-slate-200 dark:bg-slate-500" : ""
                      }`
                    }
                  >
                    {item.icon}

                    <span className="ms-3">{item.name}</span>
                  </NavLink>
                </li>
              ))}
            </ul>

            <ul className="pt-4 mt-4 space-y-2 font-medium border-t border-gray-200 dark:border-gray-700">
              <li>
                <a
                  href="#"
                  className="flex items-center p-2 text-gray-900 transition duration-75 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-white group"
                >
                  <Settings />

                  <span className="ms-3">Settings</span>
                </a>
              </li>
            </ul>
          </div>
        </aside>
      )}
    </div>
  );
}

export default CreaterSideBar;
