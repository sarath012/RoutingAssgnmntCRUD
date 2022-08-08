import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./CreateData.css";
import BlogContext from "./Context/BlogContext";

export default function CreateData() {
  const navigate = useNavigate();

  const { id } = useParams();

  const { blogs, setBlogs } = BlogContext();

  const [data, setData] = useState({
    title: "",
    image: "",
    description: "",
  });

  const [error, setError] = useState({
    titleErr: "",
    imageErr: "",
    descriptionErr: "",
  });

  const title = useRef();
  const image = useRef();
  const description = useRef();

  useEffect(() => {
    if(id){
        const blogsdata = JSON.parse(localStorage.getItem("data"));
        const blog = blogsdata.find(item => item.id===parseInt(id));
        title.current.value = blog.title;
        image.current.value = blog.image;
        description.current.value = blog.description;
    }
  }, [])
  

  const handlesubmit = (e) => {
    e.preventDefault();

    let newError = error;
    let state = true;

    if (title.current.value === "") {
      newError["titleErr"] = "Title is required!";
      state = false;
    } else if (
      title.current.value.length < 3 ||
      title.current.value.length > 10
    ) {
      newError["titleErr"] = "Title length should be between 3 and 10";
      state = false;
    } else {
      newError["titleErr"] = "";
      state = true;
    }

    if (image.current.value === "") {
      newError["imageErr"] = "Image is required!";
      state = false;
    } else {
      newError["imageErr"] = "";
      state = true;
    }

    if (description.current.value === "") {
      newError["descriptionErr"] = "Description is required!";
      state = false;
    } else if (
      description.current.value.length < 10 ||
      description.current.value.length > 100
    ) {
      newError["descriptionErr"] =
        "Description length should be between 10 and 100";
      state = false;
    } else {
      newError["descriptionErr"] = "";
      state = true;
    }

    setError(newError);

    // console.log(state);

    if (state) {
      setError({
        titleErr: "",
        imageErr: "",
        descriptionErr: "",
      });

      if(id){
        // console.log("Edit, id condition");
        let editblog = JSON.parse(localStorage.getItem("data"));
        for (const item of editblog) {
            if (item.id === parseInt(id)) {
                item.title = title.current.value;
                item.image = image.current.value;
                item.description = description.current.value ; 
                break;
            }
        }
        // editblog.map((blog) => {
        //     if(blog.id===parseInt(id)){
        //         console.log(blog.id, ": blog id");
        //         console.log(id, ": id");
        //         console.log(title.current.value, "title current");
        //         console.log(image.current.value, "image current");
        //         console.log(description.current.value, "description current");
        //         let blogcopy = {...blog};
        //         blogcopy = {
        //             ...blogcopy,
                    // title: title.current.value,
                    // image: image.current.value,
                    // description: description.current.value              
        //         }
                // console.log(blogcopy);
        //         return blogcopy
        //     }
        //     else{
        //         return blog
        //     }
        // })
        // console.log(editblog);
        localStorage.setItem("data", JSON.stringify(editblog));
        navigate('/');
      }
      else{
        let oldObj = JSON.parse(localStorage.getItem("data"));
        let blogid = new Date().getTime();
        let obj =  {
          id: blogid,
          title: title.current.value,
          image: image.current.value,
          description: description.current.value,
        };
        oldObj.push(obj);
        localStorage.setItem("data", JSON.stringify(oldObj));
        navigate("/");
      }

    } 
    // else {
    //   setData({
    //     title: "",
    //     image: "",
    //     description: "",
    //   });
    // }
  };

  // useEffect(() => {
  //     localStorage.setItem('item', JSON.stringify();

  // }, [blogs])

  return (
    <div className="container">
      <div className="formcontainer">
        <form onSubmit={handlesubmit}>
          <div className="inputcontainer">
            <label>Title:</label>
            <input type="text" placeholder="Title" ref={title} />
            {error.titleErr !== "" && (
              <span style={{ color: "red", fontSize: "small" }}>
                {error.titleErr}
              </span>
            )}
          </div>

          <div className="inputcontainer">
            <label>Image URL:</label>
            <input type="text" placeholder="Image URL" ref={image} />
            {error.imageErr !== "" && (
              <span style={{ color: "red", fontSize: "small" }}>
                {error.imageErr}
              </span>
            )}
          </div>

          <div className="textareacontainer">
            <label>Description:</label>
            <textarea placeholder="Description" ref={description}></textarea>
            {error.descriptionErr !== "" && (
              <span style={{ color: "red", fontSize: "small" }}>
                {error.descriptionErr}
              </span>
            )}
          </div>

          <div className="buttoncontainer">
            <button type="submit">{id ? "Edit": "Add"}</button>
          </div>
        </form>
      </div>
    </div>
  );
}
