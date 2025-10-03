import React from "react";
import ReactPlayer from "react-player";

function ReactPlayerFn({ src }) {
  return (
    <div>
      <div className="w-full flex justify-start">
        <div className="w-full md:w-4/5 lg:w-3/4 xl:w-2/3 aspect-video rounded-xl overflow-hidden mt-4 shadow-2xl">
          <ReactPlayer
            src={src}
            controls
            playing
            width="100%"
            height="100%"
            className="rounded-xl"
          />
        </div>
      </div>
    </div>
  );
}

export default ReactPlayerFn;
