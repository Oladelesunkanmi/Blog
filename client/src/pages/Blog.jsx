import { useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import axios from "axios";

function Blog() {
  const [apiData, setApiData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const params = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const apiUrl = import.meta.env.VITE_API_ROOT + "/" + params.id;
        const response = await axios.get(apiUrl);
        console.log("API Response:", response.data);

        setApiData(response.data.data); 
      } catch (error) {
        console.error(error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [params.id]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
        <div className="flex justify-center bg-gray-700 py-5">
      <h1 className="text-5xl text-white">{apiData.Title}</h1>
      </div>
      <p>{apiData.Post}</p>
    </div>
  );
}

export default Blog;
