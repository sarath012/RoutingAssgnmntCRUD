import React from "react";
import { useNavigate } from "react-router-dom";
// import Blog from "./Blog/Blog";
import BlogContext from "./Context/BlogContext";

export default function Home() {

  const {blogs, setBlogs} = BlogContext();

  const navigate = useNavigate();

console.log(blogs)

  return (
    <div>
      <div>
        <button onClick={() => navigate("/add-data")}>Add data</button>
      </div>
      <div >
    <div>
        {/* {blogs.map((item)=>(
            <Blog  item={item}/>
        ))}  */}

    </div>
      </div>
    </div>
  );
}
