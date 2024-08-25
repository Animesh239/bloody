"use client";
import React, { useEffect, useState } from "react";
import { fetchPosts, fetchRequirements } from "../firebase/feed";
import { bloodgroups } from "../config/bloodGroups";

const Feed = () => {
  const [combinedData, setCombinedData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const postData = await fetchPosts();
      const reqData = await fetchRequirements();

      const combined = [
        ...postData.map((post) => ({ ...post, type: "Post" })),
        ...reqData.map((req) => ({ ...req, type: "Requirement" })),
      ];

      combined.sort((a, b) => {
        const dateA = a.date || a.postDate;
        const dateB = b.date || b.postDate;
        return dateB.seconds - dateA.seconds;
      });

      setCombinedData(combined);
    };
    fetchData();
  }, []);

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-4xl font-extrabold text-teal-600 mb-8 text-center">
        Community Feed
      </h1>
      {combinedData.map((item) => (
        <div
          key={item.id}
          className="border border-teal-300 rounded-lg p-6 mb-6 bg-white shadow-lg transition duration-300 ease-in-out hover:shadow-xl hover:scale-105 flex flex-col items-center "
        >
          <h2 className="text-2xl font-semibold text-turquoise-700 mb-2">
            {item.title || "Blood Requirement"}
          </h2>
          <p className="text-md text-teal-500 mb-4">
            Type:{" "}
            <span className="font-bold text-turquoise-600">{item.type}</span>
          </p>

          {item.type === "Post" && (
            <div className="w-[100%]">
              <h3 className="text-lg font-medium text-gray-700 mb-2 flex flex-col items-start">
                Laboratory:{" "}
                <span className="text-turquoise-700">
                  {item.authorDetails?.name || "Unknown"}
                </span>
              </h3>
              {item.content.map((para, index) => (
                <p key={index} className="text-gray-600 mb-4">
                  {para}
                </p>
              ))}
            </div>
          )}

          {item.type === "Requirement" && (
            <>
              <h3 className="text-lg font-medium text-gray-700 mb-2">
                Hospital:{" "}
                <span className="text-turquoise-700">
                  {item.hospitalDetails?.name || "Unknown"}
                </span>
              </h3>
              {bloodgroups.map(
                (grp) =>
                  item.demand[grp] && (
                    <p key={grp} className="text-gray-600 mb-2">
                      <span className="text-teal-700 font-semibold">
                        {grp}:
                      </span>{" "}
                      {item.demand[grp]}
                    </p>
                  )
              )}
            </>
          )}

          <div className="mt-4 text-sm text-gray-500">
            {item.type === "Post" ? (
              <span>
                Posted on:{" "}
                <span className="text-teal-600">
                  {new Date(item.date.seconds * 1000).toLocaleDateString()}
                </span>
              </span>
            ) : (
              <>
                <span>
                  Posted on:{" "}
                  <span className="text-teal-600">
                    {new Date(
                      item.postDate.seconds * 1000
                    ).toLocaleDateString()}
                  </span>
                </span>
                <br />
                <span>
                  Last Date:{" "}
                  <span className="text-teal-600">
                    {new Date(
                      item.lastDate.seconds * 1000
                    ).toLocaleDateString()}
                  </span>
                </span>
              </>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Feed;
