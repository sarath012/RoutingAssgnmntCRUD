import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Blog from "./Blog/Blog";
import BlogContext from "./Context/BlogContext";

// var item =[];

// var jsonObj ={"data": item}

// if ((localStorage.getItem('data')) ===null){
//   localStorage.setItem('data', JSON.stringify(jsonObj))
// }


export default function Home() {
  const getBlogs = () => {
    let storedblogs = localStorage.getItem("data")
    if(storedblogs){
      return JSON.parse(storedblogs);
    }
    else{
      return []
    }
  }

  // const {blogs, setBlogs} = BlogContext();
  const [blogs, setBlogs] = useState(() => getBlogs())

  const navigate = useNavigate();



// console.log(blogs)

  return (
    <div>
      <div>
        <button onClick={() => navigate("/add-data")}>Add data</button>
      </div>
      <hr/>
      <div >
    <div>
        {blogs.map((item)=>(
            <Blog key={item.id} item={item}/>
        ))} 

    </div>
      </div>
    </div>
  );
}
