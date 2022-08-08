// import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './Component/Home';
import CreateData from './Component/CreateData';
import { AppContext } from './Component/Context/BlogContext';
import { useEffect, useState } from 'react';
import BlogDetail from './Component/BlogDetail/BlogDetail';


// var item =[];

// var jsonObj ={"data": item}

// if ((localStorage.getItem('data')) ===null){
//   localStorage.setItem('data', JSON.stringify(jsonObj))
// }


function App() {

// const [blogs, setBlogs] = useState(JSON.parse(localStorage.getItem('data')));

const getBlogs = () => {
  let storedblogs = localStorage.getItem("data")
  if(storedblogs){
    return JSON.parse(storedblogs);
  }
  else{
    localStorage.setItem('data', JSON.stringify([]))
    return [];
  }
}

const [blogs, setBlogs] = useState(() => getBlogs())

// const navigate = useNavigate();


// localStorage.setItem('data', JSON.stringify(blogs))

// console.log("blogs: ", blogs.length)

  return (
    <div className="App">
    <AppContext.Provider
    value={{
      blogs, 
      setBlogs
    }}
    >

        <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/add-data" element={<CreateData />} />
          <Route path="/edit-data/:id" element={<CreateData />} />
          <Route path="/:id" element={<BlogDetail />} />
        </Routes>
        </BrowserRouter>

      </AppContext.Provider>
    </div>
  );
}

export default App;
