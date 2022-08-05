// import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './Component/Home';
import CreateData from './Component/CreateData';
import { AppContext } from './Component/Context/BlogContext';
import { useEffect, useState } from 'react';

function App() {

  // var item =[];

// var jsonObj ={"data": item}

// if (item.length)

const [blogs, setBlogs] = useState([]);

localStorage.setItem('data', JSON.stringify(blogs))

useEffect(() => {
  
    const fetchdItem = JSON.parse(localStorage.getItem('data'))
    setBlogs(fetchdItem)

}, []);

console.log("blogs: ", blogs.length)

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
        </Routes>
        </BrowserRouter>

      </AppContext.Provider>
    </div>
  );
}

export default App;
