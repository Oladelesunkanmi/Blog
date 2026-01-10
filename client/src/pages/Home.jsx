import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { FaPen, FaTrash } from "react-icons/fa";

function Home() {

  const [apiData, setApiData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const apiUrl = import.meta.env.VITE_API_ROOT;
        const response = await axios.get(apiUrl);
        if (response.status === 200) {
          if (response.statusText === "OK") {
            setApiData(response.data.blog_records);
          }
        }
      } catch (error) {
        console.log(error.response);
      }
    };

    fetchData();
  }, []);

  console.log(apiData);

  return (
    <div className=" flex flex-col items-center px-4">
      <div className="w-full max-w-4xl">
        <h1 className="text-3xl sm:text-4xl font-bold text-center mb-6">
          React Application with Go Fiber backend
        </h1>
      </div>
      <div className="justify-center mt-6">

        <Link
          to="add"
          className="inline-block bg-blue-600 text-white px-5 py-2 rounded-md
               font-medium hover:bg-blue-700 transition
               focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          Add Blog Post
        </Link>
      </div>


      <div className="w-full max-w-4xl grid grid-cols-1 sm:grid-cols-2 gap-6 my-5">
        {apiData.map((apiData) => (
          <div
            key={apiData.ID}
            className="p-4 border border-gray-300 rounded-md shadow-sm"
          >
            <div className="text-lg font-semibold mb-1">
              <Link to={`/blog/${apiData.ID}`}>
                {apiData.Title}
              </Link>
            </div>
             <img width="100" height="100"
          src={`${import.meta.env.VITE_API_ROOT}/${apiData?.Image.replace(/^\.?\//, "")}`}
          alt={apiData?.Title}
          onError={(e) => { e.currentTarget.src = "/placeholder.jpg"; }}
        />
            <div className="flex">
            <Link to={`edit/${apiData.ID}`}>
              <FaPen className="text-blue-500 cursor-pointer" />
            </Link>

            <Link to={`delete/${apiData.ID}`}>
              <FaTrash className="text-red-500 cursor-pointer" />
            </Link>
            </div>
            <div className="text-gray-700">
              {apiData.Post}
            </div>
          </div>

        ))}
      </div>
    </div>

  )
}

export default Home;