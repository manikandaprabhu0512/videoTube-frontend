import React from "react";
import { useCurrentUser } from "../hooks/useUSer.js";

function UserProfile() {
  const { data: user, isLoading } = useCurrentUser();

  if (isLoading) return <Loader isLoading={true} />;

  if (!user) return <p>No User Found</p>;

  return (
    <div>
      <Header />
      <div class="flex flex-wrap justify-center items-center space-x-2 text-md font-medium">
        <button type="button" aria-label="Home">
          <HomeIcon />
        </button>
        <ArrowIcon />
        <Link to={`/${user.username}/settings`}>Settings</Link>
        <ArrowIcon />
        <span>Profile</span>
      </div>
      <div className="relative w-full px-4 sm:px-6 lg:px-10 pt-3">
        <img
          className="w-full aspect-[16/5] sm:aspect-[16/6] md:aspect-[16/4] lg:aspect-[16/3] object-cover rounded-b-lg"
          src={user.coverImage.url}
          alt="cover image"
        />

        <div className="absolute left-1/2 transform -translate-x-1/2 sm:left-20 sm:translate-x-0 -bottom-12 sm:-bottom-16 md:-bottom-20">
          <img
            className="h-24 w-24 sm:h-28 sm:w-28 md:h-32 md:w-32 lg:h-40 lg:w-40 rounded-full border-4 border-white object-cover shadow-md"
            src={user.avatar.url}
            alt="avatar"
          />
        </div>
      </div>

      <div className="mt-24 mx-10">
        <div className="flex justify-between items-center mb-5">
          <p className="text-3xl font-bold">{user.fullName}</p>
          <button
            type="button"
            className="flex justify-center items-center gap-2 w-40 py-3 active:scale-95 transition text-sm text-white rounded-full bg-indigo-500"
          >
            <EditIcon />
            <p className="mb-0.5">Edit</p>
          </button>
        </div>
        <div className="w-1/2">
          <p>
            {user.biography ||
              "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Excepturi aperiam sint aliquam vero nemo veniam, vel nisi dolorum dolor aspernatur. Vero odio deserunt eligendi veniam labore illum quidem itaque quibusdam."}
          </p>
        </div>
      </div>
    </div>
  );
}

export default UserProfile;
