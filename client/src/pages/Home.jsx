import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { FaPen, FaTrash } from "react-icons/fa";
import { Search } from "lucide-react";

function Home() {
  const [apiData, setApiData] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const apiUrl = import.meta.env.VITE_API_ROOT;
        const response = await axios.get(apiUrl);

        if (response.status === 200) {
          setApiData(response.data.blog_records || []);
        }
      } catch (error) {
        console.error("Error fetching blogs:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const filteredPosts = apiData.filter((post) =>
    post.Title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-purple-600 to-pink-600 text-white py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            React + Go Fiber Blog
          </h1>
          <p className="text-lg opacity-90 mb-8">
            Discover stories on technology, backend, and full-stack development
          </p>

          {/* Search Bar */}
          <div className="flex max-w-2xl mx-auto bg-white rounded-full overflow-hidden shadow-lg">
            <input
              type="text"
              placeholder="Search articles..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="flex-1 px-6 py-4 text-gray-800 outline-none"
            />
            <button className="px-8 bg-purple-700 hover:bg-purple-800 transition">
              <Search className="text-white" size={20} />
            </button>
          </div>

          <div className="mt-6">
            <Link
              to="add"
              className="inline-block bg-white text-purple-700 px-6 py-2 rounded-md font-semibold hover:bg-gray-100 transition"
            >
              Add Blog Post
            </Link>
          </div>
        </div>
      </section>

      {/* Blog Posts */}
      <section className="max-w-7xl mx-auto px-4 py-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">
          Latest Articles
        </h2>

        {loading && (
          <p className="text-center text-gray-500">Loading posts...</p>
        )}

        {!loading && filteredPosts.length === 0 && (
          <p className="text-center text-gray-500">
            No articles found.
          </p>
        )}

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPosts.map((post) => (
            <article
              key={post.ID}
              className="bg-white rounded-xl shadow-md hover:shadow-xl transition overflow-hidden"
            >
              <img
                className="w-full h-48 object-cover"
                src={`${import.meta.env.VITE_API_ROOT}/${post.Image?.replace(
                  /^\.?\//,
                  ""
                )}`}
                alt={post.Title}
                onError={(e) => {
                  e.currentTarget.src = "/placeholder.jpg";
                }}
              />

              <div className="p-6">
                <Link to={`/blog/${post.ID}`}>
                  <h3 className="text-xl font-bold text-gray-900 hover:text-purple-600 transition">
                    {post.Title}
                  </h3>
                </Link>

                <p className="text-gray-600 text-sm mt-2 line-clamp-3">
                  {post.Post}
                </p>

                <div className="flex justify-between items-center mt-4">
                  <div className="flex gap-4">
                    <Link to={`edit/${post.ID}`}>
                      <FaPen className="text-blue-500 hover:text-blue-700 cursor-pointer" />
                    </Link>
                    <Link to={`delete/${post.ID}`}>
                      <FaTrash className="text-red-500 hover:text-red-700 cursor-pointer" />
                    </Link>
                  </div>

                  <Link
                    to={`/blog/${post.ID}`}
                    className="text-sm font-medium text-purple-600 hover:underline"
                  >
                    Read more →
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}

export default Home;
