import React from "react";
import { userTypes } from "../config/types";

const Types = ({ selected, onClick }) => {
  return (
    <div className=" m-1 flex flex-row justify-between">
      {userTypes.map((type) =>
        type == selected ? (
          <span
            key={type}
            className="m-1 bg-teal-500 px-9 py-4 rounded-md text-white hover:bg-teal-50 hover:text-teal-900 cursor-pointer"
            onClick={() => onClick(type)}
          >
            {type}
          </span>
        ) : (
          <span
            key={type}
            className="m-1 bg-teal-100 px-9 py-4 rounded-md text-teal-900 hover:bg-teal-500 hover:text-white cursor-pointer"
            onClick={() => onClick(type)}
          >
            {type}
          </span>
        )
      )}
    </div>
  );
};

export default Types;
