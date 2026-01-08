import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function Home(){

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

    <div className="w-full max-w-4xl grid grid-cols-1 sm:grid-cols-2 gap-6 my-5">
      {apiData.map((record) => (
        <div
          key={record.ID}
          className="p-4 border border-gray-300 rounded-md shadow-sm"
        >
          <div className="text-lg font-semibold mb-1">
            <Link to={`/blog/${record.ID}`}>
            {record.Title}
            </Link>
          </div>
          <div className="text-gray-700">
            {record.Post}
          </div>
        </div>
      ))}
    </div>
  </div>
    )
}

export default Home;