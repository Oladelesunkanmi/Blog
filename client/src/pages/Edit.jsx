import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

function Edit() {
  const [loading, setLoading] = useState(false);
  const [apiData, setApiData] = useState(null);
  const [error, setError] = useState(null);

  const params = useParams();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    reset, // ✅ add reset
    formState: { errors },
  } = useForm();

  // 1. Fetch the data
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const apiUrl = import.meta.env.VITE_API_ROOT + "/" + params.id;
        const response = await axios.get(apiUrl);
        console.log("API Response:", response.data);

        setApiData(response.data.data);
        console.log(apiData)

        // ✅ reset the form with fetched data
        reset({
          title: response.data.data.Title,
          post: response.data.data.Post,
          postdetail:response.data.data.PostDetail,
        });
      } catch (error) {
        console.error(error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [params.id, reset]);

  // 2. Form handling and saving
  const saveForm = async (data) => {
    setLoading(true);
    try {
      const apiUrl = import.meta.env.VITE_API_ROOT + "/" + params.id; // ✅ use PUT
      const response = await axios.put(apiUrl, data);

      if (response.status === 200 || response.status === 201) {
        navigate("/");
        console.log(response);
      }
    } catch (error) {
      console.log(error.response || error.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <form
        onSubmit={handleSubmit(saveForm)}
        className="w-full max-w-md bg-white p-6 rounded-lg shadow"
      >
        <h2 className="text-xl font-semibold text-center mb-6">
          Edit Post
        </h2>

        {/* Title */}
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Title</label>
          <input
            placeholder="Enter title"
            className="w-full px-4 py-2 border rounded-md"
            {...register("title", {
              required: "Title is required",
              minLength: {
                value: 3,
                message: "Title should be minimum 3 characters",
              },
            })}
          />
          {errors.title && <div>{errors.title.message}</div>}
        </div>

        {/* Post Description*/}
        <div className="mb-6">
          <label className="block text-gray-700 mb-2">Description</label>
          <input
            placeholder="Enter blog post"
            className="w-full px-4 py-2 border rounded-md"
            {...register("post", {
              required: "Post content is required",
            })}
          />
          {errors.post && <div>{errors.post.message}</div>}
        </div>

        {/* Post */}
        <div className="mb-6">
          <label className="block text-gray-700 mb-2">Post</label>
          <input
            placeholder="Enter blog post"
            className="w-full px-4 py-2 border rounded-md"
            {...register("postdetail", {
              required: "Post content is required",
            })}
          />
          {errors.post && <div>{errors.post.message}</div>}
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-md"
        >
          Save
        </button>
      </form>
    </div>
  );
}

export default Edit;
