import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
 import { useState } from "react";

function Delete(){
 const params = useParams();
 const navigate = useNavigate();

const [loading, setLoading] = useState(false);

const handleDelete = async () => {
  setLoading(true);
  try {
    const apiUrl = `${import.meta.env.VITE_API_ROOT}/${params.id}`;
    const response = await axios.delete(apiUrl);

    if (response.status === 200) {
      navigate("/");
    }
  } catch (error) {
    console.log(error);
  } finally {
    setLoading(false);
  }
};


return(
    <>
    <h1 className="text-5xl">
        Are you sure to  delete this?
    </h1>
    <div>
      <button onClick={handleDelete} className="border-2 border-red-500 bg-red-500 px-4 py-2 text-white rounded">
  Proceed
</button>
    </div>
    </>
);
}
export default Delete;