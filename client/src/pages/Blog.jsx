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

  if (loading) return <div className="min-h-screen flex items-center justify-center"><div className="text-lg text-gray-600">Loading...</div></div>;
  if (error) return <div className="min-h-screen flex items-center justify-center"><div className="text-lg text-red-600">Error: {error}</div></div>;

  return (


    <section className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
           <div className="grid gap-8">

          <article
            key={apiData.id}
            className="bg-white rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1"
          >
           
            <div className="p-8 md:p-12">
              <h4 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 leading-tight hover:text-purple-600 transition-colors duration-200">
                {apiData.Title}
              </h4>
              <div className="mb-8 rounded-xl overflow-hidden">
                <img className="w-[250px] h-auto object-cover"
                  src={`${import.meta.env.VITE_API_ROOT}/${apiData?.Image.replace(/^\.?\//, "")}`}
                  alt={apiData?.Title}
                  onError={(e) => { e.currentTarget.src = "/placeholder.jpg"; }}
                />
              </div>

              <p className="text-lg md:text-xl text-gray-700 leading-relaxed whitespace-pre-wrap">{apiData.PostDetail}</p>
            </div>
          </article>

        </div>

        {apiData.length === 0 && (
          <div className="text-center py-24">
            <p className="text-gray-500 text-xl">No articles found in this category.</p>
          </div>
        )}
      </div>
    </section>
  );
}

export default Blog;