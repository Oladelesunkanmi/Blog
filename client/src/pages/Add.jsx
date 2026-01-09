import { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useNavigate} from "react-router-dom";

function Add() {
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const saveForm = async (data) => {
    setLoading(true);
    try {
      const apiUrl = import.meta.env.VITE_API_ROOT;
      const response = await axios.post(apiUrl, data);
    
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

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <form
        onSubmit={handleSubmit(saveForm)}
        className="w-full max-w-md bg-white p-6 rounded-lg shadow"
      >
        <h2 className="text-xl font-semibold text-center mb-6">
          Add Post
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

        {/* Post */}
        <div className="mb-6">
          <label className="block text-gray-700 mb-2">Post</label>
          <input
            placeholder="Enter blog post"
            className="w-full px-4 py-2 border rounded-md"
            {...register("post", {
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

export default Add;
