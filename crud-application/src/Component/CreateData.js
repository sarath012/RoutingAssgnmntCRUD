import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./CreateData.css";
import BlogContext from "./Context/BlogContext";

export default function CreateData() {

    const navigate = useNavigate(); 

    const {blogs, setBlogs} = BlogContext();

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

    const handlesubmit = (e) => {
        e.preventDefault();

        let newError = error;
        let state = true;

        if (title.current.value === "") {
            newError["titleErr"] = "Title is required!";
            state = false;
        } else if ( title.current.value.length < 3 || title.current.value.length > 10 ) {
            newError["titleErr"] = "Title length should be between 3 and 10";
            state = false;
        } else {
            newError["titleErr"] = "";
            state = true;
        }

        if (image.current.value === "") {
            newError["imageErr"] = "Image is required!";
            state = false;
        }else {
            newError["imageErr"] = "";
            state = true;
        }

        if (description.current.value === "") {
            newError["descriptionErr"] = "Description is required!";
            state = false;
        } else if ( description.current.value.length < 10 || description.current.value.length > 100 ) {
            newError["descriptionErr"] = "Description length should be between 10 and 100";
            state = false;
        } else {
            newError["descriptionErr"] = "";
            state = true;
        }

        setError(newError);

        if (state) {

            setError({
                titleErr: "",
                imageErr: "",
                descriptionErr: "",
            })
            
            let oldObj = JSON.parse(localStorage.getItem('data'));

            let blogid=blogs.length
            let obj =[{
                id: blogid,
                title: title.current.value,
                image: image.current.value,
                description: description.current.value,
            }]
            oldObj.push(obj)

            localStorage.setItem('data', JSON.stringify(oldObj));
            navigate('/');
            
        }else{
            setData({
                title: "",
                image: "",
                description: "",
            });
        }
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
                            <span style={{ color: "red", fontSize: "small" }}>{error.titleErr}</span>
                            )}
                    </div>

                    <div className="inputcontainer">
                        <label>Image URL:</label>
                        <input type="text" placeholder="Image URL" ref={image} />
                            {error.imageErr !== "" && (
                            <span style={{ color: "red", fontSize: "small" }}>{error.imageErr}</span>
                            )}
                    </div>

                    <div className="textareacontainer">
                        <label>Description:</label>
                        <textarea placeholder="Description" ref={description}></textarea>
                            {error.descriptionErr !== "" && (
                            <span style={{ color: "red", fontSize: "small" }}>{error.descriptionErr}</span>
                            )}
                    </div>

                    <div className="buttoncontainer">
                        <button type='submit'>Add</button>
                    </div>
                </form>
            </div>
        </div>
    );
}
