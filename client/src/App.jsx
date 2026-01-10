import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Blog from "./pages/Blog";
import Layout from "./Layout/Layout";
import Add from "./pages/Add";
import Edit from "./pages/Edit";
import Delete from "./pages/Delete";
import Login from "./pages/Login";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="/add" element={<Add />} />
        <Route path="/login" element={<Login />} />
        <Route path="/delete/:id" element={<Delete />} />
        <Route path="edit/:id" element={<Edit/>} />


        <Route path="blog/:id" element={<Blog />} />
      </Route>
    </Routes>
  );
}

export default App;
