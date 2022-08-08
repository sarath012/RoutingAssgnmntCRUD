import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function BlogDetail() {
  const [selectedblog, setSelectedBlog] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const selected = JSON.parse(localStorage.getItem("data"));

    const selectedid = JSON.parse(localStorage.getItem("selctedid"));

    const filtered = selected.find((item) => item.id === selectedid);
    // console.log(filtered)
    setSelectedBlog(filtered);
  }, []);

  if (selectedblog === null) {
    return <div>Loading....</div>;
  }


const handleEdit = () =>{
    // let editblog = JSON.parse(localStorage.getItem("data"));
    // editblog.map((blog) => {
    //     if(blog.id===selectedblog.id){
    //         return {}
    //     }
    //     else{
    //         return blog
    //     }
    // })
    navigate('/edit-data/' + selectedblog.id);
}

  const handleDelete = (id) => {
    const delproduct = JSON.parse(localStorage.getItem("data"));
    const delitem = delproduct.filter((item) => item.id !== id);
    localStorage.setItem("data", JSON.stringify(delitem));
    navigate("/");
  };

  return (
    <div>
      <div>
        <div>
          <h3>{selectedblog.title}</h3>
          <div>
            <img src={selectedblog.image} alt="pic" />
          </div>

          <p>{selectedblog.description}</p>
        </div>

        <button onClick={handleEdit}>Edit</button>
        <button onClick={() => handleDelete(selectedblog.id)}>Delete</button>
      </div>
    </div>
  );
}
