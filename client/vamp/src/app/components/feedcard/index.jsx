import React from "react";
import { IconClipboardCopy, IconDroplet } from "@tabler/icons-react";
import { bloodgroups } from "../../config/bloodGroups";

const FeedCard = ({ item }) => {
  const progressWidth = Math.random() * 100;

  return (
    <div className="border-2 border-teal-400 rounded-lg p-6 mb-6 bg-white shadow-lg transition-transform duration-300 transform hover:scale-105 flex flex-col relative ">
      <div className="flex items-center mb-4">
        <div className="mr-4">
          {item.type === "Post" ? (
            <IconClipboardCopy className="h-8 w-8 text-teal-600" />
          ) : (
            <IconDroplet className="h-8 w-8 text-teal-600" />
          )}
        </div>

        <h2 className="text-2xl font-bold text-gray-900">
          {item.title || "Blood Requirement"}
        </h2>
      </div>

      <div className="flex-1 mb-4">
        <p className="text-sm text-gray-500 mb-2">
          Type: <span className="font-semibold">{item.type}</span>
        </p>

        {item.type === "Post" && (
          <>
            <h3 className="text-md font-medium text-gray-800 mb-2">
              Author: {item.authorDetails?.name || "Unknown"}
            </h3>
            {item.content.map((para, index) => (
              <p key={index} className="text-gray-700 mb-4 leading-relaxed">
                {para}
              </p>
            ))}
          </>
        )}

        {item.type === "Requirement" && (
          <>
            <h3 className="text-md font-medium text-gray-800 mb-2">
              Hospital: {item.hospitalDetails?.name || "Unknown"}
            </h3>
            <div className="grid grid-cols-2 gap-4">
              {bloodgroups.map(
                (grp) =>
                  item.demand[grp] && (
                    <p key={grp} className="text-gray-700">
                      <span className="font-semibold">{grp}:</span> {item.demand[grp]}
                    </p>
                  )
              )}
            </div>
            {/* Dummy progress bar */}
            <div className="mt-4">
              <p className="text-sm text-gray-600">Progress:</p>
              <div className="w-full bg-gray-200 rounded-full h-4">
                <div
                  className="bg-teal-500 h-4 rounded-full"
                  style={{ width: `${progressWidth}%` }}
                ></div>
              </div>
            </div>
          </>
        )}
      </div>

      <div className="text-sm text-gray-500 mt-4 border-t pt-4">
        {item.type === "Post" ? (
          <span>
            Posted on:{" "}
            {new Date(item.date.seconds * 1000).toLocaleDateString()}
          </span>
        ) : (
          <>
            <span>
              Posted on:{" "}
              {new Date(item.postDate.seconds * 1000).toLocaleDateString()}
            </span>
            <br />
            <span>
              Last Date:{" "}
              {new Date(item.lastDate.seconds * 1000).toLocaleDateString()}
            </span>
          </>
        )}
      </div>

      {item.type === "Requirement" && (
        <button className="absolute bottom-4 right-4 bg-teal-500 text-white font-semibold px-4 py-2 rounded-lg shadow hover:bg-teal-600 transition duration-300">
          Donate
        </button>
      )}
    </div>
  );
};

export default FeedCard;